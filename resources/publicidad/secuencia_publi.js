var SecuenciaEjecutandose = false
var SecuenciaID = null
var imagen = 0
var duracion = 2000

if (CompruebaVersion()) {	
	imagenes = new CreaArray(5)
	//carga las imagenes: especificar aqui las URLs de las imagenes o ruta fisica y nombre
	imagenes[1].src = "resources/imagenes/publi/01.png"
	imagenes[2].src = "resources/imagenes/publi/coca.jpg"
	imagenes[3].src = "resources/imagenes/publi/texas.jpg"
	imagenes[4].src = "resources/imagenes/publi/vertical.jpg"
	imagenes[5].src = "resources/imagenes/publi/02.jpg"
}

function CompruebaVersion() {
	if (navigator.appVersion.charAt(0) >= 3  && document.images) return true
	else return false
}

function CreaArray(n) {
	this.length = n
	for (var i = 1; i<=n; i++) {
		this[i] = new Image()
	}
	return this
}

function DetenerSecuencia (){
   	if(SecuenciaEjecutandose)
   		clearTimeout(SecuenciaID)
   	SecuenciaEjecutandose = false
        imagen = 0
}

function MostrarSecuencia () {
	if (CompruebaVersion()) {
            document.images["secuencia"].src = imagenes[imagen].src
            imagen++
            if ( imagen == 5 )
                imagen = 1
	}
  	SecuenciaID = setTimeout("MostrarSecuencia()", duracion)
   	SecuenciaEjecutandose = true
}

function IniciarSecuencia () {
 	DetenerSecuencia()
    imagen = 1
 	MostrarSecuencia()
}

window.onload = IniciarSecuencia;
if (document.captureEvents) {			//N5 requiere invocar la funcion captureEvents
	document.captureEvents(Event.LOAD)
}
