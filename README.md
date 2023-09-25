Simulador interactivo

Escenario: Tengo un conocido que tiene una empresa de laminados y polarizados. Su necesidad es incorporar a la página de su empresa un cotizador para que el usuario pueda acceder y obtener una cotización online. El ejercicio contempla los siguientes parámetros:

1) Tamaño del vehiculo: Pequeño, Mediano, Grande, Grande+ y Camiones. Para estos dos últimos, el cotizador debe informar que el usuario se tiene que comunicar por mail a la empresa. El tamaño "Mediano" tendrá un incremento del 5% del precio de la lámina, y el tamaño "Grande" tendrá un incremento del 7%.
2) Cantidad de ventanas: puede elegir un número entre 1 y 10, como máximo.
3) Tipo de lámina: Polarizado o Anti-bandálico, las cuales tienen precios diferentes.

Las técnicas que se incorporaron al proyecto:

* Funciones y arrays
* La librería Sweet Alert para mostrar mensajes y Math para redondear valores de conversión de temperatura
* Uso del objeto DATE para el manejo de fechas
* Una Clase para instanciar los datos del vehículo agregando un método para calcular el precio
* Manejo del DOM
* LocalStorage para guardar las cotizaciones solicitadas y una función para borrar el LocalStorage
* Una función para mostrar el pronóstico del clima utilizando promesas
* A nivel estilos, se agrega un archivo CSS y se utilza Bootstrap
