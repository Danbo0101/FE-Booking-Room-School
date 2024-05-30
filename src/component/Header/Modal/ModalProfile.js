import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from 'react';
import './ModalProfile.scss';
import { patchUpdatePassword } from '../../../services/authServices';




const Profile = (props) => {

    const { show } = props;

    const handleClose = () => {
        props.setShow(false)
    }

    const [name, setName] = useState(useSelector(state => state.user.account.name));
    const [email, setEmail] = useState(useSelector(state => state.user.account.email));
    const [phoneNumber, setPhoneNumber] = useState(useSelector(state => state.user.account.phone_number));
    const [cccd, setCCCD] = useState(useSelector(state => state.user.account.cccd));
    const [className, setClassName] = useState(useSelector(state => state.user.account.class_name));
    const [role, setRole] = useState(useSelector(state => state.user.account.role));

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const resetDataUpdate = () => {
        setCurrentPassword('');
        setConfirmPassword('');
        setNewPassword('');
        handleClose();
    }


    const handleUpdatePassword = async () => {

        switch (true) {
            case !currentPassword:
                toast.error("Invalid Current Password");
                return;
            case !newPassword:
                toast.error("Invalid New Password");
                return;
            case !confirmPassword:
                toast.error("Invalid Confirm Password");
                return;
            default:
                break;
        }

        if (newPassword === confirmPassword) {
            let data = { currentPassword, newPassword };
            let res = await patchUpdatePassword(data);
            if (res.statusCode === 200) {
                toast.success(res.message);
                resetDataUpdate();
            }
            else {
                toast.error(res.message);
            }
            // console.log(res.statusCode)
        }
        else toast.warn("Confirm Password Different New Password")


    }



    return (
        <Modal
            show={show}
            onHide={handleClose}
            size='xl'
            backdrop="static"
            className='modal-add-user'
        >
            <Modal.Header closeButton>
                <Modal.Title>Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="profile" title="Profile">
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    disabled
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={email}
                                    disabled
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={phoneNumber}
                                    disabled
                                />
                            </div>

                            {role && role === 2 ?
                                <div className="col-md-6">
                                    <label className="form-label">CCCD</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={cccd}
                                        disabled
                                    />
                                </div>
                                :
                                <div className="col-md-6">
                                    <label className="form-label">Class Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={className}
                                        disabled
                                    />
                                </div>
                            }


                        </form>
                    </Tab>
                    <Tab eventKey="changepassword" title="Change Password">
                        <form className="row g-3">
                            <div className="col-md-12">
                                <label className="form-label">Current Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <div className='btn-submit'>
                                <Button variant="outline-primary"
                                    onClick={handleUpdatePassword}
                                >
                                    Change Password
                                </Button>
                            </div>




                        </form>
                    </Tab>
                </Tabs>

            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    )
}

export default Profile;
