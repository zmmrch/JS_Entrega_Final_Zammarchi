//Defino los precios de las láminas
const precioPolarizado = 20000;
const precioAntiBandalico = 25000;
let resultado = 0;
let vclo = [];

//Defino un vclo con los tamaños de vehículos permitidos
const tamaniosVehiculos = [
  "Pequeño",
  "Mediano",
  "Grande",
  "Grande+",
  "Camiones",
];

//Defino un vclo con los tipos de láminas permitidos
const tiposLaminas = ["Polarizado", "Anti-bandálico"];

//Función para obtener fecha
function obtenerFecha() {
  let fecha = new Date();
  const opciones = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  };
  fecha = fecha.toLocaleDateString("es-AR", opciones);
  return fecha;
}

//Función para mostrar resultados y Storage
function refrescar() {
  ulLista.textContent = "";
  for (const iterator of vclo) {
    t = iterator.tamanio;
    v = iterator.ventanas;
    l = iterator.lamina;
    f = iterator.fecha;
    p = iterator.precio;
    p = new Intl.NumberFormat("es-AR").format(p);
    let liVehiculo = document.createElement("li");
    liVehiculo.className = "list-group-item";
    if (t == "Grande+" || t == "Camiones") {
      liVehiculo.innerHTML = `Fecha: ${f}</br> Tamaño del Vehículo: ${t}</br> Cantidad de Ventanas: ${v}</br> Tipo de Lámina: ${l} </br> Precio: Para este tamaño, por favor comunicarse a ventas@hyperion.com.ar`;
      ulLista.appendChild(liVehiculo);
    } else {
      liVehiculo.innerHTML = `Fecha: ${f}</br> Tamaño del Vehículo: ${t}</br> Cantidad de Ventanas: ${v}</br> Tipo de Lámina: ${l} </br> Precio: ARS ${p} + IVA`;
      ulLista.appendChild(liVehiculo);
    }
  }
  pCotizacion.className = "list-group-item";
  pCotizacion.innerHTML = `Fecha: ${f}</br> Tamaño del Vehículo: ${t}</br> Cantidad de Ventanas: ${v}</br> Tipo de Lámina: ${l}  </br> <strong>Precio: ARS ${p} + IVA</strong>`;
  //Resetear el formulario
  inputVehiculo.value = "";
  inputVentanas.value = "";
  inputLamina.value = "";
}

//Funcion para traer los datos del LocalStorage
function jsonAlmacenado() {
  const jsonAlmacenados = localStorage.getItem("vclo");
  if (jsonAlmacenados) {
    vclo = JSON.parse(jsonAlmacenados);
    return vclo;
  }
}

//Funcion para guardar en LocalStorage
function jsonGuardar(vehiculo) {
  vclo.push(vehiculo);
  localStorage.setItem("vclo", JSON.stringify(vclo));
  ulLista.innerHTML = "";
}

//Funcion para mostrar mensaje
function mensaje(tama) {
  if (tama == "Grande+" || tama == "Camiones") {
    Swal.fire({
      title: "",
      text: "Para este tamaño, por favor comunicarse a ventas@hyperion.com.ar",
      icon: "info",
      confirmButtonText: " Ok ",
    });
    return (pCotizacion.textContent =
      "Para este tamaño, por favor comunicarse a ventas@hyperion.com.ar");
  }
}

//Funcion para eliminar los datos del LocalStorage
function eliminar() {
  localStorage.clear();
  window.location.reload();
}

//Funcion para llamar a la API del pronóstico del clima
function callAPI() {
  const apiKey = "OKXC5CkeHt9WkLTOCiTLTLCj9z1htRZu";
  const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/7894?apikey=${apiKey}&language=es`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      showWeather(dataJSON);
    });
}

//Funcion para mostrar los datos del clima
function showWeather(data) {
  const filaPronostico = document.getElementById("filaPronostico");
  let arrDatos = data.DailyForecasts;

  for (let index = 0; index < arrDatos.length; index++) {
    const element = arrDatos[index];
    //Métodos para formatear las fechas
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let fechaPronostico = new Date(element.Date);

    //Crear los elementos y mostrar
    const colData = document.createElement("col");
    const rowDataIcono = document.createElement("row");
    const rowDataIconPhrase = document.createElement("row");
    const rowDataTempMin = document.createElement("row");
    const rowDataTempMax = document.createElement("row");

    colData.className = "col align-items-center justify-content-center";
    rowDataIcono.className = "row align-items-center justify-content-center";
    rowDataIconPhrase.className =
      "row align-items-center justify-content-center";
    rowDataTempMin.className = "row align-items-center justify-content-center";
    rowDataTempMax.className = "row align-items-center justify-content-center";

    colData.innerHTML = fechaPronostico.toLocaleDateString("es-AR", options);
    filaPronostico.appendChild(colData);

    //Convierte las temperaturas de la API de grados Farenheit a Celsius
    let tempMin = element.Temperature.Minimum.Value;
    tempMin = conversorTemperatura(tempMin);
    let tempMax = element.Temperature.Maximum.Value;
    tempMax = conversorTemperatura(tempMax);

    rowDataIcono.innerHTML = `<img src="./images/iconWeather/${element.Day.Icon}-s.png"/></br>`;
    rowDataIconPhrase.innerHTML = `${element.Day.IconPhrase}</br>`;
    rowDataTempMin.innerHTML = `Temp Min: ${tempMin} Cº </br>`;
    rowDataTempMax.innerHTML = `Temp Max: ${tempMax} Cº </br>`;

    colData.appendChild(rowDataIcono);
    colData.appendChild(rowDataIconPhrase);
    colData.appendChild(rowDataTempMin);
    colData.appendChild(rowDataTempMax);
  }
}

//Función para convertir grados Farenheit a Celsius
function conversorTemperatura(temp) {
  temp = Math.round((parseInt(temp) - 32) / 1.8);
  return temp;
}

//Función para deshabilitar el uso del botón "Pronóstico"
function deshabilitarBtnPronostico() {
  const button = document.querySelector("#btnPronostico");
  button.addEventListener("click", () => {
    button.classList.add("disabled");
  });
}

//Defiino una clase para representar un vehículo
class Vehiculo {
  constructor(tamanio, ventanas, lamina, fecha, precio) {
    this.tamanio = tamanio;
    this.ventanas = ventanas;
    this.lamina = lamina;
    this.fecha = fecha;
    this.precio = precio;
  }

  //Calcula el precio final y devuelve el resultado/mensaje
  calcularPrecio() {
    let precioLamina = this.lamina;
    let tl = tiposLaminas.indexOf(precioLamina);
    if (tiposLaminas[tl] == "Polarizado") {
      precioLamina = precioPolarizado;
    } else {
      precioLamina = precioAntiBandalico;
    }
    let tam = tamaniosVehiculos.indexOf(this.tamanio);
    if (tamaniosVehiculos[tam] == "Mediano") {
      precioLamina += (precioLamina * 5) / 100;
    } else if (tamaniosVehiculos[tam] == "Grande") {
      precioLamina += (precioLamina * 7) / 100;
    }
    //Calculamos el precio final
    resultado = this.ventanas * precioLamina;
    //Devolvemos el precio final
    return resultado;
  }
}

//Llamo a la función para mostrar la información almacenada en el LocalStorage
jsonAlmacenado();

//Pido al usuario que ingrese los datos
const formCotizador = document.querySelector("#formCotizador");
const formPronostico = document.querySelector("#formPronostico");
const inputVehiculo = document.querySelector("#inputVehiculo");
const inputVentanas = document.querySelector("#inputVentanas");
const inputLamina = document.querySelector("#inputLamina");
const pCotizacion = document.querySelector("#pCotizacion");
const ulLista = document.querySelector("#ulLista");
const btnElim = document.getElementById("eliminar");

formCotizador.addEventListener("submit", (e) => {
  e.preventDefault();
  //Instancio el objeto vehiculo
  const vehiculo = new Vehiculo(
    inputVehiculo.value,
    inputVentanas.value,
    inputLamina.value,
    obtenerFecha()
  );

  if (vehiculo.tamanio == "Grande+" || vehiculo.tamanio == "Camiones") {
    vehiculo.precio = 0;
  } else {
    vehiculo.precio = vehiculo.calcularPrecio();
  }
  //Llamo a la función para guardar la información
  jsonGuardar(vehiculo);

  //Llamo a la función para mostrar resultados
  refrescar();

  //Cambio el mensaje si el tamaño es Grande+ o Camiones
  mensaje(vehiculo.tamanio);

  //Evento botón eliminar
  btnElim.addEventListener("click", eliminar);
});

formPronostico.addEventListener("submit", (e) => {
  e.preventDefault();
  //Llamo a la función para que muestre el pronóstico del tiempo
  callAPI();
});

//Llamo a la función para deshabilitar el uso del botón "Pronóstico" (para que lo presionen solo una vez)
deshabilitarBtnPronostico();
