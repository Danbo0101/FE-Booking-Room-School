import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png'
import Language from '../Header/Language';
import './ForgotPassword.scss'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ImSpinner6 } from "react-icons/im";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useTranslation, Trans } from 'react-i18next';







const ForgotPassword = (props) => {

    const navigate = useNavigate();
    const { t } = useTranslation();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [otpClone, setOtpClone] = useState("");
    const [isReceiveOtp, setIsReceiveOtp] = useState(false);
    const [isShowChangePassword, setIsShowChangePassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);





    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleReceiveOTP = () => {
        let isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error(t('recovery.email.error'))
            return;
        }
        setIsReceiveOtp(true);
        setOtpClone('DANBO');
    }

    const handleKeyDownOTP = (event) => {
        // console.log(event.key);
        if (event.key === "Enter") {
            if (otp === otpClone) {
                setIsShowChangePassword(true);
                setIsReceiveOtp(false);
            }
            else {
                toast.warning(t('recovery.otp.error'));
            }
        }
    }

    const handleSubmitOTP = () => {
        if (otp === otpClone) {
            setIsShowChangePassword(true);
            setIsReceiveOtp(false);
        }
        else {
            toast.warning(t('recovery.otp.error'));
        }
    }

    const handleKeyDown = (event) => {
        // console.log(event.key);
        if (event.key === "Enter") {
            handleChangePassword();
        }
    }



    const handleChangePassword = () => {
        if (!password) {
            toast.error(t('recovery.password.error'))
            return;
        }
        setIsLoading(true);
        toast.success(t('recovery.success'));


        // setTimeout(handleLogin, 3000)

        navigate('/')


    }


    return (
        <div className="recovery-contanier">
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
                            {t('recovery.title')}
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
                                <label>{t('recovery.email.title')}</label>
                                <div className='input-container'>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        placeholder={t('recovery.email.content')}
                                        onChange={(event) => setEmail(event.target.value)}
                                    // onKeyDown={(event) => handleKeyDown(event)}
                                    />
                                    <button
                                        onClick={() => handleReceiveOTP()}
                                        disabled={isReceiveOtp}
                                    >
                                        {t('recovery.email.btn')}
                                    </button>
                                </div>
                            </div>
                            {isReceiveOtp
                                ?
                                <>
                                    <div className='message'>
                                        {t('recovery.otp.message')}
                                    </div>
                                </>
                                :
                                <>
                                </>
                            }
                            {isShowChangePassword ?
                                <>
                                    <div className="form-group">
                                        <label>{t('recovery.password.title')}</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            placeholder={t('recovery.password.content')}
                                            onChange={(event) => setPassword(event.target.value)}
                                            onKeyDown={(event) => handleKeyDown(event)}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            className="btn-submit"
                                            onClick={() => handleChangePassword()}
                                            disabled={isLoading}
                                        >{t('recovery.btn')}
                                            {isLoading === true && <ImSpinner6 className="loader-icon" />}
                                        </button>
                                    </div>
                                </>

                                :
                                <>
                                    <div className="form-group">
                                        <label>{t('recovery.otp.title')}</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={otp}
                                            placeholder={t('recovery.otp.content')}
                                            onChange={(event) => setOtp(event.target.value)}
                                            onKeyDown={(event) => handleKeyDownOTP(event)}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            className="btn-submit-otp"
                                            onClick={() => handleSubmitOTP()}
                                            disabled={isLoading}
                                        >{t('recovery.otp.btn')}
                                            {isLoading === true && <ImSpinner6 className="loader-icon" />}
                                        </button>
                                    </div></>

                            }

                            <div className='sign-in'>
                                {t('recovery.sign-in.ask')}
                                <span
                                    onClick={() => navigate('/login')}
                                >  {t('recovery.sign-in.btn')}
                                </span>

                            </div>

                        </div>
                    </div>
                </div>
            </PerfectScrollbar>


        </div>
    )
}

export default ForgotPassword;