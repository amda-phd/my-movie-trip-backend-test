const MyMovieTripDB = require("@DB");

const scenes = [
  {
    id: 1,
    film: "Puerta del Sol",
    creation_date: "10/03/2019",
    photo_url:
      "http://turismomadrid.es/images/Portada/2019/Puerta_Sol_MadridcHugo_Fernndez_Comunidad_Madrid.jpg",
    location: "40.42950743697256, -3.7022051991986675",
    description:
      "Vive una aventura recorriendo los rincones de la Puerta del Sol en Madrid - España.",
    country: "España",
    city: "Madrid",
  },
  {
    film: "Un viaje por Portugal",
    creation_date: "02/07/2019",
    photo_url:
      "https://viajes.nationalgeographic.com.es/medio/2021/05/12/lisboa_a4ac0287_1254x836.jpg",
    location: "38.71842550028229, -9.142412233751664",
    description:
      "Lisboa es una ciudad de grandes misterios, cada uno esconde una escena de cine única.",
    country: "Portugal",
    city: "Lisboa",
  },
  {
    film: "Una noche por París",
    creation_date: "09/10/2019",
    photo_url:
      "https://es.parisinfo.com/var/otcp/sites/images/node_43/node_51/node_233/vue-sur-les-toits-de-la-tour-saint-jacques-%7C-740x380-%7C-%C2%A9-elodie-gutbrod-cr%C3%A9atividie/21581411-1-fre-FR/Vue-sur-les-toits-de-la-tour-Saint-Jacques-%7C-740x380-%7C-%C2%A9-Elodie-Gutbrod-Cr%C3%A9atividie.jpg",
    location: "48.87134324816528, 2.3410472114284704",
    description:
      "Vivir una noche por París es un sueño para muchos, pero una noche recreando tus escenas favoritas puede ser mágica.",
    country: "Francia",
    city: "París",
  },
  {
    film: "Un día frío por Estocolmo",
    creation_date: "19/06/2020",
    photo_url:
      "https://lh3.googleusercontent.com/proxy/0RIvhNBWCFGJFSOZF50PfDY86herJ6_YMb9xcPmE9Dnby-PsrEAgFyyO5tBmgDLA0y_rpV9Q7WkZomZzNn_jDYLro203OFUjQKPkXgGJwHw",
    location: "59.3420014237816, 18.051740952234823",
    description:
      "Lo más importante para recorrer Estocolmo es tener un buen abrigo, cámara y nuestra app para empezar a vivir tu película.",
    country: "Suecia",
    city: "Estocolmo",
  },
  {
    film: "La antigua Antenas",
    creation_date: "03/11/2020",
    photo_url:
      "https://i1.wp.com/www.rulandomundo.com/wp-content/uploads/que-ver-en-atenas-partenon.jpg?fit=1024%2C678&ssl=1",
    location: "37.979602251814775, 23.728039066255356",
    description:
      "Un viaje por el pasado, utilizado por muchos películas para recordarnos cómo fueron los grandes imperios.",
    country: "Grecia",
    city: "Atenas",
  },
  {
    film: "En la capital colombiana",
    creation_date: "13/12/2020",
    photo_url:
      "https://specials-images.forbesimg.com/imageserve/813256520/960x0.jpg?fit=scale",
    location: "4.65275381740946, -74.10827021822311",
    description:
      "Un recorrido por la Candelaria te llevará a la epoca colonial, mientras puedes ir recreando escenas.",
    country: "Colombia",
    city: "Bogotá",
  },
];

const setupDB = async () => {
  await MyMovieTripDB.sync();
  await MyMovieTripDB.sync({ force: true });

  const Scenes = require("Models/scenes");

  for (let i = 0; i < 1; i++) {
    await Scenes.create(scenes[i]);
  }
};

module.exports = { setupDB, scenes };
