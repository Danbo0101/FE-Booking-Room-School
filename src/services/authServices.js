import axios from "../utils/axiosCustomize";

const postLogin = (data) => {
    return axios.post(`api/auth/signin`, { ...data });
};

const postRegister = (data) => {
    return axios.post(`api/auth/signup`, { ...data });
};

const patchUpdatePassword = (data) => {
    return axios.patch(`api/auth/update-password`, { ...data });
};

const forgotPassword = (data) => {
    return axios.get(`api/auth/forgot-password`, { params: data });
};

export { postLogin, postRegister, patchUpdatePassword, forgotPassword };
