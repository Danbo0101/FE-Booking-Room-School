import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png'
import Language from './Language';
import { useTranslation, Trans } from 'react-i18next';
import "./Header.scss";



const Header = (props) => {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const { role } = props;


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {role && role === "ADMIN" ? (
                    <>
                        <NavLink to='/admin' className='navbar-brand'>
                            <img src={logo} />
                        </NavLink>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink to='manage-rooms' className='nav-link'>Room</NavLink>
                                <NavLink to='manage-users' className='nav-link'>User</NavLink>
                                <NavLink to='manage-devices' className='nav-link'>Device</NavLink>
                            </Nav>
                            <Nav>
                                <Language />
                                <NavDropdown title="Setting" id="basic-nav-dropdown">
                                    <NavDropdown.Item >Profile</NavDropdown.Item>
                                    <NavDropdown.Item
                                    // onClick={() => handleLogout()}
                                    >Log out</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </>)
                    : role === "USER" ? (
                        <>
                            <NavLink to='/users' className='navbar-brand'>
                                <img src={logo} />
                            </NavLink>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav>
                                    <Language />
                                    <NavDropdown title="Setting" id="basic-nav-dropdown">
                                        <NavDropdown.Item >Profile</NavDropdown.Item>
                                        <NavDropdown.Item
                                        // onClick={() => handleLogout()}
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
                                    <Nav className="me-auto">
                                        <NavLink to='/users' className='nav-link'>User</NavLink>
                                        <NavLink to='/admin' className='nav-link'>Admin</NavLink>
                                    </Nav>
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
    )

}

export default Header;