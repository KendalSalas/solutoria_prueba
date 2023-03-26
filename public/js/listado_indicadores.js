const _token = document.getElementsByName('_token')[0].value
const $spinner = document.getElementById('cover-spin')
const $sectionTable = document.getElementById('table')

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
 * Funcion para limpiar los campos del modal seleccionado
 * @param {String} modalObj Modal a limpiar (modificar/crear/todos) 
 */
const clearModal = (modalObj) => {

    if (modalObj == 'modificar') {
        document.getElementById('id_modificar').value = ''
        document.getElementById('nombre_modificar').value = ''
        document.getElementById('codigo_modificar').value = ''
        document.getElementById('valor_modificar').value = ''
        document.getElementById('origen_modificar').value = ''
    } else if (modalObj == 'crear') {
        document.getElementById('nombre_crear').value = ''
        document.getElementById('codigo_crear').value = ''
        document.getElementById('valor_crear').value = ''
        document.getElementById('origen_crear').value = ''
        document.getElementById('fecha_crear').value = ''
        document.getElementById('unidad_crear').value = ''
    } else {
        document.getElementById('id_modificar').value = ''
        document.getElementById('nombre_modificar').value = ''
        document.getElementById('codigo_modificar').value = ''
        document.getElementById('valor_modificar').value = ''
        document.getElementById('origen_modificar').value = ''

        document.getElementById('nombre_crear').value = ''
        document.getElementById('codigo_crear').value = ''
        document.getElementById('valor_crear').value = ''
        document.getElementById('origen_crear').value = ''
        document.getElementById('fecha_crear').value = ''
        document.getElementById('unidad_crear').value = ''
    }

}

/**
 * Funcion para validar un modal antes de enviarlo
 * @param {String} modalObj Modal a validar 
 */
const validarModal = modalObj => {
    if (modalObj == 'crear') {
        const nombre = document.getElementById('nombre_crear').value
        const codigo = document.getElementById('codigo_crear').value
        const valor = document.getElementById('valor_crear').value
        const origen = document.getElementById('origen_crear').value
        const fecha = new Date(document.getElementById('fecha_crear').value).getTime()
        const unidad = document.getElementById('unidad_crear').value
        const fechaActual = new Date().getTime()

        if (nombre.trim() == '' || codigo.trim() == '' || valor.trim() == '' || origen.trim() == '' || unidad.trim() == '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Debe llenar todos los campos para poder crear un registro`
            })

            return false
        } else if (valor <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `El valor debe ser mayor a 0`
            })

            return false
        } else if (fecha > fechaActual) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `La fecha a crear no puede ser superior a la fecha de hoy`
            })

            return false
        }

        return true

    } else if (modalObj == 'modificar') {
        const nombre = document.getElementById('nombre_modificar').value
        const codigo = document.getElementById('codigo_modificar').value
        const valor = document.getElementById('valor_modificar').value
        const origen = document.getElementById('origen_modificar').value

        if (nombre.trim() == '' || codigo.trim() == '' || valor.trim() == '' || origen.trim() == '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Debe llenar todos los campos para poder crear un registro`
            })

            return false
        } else if(valor <= 0){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `El campo valor debe ser mayor a 0`
            })
            
            return false
        }

        return true
    }
}

/**
 * Funcion asincrona para crear un nuevo registro
 * @param {String} nombre
 * @param {String} codigo 
 * @param {Int|Double} valor 
 * @param {String} origen 
 * @param {Date} fecha 
 */
const insertarRegistro = async (nombre, codigo, valor, origen, fecha, unidad) => {
    actionSpinner($spinner, 'show')
    clearModal('crear')
    const urlFetch = '/listado/insert'

    const dataFetch = new URLSearchParams()
    dataFetch.append('_token', _token)
    dataFetch.append('nombre_crear', nombre)
    dataFetch.append('codigo_crear', codigo)
    dataFetch.append('valor_crear', valor)
    dataFetch.append('origen_crear', origen)
    dataFetch.append('fecha_crear', fecha)
    dataFetch.append('unidad_crear', unidad)

    try {
        const res = await fetch(urlFetch, {
            method: 'POST',
            body: dataFetch
        })

        const json = await res.json()
        const success = json.data

        if (success) {
            document.getElementById('btn_cerrar_insert').click()

            Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: `Registro Creado Exitosamente`
            })

            listadoIndicadores()
        } else {
            const errMsg = json.detail
            document.getElementById('btn_cerrar_insert').click()

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `${errMsg}`
            })
        }

        actionSpinner($spinner, 'hide')

    } catch (err) {
        console.error(err)
        actionSpinner($spinner, 'hide')
    }
}

/**
 * Funcion asincrona para modificar un registro en base a su ID
 * @param {Int} id 
 * @param {String} nombre 
 * @param {String} codigo 
 * @param {Int | Double} valor 
 * @param {String} origen 
 */
const modificarRegistro = async (id, nombre, codigo, valor, origen) => {
    actionSpinner($spinner, 'show')
    clearModal('modificar')
    const urlFetch = '/listado/update'

    const dataFetch = new URLSearchParams()
    dataFetch.append('_token', _token)
    dataFetch.append('id_modificar', id)
    dataFetch.append('nombre_modificar', nombre)
    dataFetch.append('codigo_modificar', codigo)
    dataFetch.append('valor_modificar', valor)
    dataFetch.append('origen_modificar', origen)

    try {
        const res = await fetch(urlFetch, {
            method: 'POST',
            body: dataFetch
        })

        const json = await res.json();
        const success = json.data

        if (success) {
            document.getElementById('btn_cerrar').click()

            Swal.fire({
                icon: 'success',
                title: 'Exito Actualizar',
                text: `Registro ${id} actualizado con éxito`
            })

            listadoIndicadores()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error Actualizar',
                text: `Ocurrió un error al intentar actualizar el registro ${id}`
            })
        }
        actionSpinner($spinner, 'hide')
    } catch (err) {
        console.error(err);
        actionSpinner($spinner, 'hide')
    }
}

/**
 * Función asincrona para eliminar un registro en base a su ID
 * @param {Int} id 
 */
const eliminarRegistro = async (id) => {
    const urlFetch = '/listado/delete'

    const dataFetch = new URLSearchParams()
    dataFetch.append('_token', _token)
    dataFetch.append('id_eliminar', id)

    try {
        const res = await fetch(urlFetch, {
            method: 'POST',
            body: dataFetch
        })

        const json = await res.json();
        const success = json.data

        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Exito Eliminar',
                text: `Registro ${id} eliminado con éxito`
            })

            listadoIndicadores()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error Eliminar',
                text: `Ocurrió un error al intentar eliminar el registro ${id}`
            })
        }

        actionSpinner($spinner, 'hide')
    } catch (err) {
        console.error(err)
        actionSpinner($spinner, 'hide')
    }
}

/**
 * Funcion asincrona para obtener todos los indicadores UF para listrarlos en una tabla y poder modificarlos/eliminarlos
 */
const listadoIndicadores = async () => {
    actionSpinner($spinner, 'show')

    const urlFetch = '/listado/index'
    const dataFetch = new URLSearchParams()
    dataFetch.append('_token', _token)

    try {
        const res = await fetch(urlFetch, {
            method: 'POST',
            body: dataFetch
        })

        const json = await res.json();
        const success = json.data

        if (success) {
            const indicadoresUF = json.detail;
            makeTable(indicadoresUF)
        } else {
            $sectionTable.innerHTML = '<h3>No hay datos para mostrar</h3>'
        }
        actionSpinner($spinner, 'hide')
    } catch (err) {
        console.error(err);
        actionSpinner($spinner, 'hide')
    }
}

/**
 * Funcion para armar la tabla con el listado de indicadores a partir de un array
 * @param {Array} data 
 */
const makeTable = (data) => {
    const tableHead = `<thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Codigo</th>
        <th scope="col">Unidad de Medida</th>
        <th scope="col">Valor</th>
        <th scope="col">Fecha</th>
        <th scope="col">Origen</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>`

    let tableData = ''

    data.map((d) => {
        const id = d.id,
            nombre = d.nombre_indicador,
            codigo = d.codigo_indicador,
            unidad = d.unidad_medida,
            valor = d.valor_indicador,
            fecha = d.fecha_indicador,
            origen = d.origen_indicador

        tableData += `<tr>
            <td scope='row'>${id}</td>
            <td>${nombre}</td>
            <td>${codigo}</td>
            <td>${unidad}</td>
            <td>${valor}</td>
            <td>${fecha}</td>
            <td>${origen}</td>
            <td>
                <button type="button" class="btn btn-warning btn-modificar" data-bs-toggle="modal" data-bs-target="#modificar-data" id_modificar="${id}" nombre="${nombre}" codigo="${codigo}" valor="${valor}" origen="${origen}">Modificar</button>
                <button type="button" class="btn btn-danger btn-eliminar" id_eliminar="${id}">Eliminar</button>
            </td>
        </tr>`
    })

    const table = `
    <table class='table'>
        ${tableHead}
        <tbody>
            ${tableData}
        </tbody>
    </table>`

    $sectionTable.innerHTML = table
}

document.addEventListener('DOMContentLoaded', () => {
    clearModal('all')
    listadoIndicadores()
})

document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-modificar')) {
        const id = e.target.getAttribute('id_modificar')
        const nombre = e.target.getAttribute('nombre')
        const codigo = e.target.getAttribute('codigo')
        const valor = e.target.getAttribute('valor')
        const origen = e.target.getAttribute('origen')

        document.getElementById('id_modificar').value = id
        document.getElementById('nombre_modificar').value = nombre
        document.getElementById('codigo_modificar').value = codigo
        document.getElementById('valor_modificar').value = valor
        document.getElementById('origen_modificar').value = origen
    }

    if (e.target.matches('#btn_actualizar')) {
        const id = document.getElementById('id_modificar').value
        const nombre = document.getElementById('nombre_modificar').value
        const codigo = document.getElementById('codigo_modificar').value
        const valor = document.getElementById('valor_modificar').value
        const origen = document.getElementById('origen_modificar').value

        modalValido = validarModal('modificar');

        if(modalValido){
            modificarRegistro(id, nombre, codigo, valor, origen)
        }
    }

    if (e.target.matches('.btn-eliminar')) {
        const id = e.target.getAttribute('id_eliminar')

        Swal.fire({
            title: `¿Eliminar Registro ${id}?`,
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                eliminarRegistro(id)
            }
        })
    }

    if (e.target.matches('#btn_crear')) {
        const nombre = document.getElementById('nombre_crear').value
        const codigo = document.getElementById('codigo_crear').value
        const valor = document.getElementById('valor_crear').value
        const origen = document.getElementById('origen_crear').value
        const fecha = document.getElementById('fecha_crear').value
        const unidad = document.getElementById('unidad_crear').value

        modalValido = validarModal('crear');

        if (modalValido) {
            insertarRegistro(nombre, codigo, valor, origen, fecha, unidad)
        }
    }

    if (e.target.matches('#btn_cerrar_insert') || e.target.matches('#btn_cerrar_insert_upper')) {
        clearModal('crear')
    }
})