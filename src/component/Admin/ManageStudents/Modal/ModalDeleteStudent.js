import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const DeleteStudent = (props) => {

    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);


    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
        >
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete the Student ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure Delete the Student.
                <br />
                Name :
                <b>
                    {dataDelete && dataDelete.name ? dataDelete.name : ""}
                </b>
                <br />
                In Class :
                <b>
                    {dataDelete && dataDelete.className ? dataDelete.className : ""}
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
                    onClick={() => { props.handleSubmitDeleteStudent() }}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default DeleteStudent;