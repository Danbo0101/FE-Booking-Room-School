import axios from "../utils/axiosCustomize";

const getAllStudent = () => {
    return axios.get(`/api/user/student`);
};

export { getAllStudent };
