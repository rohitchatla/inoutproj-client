import Axios from "axios";

const baseURL = "http://localhost:5000/api";
const assestsURL = "http://localhost:5000/assets/";

// const baseURL = "https://workify-services.herokuapp.com/api";
// const assestsURL = "https://workify-services.herokuapp.com/assets/";

Axios.defaults.baseURL = baseURL;

export default Axios;
export { baseURL, assestsURL };
