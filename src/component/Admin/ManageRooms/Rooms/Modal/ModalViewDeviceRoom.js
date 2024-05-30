import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { useState } from 'react';

const ViewDevices = (props) => {

    const { show, setShow, dataView } = props;

    const handleClose = () => {
        setShow(false)
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size='xl'
            backdrop="static"
            className='modal-add-user'
        >
            <Modal.Header closeButton>
                <Modal.Title>View Devices At Room {dataView.room}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                < Table bordered >
                    <thead class="text-center">
                        <tr >
                            <th>ID</th>
                            <th>Name</th>
                            <th>Room</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        {dataView &&
                            dataView.map((device, index) => {
                                return (
                                    <tr key={`table-key-${index}`} >
                                        <td>{device.id}</td>
                                        <td>{device.category}</td>
                                        <td>{device.room}</td>
                                        <td>
                                            {device.status}
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table >

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"
                    onClick={handleClose}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ViewDevices;