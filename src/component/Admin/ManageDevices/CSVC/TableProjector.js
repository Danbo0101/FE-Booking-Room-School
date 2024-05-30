import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";

const TableProjector = (props) => {

    const { listProjectorOfCSVC, LIMIT_DEVICE, currentPage } = props;

    // console.log(listKeyOfClass);

    const [listProjectorPaginate, setListProjectorPaginate] = useState([]);
    const [pageCount, setPageCount] = useState(0);


    useEffect(() => {
        CalPageCount();
    }, [listProjectorOfCSVC])

    useEffect(() => {
        fetchListWithPaginate()
    }, [currentPage, listProjectorOfCSVC])

    const CalPageCount = () => {
        const totalListKey = listProjectorOfCSVC.length;
        const totalPages = Math.ceil(totalListKey / LIMIT_DEVICE);
        setPageCount(totalPages);
        // console.log(currentPage);
    }

    const fetchListWithPaginate = () => {
        const startIndex = (currentPage - 1) * LIMIT_DEVICE;
        const endIndex = startIndex + LIMIT_DEVICE;
        const paginatedList = listProjectorOfCSVC.slice(startIndex, endIndex);
        setListProjectorPaginate(paginatedList);
        // console.log(paginatedList);
    }

    const handlePageClick = (event) => {
        props.setCurrentPage(+event.selected + 1);
        // console.log(`User requested page number ${event.selected}`);

    };


    // console.log(listKeyOfClass);

    return (
        <div className='table'>
            < Table bordered >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listProjectorPaginate &&
                        listProjectorPaginate.map((pj, index) => {
                            return (
                                <tr pj={`table-pj-${index}`} >
                                    <td>{pj.id}</td>
                                    <td>
                                        {pj.status}
                                    </td>
                                    <td className='btn'>
                                        <Button
                                            variant="warning"
                                            onClick={() => props.handleUpdateDevice(pj, "MC")}
                                        >Delete</Button>

                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table >
            <div className="user-pagination d-flex justify-content-center">
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
        </div >
    )
}

export default TableProjector;