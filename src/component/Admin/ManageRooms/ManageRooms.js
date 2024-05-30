import './ManageRooms.scss';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ManageRoom from './Rooms/ManageRoom';
import BookingRoom from './BookingRoom/BookingRoom';

const ManageRooms = (props) => {
    return (
        <div className='manage-rooms-container'>
            <div className="title-page">
                Manage Room
            </div>
            <hr />
            <div className="main-ms-container">
                <Tabs
                    defaultActiveKey="Rooms"
                    id="tab"
                    className="mb-3"
                    justify
                >
                    <Tab eventKey="Rooms" title="Rooms">
                        <ManageRoom />
                    </Tab>
                    <Tab eventKey="Booking-Room" title="Booking-Room">
                        <BookingRoom />
                    </Tab>

                </Tabs>


            </div>
        </div>
    )
}

export default ManageRooms;