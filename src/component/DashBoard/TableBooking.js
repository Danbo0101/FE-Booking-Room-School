import { IoTriangleOutline } from "react-icons/io5";
import { FaRegSquare } from "react-icons/fa";


const TableBooking = (props) => {

    const { listRoomTime, floor } = props;


    return (
        <>
            <div className='title'>
                <div className='title-main'>
                    <IoTriangleOutline />
                    Floor {floor}
                </div>
                <div className='title-sub'>
                    <div className='title-available'>
                        <FaRegSquare />
                        Available
                    </div>
                    <div className='title-unavailable'>
                        <FaRegSquare />
                        Unavailable
                    </div>
                </div>

            </div>
            <div className='room'>
                <div className='room-name'>
                    Room
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
            {listRoomTime &&
                listRoomTime.map((room, index) => {
                    return (
                        <div className='room' key={index}>
                            <div className='room-name'>
                                {room.id}
                            </div>
                            <div className='room-time'>
                                {[...Array(5)].map((_, timeIndex) => {
                                    const timeSlot = room.time[timeIndex];
                                    const isActive = timeSlot && timeSlot.borrowTime && timeSlot.returnTime;
                                    const className = isActive ? 'room-time-child active' : 'room-time-child passive';
                                    return <div className={className} key={timeIndex}></div>;
                                })}
                            </div>
                        </div>
                    )
                })}

        </>
    )
}


export default TableBooking;