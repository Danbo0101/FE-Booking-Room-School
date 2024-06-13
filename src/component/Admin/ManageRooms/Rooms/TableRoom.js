import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";



const TableRoom = (props) => {

    const { listRoom, LIMIT_ROOM, currentPage } = props;

    const [listRoomPaginate, setListRoomPaginate] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        CalPageCount();
    }, [listRoom])

    useEffect(() => {
        fetchListWithPaginate()
    }, [currentPage, listRoom])

    const CalPageCount = () => {
        const totalListRoom = listRoom.length;
        const totalPages = Math.ceil(totalListRoom / LIMIT_ROOM);
        setPageCount(totalPages);
        // console.log(currentPage);
    }

    const fetchListWithPaginate = () => {
        const startIndex = (currentPage - 1) * LIMIT_ROOM;
        const endIndex = startIndex + LIMIT_ROOM;
        const paginatedList = listRoom.slice(startIndex, endIndex);
        setListRoomPaginate(paginatedList);
        // console.log(paginatedList);
    }

    const handlePageClick = (event) => {
        props.setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);

    };



    return (
        <div className='table'>
            < Table bordered >
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên phòng</th>
                        <th>Dãy</th>
                        <th>Lầu</th>
                        <th>Tình trạng</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listRoomPaginate &&
                        listRoomPaginate.map((room, index) => {
                            return (
                                <tr key={`table-key-${index}`} className={room.status === "Bảo Trì" ? 'maintenance' : ''}>
                                    <td>{index + 1}</td>
                                    <td>{room.id}</td>
                                    <td>{room.zone}</td>
                                    <td>{room.floor}</td>
                                    <td>{room.status}</td>
                                    <td className='btn'>
                                        <Button
                                            variant="info"
                                            onClick={() => props.handleShowViewDevice(room.id)}
                                        >Xem thiết bị</Button>
                                        <Button
                                            variant="warning"
                                            onClick={() => props.handleShowUpdateRoom(room.id, room.status)}
                                        >Cập nhật tình trạng</Button>
                                        {/* <Button
                        variant="danger"
                    // onClick={() => props.handleDeleteDevice(key)}
                    >Delete</Button> */}
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

export default TableRoom;