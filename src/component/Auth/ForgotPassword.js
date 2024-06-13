import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import Language from "../Header/Language";
import "./ForgotPassword.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { ImSpinner6 } from "react-icons/im";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useTranslation, Trans } from "react-i18next";
import { forgotPassword } from "../../services/authServices";

const ForgotPassword = (props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleReceiveOTP = async () => {
        let isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error(t("recovery.email.error"));
            return;
        }
        setIsLoading(true);
        const response = await forgotPassword({ email: email });
        setIsLoading(false);
        if (response.statusCode === 200) {
            toast.success(
                "Mật khẩu đã được gửi vào email của bạn. Vui lòng kiểm tra email của bạn."
            );
            navigate("/login", { state: { email: email } });
        } else {
            toast.error("Email không tồn tại trong hệ thống.Vui lòng thử lại.");
        }
    };

    return (
        <div className="recovery-contanier">
            <div className="header-container">
                <span className="logo" onClick={() => navigate("/")}>
                    <img src={logo} />
                </span>
                <Language />
            </div>
            <PerfectScrollbar>
                <div className="main-container">
                    <div className="content">
                        <div className="title mx-auto">
                            {t("recovery.title")}
                        </div>
                        <div className="welcome mx-auto">
                            PT Booking
                            <div className="welcome-sub">
                                <hr />
                                PTIT SCHOOL
                                <hr />
                            </div>
                        </div>
                        <div className="content-form  mx-auto">
                            <div className="form-group">
                                <label>{t("recovery.email.title")}</label>
                                <div className="input-container">
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        placeholder={t(
                                            "recovery.email.content"
                                        )}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                    />
                                    <button
                                        onClick={() => handleReceiveOTP()}
                                        disabled={isLoading}
                                        className="btn-submit"
                                    >
                                        {isLoading ? (
                                            <ImSpinner6 className="loader-icon" />
                                        ) : (
                                            t("recovery.email.btn")
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="sign-in">
                                {t("recovery.sign-in.ask")}
                                <span onClick={() => navigate("/login")}>
                                    {" "}
                                    {t("recovery.sign-in.btn")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </PerfectScrollbar>
        </div>
    );
};

export default ForgotPassword;
