import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { postCreateRoom } from '../../../../../services/roomServices';
import { toast } from 'react-toastify';

const CreateDeviceByRoom = (props) => {

    // const [nameRoom, setNameRoom] = useState('');
    // const [zone, setZone] = useState('');
    // const [floor, setFloor] = useState('');

    // const resetSubmit = () => {
    //     setNameRoom('');
    //     setZone('');
    //     setFloor('')
    // }




    // const handleSubmitCreateRoom = async () => {

    //     if (!nameRoom) {
    //         toast.error('Invalid Name Room')
    //     }
    //     else if (!zone) {
    //         toast.error('Invalid Zone')
    //     }
    //     else if (!floor) {
    //         toast.error('Invalid Floor')
    //     }


    //     let dataCreateRoom = {
    //         "id": nameRoom,
    //         zone,
    //         floor
    //     }

    //     let data = postCreateRoom(dataCreateRoom);
    //     if (data && data.statusCode === 400) {
    //         toast.error(data.message);

    //     }
    //     else {
    //         resetSubmit();
    //         toast.success("Create Room Success");

    //     }


    // }




    return (
        <>
            <Form.Floating className="mb-3">
                <Form.Control
                    id="floatingInputCustom"
                    type="text"
                // placeholder="2A12"
                // onChange={(event) => setNameRoom((event.target.value).toUpperCase())}
                // value={nameRoom}
                />
                <label htmlFor="floatingInputCustom">Name Room</label>
            </Form.Floating>
            {/* <Row className="g-2 ">
                <Col md>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="selectFloor">Floor</Form.Label>
                        <Form.Select
                            id="selectFloor"
                            // onChange={(e) => setFloor(parseInt(e.target.value))}
                            // value={floor}
                        >
                            <option defaultValue=""> </option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="selectZone">Zone</Form.Label>
                        <Form.Select
                            id="selectZone"
                            onChange={(e) => setZone(e.target.value)}
                            value={zone}
                        >
                            <option defaultValue=""></option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>

                        </Form.Select>

                    </Form.Group>
                </Col>
            </Row> */}

            <div className='btn-submit'>
                <Button
                // variant="outline-info"
                // onClick={() => handleSubmitCreateRoom()}
                >Submit</Button>
            </div>


        </>
    )
}

export default CreateDeviceByRoom;