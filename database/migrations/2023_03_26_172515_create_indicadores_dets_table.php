<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('indicadores_dets', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_indicador', 50);
            $table->string('codigo_indicador', 30);
            $table->string('unidad_medida', 30);
            $table->double('valor_indicador', 9, 2);
            $table->date('fecha_indicador');
            $table->string('tiempo_indicador', 45)->nullable();
            $table->string('origen_indicador', 30);
            $table->unique(["codigo_indicador", "fecha_indicador"], 'codigo_fecha_unique');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('indicadores_dets');
    }
};
