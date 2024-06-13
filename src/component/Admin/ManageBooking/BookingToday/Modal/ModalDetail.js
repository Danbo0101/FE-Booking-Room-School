import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import convertToLocalDateTime from "../../../../../utils/convertToLocalDateTime";


const DetailsModal = (props) => {


    const { show, selectedItem } = props;

    const handleClose = () => {
        props.setShow(false)
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết phiếu mượn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedItem && (
                    <>
                        <p>Phòng: {selectedItem.room.id}</p>
                        <p>
                            Thời gian mượn:{" "}
                            {convertToLocalDateTime(selectedItem.borrowTime)}
                        </p>
                        <p>
                            Thời gian trả:{" "}
                            {convertToLocalDateTime(selectedItem.returnTime)}
                        </p>
                        <p>
                            Thời gian tạo:{" "}
                            {convertToLocalDateTime(selectedItem.createdAt)}
                        </p>
                        <p>Tình trạng: {selectedItem.status.name}</p>
                        <p>
                            Đã trả :{" "}
                            {selectedItem.isReturned === null
                                ? ""
                                : selectedItem.isReturned
                                    ? "Yes"
                                    : "No"}
                        </p>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">ID phiếu mượn</th>
                                    <th scope="col">ID thiết bị</th>
                                    <th scope="col">Thời gian trả</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedItem.bookingDetails.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            Không có dữ liệu
                                        </td>
                                    </tr>
                                ) : (
                                    selectedItem.bookingDetails.map(
                                        (item, index) => (
                                            <tr key={item.device_id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.booking_id}</td>
                                                <td>{item.device_id}</td>
                                                <td>
                                                    {item.returnedTime
                                                        ? convertToLocalDateTime(
                                                            item.returnedTime
                                                        )
                                                        : "Chưa trả"}
                                                </td>
                                            </tr>
                                        )
                                    )
                                )}
                            </tbody>
                        </table>
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default DetailsModal;