import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { patchUpdateEmployee } from '../../../../services/employeeServices';


const DeleteEmployee = (props) => {

    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteEmployee = async () => {
        // console.log(dataDelete.employee_id)

        let status = { status: 9 };

        let res = await patchUpdateEmployee(dataDelete.employee_id, status)
        if (!res.message) {
            props.setCurrentPage(1)
            props.fetchListEmployee();
            toast.success("Delete Employee Success");
            handleClose();
        }
        else {
            console.log(res.message);
            toast.error("Delete Employee Fail");
            handleClose();

        }
    }


    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
        >
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete the Employee ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure Delete the Employee.
                <br />
                Name :
                <b>
                    {dataDelete && dataDelete.name ? dataDelete.name : ""}
                </b>
                <br />
                With Email :
                <b>
                    {dataDelete && dataDelete.email ? dataDelete.email : ""}
                </b>
                <br />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary"
                    onClick={() => handleSubmitDeleteEmployee()}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default DeleteEmployee;