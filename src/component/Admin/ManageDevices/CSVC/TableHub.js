import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";

const TableHub = (props) => {

    const { listHubOfCSVC, LIMIT_DEVICE, currentPage } = props;

    // console.log(listKeyOfClass);

    const [listHubPaginate, setListHubPaginate] = useState([]);
    const [pageCount, setPageCount] = useState(0);


    useEffect(() => {
        CalPageCount();
    }, [listHubOfCSVC])

    useEffect(() => {
        fetchListWithPaginate()
    }, [currentPage, listHubOfCSVC])

    const CalPageCount = () => {
        const totalListKey = listHubOfCSVC.length;
        const totalPages = Math.ceil(totalListKey / LIMIT_DEVICE);
        setPageCount(totalPages);
        // console.log(currentPage);
    }

    const fetchListWithPaginate = () => {
        const startIndex = (currentPage - 1) * LIMIT_DEVICE;
        const endIndex = startIndex + LIMIT_DEVICE;
        const paginatedList = listHubOfCSVC.slice(startIndex, endIndex);
        setListHubPaginate(paginatedList);
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
                        <th>Tình trạng</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listHubPaginate &&
                        listHubPaginate.map((hub, index) => {
                            return (
                                <tr hub={`table-hub-${index}`} >
                                    <td>{hub.id}</td>
                                    <td>
                                        {hub.status}
                                    </td>
                                    <td className='btn'>
                                        <Button
                                            variant="warning"
                                            onClick={() => props.handleUpdateDevice(hub, "HDMI")}
                                        >Xóa thiết bị</Button>

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

export default TableHub;