import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getBookingByStudentId } from "../../../services/bookingServices";
import convertToLocalDateTime from "../../../utils/convertToLocalDateTime";
import DatePicker from "react-datepicker";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import "react-datepicker/dist/react-datepicker.css";
import "./ModalHistory.scss";

const History = ({ show, setShow }) => {
    const studentId = useSelector((state) => state.user.account.student_id);

    const [history, setHistory] = useState([]);
    const [filter, setFilter] = useState({
        isLately: null,
        startDate: null,
        endDate: null,
    });

    const [sortDirection, setSortDirection] = useState("asc");

    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpenDetailsModal = (item) => {
        setSelectedItem(item);
    };

    const handleCloseDetailsModal = () => {
        setSelectedItem(null);
    };

    useEffect(() => {
        if (!studentId) return;
        getBookingByStudentId(studentId, filter)
            .then((res) => {
                setHistory(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [filter, studentId]);

    const handleClose = () => {
        setShow(false);
    };

    const handleRadioChange = (event) => {
        if (event.target.value === "all") {
            setFilter({
                ...filter,
                isLately: null,
            });
        } else {
            setFilter({
                ...filter,
                isLately: true,
            });
        }
    };

    const handleSort = () => {
        const sortedHistory = [...history];
        if (sortDirection === "asc") {
            sortedHistory.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
            setSortDirection("desc");
        } else {
            sortedHistory.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setSortDirection("asc");
        }
        setHistory(sortedHistory);
    };

    const handleDateChange = (name, date) => {
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = date.getFullYear();

        const formattedDate = mm + "/" + dd + "/" + yyyy;

        setFilter({ ...filter, [name]: formattedDate });
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Lịch sử đặt phòng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="filter-container mb-3">
                        <div className="form-group row align-items-center">
                            <div className="col-sm-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="filterOption"
                                        id="all"
                                        value="all"
                                        checked={filter.isLately === null}
                                        onChange={handleRadioChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="all"
                                    >
                                        Tất cả
                                    </label>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="filterOption"
                                        id="late"
                                        value="isLately"
                                        checked={filter.isLately === true}
                                        onChange={handleRadioChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="late"
                                    >
                                        Trả trễ
                                    </label>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <DatePicker
                                    className="form-control"
                                    selected={filter.startDate}
                                    onChange={(date) =>
                                        handleDateChange("startDate", date)
                                    }
                                    placeholderText="Từ"
                                    dateFormat="MM/dd/yyyy"
                                />
                            </div>
                            <div className="col-sm-3">
                                <DatePicker
                                    className="form-control"
                                    selected={filter.endDate}
                                    onChange={(date) =>
                                        handleDateChange("endDate", date)
                                    }
                                    placeholderText="Đến"
                                    dateFormat="MM/dd/yyyy"
                                />
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Phòng</th>
                                <th scope="col">Thời gian mượn</th>
                                <th scope="col">Thời gian trả</th>
                                <th scope="col" onClick={handleSort}>
                                    Thời gian tạo {sortDirection === "asc" ? "↑" : "↓"}
                                </th>
                                <th scope="col">Tình trạng</th>
                                <th scope="col">Đã trả</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center">
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            ) : (
                                history?.map((item, index) => (
                                    <tr key={item.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.room.id}</td>
                                        <td>
                                            {convertToLocalDateTime(
                                                item.borrowTime
                                            )}
                                        </td>
                                        <td>
                                            {convertToLocalDateTime(
                                                item.returnTime
                                            )}
                                        </td>
                                        <td>
                                            {convertToLocalDateTime(
                                                item.createdAt
                                            )}
                                        </td>
                                        <td>{item.status.name}</td>
                                        <td>
                                            {item.isReturned == null
                                                ? ""
                                                : item.isReturned
                                                    ? "Yes"
                                                    : "No"}
                                        </td>
                                        <td>
                                            <IconButton
                                                className="details-button"
                                                color="primary"
                                                onClick={() =>
                                                    handleOpenDetailsModal(item)
                                                }
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
            <DetailsModal
                selectedItem={selectedItem}
                handleCloseDetailsModal={handleCloseDetailsModal}
            />
        </>
    );
};

const DetailsModal = (props) => {
    const { selectedItem, handleCloseDetailsModal } = props;
    return (
        <Modal show={selectedItem !== null} onHide={handleCloseDetailsModal}>
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
                            Đã trả:{" "}
                            {selectedItem.isReturned === null
                                ? ""
                                : selectedItem.isReturned
                                    ? "Yes"
                                    : "No"}
                        </p>
                        <h3 className="print-title">Chi tiết thiết bị mượn</h3>
                        <table className="table table-striped print-table">
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

export default History;
