import "./ModalBookingRoom.scss";
import { useEffect, useState } from "react";
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getTimeRoomEmpty } from "../../../services/roomServices";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import _ from 'lodash';
import { postCreateBooking } from "../../../services/bookingServices";
import Form from 'react-bootstrap/Form';
import { getDeviceByRoomId } from "../../../services/deviceServices";
import { status } from "nprogress";


const BookingRoom = (props) => {


    // {
    //     "room": "2A10",
    //         "student": "N21DCAT039",
    //             "employee": "NV001",
    //                 "status": 11,
    //                     "borrowTime": "2024-06-09T00:00:00.000Z",
    //                         "returnTime": "2024-06-09T01:40:00.000Z",
    //                             "devices": ["HDMICSVC", "MCCSVC-1"]
    // }

    const role = useSelector(state => state.user.account.role);
    const studentId = useSelector(state => state.user.account.student_id);
    const employeeId = useSelector(state => state.user.account.employee_id);

    const { show, setShow, listRoom } = props;

    const handleClose = () => {
        setNameRoom('');
        setTime('');
        setTimeRoomEmpty([]);
        setBorrowTimeSelect('');
        setReturnTimeSelect('');
        setStudent('');
        setDevices([]);
        setShow(false)
    };

    const [nameRoom, setNameRoom] = useState('');
    const [time, setTime] = useState('');
    const [student, setStudent] = useState('');
    const [devices, setDevices] = useState([]);

    const [roomOptions, setRoomOptions] = useState([]);

    const [timeRoomEmpty, setTimeRoomEmpty] = useState([]);
    const [borrowTimeSelect, setBorrowTimeSelect] = useState('');
    const [returnTimeSelect, setReturnTimeSelect] = useState('');

    const [timeOptions, setTimeOptions] = useState([]);





    const fetchRoom = () => {
        let roomOption = listRoom.map(room => ({
            value: room.id,
            label: room.id
        }));

        setRoomOptions(roomOption);
    }

    useEffect(() => {
        fetchRoom()
    }, [show])


    const fetchTimeRoomEmpty = async () => {

        let res = await getTimeRoomEmpty(nameRoom.value);
        let timeRoomEmptyFilter = props.handleTimeVSCurrentTime(res);
        // console.log(timeRoomEmptyFilter);
        // console.log(res);
        setTimeRoomEmpty(timeRoomEmptyFilter);

    }

    const fetchDevicesByRoom = async () => {
        let deviceClone = [];
        let res = await getDeviceByRoomId(nameRoom.value);
        if (!res.message) {
            res.filter(item => item.status !== "Hỏng").forEach(item => {
                deviceClone.push(item.id);
            });
            console.log(deviceClone);
            setDevices(deviceClone);
        }
        else console.log(res.message);
    }

    useEffect(() => {

        const fetchDataRoom = async () => {
            if (nameRoom) {
                await fetchTimeRoomEmpty();
                await fetchDevicesByRoom();
            }
        }
        fetchDataRoom();

    }, [nameRoom]);


    useEffect(() => {
        fetchTimeOptions();
    }, [timeRoomEmpty])

    const fetchTimeOptions = () => {

        let timeRoomEmptyClone = _.cloneDeep(timeRoomEmpty);
        let times = timeRoomEmptyClone.map((item, index) => {
            let borrowDateTime = new Date(item.borrowTime);
            let returnDateTime = new Date(item.returnTime);

            let borrowTimeFormatted = `${borrowDateTime.getHours().toString().padStart(2, '0')}:${borrowDateTime.getMinutes().toString().padStart(2, '0')}`;
            let returnTimeFormatted = `${returnDateTime.getHours().toString().padStart(2, '0')}:${returnDateTime.getMinutes().toString().padStart(2, '0')}`;

            return {
                value: `${item.borrowTime} - ${item.returnTime}`,
                label: `${borrowTimeFormatted} - ${returnTimeFormatted}`
            };
        });

        setTimeOptions(times)


    }


    useEffect(() => {
        // console.log(time.value);
        if (time) {
            setBorrowTimeSelect(time.value.split(" - ")[0]);
            setReturnTimeSelect(time.value.split(" - ")[1]);

        }
    }, [time])


    const handleBookingRoom = async () => {

        if (!nameRoom) {
            toast.warn("Invalid Room");
            return;
        }
        if (!borrowTimeSelect && !returnTimeSelect) {
            toast.warn("Invalid Time");
            return;
        }

        let data = {};

        if (role === 2) {
            data = {
                room: nameRoom.value,
                student,
                employee: employeeId,
                status: 11,
                borrowTime: borrowTimeSelect,
                returnTime: returnTimeSelect,
                devices
            }
        }
        else {
            data = {
                room: nameRoom.value,
                student: studentId,
                borrowTime: borrowTimeSelect,
                returnTime: returnTimeSelect,
                devices
            }
        }

        // console.log(data)

        let res = await postCreateBooking(data);

        if (!res.message) {
            toast.success("Booking Room Success");
            props.fetchListRoom();
            handleClose();
        }
        else toast.error(res.message);




    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Đặt phòng</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {role && role === 2 ?
                    <>
                        <div className="form-floating my-3">
                            <Select
                                defaultValue={nameRoom}
                                onChange={setNameRoom}
                                options={roomOptions}
                                placeholder={"Phòng ..."}
                            />
                        </div>
                        <div className="form-floating my-3">
                            <Select
                                defaultValue={time}
                                onChange={setTime}
                                options={timeOptions}
                                placeholder={"Thời gian đặt ..."}
                            />
                        </div>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="text"
                                // placeholder="2A12"
                                onChange={(event) => setStudent((event.target.value).toUpperCase())}
                                value={student}
                            />
                            <label htmlFor="floatingInputCustom">MSSV</label>
                        </Form.Floating>
                    </>
                    :
                    <>
                        <div className="form-floating my-3">
                            <Select
                                defaultValue={nameRoom}
                                onChange={setNameRoom}
                                options={roomOptions}
                                placeholder={"Phòng ..."}
                            />
                        </div>
                        <div className="form-floating my-3">
                            <Select
                                defaultValue={time}
                                onChange={setTime}
                                options={timeOptions}
                                placeholder={"Thời gian đặt ..."}
                            />
                        </div>
                    </>
                }

            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={() => handleBookingRoom()}
                >Đặt phòng</Button>
            </Modal.Footer>
        </Modal>

    )
}

export default BookingRoom;