import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";


const TableRemote = (props) => {

    const { listRemoteOfClass, LIMIT_DEVICE, currentPage } = props;

    // console.log(listKeyOfClass);

    const [listRemotePaginate, setListRemotePaginate] = useState([]);
    const [pageCount, setPageCount] = useState(0);


    useEffect(() => {
        CalPageCount();
    }, [listRemoteOfClass])

    useEffect(() => {
        fetchListWithPaginate()
    }, [currentPage, listRemoteOfClass])

    const CalPageCount = () => {
        const totalListRemote = listRemoteOfClass.length;
        const totalPages = Math.ceil(totalListRemote / LIMIT_DEVICE);
        setPageCount(totalPages);
        // console.log(currentPage);
    }

    const fetchListWithPaginate = () => {
        const startIndex = (currentPage - 1) * LIMIT_DEVICE;
        const endIndex = startIndex + LIMIT_DEVICE;
        const paginatedList = listRemoteOfClass.slice(startIndex, endIndex);
        setListRemotePaginate(paginatedList);
        // console.log(paginatedList);
    }

    const handlePageClick = (event) => {
        props.setCurrentPage(+event.selected + 1);
        // console.log(`User requested page number ${event.selected}`);

    };

    // console.log(listRemoteOfClass);

    return (
        <div className='table'>
            < Table bordered  >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Phòng</th>
                        <th>Tình trạng</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listRemotePaginate &&
                        listRemotePaginate.map((remote, index) => {
                            return (
                                <tr key={`table-remote-${index} `} className={remote.status === "Hỏng" ? 'inactivity' : ''}>
                                    <td>{remote.id}</td>
                                    <td>{remote.room}</td>
                                    <td>
                                        {remote.status}
                                    </td>
                                    <td className='btn'>
                                        <Button
                                            variant="warning"
                                            onClick={() => props.handleUpdateDevice(remote, "RM")}
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

export default TableRemote;