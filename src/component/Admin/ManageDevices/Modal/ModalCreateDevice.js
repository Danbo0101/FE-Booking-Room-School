import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { getAllRoom } from '../../../../services/roomServices';
import { getAllDeviceCategory } from '../../../../services/deviceServices';

const CreateDevice = (props) => {

    const { show, isDeviceOfCSVC } = props;

    const handleClose = () => {
        props.setShow(false);
        setNameRoom("");
        setCategory("")
    }

    const [nameRoom, setNameRoom] = useState("");
    const [category, setCategory] = useState("");

    const [listNameRoom, setListNameRoom] = useState([]);
    const [listCategory, setListCategory] = useState([]);


    const fetchNameRoomActive = async () => {
        let listNameRoomClone = [];
        let res = await getAllRoom();
        if (!res.message) {
            for (const room of res) {
                if (room.status === "Hoạt động" && room.id !== "CSVC") {
                    listNameRoomClone.push(room.id);
                }
                setListNameRoom(listNameRoomClone);
            }

        }
        else { console.log(res.message); }


    }

    const fetchListCategory = async () => {
        let res = await getAllDeviceCategory();
        if (!res.message) {
            // let transformedCategory = res.reduce((acc, item) => {
            //     acc[item.id] = item.title;
            //     return acc;
            // }, {});
            setListCategory(res);
        }
        else { console.log(res.message) }

    }

    useEffect(() => {
        fetchNameRoomActive();
        fetchListCategory();
    }, []);



    // console.log(listCategory.key)

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                {isDeviceOfCSVC ?
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Create Device Of CSVC
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row className="g-2 ">
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="selectCategory">Category</Form.Label>
                                    <Form.Select
                                        id="selectCategory"
                                        onChange={(e) => setCategory(e.target.value)}
                                        value={category}
                                    >
                                        <option defaultValue="">Select Category</option>
                                        {listCategory && listCategory
                                            .map((cate, index) => {

                                                return (
                                                    <option
                                                        key={index}
                                                        value={cate.id}
                                                    >
                                                        {cate.title}
                                                    </option>
                                                )
                                            })}

                                    </Form.Select>

                                </Form.Group>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => {
                                props.handleSubmitCreateDevice("CSVC", category);
                                handleClose();
                            }
                            }>Submit</Button>
                        </Modal.Footer>
                    </>
                    :
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Create Device Of Room
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row className="g-3 ">
                                <Col md>
                                    <Form.Group className="mb-2">
                                        <Form.Label htmlFor="selectRoom">Room</Form.Label>
                                        <Form.Select
                                            id="selectRoom"
                                            onChange={(e) => setNameRoom(e.target.value)}
                                            value={nameRoom}
                                        >
                                            <option defaultValue="">Select Room</option>
                                            {listNameRoom && listNameRoom

                                                .map((room, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={room}
                                                        >{room}
                                                        </option>
                                                    )
                                                })}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="selectCategory">Category</Form.Label>
                                        <Form.Select
                                            id="selectCategory"
                                            onChange={(e) => setCategory(e.target.value)}
                                            value={category}
                                        >
                                            <option defaultValue="">Select Category</option>
                                            {listCategory && listCategory
                                                .filter(cate => cate.id !== "HDMI")
                                                .map((cate, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={cate.id}
                                                        >
                                                            {cate.title}
                                                        </option>
                                                    )
                                                })}

                                        </Form.Select>

                                    </Form.Group>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => {
                                props.handleSubmitCreateDevice(nameRoom, category);
                                handleClose();
                            }}>Submit</Button>
                        </Modal.Footer>
                    </>
                }

            </Modal>
        </>
    )
}

export default CreateDevice;