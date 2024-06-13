import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ReactPaginate from "react-paginate";

const TableEmployees = (props) => {

    const { listEmployeePaginate, pageCount, currentPage } = props;

    const handlePageClick = (event) => {
        props.setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);

    };

    return (
        <>
            <Table bordered  >
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listEmployeePaginate &&
                        listEmployeePaginate.map((employee, index) => {

                            return (
                                <tr key={`table-employee ${index}`}>
                                    <td>{employee.employee_id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td className='btn'>
                                        <Button
                                            variant="info"
                                            onClick={() => props.handleViewEmployee(employee)}
                                        >Xem thông tin</Button>
                                        <Button
                                            variant="warning"
                                            onClick={() => props.handleUpdateEmployee(employee)}
                                        >Sửa thông tin</Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => props.handleDeleteEmployee(employee)}
                                        >Xóa nhân viên</Button>
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
    )
}

export default TableEmployees;