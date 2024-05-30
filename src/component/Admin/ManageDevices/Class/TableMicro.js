import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";

const TableMicro = (props) => {

    const { listMicroOfClass, LIMIT_DEVICE, currentPage } = props;

    // console.log(listKeyOfClass);

    const [listMicroPaginate, setListMicroPaginate] = useState([]);
    const [pageCount, setPageCount] = useState(0);


    useEffect(() => {
        CalPageCount();
    }, [listMicroOfClass])

    useEffect(() => {
        fetchListWithPaginate()
    }, [currentPage, listMicroOfClass])

    const CalPageCount = () => {
        const totalListMicro = listMicroOfClass.length;
        const totalPages = Math.ceil(totalListMicro / LIMIT_DEVICE);
        setPageCount(totalPages);
        // console.log(currentPage);
    }

    const fetchListWithPaginate = () => {
        const startIndex = (currentPage - 1) * LIMIT_DEVICE;
        const endIndex = startIndex + LIMIT_DEVICE;
        const paginatedList = listMicroOfClass.slice(startIndex, endIndex);
        setListMicroPaginate(paginatedList);
        // console.log(paginatedList);
    }

    const handlePageClick = (event) => {
        props.setCurrentPage(+event.selected + 1);
        // console.log(`User requested page number ${event.selected}`);

    };

    // console.log(listMicroOfClass);

    return (
        <div className='table'>
            < Table bordered  >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Room At</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listMicroPaginate &&
                        listMicroPaginate.map((micro, index) => {
                            return (
                                <tr key={`table-micro-${index} `} className={micro.status === "Hỏng" ? 'inactivity' : ''}>
                                    <td>{micro.id}</td>
                                    <td>{micro.room}</td>
                                    <td>
                                        {micro.status}
                                    </td>
                                    <td className='btn'>
                                        <Button
                                            variant="warning"
                                            onClick={() => props.handleUpdateDevice(micro, "Mic")}
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

export default TableMicro;