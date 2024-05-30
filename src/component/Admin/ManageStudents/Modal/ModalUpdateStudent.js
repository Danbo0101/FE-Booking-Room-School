import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';

const UpdateStudent = (props) => {

    const { show, setShow, dataUpdate } = props;

    const [name, setName] = useState("");
    const [className, setClassName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleClose = () => {
        setShow(false)
        setName("");
        setClassName("");
        setEmail("");
        setPhone("");
    };

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            setClassName(dataUpdate.className);
            setEmail(dataUpdate.email);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate]);

    const handleSubmitUpdateStudent = () => {
        console.log(name, email, className, phone)
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
                <Modal.Title>Update A Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Class</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={className}
                            onChange={(event) => setClassName(event.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"
                    onClick={handleClose}
                >
                    Close
                </Button>
                <Button variant="primary"
                    onClick={handleSubmitUpdateStudent}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateStudent;