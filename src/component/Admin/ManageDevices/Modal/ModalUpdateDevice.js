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
                <Modal.Title>Thay đổi trạng thái của {nameDevice} trong phòng {dataUpdate.room}</Modal.Title>
            </Modal.Header>
            {dataUpdate.status === "Hoạt động" ?
                <Modal.Body>
                    Bạn có đồng ý thay đổi trạng thái của thiết bị {nameDevice} thuộc phòng {dataUpdate.room} từ <strong>Hoạt động</strong> sang <strong>Mất</strong> không?
                </Modal.Body>
                :
                <Modal.Body>
                    Bạn có đồng ý thay đổi trạng thái của thiết bị {nameDevice} thuộc phòng {dataUpdate.room} từ <strong>Hoạt động</strong> sang <strong>Mất</strong> không?
                </Modal.Body>
            }

            <Modal.Footer>
                <Button variant="primary"
                    onClick={() => props.handleUpdateStatusDevice()}
                >
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    )


}

export default UpdateDevice;