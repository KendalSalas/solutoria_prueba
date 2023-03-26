@extends('layouts.layout')

@section('titulo')
  Listado UF
@endsection

@section('contenido')
  <br>
  <div id="title" style="text-align:center">
    <h2>Indicadores</h2>
  </div>
  @csrf
  <br>
  <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#crear-data">Crear Registro</button>
  <br>
  <br>
  <section id="table"></section>

    <!-- Modal Crear-->
    <div class="modal fade" id="crear-data" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Crear Registro</h1>
            <button type="button" class="btn-close" id="btn_cerrar_insert_upper" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Nombre</span>
              <input type="text" class="form-control" name="nombre_crear" id="nombre_crear" placeholder="Unidad de Fomento" aria-label="Unidad de Fomento" aria-describedby="basic-addon1">
            </div>
  
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon2">Codigo</span>
              <input type="text" class="form-control" name="codigo_crear" id="codigo_crear" placeholder="UF" aria-label="UF" aria-describedby="basic-addon2">
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon2">Unidad Medida</span>
              <input type="text" class="form-control" name="unidad_crear" id="unidad_crear" placeholder="Pesos" aria-label="UF" aria-describedby="basic-addon2">
            </div>
  
            <div class="input-group mb-3">
              <span class="input-group-text">$</span>
              <input type="number" class="form-control" name="valor_crear" id="valor_crear" aria-label="Amount (to the nearest dollar)">
            </div>
            
            <div class="input-group mb-3">
              <span class="input-group-text">Fecha</span>
              <input type="date" class="form-control" name="fecha_crear" id="fecha_crear">
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Origen</span>
              <input type="text" class="form-control" name="origen_crear" id="origen_crear" placeholder="mindicador.cl" aria-label="mindicador.cl" aria-describedby="basic-addon1">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="btn_cerrar_insert" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="btn_crear">Crear</button>
          </div>
        </div>
      </div>
    </div>

  <!-- Modal Update-->
  <div class="modal fade" id="modificar-data" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modificar</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <input type="hidden" id="id_modificar">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Nombre</span>
            <input type="text" class="form-control" name="nombre_modificar" id="nombre_modificar" placeholder="Unidad de Fomento" aria-label="Unidad de Fomento" aria-describedby="basic-addon1">
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon2">Codigo</span>
            <input type="text" class="form-control" name="codigo_modificar" id="codigo_modificar" placeholder="UF" aria-label="UF" aria-describedby="basic-addon2">
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">$</span>
            <input type="number" class="form-control" name="valor_modificar" id="valor_modificar" aria-label="Amount (to the nearest dollar)">
          </div>
          
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Origen</span>
            <input type="text" class="form-control" name="origen_modificar" id="origen_modificar" placeholder="mindicador.cl" aria-label="mindicador.cl" aria-describedby="basic-addon1">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="btn_cerrar" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" id="btn_actualizar">Actualizar</button>
        </div>
      </div>
    </div>
  </div>


  <script src="/js/listado_indicadores.js"></script>
@endsection


