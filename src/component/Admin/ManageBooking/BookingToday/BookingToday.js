
import { useEffect, useState } from 'react';
import { getAllBookingToday, patchUpdateBooking } from '../../../../services/bookingServices';
import Filter from './Filter';
import TableBooking from './TableBooking';
import './BookingToday.scss';
import ChangeStatus from './Modal/ModalStatus';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { patchUpdateDevice, patchUpdateReturnedDevice, postAddDeviceToBooking } from '../../../../services/deviceServices';
import _ from 'lodash';
import DetailsModal from './Modal/ModalDetail';
import RefundDevice from './Modal/ModalRefundDevice';
import AddDevice from './Modal/ModalAddDevice';

const BookingToday = (props) => {


    const employeeId = useSelector(state => state.user.account.employee_id);

    const [listBookingToday, setListBookingToday] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);

    const LIMIT_ELEMENT = 4;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);


    const [listBookingsPaginate, setListBookingsPaginate] = useState([]);

    const [showStatus, setShowStatus] = useState(false);
    const [dataChangeStatus, setDataChangeStatus] = useState();

    const [showDetail, setShowDetail] = useState(false);
    const [dataView, setDataView] = useState();

    const [showRefundDevice, setShowRefundDevice] = useState(false);
    const [dataRefund, setDataRefund] = useState();

    const [showAddDevice, setShowAddDevice] = useState(false);
    const [dataAddDevice, setDataAddDevice] = useState();

    useEffect(() => {
        CalPageCount();
    }, [filteredBookings])

    useEffect(() => {
        fetchListWithPaginate()
    }, [currentPage, filteredBookings])


    const CalPageCount = () => {
        const totalBookings = filteredBookings.length;
        const totalPages = Math.ceil(totalBookings / LIMIT_ELEMENT);
        setPageCount(totalPages);
        // console.log(currentPage);
    }

    const fetchListWithPaginate = () => {
        const startIndex = (currentPage - 1) * LIMIT_ELEMENT;
        const endIndex = startIndex + LIMIT_ELEMENT;
        const paginatedList = filteredBookings.slice(startIndex, endIndex);
        setListBookingsPaginate(paginatedList);
        // console.log(paginatedList);
    }


    const fetchListBookingToday = async () => {

        let res = await getAllBookingToday();
        if (!res.message) {
            setListBookingToday(res);
        } else console.log(res.message);

        console.log(1);
    }

    useEffect(() => {
        if (showStatus === false) {
            fetchListBookingToday();
        }
    }, [showStatus])

    useEffect(() => {
        if (showRefundDevice === false) {
            fetchListBookingToday();
        }
    }, [showRefundDevice])

    useEffect(() => {
        if (dataChangeStatus) {
            handleFilter(dataChangeStatus.room.zone, dataChangeStatus.room.floor);
            setDataChangeStatus('');
        }
        if (dataRefund) {
            // console.log(dataRefund.room);
            handleFilter(dataRefund.room.zone, dataRefund.room.floor);
            setDataRefund('');
        }
        if (dataAddDevice) {
            console.log(2);
            handleFilter(dataAddDevice.room.zone, dataAddDevice.room.floor);
            setDataAddDevice('');
        }
    }, [listBookingToday])

    const handleFilter = (zone, floor) => {
        const filtered = listBookingToday.filter(
            (booking) =>
                booking.room.zone === zone && booking.room.floor === parseInt(floor)
        );
        setFilteredBookings(filtered);
        console.log(3);
    };

    const convertToVietnamTime = (timeString) => {

        let [datePart, timePart] = timeString.split('T');
        let [hour, minute] = timePart.split(':');


        hour = parseInt(hour, 10);
        minute = parseInt(minute, 10);


        let date = new Date(Date.UTC(
            parseInt(datePart.split('-')[0], 10),
            parseInt(datePart.split('-')[1], 10) - 1,
            parseInt(datePart.split('-')[2], 10),
            hour,
            minute
        ));

        let vietnamHour = date.getHours().toString().padStart(2, '0');
        let vietnamMinute = date.getMinutes().toString().padStart(2, '0');

        return vietnamHour + ':' + vietnamMinute;
    };


    const handleShowChangeStatus = (room, booking_id, status, bookingDetails) => {

        let data = {
            room,
            status: status.id
        };

        switch (status.id) {
            case 10:
                data.booking_id = booking_id;
                data.employee = employeeId;
                setShowStatus(true);
                // console.log(data);

                setDataChangeStatus(data);
                break;

            case 11:
                data.bookingDetails = bookingDetails;

                setShowStatus(true);
                // console.log(data);

                setDataChangeStatus(data);
                break;

            default:
                break;
        }
    }



    const handleSubmitChangeStatus = async (type) => {


        let data = {}

        switch (type) {
            case "ACCEPT":
                data = {
                    employee: dataChangeStatus.employee,
                    status: 11
                }

                let resA = await patchUpdateBooking(dataChangeStatus.booking_id, data);

                if (!resA.message) {
                    toast.success('Accept Booking Success');
                    setShowStatus(false);
                }
                else toast.error(resA.message);

                break;
            case "DENY":
                data = {
                    employee: dataChangeStatus.employee,
                    status: 13
                }
                let resD = await patchUpdateBooking(dataChangeStatus.booking_id, data);

                if (!resD.message) {
                    toast.done('Deny Booking ');
                    setShowStatus(false);
                }
                else toast.error(resD.message);

                break;
            case "RETURN":

                let bookingDetails = _.cloneDeep(dataChangeStatus.bookingDetails);

                console.log(bookingDetails);

                try {
                    let promises = bookingDetails.map(booking => {
                        let data = {
                            booking_id: booking.booking_id,
                            device_id: booking.device_id,
                        };
                        return patchUpdateReturnedDevice(data);
                    });

                    let results = await Promise.all(promises);
                    toast.success("Refund Room Success");
                    setShowStatus(false);
                    console.log(results);
                } catch (error) {
                    toast.success(error);
                }

                break;
            default:
                break;

        }

        // console.log(data);


    }

    const processBookingDetails = async (bookingDetails) => {
        for (let booking of bookingDetails) {
            try {
                let data = {
                    booking_id: booking.booking_id,
                    device_id: booking.device_id,
                }
                let resR = await patchUpdateReturnedDevice(data);
                console.log(resR);
            } catch (error) {
                console.error("Error occurred:", error);
            }
        }
    }

    const handleViewDetail = (booking) => {
        setShowDetail(true);
        setDataView(booking);
    }

    const handleViewRefund = (room, bookingDetail) => {

        let data = {
            room,
            bookingDetail
        }
        setShowRefundDevice(true);
        setDataRefund(data);

    }

    const handleSubmitRefund = async (booking_id, device_id) => {

        let data = {
            booking_id,
            device_id
        }

        console.log(data);

        let res = await patchUpdateReturnedDevice(data);
        if (!res.message) {
            toast.success("Refund Device Success");
            setDataRefund();
            setShowRefundDevice(false);
        }
        else console.log(res.message);

    }

    const handleAddDevice = (bookingId, room) => {

        setDataAddDevice({ bookingId, room })
        setShowAddDevice(true);

    }


    const handleSubmitAddDevice = async (device_ids) => {

        let data = {
            booking_id: dataAddDevice.bookingId,
            device_ids
        }
        console.log(data);

        try {
            await updateDevices(device_ids);
            let res = await postAddDeviceToBooking(data);
            toast.success(`Add device to booking ${data.booking_id} Success`);
            fetchListBookingToday();
            setShowAddDevice(false);
            // console.log(res);
        } catch (error) {
            toast.error(error);
        }
    }



    const updateDevices = async (device_ids) => {
        try {
            const results = await Promise.all(device_ids.map(id => patchUpdateDevice(id, { status: 1 })));
            console.log('All API calls were successful:', results);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <div className="booking-today-container">
            <Filter
                handleFilter={handleFilter}
            />
            <TableBooking
                listBookingsPaginate={listBookingsPaginate}
                convertToVietnamTime={convertToVietnamTime}
                pageCount={pageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                handleShowChangeStatus={handleShowChangeStatus}
                handleViewDetail={handleViewDetail}
                handleViewRefund={handleViewRefund}
                handleAddDevice={handleAddDevice}
            />
            <ChangeStatus
                show={showStatus}
                setShow={setShowStatus}
                dataChangeStatus={dataChangeStatus}
                handleSubmitChangeStatus={handleSubmitChangeStatus}
            />
            <DetailsModal
                show={showDetail}
                setShow={setShowDetail}
                selectedItem={dataView}
            />
            <RefundDevice

                show={showRefundDevice}
                setShow={setShowRefundDevice}
                dataRefund={dataRefund}
                handleSubmitRefund={handleSubmitRefund}
                fetchListBookingToday={fetchListBookingToday}
            />

            <AddDevice
                show={showAddDevice}
                setShow={setShowAddDevice}
                dataAddDevice={dataAddDevice}
                handleSubmitAddDevice={handleSubmitAddDevice}
            />
        </div>
    )
}

export default BookingToday;