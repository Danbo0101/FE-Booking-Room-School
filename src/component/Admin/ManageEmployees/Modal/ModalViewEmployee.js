import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';

const ViewEmployee = (props) => {

    const { show, setShow, dataView } = props;

    const [name, setName] = useState("");
    const [cccd, setCCCD] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleClose = () => {
        setShow(false)
        setName("");
        setCCCD("");
        setEmail("");
        setPhone("");
    };

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setName(dataView.name);
            setCCCD(dataView.identification_number);
            setEmail(dataView.email);
            setPhone(dataView.phone_number);
        }
    }, [dataView]);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size='xl'
            backdrop="static"
            className='modal-add-user'
        >
            <Modal.Header closeButton>
                <Modal.Title>Xem thông tin nhân viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Tên</label>
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
                        <label className="form-label">CCCD</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cccd}
                            disabled
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Số điện thoại</label>
                        <input
                            type="text"
                            className="form-control"
                            value={phone}
                            disabled
                        />
                    </div>
                </form>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary"
                    onClick={handleClose}
                >
                    Close
                </Button>
            </Modal.Footer> */}
        </Modal>
    )
}

export default ViewEmployee;