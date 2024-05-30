import axios from "../utils/axiosCustomize";


const getAllRoom = () => {
    return axios.get(`/api/room`);
}

const postCreateRoom = (data) => {
    return axios.post(`/api/room`, { ...data });
}

const patchUpdateStatusRoom = (roomId, status) => {
    return axios.patch(`api/room/${roomId}`, { ...status });
}

export {
    getAllRoom,
    postCreateRoom,
    patchUpdateStatusRoom
}
