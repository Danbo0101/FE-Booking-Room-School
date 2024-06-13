import { IoTriangleOutline } from "react-icons/io5";
import { FaRegSquare } from "react-icons/fa";
import { useEffect, useState } from "react";


const TableBooking = (props) => {

    // const { listRoomTime, floor, listRoomTimeNotDisable } = props;

    const { floor, listRoomTimeNotDisable, initTimeRoomEmptyToday } = props;

    // console.log(initTimeRoomEmptyToday);

    const [listRoomTimeStatus, setListRoomTimeStatus] = useState([]);

    const [indexCompareCurrentTime, setIndexCompareCurrentTime] = useState();

    // const initTimeRoomEmptyToday = [
    //     {
    //         "borrowTime": "2024-06-09T00:00:00.000Z",
    //         "returnTime": "2024-06-09T01:40:00.000Z"
    //     },
    //     {
    //         "borrowTime": "2024-06-09T01:45:00.000Z",
    //         "returnTime": "2024-06-09T03:25:00.000Z"
    //     },
    //     {
    //         "borrowTime": "2024-06-09T03:30:00.000Z",
    //         "returnTime": "2024-06-09T05:10:00.000Z"
    //     },
    //     {
    //         "borrowTime": "2024-06-09T06:20:00.000Z",
    //         "returnTime": "2024-06-09T08:00:00.000Z"
    //     },
    //     {
    //         "borrowTime": "2024-06-09T08:05:00.000Z",
    //         "returnTime": "2024-06-09T09:45:00.000Z"
    //     }
    // ]

    // console.log(initTimeRoomEmptyToday);


    const handleIndexCompare = () => {

        let currentTime = new Date("2024-06-12T01:45:00.000Z");
        let index = initTimeRoomEmptyToday.findIndex((item) => {
            let borrowTime = new Date(item.borrowTime);
            return borrowTime > currentTime;
        });

        console.log(index);


        setIndexCompareCurrentTime(index);
    }



    const compareTimeLists = (initTimeRoomEmptyToday, listRoomTimeNotDisable) => {
        return listRoomTimeNotDisable.map(room => {
            let roomTime = [];
            for (let i = 0; i < initTimeRoomEmptyToday.length; i++) {
                let found = false;
                for (let j = 0; j < room.time.length; j++) {
                    if (initTimeRoomEmptyToday[i].borrowTime === room.time[j].borrowTime &&
                        initTimeRoomEmptyToday[i].returnTime === room.time[j].returnTime) {
                        // console.log("check room time ", room.time[j])
                        roomTime.push(room.time[j]);
                        found = true;
                        break;
                    }

                }
                if (!found) {
                    roomTime.push(null);
                }
            }
            return { id: room.id, time: roomTime };
        });
    }

    const handleStatusforRooms = () => {
        let result = compareTimeLists(initTimeRoomEmptyToday, listRoomTimeNotDisable);
        // console.log("check result", result);
        let compare = [];
        for (let j = 0; j < result.length; j++) {
            const status = [];
            let flag = false;
            for (let i = 0; i < initTimeRoomEmptyToday.length; i++) {
                if (i === indexCompareCurrentTime) {
                    if (!flag && !(initTimeRoomEmptyToday[i].borrowTime === result[j].time[i]?.borrowTime)) {
                        status.push('passive');
                        flag = true;
                    } else if (!flag && (initTimeRoomEmptyToday[i].borrowTime === result[j].time[i]?.borrowTime)) {
                        status.push('active');
                        flag = true;
                    } else if (flag && (initTimeRoomEmptyToday[i].borrowTime === result[j].time[i]?.borrowTime)) {
                        status.push('active');
                        flag = true;
                    } else if (flag && !(initTimeRoomEmptyToday[i].borrowTime === result[j].time[i]?.borrowTime)) {
                        status.push('passive');
                        flag = true;
                    }
                } else {
                    if (!flag && !(initTimeRoomEmptyToday[i].borrowTime === result[j].time[i]?.borrowTime)) {
                        status.push('disable');
                    } else if (!flag && (initTimeRoomEmptyToday[i].borrowTime === result[j].time[i]?.borrowTime)) {
                        status.push('active');
                        flag = true;
                    } else if (flag && (initTimeRoomEmptyToday[i].borrowTime === result[j].time[i]?.borrowTime)) {
                        status.push('active');
                    } else if (flag && !(initTimeRoomEmptyToday[i].borrowTime === result[j].time[i]?.borrowTime)) {
                        status.push('passive');
                    }
                }

            }
            compare.push({ id: result[j].id, status });
        }

        // console.log(compare);
        setListRoomTimeStatus(compare);
    }


    useEffect(() => {
        handleStatusforRooms();
        handleIndexCompare();
    }, [listRoomTimeNotDisable])



    // console.log(listRoomTime);
    // console.log(listRoomTimeNotDisable);


    return (
        <>
            <div className='title'>
                <div className='title-main'>
                    <IoTriangleOutline />
                    Lầu {floor}
                </div>
                <div className='title-sub'>
                    <div className='title-available'>
                        <FaRegSquare />
                        Có sẵn
                    </div>
                    <div className='title-unavailable'>
                        <FaRegSquare />
                        Đã được mượn
                    </div>
                    <div className='title-disable'>
                        <FaRegSquare />
                        Quá hạn
                    </div>
                </div>

            </div>
            <div className='room'>
                <div className='room-name'>
                    Phòng
                </div>
                <div className='time'>
                    <div className='time-child'>7h - 8h40</div>
                    <div className='time-child'>8h45 - 10h25</div>
                    <div className='time-child'>10h30 - 12h10</div>
                    <div className='time-child'>13h20 - 15h</div>
                    <div className='time-child'>15h5 - 16h45</div>
                    {/* <div className='time-child'>17h45 - 19h25</div>
                    <div className='time-child'>19h45 - 21h25</div> */}

                </div>
            </div>
            {listRoomTimeStatus.length === 0 ?
                <div className='room'>
                    <div className="no-found-room">
                        Không tìm thấy phòng
                    </div>
                </div>

                :
                listRoomTimeStatus.map((room, roomIndex) => {
                    return (
                        <div className='room' key={roomIndex}>
                            <div className='room-name'>
                                {room.id}
                            </div>
                            <div className='room-time'>
                                {room.status &&
                                    room.status.map((status, statusIndex) => {
                                        const className = `room-time-child ${status}`;
                                        return (
                                            <div className={className} key={statusIndex}>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div >
                    );
                })



            }






        </>
    )
}


export default TableBooking;