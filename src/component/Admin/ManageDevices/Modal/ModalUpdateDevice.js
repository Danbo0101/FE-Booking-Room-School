import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UpdateDevice = (props) => {

    const { show, dataUpdate } = props;
    // console.log(dataUpdate)

    const [nameDevice, setNameDevice] = useState('');



    const handleNameDevice = () => {
        const deviceNames = {
            KEY: "Key",
            RM: "Remote",
            Mic: "Mic",
            HDMI: "Cáp HDMI",
            MC: "Máy Chiếu"
        };
        if (dataUpdate && dataUpdate.category) {
            setNameDevice(deviceNames[dataUpdate.category]);
        }
    }

    useEffect(() => {
        handleNameDevice()
    }, [dataUpdate])


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
                <Modal.Title>Update Status {nameDevice} In Room {dataUpdate.room}</Modal.Title>
            </Modal.Header>
            {dataUpdate.status === "Hoạt động" ?
                <Modal.Body>
                    Do you agree to change the status {nameDevice} of room {dataUpdate.room} from <strong>Activity</strong> to <strong>Inactivity</strong>?
                </Modal.Body>
                :
                <Modal.Body>
                    Do you agree to change the status {nameDevice} of room {dataUpdate.room} from <strong>Inactivity</strong> to <strong>Activity</strong>?
                </Modal.Body>
            }

            <Modal.Footer>
                <Button variant="secondary"
                    onClick={handleClose}
                >
                    Close
                </Button>
                <Button variant="primary"
                    onClick={() => props.handleUpdateStatusDevice()}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )


}

export default UpdateDevice;