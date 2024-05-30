import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import TableRoom from './TableRoom';
import ViewDevices from './Modal/ModalViewDeviceRoom';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { getAllRoom, patchUpdateStatusRoom } from '../../../../services/roomServices';
import CreateRoom from './Modal/ModalCreateRoom';
import UpdateRoom from './Modal/ModalUpdateRoom';
import { toast } from 'react-toastify';
import { getDeviceByRoomId } from '../../../../services/deviceServices';

const ManageRoom = (props) => {

    // const [room, setRoom] = useState([
    //     {
    //         id: 1,
    //         name: '1A01',
    //         device: [
    //             {
    //                 id: 'Key01',
    //                 name: 'Key',
    //                 roomAt: '1A01',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Remote01',
    //                 name: 'Remote',
    //                 roomAt: '1A01',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Micro01',
    //                 name: 'Micro',
    //                 roomAt: '1A01',
    //                 status: 1
    //             }
    //         ],
    //         status: 1,
    //     },
    //     {
    //         id: 2,
    //         name: '1A02',
    //         device: [
    //             {
    //                 id: 'Key02',
    //                 name: 'Key',
    //                 roomAt: '1A02',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Remote02',
    //                 name: 'Remote',
    //                 roomAt: '1A02',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Micro02',
    //                 name: 'Micro',
    //                 roomAt: '1A02',
    //                 status: 1
    //             }
    //         ],
    //         status: 1,
    //     },
    //     {
    //         id: 3,
    //         name: '1A03',
    //         device: [
    //             {
    //                 id: 'Key03',
    //                 name: 'Key',
    //                 roomAt: '1A03',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Remote03',
    //                 name: 'Remote',
    //                 roomAt: '1A03',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Micro03',
    //                 name: 'Micro',
    //                 roomAt: '1A03',
    //                 status: 1
    //             }
    //         ],
    //         status: 1,
    //     },
    //     {
    //         id: 4,
    //         name: '2A01',
    //         device: [
    //             {
    //                 id: 'Key21',
    //                 name: 'Key',
    //                 roomAt: '2A01',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Remote21',
    //                 name: 'Remote',
    //                 roomAt: '2A01',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Micro21',
    //                 name: 'Micro',
    //                 roomAt: '2A01',
    //                 status: 1
    //             }
    //         ],
    //         status: 1,
    //     },
    //     {
    //         id: 5,
    //         name: '2A02',
    //         device: [
    //             {
    //                 id: 'Key22',
    //                 name: 'Key',
    //                 roomAt: '2A02',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Remote22',
    //                 name: 'Remote',
    //                 roomAt: '2A02',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Micro22',
    //                 name: 'Micro',
    //                 roomAt: '2A02',
    //                 status: 1
    //             }
    //         ],
    //         status: 1,
    //     },
    //     {
    //         id: 6,
    //         name: '2A03',
    //         device: [
    //             {
    //                 id: 'Key23',
    //                 name: 'Key',
    //                 roomAt: '2A03',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Remote23',
    //                 name: 'Remote',
    //                 roomAt: '2A03',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Micro23',
    //                 name: 'Micro',
    //                 roomAt: '2A03',
    //                 status: 1
    //             }
    //         ],
    //         status: 1,
    //     },
    //     {
    //         id: 7,
    //         name: '3A01',
    //         device: [
    //             {
    //                 id: 'Key31',
    //                 name: 'Key',
    //                 roomAt: '3A01',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Remote31',
    //                 name: 'Remote',
    //                 roomAt: '3A01',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Micro31',
    //                 name: 'Micro',
    //                 roomAt: '3A01',
    //                 status: 1
    //             }
    //         ],
    //         status: 1,
    //     },
    //     {
    //         id: 8,
    //         name: '3A02',
    //         device: [
    //             {
    //                 id: 'Key32',
    //                 name: 'Key',
    //                 roomAt: '3A02',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Remote32',
    //                 name: 'Remote',
    //                 roomAt: '3A02',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Micro32',
    //                 name: 'Micro',
    //                 roomAt: '3A02',
    //                 status: 1
    //             }
    //         ],
    //         status: 1,
    //     },
    //     {
    //         id: 9,
    //         name: '3A03',
    //         device: [
    //             {
    //                 id: 'Key33',
    //                 name: 'Key',
    //                 roomAt: '3A03',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Remote33',
    //                 name: 'Remote',
    //                 roomAt: '3A03',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Micro33',
    //                 name: 'Micro',
    //                 roomAt: '3A03',
    //                 status: 1
    //             }
    //         ],
    //         status: 1,
    //     },
    //     {
    //         id: 10,
    //         name: '4A01',
    //         device: [
    //             {
    //                 id: 'Key41',
    //                 name: 'Key',
    //                 roomAt: '4A01',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Remote41',
    //                 name: 'Remote',
    //                 roomAt: '4A01',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Micro41',
    //                 name: 'Micro',
    //                 roomAt: '4A01',
    //                 status: 1
    //             }
    //         ],
    //         status: 1,
    //     },
    //     {
    //         id: 11,
    //         name: '4A02',
    //         device: [
    //             {
    //                 id: 'Key42',
    //                 name: 'Key',
    //                 roomAt: '4A02',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Remote42',
    //                 name: 'Remote',
    //                 roomAt: '4A02',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Micro42',
    //                 name: 'Micro',
    //                 roomAt: '4A02',
    //                 status: 1
    //             }
    //         ],
    //         status: 1,
    //     },
    //     {
    //         id: 12,
    //         name: '4A03',
    //         device: [
    //             {
    //                 id: 'Key43',
    //                 name: 'Key',
    //                 roomAt: '4A03',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Remote43',
    //                 name: 'Remote',
    //                 roomAt: '4A03',
    //                 status: 1
    //             },
    //             {
    //                 id: 'Micro43',
    //                 name: 'Micro',
    //                 roomAt: '4A03',
    //                 status: 1
    //             }
    //         ],
    //         status: 1,
    //     },
    // ])

    const [room, setRoom] = useState([]);



    const fetchListRoom = async () => {
        let data = await getAllRoom();

        setRoom(data);


    }

    useEffect(() => {
        fetchListRoom()
    }, [room])


    const [currentPage, setCurrentPage] = useState(0);
    const LIMIT_ROOM = 4;

    const [roomAtFloor1, setRoomAtFloor1] = useState([]);
    const [roomAtFloor2, setRoomAtFloor2] = useState([]);
    const [roomAtFloor3, setRoomAtFloor3] = useState([]);
    const [roomAtFloor4, setRoomAtFloor4] = useState([]);


    const [showViewDevice, setShowViewDevice] = useState(false);
    const [dataViewDevice, setDataViewDevice] = useState([]);

    const [showUpdateRoom, setShowUpdateRoom] = useState(false);
    const [dataUpdateRoom, setDataUpdateRoom] = useState([]);


    // const [showCreateDeviceRoom, setShowCreateDeviceRoom] = useState(false);
    // const [dataCreateDeviceRoom, setDataCreateDeviceRoom] = useState([]);

    const handleRoomAtFloor = () => {
        let roomF1 = [];
        let roomF2 = [];
        let roomF3 = [];
        let roomF4 = [];

        room.forEach(item => {
            if (item.id !== "CSVC") {
                switch (item.floor) {
                    case 0:
                        roomF1.push(item);
                        break;
                    case 1:
                        roomF2.push(item);
                        break;

                    case 3:
                        roomF3.push(item);
                        break;

                    case 4:
                        roomF4.push(item);
                        break;
                    default:
                        break;
                }
            }

        });


        // console.log(roomF1);
        // console.log(roomF2);
        // console.log(roomF3);
        // console.log(roomF4);

        setRoomAtFloor1(roomF1);
        setRoomAtFloor2(roomF2);
        setRoomAtFloor3(roomF3);
        setRoomAtFloor4(roomF4);
    }

    useEffect(() => {
        handleRoomAtFloor()
    }, [room])

    const handleShowViewDevice = async (roomId) => {
        let data = await getDeviceByRoomId(roomId);
        if (data && data.length > 0) {
            setDataViewDevice(data);
            setShowViewDevice(true);
        }
        else {

            console.log(data.message);
        }

    }

    const handleShowUpdateRoom = (roomId, roomStatus) => {
        setShowUpdateRoom(true);
        // console.log(1)
        setDataUpdateRoom(
            {
                roomId,
                roomStatus
            }
        )
    }

    const handleUpdateStatusRoom = async () => {
        let updateStatus = {};
        switch (dataUpdateRoom.roomStatus) {
            case "Hoạt động":
                updateStatus.status = 2;
                break;
            case "Bảo Trì":
                updateStatus.status = 7;
                break;
            default:
                break;
        }
        // console.log(updateStatus)
        let data = await patchUpdateStatusRoom(dataUpdateRoom.roomId, updateStatus);
        if (data && data.statusCode === 400) {
            toast.error(data.message);
        }
        else {
            setShowUpdateRoom(false);
            toast.success("Update Room Success");

        }
    }

    // const handleCreateDeviceByRoom = async (nameRoom) => {

    //     let data = await getAllDeviceCategory();
    //     console.log(data);
    // }



    return (
        <>

            <Accordion >
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Add New Room</Accordion.Header>
                    <Accordion.Body>
                        <CreateRoom
                        // handleCreateDeviceByRoom={handleCreateDeviceByRoom}
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header
                        onClick={() => setCurrentPage(1)}
                    >Manage Room In School</Accordion.Header>
                    <Accordion.Body>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                <Col sm={3}>
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link
                                                eventKey="first"
                                                onClick={() => setCurrentPage(1)}
                                            >Floor 0
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link
                                                eventKey="second"
                                                onClick={() => setCurrentPage(1)}
                                            >Floor 1</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link
                                                eventKey="third"
                                                onClick={() => setCurrentPage(1)}
                                            >Floor 2
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link
                                                eventKey="fourth"
                                                onClick={() => setCurrentPage(1)}
                                            >Floor 3</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <TableRoom
                                                listRoom={roomAtFloor1}
                                                LIMIT_ROOM={LIMIT_ROOM}
                                                currentPage={currentPage}
                                                setCurrentPage={setCurrentPage}
                                                handleShowViewDevice={handleShowViewDevice}
                                                handleShowUpdateRoom={handleShowUpdateRoom}

                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <TableRoom
                                                listRoom={roomAtFloor2}
                                                LIMIT_ROOM={LIMIT_ROOM}
                                                currentPage={currentPage}
                                                setCurrentPage={setCurrentPage}
                                                handleShowViewDevice={handleShowViewDevice}
                                                handleShowUpdateRoom={handleShowUpdateRoom}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="third">
                                            <TableRoom
                                                listRoom={roomAtFloor3}
                                                LIMIT_ROOM={LIMIT_ROOM}
                                                currentPage={currentPage}
                                                setCurrentPage={setCurrentPage}
                                                handleShowViewDevice={handleShowViewDevice}
                                                handleShowUpdateRoom={handleShowUpdateRoom}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="fourth">
                                            <TableRoom
                                                listRoom={roomAtFloor4}
                                                LIMIT_ROOM={LIMIT_ROOM}
                                                currentPage={currentPage}
                                                setCurrentPage={setCurrentPage}
                                                handleShowViewDevice={handleShowViewDevice}
                                                handleShowUpdateRoom={handleShowUpdateRoom}
                                            />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
            <ViewDevices
                show={showViewDevice}
                setShow={setShowViewDevice}
                dataView={dataViewDevice}
            />
            <UpdateRoom
                show={showUpdateRoom}
                setShow={setShowUpdateRoom}
                dataUpdate={dataUpdateRoom}
                handleUpdateStatusRoom={handleUpdateStatusRoom}

            />
        </>
    )
}

export default ManageRoom;