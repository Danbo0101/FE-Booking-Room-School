import React, { useState, useEffect, useRef } from "react";
import convertToLocalDateTime from "../../../../utils/convertToLocalDateTime";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import PrintIcon from "@mui/icons-material/Print";
import { getAllBooking } from "../../../../services/bookingServices";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";

const HistoryBooking = () => {
  const [history, setHistory] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState({
    isLately: null,
    startDate: null,
    endDate: null,
  });

  const componentRef = useRef();

  useEffect(() => {
    getAllBooking(filter).then((res) => {
      setHistory(res);
    });
  }, [filter]);

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

  const handleOpenDetailsModal = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetailsModal = () => {
    setSelectedItem(null);
  };

  const handleDateChange = (name, date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    const formattedDate = mm + "/" + dd + "/" + yyyy;

    setFilter({ ...filter, [name]: formattedDate });
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

  const handlePrint = (item) => {
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Print</title>");
    printWindow.document.write(`
        <style>
            .print-title { text-align: center; margin-bottom: 20px; }
            .print-table { width: 100%; border-collapse: collapse; }
            .print-table th, .print-table td { border: 1px solid black; padding: 8px; text-align: left; }
        </style>
    `);
    printWindow.document.write("</head><body>");
    printWindow.document.write(
      "<div style='text-align: center;'><span class='header-left'>HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</span><span class='header-center'> CƠ SỞ TẠI TP. HỒ CHÍ MINH</span><span class='header-right'><br />PHÒNG TỔ CHỨC - HÀNH CHÍNH - QUẢN TRỊ</span></div><div style='clear: both;'></div>"
    );
    printWindow.document.write(
      `<h2 class='print-title'>CHI TIẾT PHIẾU MƯỢN ${item.room.id}</h2>`
    );
    printWindow.document.write(`<p>Phòng: ${item.room.id}</p>`);
    printWindow.document.write(
      `<p>Thời gian mượn: ${convertToLocalDateTime(item.borrowTime)}</p>`
    );
    printWindow.document.write(
      `<p>Thời gian trả: ${convertToLocalDateTime(item.returnTime)}</p>`
    );
    printWindow.document.write(
      `<p>Thời gian tạo: ${convertToLocalDateTime(item.createdAt)}</p>`
    );
    printWindow.document.write(`<p>Trạng thái: ${item.status.name}</p>`);
    printWindow.document.write(
      `<p>Đã trả: ${item.isReturned == null ? "" : item.isReturned ? "Đã trả" : "Chưa trả"
      }</p>`
    );
    // printWindow.document.write("<h3 class='print-title'>Booking Details</h3>");
    printWindow.document.write("<table class='print-table'>");
    printWindow.document.write("<thead><tr>");
    printWindow.document.write("<th scope='col'>STT</th>");
    printWindow.document.write("<th scope='col'>MÃ PHÒNG</th>");
    printWindow.document.write("<th scope='col'>MÃ THIẾT BỊ</th>");
    printWindow.document.write("<th scope='col'>THỜI GIAN TRẢ</th>");
    printWindow.document.write("</tr></thead><tbody>");

    item.bookingDetails.forEach((detail, index) => {
      printWindow.document.write("<tr>");
      printWindow.document.write(`<th scope='row'>${index + 1}</th>`);
      printWindow.document.write(`<td>${detail.booking_id}</td>`);
      printWindow.document.write(`<td>${detail.device_id}</td>`);
      printWindow.document.write(
        `<td>${detail.returnedTime
          ? convertToLocalDateTime(detail.returnedTime)
          : "Chưa trả"
        }</td>`
      );
      printWindow.document.write("</tr>");
    });

    printWindow.document.write("</tbody></table>");
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const handlePrintAll = () => {
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Print</title>");
    printWindow.document.write(`
        <style>
            .print-title { text-align: center; margin-bottom: 20px; }
            .print-table { width: 100%; border-collapse: collapse; }
            .print-table th, .print-table td { border: 1px solid black; padding: 8px; text-align: left; }
            .header-left { float: left; }
            .header-right { float: right; }
        </style>
    `);
    printWindow.document.write("</head><body>");
    printWindow.document.write(
      "<div style='text-align: center;'><span class='header-left'>HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</span><br /><span class='header-center'>CƠ SỞ TẠI TP. HỒ CHÍ MINH</span><span class='header-right'>PHÒNG TỔ CHỨC - HÀNH CHÍNH - QUẢN TRỊ</span></div><div style='clear: both;'></div>"
    );
    printWindow.document.write(
      "<h2 class='print-title'>DANH SÁCH PHIẾU MƯỢN</h2>"
    );
    printWindow.document.write("<table class='print-table'>");
    printWindow.document.write("<thead><tr>");
    printWindow.document.write("<th scope='col'>STT</th>");
    printWindow.document.write("<th scope='col'>MÃ PHÒNG</th>");
    printWindow.document.write("<th scope='col'>MÃ THIẾT BỊ</th>");
    printWindow.document.write("<th scope='col'>THỜI GIAN TRẢ</th>");
    printWindow.document.write("<th scope='col'>TRẠNG THÁI</th>");
    printWindow.document.write("<th scope='col'>ĐÃ TRẢ</th>");
    printWindow.document.write("</tr></thead><tbody>");

    history.forEach((item, index) => {
      printWindow.document.write("<tr>");
      printWindow.document.write(`<th scope='row'>${index + 1}</th>`);
      printWindow.document.write(`<td>${item.room.id}</td>`);
      printWindow.document.write(
        `<td>${item.bookingDetails[0].device_id}</td>`
      );
      printWindow.document.write(
        `<td>${item.bookingDetails[0].returnedTime
          ? convertToLocalDateTime(item.bookingDetails[0].returnedTime)
          : "Chưa trả"
        }</td>`
      );
      printWindow.document.write(`<td>${item.status.name}</td>`);
      printWindow.document.write(
        `<td>${item.isReturned == null ? "" : item.isReturned ? "Đã trả" : "Chưa trả"
        }</td>`
      );
      printWindow.document.write("</tr>");
    });

    printWindow.document.write("</tbody></table>");
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
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
              <label className="form-check-label" htmlFor="all">
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
              <label className="form-check-label" htmlFor="late">
                Trả trễ
              </label>
            </div>
          </div>
          <div className="col-sm-3">
            <DatePicker
              className="form-control"
              selected={filter.startDate}
              onChange={(date) => handleDateChange("startDate", date)}
              placeholderText="Từ"
              dateFormat="MM/dd/yyyy"
            />
          </div>
          <div className="col-sm-3">
            <DatePicker
              className="form-control"
              selected={filter.endDate}
              onChange={(date) => handleDateChange("endDate", date)}
              placeholderText="Đến"
              dateFormat="MM/dd/yyyy"
            />
          </div>
        </div>
      </div>
      <button onClick={handlePrintAll} className="btn btn-primary mb-3">
        In danh sách
      </button>

      <table id="history-table" className="table table-striped print-table">
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
                <td>{convertToLocalDateTime(item.borrowTime)}</td>
                <td>{convertToLocalDateTime(item.returnTime)}</td>
                <td>{convertToLocalDateTime(item.createdAt)}</td>
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
                    color="primary"
                    onClick={() => handleOpenDetailsModal(item)}>
                    <InfoIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handlePrint(item)}>
                    <PrintIcon />
                  </IconButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Modal show={!!selectedItem} onHide={handleCloseDetailsModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết phiếu mượn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <p>Phòng: {selectedItem.room.id}</p>
              <p>
                Thời gian mượn: {convertToLocalDateTime(selectedItem.borrowTime)}
              </p>
              <p>
                Thời gian trả: {convertToLocalDateTime(selectedItem.returnTime)}
              </p>
              <p>
                Thời gian tạo: {convertToLocalDateTime(selectedItem.createdAt)}
              </p>
              <p>Tình trạng: {selectedItem.status.name}</p>
              <p>
                Đã trả:{" "}
                {selectedItem.isReturned == null
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
                  {selectedItem.bookingDetails.map((detail, index) => (
                    <tr key={detail.booking_id}>
                      <th scope="row">{index + 1}</th>
                      <td>{detail.booking_id}</td>
                      <td>{detail.device_id}</td>
                      <td>
                        {detail.returnedTime
                          ? convertToLocalDateTime(detail.returnedTime)
                          : "Chưa trả"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={handleCloseDetailsModal}>
            Đóng
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HistoryBooking;
