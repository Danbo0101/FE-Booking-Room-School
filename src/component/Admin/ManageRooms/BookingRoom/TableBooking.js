import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const TableBooking = (props) => {

    const { listBooking } = props;

    return (
        <div className='table'>
            < Table bordered >
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Room</th>
                        <th>Borrower</th>
                        <th>Start Time</th>
                        <th>Loan Time</th>
                        <th>End Time</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listBooking &&
                        listBooking.map((bk, index) => {
                            return (
                                <tr key={`table-key-${index}`} >
                                    <td>{bk.id}</td>
                                    <td>{bk.room}</td>
                                    <td>{bk.borrower}</td>
                                    <td>{bk.startTime}</td>
                                    <td>{bk.loanTime}</td>
                                    <td>{bk.endTime}</td>
                                    <td>
                                        {bk.status === 1 ? 'Acppept' : (bk.status === 0 ? 'Wait' : 'Die')}
                                    </td>
                                    <td className='btn'>
                                        <Button
                                            variant="warning"
                                        // onClick={() => props.handleUpdateDevice(key)}
                                        >Update Status</Button>
                                        <Button
                                            variant="danger"
                                        // onClick={() => props.handleDeleteDevice(key)}
                                        >Delete</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table >
            {/* <div className="user-pagination d-flex justify-content-center">
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
            </div> */}
        </div >
    )
}

export default TableBooking;