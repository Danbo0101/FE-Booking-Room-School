import "./ModalBookingRoom.scss";
import { useEffect, useState } from "react";
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const BookingRoom = (props) => {

    const times = [
        { value: '1', label: '7.am - 9.am' },
        { value: '2', label: '9.am - 11.am' },
        { value: '3', label: '11.am - 1.pm' },
        { value: '4', label: '1.pm - 3.pm' },
        { value: '5', label: '3.pm - 5.pm' },
    ];

    const rooms = [
        { value: '2A01', label: '2A01' },
        { value: '2A02', label: '2A02' },
        { value: '2A03', label: '2A03' },
        { value: '2A04', label: '2A04' },
        { value: '2A05', label: '2A05' },
        { value: '2A06', label: '2A06' },
        { value: '2A07', label: '2A07' },
        { value: '2A08', label: '2A08' },
        { value: '2B01', label: '2B01' },
        { value: '2B02', label: '2B02' },
        { value: '2B03', label: '2B03' },
        { value: '2B04', label: '2B04' },
        { value: '2B05', label: '2B05' },
        { value: '2B06', label: '2B06' },
        { value: '2B07', label: '2B07' },
        { value: '2B08', label: '2B08' },
        { value: '2C01', label: '2C01' },
        { value: '2C02', label: '2C02' },
        { value: '2C03', label: '2C03' },
        { value: '2C04', label: '2C04' },
        { value: '2C05', label: '2C05' },
        { value: '2C06', label: '2C06' },
        { value: '2C07', label: '2C07' },
        { value: '2D08', label: '2C08' },
        { value: '2D01', label: '2D01' },
        { value: '2D02', label: '2D02' },
        { value: '2D03', label: '2D03' },
        { value: '2D04', label: '2D04' },
        { value: '2D05', label: '2D05' },
        { value: '2D06', label: '2D06' },
        { value: '2D07', label: '2D07' },
        { value: '2D08', label: '2D08' },
        { value: '2E01', label: '2E01' },
        { value: '2E02', label: '2E02' },
        { value: '2E03', label: '2E03' },
        { value: '2E04', label: '2E04' },
        { value: '2E05', label: '2E05' },
        { value: '2E06', label: '2E06' },
        { value: '2E07', label: '2E07' },
        { value: '2E08', label: '2E08' },
    ];


    const [room, setRoom] = useState([]);



    const fetchRoom = () => {
        console.log(listRoom);
        let rooms = []
        listRoom.map(room => rooms.push({ value: room.id, label: room.id }))

        console.log(rooms);
    }

    useEffect(() => {
        fetchRoom()
    }, [])



    const [nameRoom, setNameRoom] = useState('');
    const [time, setTime] = useState('')

    const { show, setShow, listRoom } = props;

    const handleClose = () => setShow(false);


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
                <Modal.Title>Booking Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-floating my-3">
                    <Select
                        defaultValue={nameRoom}
                        onChange={setNameRoom}
                        options={rooms}
                        placeholder={"Room ..."}
                    />
                </div>
                <div className="form-floating my-3">
                    <Select
                        defaultValue={time}
                        onChange={setTime}
                        options={times}
                        placeholder={"Time Booking ..."}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">Booking</Button>
            </Modal.Footer>
        </Modal>

    )
}

export default BookingRoom;