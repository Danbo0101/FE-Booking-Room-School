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
                <Modal.Title>Thay đổi trạng thái phòng {dataUpdate.roomId}</Modal.Title>
            </Modal.Header>
            {dataUpdate.roomStatus === "Hoạt động" ?
                <Modal.Body>
                    Bạn có đồng ý thay đổi trạng thái phòng {dataUpdate.roomId} từ <strong>Hoạt Động</strong> sang <strong>Bảo trì</strong> không?
                </Modal.Body>
                :
                <Modal.Body>
                    Bạn có đồng ý thay đổi trạng thái phòng {dataUpdate.roomId} từ <strong>Bảo trì</strong> sang <strong>Hoạt Động</strong> không?
                </Modal.Body>
            }

            <Modal.Footer>
                {/* <Button variant="secondary"
                    onClick={handleClose}
                >
                    Close
                </Button> */}
                <Button variant="primary"
                    onClick={() => props.handleUpdateStatusRoom()}
                >
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    )


}

export default UpdateRoom;