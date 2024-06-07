import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png'
import Language from './Language';
import { useTranslation, Trans } from 'react-i18next';
import "./Header.scss";
import Profile from './Modal/ModalProfile';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { doLogout } from '../../redux/action/userAction';
import { toast } from 'react-toastify';




const Header = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { role } = props;

    const [showProfile, setShowProfile] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    const handleLogout = () => {
        dispatch(doLogout());
        navigate('/');
        toast("Log Out Success");
    }



    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    {role && role === 2 ? (
                        <>
                            <NavLink to='/admin' className='navbar-brand'>
                                <img src={logo} />
                            </NavLink>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to='manage-rooms' className='nav-link'>Room</NavLink>
                                    <NavLink to='manage-students' className='nav-link'>Student</NavLink>
                                    <NavLink to='manage-employees' className='nav-link'>Employee</NavLink>
                                    <NavLink to='manage-devices' className='nav-link'>Device</NavLink>
                                </Nav>
                                <Nav>
                                    <Language />
                                    <NavDropdown title="Setting" id="basic-nav-dropdown">
                                        <NavDropdown.Item
                                            onClick={() => setShowProfile(true)}
                                        >Profile</NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={() => handleLogout()}
                                        >Log out</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </>)
                        : role === 1 ? (
                            <>
                                <NavLink to='/students' className='navbar-brand'>
                                    <img src={logo} />
                                </NavLink>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav>
                                        <Language />
                                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                                            <NavDropdown.Item
                                                onClick={() => setShowProfile(true)}
                                            >Profile</NavDropdown.Item>
                                            <NavDropdown.Item
                                                onClick={() => setShowHistory(true)}
                                            >History</NavDropdown.Item>
                                            <NavDropdown.Item
                                                onClick={() => handleLogout()}
                                            >Log out</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                            </>)
                            : (
                                <>
                                    <NavLink to='/' className='navbar-brand'>
                                        <img src={logo} />
                                    </NavLink>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        {/* <Nav className="me-auto">
                                            <NavLink to='/students' className='nav-link'>Student</NavLink>
                                            <NavLink to='/admin' className='nav-link'>Admin</NavLink>
                                        </Nav> */}
                                        <Nav>
                                            <>
                                                <button
                                                    className='btn-login'
                                                    onClick={() => navigate('/login')}
                                                >
                                                    {t('header.btnLogin')}
                                                </button>
                                                <button
                                                    className='btn-signup'
                                                    onClick={() => navigate('/register')}
                                                >
                                                    {t('header.btnSignUp')}
                                                </button>
                                            </>
                                            <Language />
                                        </Nav>
                                    </Navbar.Collapse>
                                </>)
                    }
                </Container>
            </Navbar >
            <Profile
                show={showProfile}
                setShow={setShowProfile}
            />
        </>
    )

}

export default Header;