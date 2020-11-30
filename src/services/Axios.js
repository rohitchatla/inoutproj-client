import Axios from "axios";

const baseURL = "http://localhost:5000/api";

Axios.defaults.baseURL = baseURL;

export default Axios;
export { baseURL }; //assetsURL
