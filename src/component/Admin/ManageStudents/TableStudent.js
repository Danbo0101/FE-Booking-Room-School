import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ReactPaginate from "react-paginate";

const TableStudent = (props) => {

    const { listStudentPaginate, pageCount, currentPage } = props;

    const handlePageClick = (event) => {
        props.setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);

    };

    return (
        <>
            <Table bordered   >
                <thead>
                    <tr >
                        <th>STT</th>
                        <th>Name Student</th>
                        <th>Class</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listStudentPaginate &&
                        listStudentPaginate.map((student, index) => {
                            return (
                                <tr key={`table-student ${index}`}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.className}</td>
                                    <td>{student.email}</td>
                                    <td className='btn'>
                                        <Button
                                            variant="info"
                                            onClick={() => props.handleViewStudent(student)}
                                        >View</Button>
                                        <Button
                                            variant="warning"
                                            onClick={() => props.handleUpdateStudent(student)}
                                        >Edit</Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => props.handleDeleteStudent(student)}
                                        >Delete</Button>
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

export default TableStudent;