## Prueba Solutoria

Prueba desarrollador para solutoria, se cargó de la API /api/indicadores la tabla indicadores_dets, a la cual consulto por los valores de la UF.

En /, lo primero que mostrará será un promedio del valor de la UF agrupados por mes, en esa misma sección también podré filtrarlo por fechas.

En /listado podré obtener todos los indicadores en una tabla ordenados de forma descendente, en la cual podré modificar o eliminar. También podré crear nuevos registros en ese mismo apartado.

1. Configurar .env para poder conectarse a la base de datos correspondiente
2. php artisan migrate para poder crear la tabla, para posteriormente cargarla con los datos
3. php artisan serve para poder levantar el servidor