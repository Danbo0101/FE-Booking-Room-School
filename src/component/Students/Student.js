
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Header from "../Header/Header"
import Accordion from 'react-bootstrap/Accordion';
import './Student.scss';
import BookingRoom from './Modal/ModalBookingRoom';
import { useSelector } from 'react-redux';



const Student = () => {

    const role = useSelector(state => state.user.account.role);

    return (
        <div className="student-contanier">
            <div className="header-container">
                <Header
                    role={role}
                />
            </div>
            <div className="main-container">
                <PerfectScrollbar>
                    <div className='content'>
                        <Outlet />
                        {role && role === 1 ?
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

export default Student;