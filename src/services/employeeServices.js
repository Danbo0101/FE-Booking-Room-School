import axios from "../utils/axiosCustomize";


const getAllEmployee = () => {
    return axios.get(`/api/user/employee`);
}

const postCreateEmployee = (data) => {
    return axios.post(`/api/user/employee`, { ...data });
}


const patchUpdateEmployee = (employeeId, data) => {
    return axios.patch(`/api/user/employee/${employeeId}`, { ...data });
}



export {
    getAllEmployee,
    patchUpdateEmployee,
    postCreateEmployee
}