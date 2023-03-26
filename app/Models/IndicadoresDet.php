<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndicadoresDet extends Model
{
    protected $fillable = [
        'nombre_indicador',
        'codigo_indicador',
        'unidad_medida',
        'valor_indicador',
        'fecha_indicador',
        'tiempo_indicador',
        'origen_indicador'
    ];
    use HasFactory;

    public $timestamps = false;
}
