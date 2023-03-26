<?php

namespace App\Http\Controllers;

use App\Models\IndicadoresDet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class IndicadorController extends Controller
{

    public function lista_uf_index()
    {
        $indicadores = IndicadoresDet::selectRaw('AVG(valor_indicador) AS valor, CONCAT(MONTHNAME(fecha_indicador), " ", YEAR(fecha_indicador)) AS fecha')
            ->where('codigo_indicador', '=', 'UF')
            ->groupBy('fecha')
            ->get();

        $rowIndicadores = count($indicadores);

        //Arreglo que contendrá 2 elementos, data que será true en caso de que hayan registros (caso contrario será un false), y detail, que serán los registros encontrados (si no hay registros, devolverá un array vacio)
        $jsonResponse = [];

        if ($rowIndicadores > 0) {
            $jsonResponse = json_encode(["data" => true, "detail" => $indicadores]);
            return response($jsonResponse, 200)->header('Content-Type', 'text/plain');
        } else {
            $jsonResponse = json_encode(["data" => false, "detail" => []]);
            return response($jsonResponse, 200)->header('Content-Type', 'text/plain');
        }
    }

    public function lista_uf_between(Request $req)
    {
        $fecha_desde = $req->get('fecha_desde');
        $fecha_hasta = $req->get('fecha_hasta');

        $indicadores = IndicadoresDet::selectRaw('valor_indicador AS valor, fecha_indicador AS fecha')
            ->where('codigo_indicador', '=', 'UF')
            ->whereBetween('fecha_indicador', ["$fecha_desde", "$fecha_hasta"])
            ->orderBy('fecha', 'asc')
            ->get();

        $rowIndicadores = count($indicadores);

        //Arreglo que contendrá 2 elementos, data que será true en caso de que hayan registros (caso contrario será un false), y detail, que serán los registros encontrados (si no hay registros, devolverá un array vacio)
        $jsonResponse = [];

        if ($rowIndicadores > 0) {
            $jsonResponse = json_encode(["data" => true, "detail" => $indicadores]);
        } else {
            $jsonResponse = json_encode(["data" => false, "detail" => []]);
        }
        return response($jsonResponse, 200)->header('Content-Type', 'text/plain');
    }

    public function lista_uf_modificar()
    {
        $indicadores = IndicadoresDet::where('codigo_indicador', '=', 'UF')->orderBy('id', 'DESC')->get();

        $rowIndicadores = count($indicadores);
        
        //Arreglo que contendrá 2 elementos, data que será true en caso de que hayan registros (caso contrario será un false), y detail, que serán los registros encontrados (si no hay registros, devolverá un array vacio)
        $jsonResponse = [];

        if ($rowIndicadores > 0) {
            $jsonResponse = json_encode(["data" => true, "detail" => $indicadores]);
            return response($jsonResponse, 200)->header('Content-Type', 'text/plain');
        } else {
            $jsonResponse = json_encode(["data" => false, "detail" => []]);
            return response($jsonResponse, 200)->header('Content-Type', 'text/plain');
        }
    }

    public function insert_indicador(Request $req)
    {
        $nuevo_nombre = $req->get("nombre_crear");
        $nuevo_codigo = $req->get("codigo_crear");
        $nuevo_valor  = $req->get("valor_crear");
        $nuevo_origen = $req->get("origen_crear");
        $nueva_fecha  = $req->get("fecha_crear");
        $unidad_medida = $req->get("unidad_crear");

        try {
            IndicadoresDet::insert(
                [
                    "nombre_indicador" => "$nuevo_nombre",
                    "codigo_indicador" => "$nuevo_codigo",
                    "unidad_medida" => "$unidad_medida",
                    "valor_indicador" => $nuevo_valor,
                    "fecha_indicador" => "$nueva_fecha",
                    "tiempo_indicador" => "",
                    "origen_indicador" => $nuevo_origen
                ]
            );

            $jsonResponse = json_encode(["data" => true]);
            return response($jsonResponse, 200)->header('Content-Type', 'text/plain');
        } catch (\Illuminate\Database\QueryException $e) {
            $errMsg = $e->getMessage();
            $errCode = $e->getCode();

            if($errCode == 23000){
                $jsonResponse = json_encode(["data" => false, "detail" => "Ya existe un valor de UF para la fecha $nueva_fecha"]);
                return response($jsonResponse, 200)->header('Content-Type', 'text/plain');
            } else {
                $jsonResponse = json_encode(["data" => false, "detail" => "Ocurrió un error al intentar crear el registro"]);
                return response($jsonResponse, 200)->header('Content-Type', 'text/plain');
            }
        }

        $jsonResponse = json_encode(["data" => true, "det" => "Nombre: $nuevo_nombre / Codigo: $nuevo_codigo / Valor: $nuevo_valor / Fecha: $nueva_fecha"]);
        return response($jsonResponse, 200)->header('Content-Type', 'text/plain');
    }

    public function update_indicador(Request $req)
    {
        $id = $req->get("id_modificar");
        $nuevo_nombre = $req->get("nombre_modificar");
        $nuevo_codigo = $req->get("codigo_modificar");
        $nuevo_valor  = $req->get("valor_modificar");
        $nuevo_origen = $req->get("origen_modificar");

        try {
            IndicadoresDet::where('id', $id)->update(['nombre_indicador' => "$nuevo_nombre", "codigo_indicador" => "$nuevo_codigo", "valor_indicador" => $nuevo_valor, "origen_indicador" => $nuevo_origen]);

            $jsonResponse = json_encode(["data" => true]);
            return response($jsonResponse, 200)->header('Content-Type', 'text/plain');
        } catch (\Illuminate\Database\QueryException $e) {
            $jsonResponse = json_encode(["data" => false, "detail" => $e->getMessage()]);
            return response($jsonResponse, 200)->header('Content-Type', 'text/plain');
        }
    }

    public function delete_indicador(Request $req)
    {
        $id_eliminar = $req->get('id_eliminar');

        try {
            IndicadoresDet::where('id', $id_eliminar)->delete();
            $jsonResponse = json_encode(["data" => true]);
            return response($jsonResponse, 200)->header('Content-Type', 'text/plain');
        } catch (\Illuminate\Database\QueryException $e) {
            $jsonResponse = json_encode(["data" => false, "detail" => $e->getMessage()]);
            return response($jsonResponse, 200)->header('Content-Type', 'text/plain');
        }
    }
}