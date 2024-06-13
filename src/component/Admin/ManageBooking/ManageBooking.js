import "./ManageBooking.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BookingToday from "./BookingToday/BookingToday";
import HistoryBooking from "./HistoryBooking/HistoryBooking";

const ManageBooking = (props) => {
    return (
        <div className="manage-booking-container">
            <div className="title-page">Quản lý đặt phòng</div>
            <hr />
            <div className="main-ms-container">
                <Tabs
                    defaultActiveKey="Lịch đặt phòng hôm nay"
                    id="tab"
                    className="mb-3"
                    justify
                >
                    <Tab eventKey="Lịch đặt phòng hôm nay" title="Lịch đặt phòng hôm nay">
                        <BookingToday />
                    </Tab>
                    <Tab eventKey="Lịch sử đặt phòng" title="Lịch sử đặt phòng">
                        <HistoryBooking />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default ManageBooking;
