import Axios from "axios";

//const baseURL = "http://localhost:5000/api";
const baseURL = "https://workify-services.herokuapp.com//api";

Axios.defaults.baseURL = baseURL;

export default Axios;
export { baseURL }; //assetsURL
