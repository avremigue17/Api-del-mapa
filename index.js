//importar express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const lugares=[
    {
        name:"UABCS",
        lat:"24.102744",
        alt:"-110.315969",
        descripcion:"La Universidad Autónoma de Baja California Sur (UABCS) es una Institución pública que ofrece programas educativos de calidad.",
        imagen:"https://elinformantebcs.mx/wp-content/uploads/2016/08/elinformantebcs.mx_uabcs-1.jpg",
        direccion:"Sur KM 5.5, Universidad Autónoma de Baja California Sur, 23080 La Paz, B.C.S."
    },
    {
        name:"TEC",
        lat:"24.119680",
        alt:"-110.309086",
        descripcion:"El Instituto Tecnológico de La Paz es una institución pública de educación superior localizada en La Paz, Baja California Sur. Es considerada como la primera institución educativa de nivel licenciatura en el Estado de Baja California Sur.",
        imagen:"https://www.diarioelindependiente.mx/noticias/2018/10/original/153969314933905.jpg",
        direccion:"Boulevard Forjadores de Baja California Sur 4720, 8 de Octubre 2da Secc, 23080 La Paz, B.C.S."
    },
    {
        name:"HOSPITAL GRAL SALVATIERRA",
        lat:"24.112916",
        alt:"-110.318885",
        descripcion:"El Benemérito Hospital General con Especialidades Juan María de Salvatierra es una institución que funciona como Hospital de concentración Estatal y ofrece atención Médica de Segundo Nivel.",
        imagen:"https://www.diarioelindependiente.mx/noticias/2018/08/original/153371159897911.jpg",
        direccion:"Antiguo Aeródromo Militar, La Paz, B.C.S."
    },
    {
        name:"PARQUE NUEVO SOL",
        lat:"24.120203",
        alt:"-110.316766",
        descripcion:"Espacio familiar para realizar actividades fisicas y recreativas.",
        imagen:"https://diario23.com.mx/wp-content/uploads/2016/09/parque-nuevo-sol.jpg",
        direccion:"Pista Aérea, Barrio del Exconvento, 23050 Taxco, Gro."
    },
    {
        name:"MALECON",
        lat:"24.155606",
        alt:"-110.322703",
        descripcion:" El malecón de La Paz sin duda alguna es uno de los principales atractivos de la ciudad y, durante este periodo vacacional, es una opción para las personas que se quedan en la localidad.",
        imagen:"https://www.diarioelindependiente.mx/noticias/2019/12/original/15752758251ec61.jpg",
        direccion:"Paseo Malecón, Zona Central, 23000 La Paz, B.C.S."
    },
    {
        name:"PLAZA FORJADORES",
        lat:"24.126383",
        alt:"-110.312748",
        descripcion:"centro Comercial con diversas tiendas",
        imagen:"https://1.bp.blogspot.com/-UudqrwHK7NI/Tdk-jYbI7JI/AAAAAAAAEOQ/GHaHkrA4EsE/s1600/Imagen%2B2018.jpg",
        direccion:"Antiguo Aeródromo Militar, 23050 La Paz, B.C.S."
    },
    {
        name:"PLAYA EL COROMUEL",
        lat:"24.196520",
        alt:"-110.300157",
        descripcion:"Playa emblemática del Ciudad de La Paz, que da nombre a brisa refrescante que diariamente al caer las tardes llega del Sureste al Puerto de La Paz.",
        imagen:"https://www.diarioelindependiente.mx/noticias/2017/07/original/15004493212a69b.jpg",
        direccion:"Carr Escénica 38, Baja California Sur"
    },
    {
        name:"WALMART COLA DE LA BALLENA",
        lat:"24.118650",
        alt:"-110.343115",
        descripcion:"Centro Comercial",
        imagen:"https://www.elpulsolaboral.com.mx/img/articles/cunde-huelga-en-el-pais-ahora-la-proyecta-en-walmart-en-la-paz-wTe94/CzEo7_pqz.jpg",
        direccion:"Blvd. Gral. Agustín Olachea, El Zacatal, 23088 La Paz, B.C.S."
    },
    {
        name:"COLA DE LA BALLENA",
        lat:"24.114746",
        alt:"-110.345670",
        descripcion:"Un representativo monumento de la ciudad de La Paz, Baja California Sur, es La paloma de La Paz, popularmente llamado “La Cola de la Ballena”.",
        imagen:"https://colectivopericu.files.wordpress.com/2015/08/1-a-puerta-de-la-paz.jpg",
        direccion:"La Paz, B.C.S."
    },
    {
        name:"SORIANA HIPER FORJADORES",
        lat:"24.125018",
        alt:"-110.312783",
        descripcion:"Centro Comercial",
        imagen:"https://scontent.fhmo2-1.fna.fbcdn.net/v/t1.0-9/59762116_469428587196845_1016935654535200768_n.jpg?_nc_cat=103&_nc_sid=6e5ad9&_nc_ohc=sCQx6zE4LcQAX-WbzJl&_nc_ht=scontent.fhmo2-1.fna&oh=c127e41b88cab65dd0038c462f844164&oe=5E99AA54",
        direccion:"Blvd. Forjadores S/N, Fuerza Aérea, 23050 La Paz, B.C.S."
    },
    {
        name:"SORIANA HIPER COLA DE LA BALLENA",
        lat:"24.117700",
        alt:"-110.336414",
        descripcion:"Centro Comercial",
        imagen:"https://mapio.net/images-p/77481343.jpg",
        direccion:"Libramiento Sur L-521 521, Col. El Zacatal, 23090 La Paz, B.C.S."
    }
]

app.use(bodyParser.urlencoded({extended: false}));//el tipo de codificacion que utilizara la salida
app.use(bodyParser.json());//el formato de la salida

//levantar el servidor
app.listen(3000,() =>{
    //set up 
    console.log("el servidor esta corriendo en el puerto http://localhost:3000/");
} );

app.get("/", (req, res) =>{
    res.send("incio");
})

/**
 * busqueda
 * hace la busqueda de los lugares
 * @param {JSON}query
 * @param {String}query.search
 */
app.get("/Busqueda", (req, res) =>{
    const response={
      data: [],
      message: []  
    }
    let statusCode = null;
    const {search}= req.query;
    if(search && search.trim()){
        //filtrar en el JSON
        response.data=lugares.filter(lugar =>{
            //si retorna true
            return lugar.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
        });
        statusCode=200;
    }else{
        //ENVIAR TODO LOS REGISTROS(JSON)
        response.data=lugares;
        statusCode=200;
    }
    res.status(statusCode).send(response);
})