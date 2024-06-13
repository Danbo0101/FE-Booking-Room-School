import axios from "../utils/axiosCustomize";

const getAllBooking = (filter) => {
    return axios.get(`/api/booking`, { params: filter });
};

const postCreateBooking = (data) => {
    return axios.post(`/api/booking`, { ...data });
};

const getBookingByStudentId = (id, filter) => {
    return axios.get(`/api/booking/student/${id}`, { params: filter });
};

const getAllBookingToday = () => {
    return axios.get(`/api/booking/today`);
};

const patchUpdateBooking = (id, data) => {
    return axios.patch(`/api/booking/${id}`, { ...data });
};

export {
    postCreateBooking,
    getBookingByStudentId,
    getAllBookingToday,
    getAllBooking,
    patchUpdateBooking,
};
