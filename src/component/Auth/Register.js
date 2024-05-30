import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png'
import Language from '../Header/Language';
import './Register.scss'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ImSpinner6 } from "react-icons/im";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useTranslation, Trans } from 'react-i18next';
import { postRegister } from '../../services/authServices';








const Register = (props) => {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const [studentId, setStudentId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [className, setClassName] = useState("");
    const [agree, setAgree] = useState(false);
    const [isLoading, setIsLoading] = useState(false);




    const handleKeyDown = (event) => {
        // console.log(event.key);
        if (event.key === "Enter") {
            handleSignUp();
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleChecked = (event) => {
        setAgree(event.target.checked);
    };

    const capitalizeName = (name) => {
        let words = name.toLowerCase().split(" ");
        let capitalizedWords = words.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
        return capitalizedWords.join(" ");
    }


    const handleSignUp = () => {
        // if (agree) {
        let isValidEmail = validateEmail(email)
        let phoneNumberPattern = /^(0[2-9]\d{8}|84[2-9]\d{7}|(0[2-9]|84[2-9])(\d{2}-){3}\d{2})$/;
        console.log(phoneNumber)
        switch (true) {
            case !studentId:
                toast.error("Invalid MSSV");
                return;
            case !className:
                toast.error("Invalid Class Name");
                return;
            case !name:
                toast.error(t('register.user-name.error'));
                return;
            case !isValidEmail:
                toast.error(t('register.email.error'));
                return;
            case !password:
                toast.error(t('register.password.error'));
                return;
            case !phoneNumber || !phoneNumberPattern.test(phoneNumber):
                toast.error("Invalid Phone Number");
                return;
            default:
                break;
        }

        let dataRegister = {
            student_id: studentId,
            name,
            email,
            password,
            phone_number: phoneNumber,
            class_name: className,
        }

        // console.log(dataRegister);
        let data = postRegister(dataRegister);
        console.log(data);
        if (data.statusCode === 400) {
            toast.error(data.message);
        }
        else {
            setIsLoading("check", true);
            toast.success(t('register.success'));
            navigate('/login');
        }



        // }
        // else {
        //     toast.warning(t('register.agree.error'))
        // }



        // setTimeout(handleLogin, 3000)



        // navigate('/')


    }


    return (
        <div className="register-contanier">
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
                            {t('register.title')}
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
                            <div className="row">
                                <div className="form-group col">
                                    <label>Student Id</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={studentId}
                                        placeholder="MSSV"
                                        onChange={(event) => setStudentId((event.target.value).toUpperCase())}
                                        onKeyDown={(event) => handleKeyDown(event)}
                                    />
                                </div>
                                <div className="form-group col">
                                    <label>Class Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={className}
                                        placeholder="Class Name"
                                        onChange={(event) => setClassName((event.target.value).toUpperCase())}
                                        onKeyDown={(event) => handleKeyDown(event)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label> {t('register.user-name.title')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    placeholder={t('register.user-name.content')}
                                    onChange={(event) => setName(capitalizeName(event.target.value))}
                                    onKeyDown={(event) => handleKeyDown(event)}
                                />
                            </div>
                            <div className="form-group">
                                <label>{t('register.email.title')}</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    placeholder={t('register.email.content')}
                                    onChange={(event) => setEmail(event.target.value)}
                                    onKeyDown={(event) => handleKeyDown(event)}
                                />
                            </div>
                            <div className="form-group">
                                <label>{t('register.password.title')}</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    placeholder={t('register.password.content')}
                                    onChange={(event) => setPassword(event.target.value)}
                                    onKeyDown={(event) => handleKeyDown(event)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={phoneNumber}
                                    placeholder="Phone Number "
                                    onChange={(event) => setPhoneNumber(event.target.value)}
                                    onKeyDown={(event) => handleKeyDown(event)}
                                />
                            </div>

                            {/* <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    // checked={agree}
                                    // onChange={handleChecked}
                                    id="agree-checkbox"
                                />
                                <label className="form-check-label" htmlFor="agree-checkbox">
                                    {t('register.agree.content')}
                                </label>
                            </div> */}


                            <div>
                                <button
                                    className="btn-submit"
                                    onClick={() => handleSignUp()}
                                    disabled={isLoading}
                                > {t('register.btn')}
                                    {isLoading === true && <ImSpinner6 className="loader-icon" />}
                                </button>
                            </div>
                            <div className='sign-up'>
                                {t('register.sign-in.ask')}
                                <span
                                    onClick={() => navigate('/login')}
                                >{t('register.sign-in.btn')}
                                </span>

                            </div>

                        </div>
                    </div>



                </div>
            </PerfectScrollbar>


        </div>
    )
}

export default Register;