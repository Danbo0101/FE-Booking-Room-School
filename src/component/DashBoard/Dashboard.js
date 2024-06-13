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

    const [zone, setZone] = useState('A');
    const [floor, setFloor] = useState(0);

    const [listRoom, setListRoom] = useState([]);
    const [listRoomFilter, setListRoomFilter] = useState([]);
    const [listRoomTime, setListRoomTime] = useState([]);
    const [listRoomTimeNotDisable, setListRoomTimeNotDisable] = useState([]);


    const [showBookingroom, setShowBookingRoom] = useState(false);

    const [initTimeRoomEmptyToday, setInitTimeRoomEmptyToday] = useState([]);


    // const generateTimeRoomEmpty = () => {
    //     const currentDate = new Date();
    //     const generateDate = currentDate.toISOString().substring(0, 10);
    //     const initTimeRoomEmpty = [
    //         {
    //             "borrowTime": "00:00:00.000Z",
    //             "returnTime": "01:40:00.000Z"
    //         },
    //         {
    //             "borrowTime": "01:45:00.000Z",
    //             "returnTime": "03:25:00.000Z"
    //         },
    //         {
    //             "borrowTime": "03:30:00.000Z",
    //             "returnTime": "05:10:00.000Z"
    //         },
    //         {
    //             "borrowTime": "06:20:00.000Z",
    //             "returnTime": "08:00:00.000Z"
    //         },
    //         {
    //             "borrowTime": "08:05:00.000Z",
    //             "returnTime": "09:45:00.000Z"
    //         }
    //     ];

    //     const newInitTimeRoomEmpty = [];

    //     for (let i = 0; i < initTimeRoomEmpty.length; i++) {
    //         const borrowTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),
    //             parseInt(initTimeRoomEmpty[i].borrowTime.substring(0, 2)),
    //             parseInt(initTimeRoomEmpty[i].borrowTime.substring(3, 5)),
    //             parseInt(initTimeRoomEmpty[i].borrowTime.substring(6, 8)),
    //             parseInt(initTimeRoomEmpty[i].borrowTime.substring(9, 12))
    //         ).toISOString();

    //         const returnTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),
    //             parseInt(initTimeRoomEmpty[i].returnTime.substring(0, 2)),
    //             parseInt(initTimeRoomEmpty[i].returnTime.substring(3, 5)),
    //             parseInt(initTimeRoomEmpty[i].returnTime.substring(6, 8)),
    //             parseInt(initTimeRoomEmpty[i].returnTime.substring(9, 12))
    //         ).toISOString();

    //         newInitTimeRoomEmpty.push({ borrowTime, returnTime });
    //     }

    //     // console.log(newInitTimeRoomEmpty);
    //     setInitTimeRoomEmptyToday(newInitTimeRoomEmpty);

    // }

    const generateTimeRoomEmpty = () => {
        // const currentDate = new Date();
        // const options = { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' };
        // const generateDate = currentDate.toLocaleString('en-US', options);
        // const formattedDate = generateDate.split('/').reverse().join('-');
        // console.log(formattedDate);
        const currentDate = new Date();
        const generateDate = currentDate.toISOString().substring(0, 10);

        const initTimeRoomEmpty = [
            {
                "borrowTime": "00:00:00.000Z",
                "returnTime": "01:40:00.000Z"
            },
            {
                "borrowTime": "01:45:00.000Z",
                "returnTime": "03:25:00.000Z"
            },
            {
                "borrowTime": "03:30:00.000Z",
                "returnTime": "05:10:00.000Z"
            },
            {
                "borrowTime": "06:20:00.000Z",
                "returnTime": "08:00:00.000Z"
            },
            {
                "borrowTime": "08:05:00.000Z",
                "returnTime": "09:45:00.000Z"
            }
        ];

        const newInitTimeRoomEmpty = [];

        for (let i = 0; i < initTimeRoomEmpty.length; i++) {
            const borrowTime = new Date(generateDate + "T" + initTimeRoomEmpty[i].borrowTime).toISOString();
            const returnTime = new Date(generateDate + "T" + initTimeRoomEmpty[i].returnTime).toISOString();


            newInitTimeRoomEmpty.push({ borrowTime, returnTime });
        }

        // console.log(currentDate.toLocaleDateString());
        // console.log(generateDate);


        console.log(newInitTimeRoomEmpty);


        setInitTimeRoomEmptyToday(newInitTimeRoomEmpty);
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchListRoom();
            await generateTimeRoomEmpty();
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (listRoom.length > 0) {
            filterByZoneAndFloor();
        }
    }, [listRoom]);

    useEffect(() => {
        if (listRoomFilter.length > 0) {
            fetchTimeRoomEmpty();
        }
    }, [listRoomFilter]);




    const fetchListRoom = async () => {

        let data = await getAllRoom();
        if (data.message) {
            console.log(data.message)
        }
        else {
            // console.log(data)
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

        // console.log(listRFilter);

        setListRoomFilter(listRFilter);
    };




    const fetchTimeRoomEmpty = async () => {
        try {
            let promises = listRoomFilter.map(async item => {
                let result = await getTimeRoomEmpty(item.id);
                let adjustedTime = handleTimeVSCurrentTime(result);
                return { id: item.id, originalTime: result, adjustedTime: adjustedTime };
            });

            let results = await Promise.all(promises);

            let originalTimes = results.map(({ id, originalTime }) => ({ id, time: originalTime }));
            let adjustedTimes = results.map(({ id, adjustedTime }) => ({ id, time: adjustedTime }));

            // console.log("Original Times:", originalTimes);
            // console.log("Adjusted Times:", adjustedTimes);

            setListRoomTime(originalTimes);
            setListRoomTimeNotDisable(adjustedTimes);
        } catch (error) {
            console.error("Error fetching room times:", error);
        }
    };


    useEffect(() => {
        fetchTimeRoomEmpty();
    }, [listRoomFilter])



    // console.log(listRoomTime);
    // console.log(listRoomTimeNotDisable);


    const handleTimeVSCurrentTime = (timeRoomEmpty) => {
        let currentTime = new Date("2024-06-12T01:45:00.000Z");
        // let currentTime = new Date();
        // console.log("check current time ", currentTime)
        let filteredTimes = timeRoomEmpty.filter((item) => {
            let borrowTimes = new Date(item.borrowTime);
            // console.log(borrowTimes);
            return borrowTimes > currentTime;
        });

        return filteredTimes;
    }







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
                    listRoomTimeNotDisable={listRoomTimeNotDisable}
                    floor={floor}
                    initTimeRoomEmptyToday={initTimeRoomEmptyToday}

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
                handleTimeVSCurrentTime={handleTimeVSCurrentTime}
                fetchListRoom={fetchListRoom}

            />
        </div>
    )
}

export default DashBoard;