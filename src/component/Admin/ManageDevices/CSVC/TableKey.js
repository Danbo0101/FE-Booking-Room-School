import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";

const TableKey = (props) => {

    const { listKeyOfCSVC, LIMIT_DEVICE, currentPage } = props;

    // console.log(listKeyOfClass);

    const [listKeyPaginate, setListKeyPaginate] = useState([]);
    const [pageCount, setPageCount] = useState(0);


    useEffect(() => {
        CalPageCount();
    }, [listKeyOfCSVC])

    useEffect(() => {
        fetchListWithPaginate()
    }, [currentPage, listKeyOfCSVC])

    const CalPageCount = () => {
        const totalListKey = listKeyOfCSVC.length;
        const totalPages = Math.ceil(totalListKey / LIMIT_DEVICE);
        setPageCount(totalPages);
        // console.log(currentPage);
    }

    const fetchListWithPaginate = () => {
        const startIndex = (currentPage - 1) * LIMIT_DEVICE;
        const endIndex = startIndex + LIMIT_DEVICE;
        const paginatedList = listKeyOfCSVC.slice(startIndex, endIndex);
        setListKeyPaginate(paginatedList);
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
                    {listKeyPaginate &&
                        listKeyPaginate.map((key, index) => {
                            return (
                                <tr key={`table-key-${index}`} >
                                    <td>{key.id}</td>
                                    <td>
                                        {key.status}
                                    </td>
                                    <td className='btn'>
                                        <Button
                                            variant="warning"
                                            onClick={() => props.handleUpdateDevice(key, "KEY")}
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

export default TableKey;