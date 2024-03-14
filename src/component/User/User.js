
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Header from "../Header/Header"
import Accordion from 'react-bootstrap/Accordion';
import './User.scss';
import { useSelector } from 'react-redux';
import BookingRoom from './Modal/ModalBookingRoom';



const User = () => {

    // const role = useSelector(state => state.user.account.role);
    const role = "USER";
    return (
        <div className="user-contanier">
            <div className="header-container">
                <Header
                    role={role}
                />
            </div>
            <div className="main-container">
                <PerfectScrollbar>
                    <div className='content'>
                        <Outlet />
                        {role && role === "USER" ?
                            <div>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Booking Room</Accordion.Header>
                                        <Accordion.Body>
                                            <BookingRoom />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            :
                            <>
                            </>
                        }
                    </div>
                </PerfectScrollbar>
            </div>
        </div>
    )
}

export default User;