import './ManageRooms.scss';

import ManageRoom from './Rooms/ManageRoom';


const ManageRooms = (props) => {
    return (
        <div className='manage-rooms-container'>
            <div className="title-page">
                Quản lý phòng
            </div>
            <hr />
            <div className="main-ms-container">
                <ManageRoom />
            </div>
        </div>
    )
}

export default ManageRooms;