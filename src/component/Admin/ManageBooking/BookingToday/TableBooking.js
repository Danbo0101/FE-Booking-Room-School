import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { FaCheck } from "react-icons/fa6";
import ReactPaginate from "react-paginate";


const TableBooking = (props) => {

    // const { filteredBookings } = props;

    const { listBookingsPaginate, pageCount, currentPage } = props;

    const handlePageClick = (event) => {
        props.setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);

    };

    // console.log(listBookingsPaginate);

    return (

        <div className="table-booking">
            {
                listBookingsPaginate && listBookingsPaginate.length > 0 ?
                    <>
                        <Table bordered >
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên Phòng</th>
                                    <th>MSSV</th>
                                    <th>Thời gian mượn</th>
                                    <th>Thời gian trả</th>
                                    <th>Tình trạng</th>
                                    <th>Trả trễ</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listBookingsPaginate &&
                                    listBookingsPaginate.map((booking, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{booking.id}</td>
                                                <td>{booking.room.id}</td>
                                                <td>{booking.student.student_id}</td>
                                                <td>{props.convertToVietnamTime(booking.borrowTime)}</td>
                                                <td>{props.convertToVietnamTime(booking.returnTime)}</td>
                                                <td>
                                                    {booking.isReturned ? (
                                                        <Button variant="success">
                                                            Đã trả phòng
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant={booking.status.id === 10 ? "secondary" :
                                                                booking.status.id === 11 ? "warning" :
                                                                    booking.status.id === 13 ? "danger" : ""}
                                                            onClick={() => props.handleShowChangeStatus(booking.room, booking.id, booking.status, booking.bookingDetails)}
                                                        >
                                                            {booking.status.name}
                                                        </Button>
                                                    )}
                                                </td>

                                                <td>{booking.isLately ? 'Delayed' : 'On time'}</td>
                                                <td>
                                                    <Button
                                                        variant="info"
                                                        className="btn-view-detail"
                                                        onClick={() => props.handleViewDetail(booking)}
                                                    >
                                                        Xem chi tiết phiếu mượn
                                                    </Button>
                                                    <Button
                                                        variant="primary"
                                                        className="btn-add-device"
                                                        onClick={() => props.handleAddDevice(booking.id, booking.room)}
                                                    >
                                                        Thêm thiết bị
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        className="btn-refund-device"
                                                        onClick={() => props.handleViewRefund(booking.room, booking.bookingDetails)}
                                                    >
                                                        Trả thiết bị
                                                    </Button>
                                                </td>
                                            </tr>
                                        )

                                    })
                                }
                            </tbody>
                        </Table>
                        <div className="user-pagination d-flex justify-content-center p-5">
                            <ReactPaginate
                                nextLabel="Next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                previousLabel="< Pre"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                                forcePage={currentPage - 1}
                            />
                        </div>
                    </>
                    :
                    <div className='mt-4 alert alert-danger p-4 text-center'>
                        Không tìm thấy lịch đặt phòng
                    </div>
            }

        </div>
    )
}

export default TableBooking;