import axios from "../utils/axiosCustomize";


const getDeviceByRoomId = (roomId) => {
    return axios.get(`/api/device/${roomId}`);
}

const getAllDevice = () => {
    return axios.get(`/api/device`);
}

const getAllDeviceCategory = () => {
    return axios.get(`/api/device-category`);
}

const getCreateDevice = (data) => {
    return axios.post(`/api/device`, { ...data });
}
const patchUpdateDevice = (deviceId, data) => {
    return axios.patch(`/api/device/${deviceId}`, { ...data });
}

const patchUpdateReturnedDevice = (data) => {
    return axios.patch(`/api/booking/update-returned-time-device`, { ...data });
}

const postAddDeviceToBooking = (data) => {
    return axios.post(`/api/booking/add-device`, { ...data });
}

export {
    getDeviceByRoomId,
    getAllDeviceCategory,
    getCreateDevice,
    getAllDevice,
    patchUpdateDevice,
    patchUpdateReturnedDevice,
    postAddDeviceToBooking
}