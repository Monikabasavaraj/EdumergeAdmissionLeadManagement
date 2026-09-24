// import axios from "axios";

// const API = axios.create({
//     baseURL: "http://127.0.0.1:8000/api/"
// });

// export default API; 


import axios from "axios";

const API = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        "http://127.0.0.1:8000/api/",
});

export default API;