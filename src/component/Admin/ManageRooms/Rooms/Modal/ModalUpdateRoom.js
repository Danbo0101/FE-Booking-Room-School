import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UpdateRoom = (props) => {

    const { show, dataUpdate } = props;
    // console.log(dataUpdate)


    const handleClose = () => {
        props.setShow(false)
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
                <Modal.Title>Update Status In Room {dataUpdate.roomId}</Modal.Title>
            </Modal.Header>
            {dataUpdate.roomStatus === "Hoạt động" ?
                <Modal.Body>
                    Do you agree to change the status of room {dataUpdate.roomId} from <strong>Operation</strong> to <strong>Maintenance</strong>?
                </Modal.Body>
                :
                <Modal.Body>
                    Do you agree to change the status of room {dataUpdate.roomId} from <strong>Maintenance</strong> to <strong>Operation</strong>?
                </Modal.Body>
            }

            <Modal.Footer>
                <Button variant="secondary"
                    onClick={handleClose}
                >
                    Close
                </Button>
                <Button variant="primary"
                    onClick={() => props.handleUpdateStatusRoom()}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )


}

export default UpdateRoom;