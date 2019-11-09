import axios from "axios";

export default {
    saveUser: function(userData) {
        return axios.post("/api/signup", userData);
    },

    loginUser: function(userData) {
        return axios.post("/api/signin", userData);
    },

    checkLogin: function() {
        return axios.get("/api/user_data");
    },

    logoutUser: function() {
        return axios.get("/api/logout");
    }

};

