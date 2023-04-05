import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    language: "es",
    access_token:
      "pk.eyJ1IjoibmVvbmlreiIsImEiOiJja3E4Y3N4cXgwMGYxMndveTk2Z3hicXhxIn0.1Dx9nF_E_Ovwcqgkupio2g",
  },
});

export default searchApi;
