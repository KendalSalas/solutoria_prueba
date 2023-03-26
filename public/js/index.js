const _token = document.getElementsByName('_token')[0].value
const $spinner = document.getElementById('cover-spin')
const $fechasUF = document.getElementById('fechas_uf')
const $canvasChart = document.getElementById('canvas_chart')

let myChart = '';

/**
 * Funcion para mostrar u ocultar el spinner segun se requiera
 * @param {String} spinner => Nombre del spinner a mostrar
 * @param {String} opt => Accion a realizar, puede ser show o hide 
 */
const actionSpinner = (spinner, opt) => {
    if (opt == 'show') {
        spinner.style.display = 'block'
    } else {
        spinner.style.display = 'none'
    }
}

/**
 * Funcion para limpiar el formulario
 */
const clearForm = () => {
    document.getElementById('fecha_desde').value = ''
    document.getElementById('fecha_hasta').value = ''
    $fechasUF.innerHTML = ''
}

/**
 * Funcion para limpiar los graficos
 * @param {String} targetChart => Grafico a limpiar 
 */
const clearChart = () => {
    if(myChart != ''){
        myChart.destroy()
    }
}

/**
 * Funcion para crear un grafico utilizando chartjs
 * @param {Array} dataChart => Arreglo con los datos para llenar el grafico
 * @param {String} targetChart => Div donde se inyectará el gráfico
 * @param {String} filter => Se utilizara para especificar si el valor de la UF es por AVG (index) o normal (filtro)
 */
const makeChart = (dataChart, targetChart, filter) => {
    const valorUF = []
    const labelUF = []

    dataChart.map((i) => {
        valorUF.push(i.valor)
        labelUF.push(i.fecha)
    })

    const label = filter == 'index' ? 'AVG' : '';

    myChart = new Chart(targetChart, {
        type: 'line',
        data: {
            labels: labelUF,
            datasets: [{
                label: `Valor ${label} UF`,
                data: valorUF,
                backgroundColor: ["#6bf1ab", "#63d69f", "#438c6c", "#509c7f", "#1f794e", "#344444c", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#0D47A1"],
                borderColor: ["black"],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
}

/**
 * Funcion para filtrar las uf en base a un rango de fechas dado por el usuario
 * @param {date} desdeFecha => Fecha Inicio
 * @param {date} hastaFecha => Fecha Fin
 */
const filtrarUF = async (desdeFecha, hastaFecha) => {
    actionSpinner($spinner, 'show')

    const urlFetch = '/indicadores/filtro'

    const dataFetch = new URLSearchParams()
    dataFetch.append('_token', _token)
    dataFetch.append('fecha_desde', desdeFecha)
    dataFetch.append('fecha_hasta', hastaFecha)

    try {
        const res = await fetch(urlFetch, {
            method: 'POST',
            body: dataFetch
        })

        const json = await res.json();
        const data = json.data;

        if(!data){
            Swal.fire({
                icon: 'error',
                title: 'Sin datos',
                text: `No hay datos para el rango ${desdeFecha} - ${hastaFecha}`
            })
            $fechasUF.innerHTML = `No hay datos para mostrar`
            actionSpinner($spinner, 'hide')
            return 0
        }
        $fechasUF.innerHTML = `UF Entre: ${desdeFecha} - ${hastaFecha}`
        const indicadoresUF = json.detail;
        makeChart(indicadoresUF, $canvasChart, 'filtro');
        actionSpinner($spinner, 'hide')
    } catch (err) {
        console.error(err);
        actionSpinner($spinner, 'hide')
    }
}

/**
 * Funcion para listar los valores PROMEDIO POR MES de la UF
 */
const indexUF = async () => {
    actionSpinner($spinner, 'show')

    const urlFetch = '/indicadores/index'
    const dataFetch = new URLSearchParams()
    dataFetch.append('_token', _token)

    try {
        const res = await fetch(urlFetch, {
            method: 'POST',
            body: dataFetch
        })

        const json = await res.json();
        const success = json.data

        if(success){
            const indicadoresUF = json.detail;

            makeChart(indicadoresUF, $canvasChart, 'index')
        } else {
            $fechasUF.innerHTML = 'No hay datos para mostrar'
        }

        actionSpinner($spinner, 'hide')
    } catch (err) {
        console.error(err);
        actionSpinner($spinner, 'hide')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    clearForm();
    indexUF();
})

document.addEventListener('click', e => {
    if (e.target.matches('#btn_filtrar')) {
        e.preventDefault();
        const desdeFecha = document.getElementById('fecha_desde').value;
        const hastaFecha = document.getElementById('fecha_hasta').value;

        if (!desdeFecha || !hastaFecha) {
            Swal.fire({
                icon: 'error',
                title: 'Error Fecha',
                text: 'Debe ingresar un rango de fechas para filtrar'
            })

            return 0
        }

        const desdeFechaTIME = new Date(desdeFecha);
        const hastaFechaTIME = new Date(hastaFecha);

        if (desdeFechaTIME > hastaFechaTIME) {
            Swal.fire({
                icon: 'error',
                title: 'Error Fecha',
                text: 'La fecha de inicio no puede ser mayor a la fecha de fin'
            })
            return 0
        }
        clearChart()
        filtrarUF(desdeFecha, hastaFecha);
    }

    if (e.target.matches('#btn_limpiar')) {
        e.preventDefault();
        clearForm();
        clearChart()
        indexUF();
    }
})