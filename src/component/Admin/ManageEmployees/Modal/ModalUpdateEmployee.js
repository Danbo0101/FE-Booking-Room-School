import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { patchUpdateEmployee } from '../../../../services/employeeServices';
import { toast } from 'react-toastify';

const UpdateEmployee = (props) => {

    const { show, setShow, dataUpdate } = props;

    const [name, setName] = useState("");
    // const [cccd, setCCCD] = useState("");
    // const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleClose = () => {
        setShow(false)
        setName("");
        // setCCCD("");
        // setEmail("");
        setPhone("");
    };

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            // setCCCD(dataUpdate.identification_number);
            // setEmail(dataUpdate.email);
            setPhone(dataUpdate.phone_number);
        }
    }, [dataUpdate]);

    const handleSubmitUpdateStudent = async () => {

        let data =
        {
            name,
            phone_number: phone
        }

        // console.log(dataUpdate.employee_id, data)

        let res = await patchUpdateEmployee(dataUpdate.employee_id, data);
        if (!res.message) {
            props.fetchListEmployee();
            toast.success("Update Employee Success");
            handleClose();
        }
        else {
            toast.error(res.message);
        }



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
                <Modal.Title>Sửa thông tin nhân viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Tên</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    {/* <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={email}
                            // onChange={(event) => setEmail(event.target.value)}
                            disabled
                        />
                    </div> */}
                    <div className="col-md-6">
                        <label className="form-label">Số điện thoại</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                    {/* <div className="col-md-6">
                        <label className="form-label">CCCD</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={cccd}
                            // onChange={(event) => setCCCD(event.target.value)}
                            disabled
                        />
                    </div> */}

                </form>
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary"
                    onClick={handleClose}
                >
                    Close
                </Button> */}
                <Button variant="primary"
                    onClick={() => handleSubmitUpdateStudent()}
                >
                    Lưu thông tin
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateEmployee;