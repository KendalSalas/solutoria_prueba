<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndicadorController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function(){
    return view('indicadores');
})->name('indicadores_index');
Route::post('/indicadores/filtro',[IndicadorController::class, 'lista_uf_between']);
Route::post('/indicadores/index', [IndicadorController::class, 'lista_uf_index']);

Route::get('/listado', function(){
    return view('listado_modificar');
})->name('listado');

Route::post('/listado/index', [IndicadorController::class, 'lista_uf_modificar']);
Route::post('/listado/insert', [IndicadorController::class, 'insert_indicador']);
Route::post('/listado/update', [IndicadorController::class, 'update_indicador']);
Route::post('/listado/delete', [IndicadorController::class, 'delete_indicador']);