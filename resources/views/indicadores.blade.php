@extends('layouts.layout')

@section('titulo')
  Indicadores UF
@endsection

@section('contenido')
  <br>
  <div id="title" style="text-align:center">
    <h2>Estado UF</h2>
  </div>

  <form class="row g-3" style="margin:30px auto; justify-content:center">
    @csrf
    <div class="col-auto">
      <label for="fecha_desde">Desde:</label>
      <input type="date" name="fecha_desde" id="fecha_desde">
      @error('fecha_desde')
        <p class="">{{$message}}</p>
      @enderror
    </div>
    <div class="col-auto">
      <label for="fecha_hasta">Hasta:</label>
      <input type="date" name="fecha_hasta" id="fecha_hasta">
      @error('fecha_hasta')
        <p class="">{{$message}}</p>
      @enderror
    </div>
    <div class="col-auto">
      <button id="btn_filtrar" class="btn btn-primary mb-3">Filtrar</button>
      <button id="btn_limpiar" class="btn btn-secondary mb-3">Limpiar</button>
    </div>
  </form>

  <h3 style="text-align:center" id="fechas_uf"></h3>
  <canvas id="canvas_chart">

  </canvas>

  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="/js/index.js"></script>
@endsection


