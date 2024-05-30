import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import TableBooking from "./TableBooking";


const BookingRoom = (props) => {


    const [bookingRoom, setBookingRoom] = useState([
        {
            id: 1,
            room: '1A01',
            borrower: 'Phung',
            startTime: '7.00am',
            loanTime: '2',
            endTime: '9.00am',
            status: 0 // -1 is die, 0 is wait, 1 is accept,
        },
        {
            id: 2,
            room: '1A01',
            borrower: 'Phuc',
            startTime: '7.00am',
            loanTime: '2',
            endTime: '9.00am',
            status: -1 // -1 is die, 0 is wait, 1 is accept,
        },
        {
            id: 3,
            room: '1A02',
            borrower: 'Phat',
            startTime: '7.00am',
            loanTime: '2',
            endTime: '9.00am',
            status: 1 // -1 is die, 0 is wait, 1 is accept,
        },
        {
            id: 4,
            room: '2A01',
            borrower: 'Phuong',
            startTime: '7.00am',
            loanTime: '2',
            endTime: '9.00am',
            status: -1 // -1 is die, 0 is wait, 1 is accept,
        },
        {
            id: 5,
            room: '2A02',
            borrower: 'Phat',
            startTime: '7.00am',
            loanTime: '2',
            endTime: '9.00am',
            status: 1 // -1 is die, 0 is wait, 1 is accept,
        },
        {
            id: 6,
            room: '2A03',
            borrower: 'Phat',
            startTime: '7.00am',
            loanTime: '2',
            endTime: '9.00am',
            status: 0 // -1 is die, 0 is wait, 1 is accept,
        },
        {
            id: 7,
            room: '3A01',
            borrower: 'Phuong',
            startTime: '7.00am',
            loanTime: '2',
            endTime: '9.00am',
            status: -1 // -1 is die, 0 is wait, 1 is accept,
        },
        {
            id: 8,
            room: '3A02',
            borrower: 'Phat',
            startTime: '7.00am',
            loanTime: '2',
            endTime: '9.00am',
            status: 1 // -1 is die, 0 is wait, 1 is accept,
        },
        {
            id: 9,
            room: '3A03',
            borrower: 'Phat',
            startTime: '7.00am',
            loanTime: '2',
            endTime: '9.00am',
            status: 0 // -1 is die, 0 is wait, 1 is accept,
        },
        {
            id: 10,
            room: '4A01',
            borrower: 'Phuong',
            startTime: '7.00am',
            loanTime: '2',
            endTime: '9.00am',
            status: -1 // -1 is die, 0 is wait, 1 is accept,
        },
        {
            id: 11,
            room: '4A02',
            borrower: 'Phat',
            startTime: '7.00am',
            loanTime: '2',
            endTime: '9.00am',
            status: 1 // -1 is die, 0 is wait, 1 is accept,
        },
        {
            id: 12,
            room: '4A03',
            borrower: 'Phat',
            startTime: '7.00am',
            loanTime: '2',
            endTime: '9.00am',
            status: 0 // -1 is die, 0 is wait, 1 is accept,
        },
    ])

    const [bookingAtFloor1, setBookingAtFloor1] = useState([]);
    const [bookingAtFloor2, setBookingAtFloor2] = useState([]);
    const [bookingAtFloor3, setBookingAtFloor3] = useState([]);
    const [bookingAtFloor4, setBookingAtFloor4] = useState([]);


    const handleBookingAtFloor = () => {
        let bookingF1 = bookingRoom.filter(obj => obj.room.startsWith('1A'));;
        let bookingF2 = bookingRoom.filter(obj => obj.room.startsWith('2A'));;
        let bookingF3 = bookingRoom.filter(obj => obj.room.startsWith('3A'));;
        let bookingF4 = bookingRoom.filter(obj => obj.room.startsWith('4A'));;

        setBookingAtFloor1(bookingF1);
        setBookingAtFloor2(bookingF2);
        setBookingAtFloor3(bookingF3);
        setBookingAtFloor4(bookingF4);
    }

    useEffect(() => {
        handleBookingAtFloor()
    }, [])


    return (
        <div className="booking-container">
            <Accordion >
                <Accordion.Item eventKey="0">
                    <Accordion.Header
                    // onClick={() => setCurrentPage(1)}
                    >Floor 1</Accordion.Header>
                    <Accordion.Body>
                        <TableBooking
                            listBooking={bookingAtFloor1}
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header
                    // onClick={() => setCurrentPage(1)}
                    >Floor 2</Accordion.Header>
                    <Accordion.Body>

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header
                    // onClick={() => setCurrentPage(1)}
                    >Floor 3</Accordion.Header>
                    <Accordion.Body>

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header
                    // onClick={() => setCurrentPage(1)}
                    >Floor 4</Accordion.Header>
                    <Accordion.Body>

                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
        </div>
    )

}

export default BookingRoom;