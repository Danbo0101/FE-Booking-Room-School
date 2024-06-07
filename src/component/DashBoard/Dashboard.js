import { useEffect, useState } from 'react';
import './DashBoard.scss'
import { toast } from 'react-toastify';
import Filter from './Filter';
import TableBooking from './TableBooking';
import { getAllRoom, getTimeRoomEmpty } from '../../services/roomServices';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CreateIcon from '@mui/icons-material/Create';
import BookingRoom from './Modal/ModalBookingRoom';






const DashBoard = (props) => {

    const [zone, setZone] = useState('');
    const [floor, setFloor] = useState('');

    const [listRoom, setListRoom] = useState([]);
    const [listRoomFilter, setListRoomFilter] = useState([]);
    const [listRoomTime, setListRoomTime] = useState([]);


    const [showBookingroom, setShowBookingRoom] = useState(false);


    useEffect(() => {
        fetchListRoom();
    }, [])


    const fetchListRoom = async () => {

        let data = await getAllRoom();
        if (data.message) {
            console.log(data.message)
        }
        else {
            setListRoom(data)
        };

    }

    const filterByZoneAndFloor = () => {

        if (zone === '') {
            toast.warn('Please check Zone');
            setFloor('');
            return;
        }
        if (floor === '') {
            toast.warn('Please check Floor')
            setZone('');
            return;
        }

        let listRFilter = listRoom.filter(item =>
            item.zone === zone &&
            item.floor === floor &&
            item.status === "Hoạt động" &&
            item.id !== "CSVC"
        );

        console.log(listRFilter);

        setListRoomFilter(listRFilter);
    };


    const fetchTimeRoomEmpty = async () => {

        let promises = listRoomFilter.map(item => {
            return getTimeRoomEmpty(item.id).then(result => {
                return { id: item.id, time: result };
            });
        });

        let results = await Promise.all(promises);
        console.log(results);
        setListRoomTime(results);
    }

    useEffect(() => {
        fetchTimeRoomEmpty();
    }, [listRoomFilter])

    // const data = [
    //     { borrowTime: '2024-06-07T00:00:00.000Z', returnTime: '2024-06-07T01:40:00.000Z' },
    //     { borrowTime: '2024-06-07T01:45:00.000Z', returnTime: '2024-06-07T03:25:00.000Z' },
    //     { borrowTime: '2024-06-07T03:30:00.000Z', returnTime: '2024-06-07T05:10:00.000Z' },
    //     { borrowTime: '2024-06-07T06:20:00.000Z', returnTime: '2024-06-07T08:00:00.000Z' },
    //     { borrowTime: '2024-06-07T08:05:00.000Z', returnTime: '2024-06-07T09:45:00.000Z' }
    // ];

    // const convertToAMPM = (isoTimeString) => {
    //     const date = new Date(isoTimeString);
    //     const hours = date.getHours();
    //     const minutes = date.getMinutes();
    //     const ampm = hours >= 12 ? 'PM' : 'AM';
    //     const formattedHours = hours % 12 || 12;
    //     return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    // };

    // const convertedData = data.map(item => ({
    //     borrowTime: convertToAMPM(item.borrowTime),
    //     returnTime: convertToAMPM(item.returnTime)
    // }));

    // console.log(convertedData);






    return (
        <div className="dashboard-contanier">
            <div className="left-contanier">
                <Filter
                    zone={zone}
                    floor={floor}
                    filterByZoneAndFloor={filterByZoneAndFloor}
                    setFloor={setFloor}
                    setZone={setZone}
                />
            </div>
            <div className="right-contanier">
                <TableBooking
                    listRoomTime={listRoomTime}
                    floor={floor}
                />
            </div>
            <Box sx={{ height: 550, transform: 'translateZ(0px)', flexGrow: 1 }}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: -60, right: 16 }}
                    icon={<SpeedDialIcon />}
                    direction='left'
                >
                    <SpeedDialAction
                        key="Booking Room"
                        icon={<CreateIcon />}
                        tooltipTitle="Booking Room"
                        onClick={() => setShowBookingRoom(true)}

                    />
                </SpeedDial>
            </Box>

            <BookingRoom

                show={showBookingroom}
                setShow={setShowBookingRoom}
                listRoom={listRoom}

            />
        </div>
    )
}

export default DashBoard;