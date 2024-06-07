import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import logo from '../../assets/Logo.png'
import Language from '../Header/Language';
import './Login.scss'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ImSpinner6 } from "react-icons/im";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useTranslation, Trans } from 'react-i18next';
import { doLogin } from '../../redux/action/userAction';
import { postLogin } from '../../services/authServices';
import { Toast } from 'react-bootstrap';


const Login = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [dataClone, setDataClone] = useState({
        email: "p@gmail.com",
        name: "Phuong",
        role: "ADMIN",
        access_token: "dadasdwqdwqqwdewfcef"
    })


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleKeyDown = (event) => {
        // console.log(event.key);
        if (event.key === "Enter") {
            handleLogin();
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };



    const handleLogin = async () => {
        let isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error(t('login.email.error'))
            return;
        }
        if (!password) {
            toast.error(t('login.password.error'))
            return;
        }
        setIsLoading(true);

        let dataLogin = {
            email: email,
            password: password
        }

        let data = await postLogin(dataLogin);
        if (data.message) {
            setIsLoading(false);
            toast.error('Invalid Login');
        }
        else {
            toast.success('Login Success')
            dispatch(doLogin(data));
            navigateLogin(data.role)
        }
        // console.log(data);
    }

    const navigateLogin = (role) => {
        if (role === 2) {
            navigate('/admin')
        }
        else if (role === 3) {
            navigate('/')
        }
        else {
            navigate('/students')
        }
    }


    return (
        <div className="login-contanier">
            <div className="header-container">
                <span
                    className='logo'
                    onClick={() => navigate('/')}
                >
                    <img src={logo} />
                </span>
                <Language />
            </div>
            <PerfectScrollbar>
                <div className="main-container">
                    <div className='content'>
                        <div className="title mx-auto">
                            {t('login.title')}
                        </div>
                        <div className="welcome mx-auto">
                            PT Booking
                            <div className='welcome-sub'>
                                <hr />
                                PTIT SCHOOL
                                <hr />
                            </div>



                        </div>
                        <div className="content-form  mx-auto">
                            <div className="form-group">
                                <label> {t('login.email.title')}</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    placeholder={t('login.email.content')}
                                    onChange={(event) => setEmail(event.target.value)}
                                    onKeyDown={(event) => handleKeyDown(event)}
                                />
                            </div>
                            <div className="form-group">
                                <label>{t('login.password.title')}</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    placeholder={t('login.password.content')}
                                    onChange={(event) => setPassword(event.target.value)}
                                    onKeyDown={(event) => handleKeyDown(event)}
                                />
                            </div>
                            <span
                                className="forgot"
                                onClick={() => navigate('/forgot-password')}
                            >{t('login.forgot-password')}
                            </span>
                            <div>
                                <button
                                    className="btn-submit"
                                    onClick={() => handleLogin()}
                                    disabled={isLoading}
                                >{t('login.btn')}
                                    {isLoading === true && <ImSpinner6 className="loader-icon" />}
                                </button>
                            </div>
                            <div className='sign-up'>
                                {t('login.sign-up.ask')}
                                <span
                                    onClick={() => navigate('/register')}
                                >  {t('login.sign-up.btn')}
                                </span>

                            </div>

                        </div>
                    </div>



                </div>
            </PerfectScrollbar>


        </div>
    )
}

export default Login;