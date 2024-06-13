import { useEffect, useState } from 'react';
import { ModalFooter } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';


const RefundDevice = (props) => {

    const { show, dataRefund } = props;

    const [deviceRefund, setDeviceRefund] = useState();
    const [dataOption, setDataOption] = useState([]);


    const transformedData = () => {
        let data = [];
        if (dataRefund) {
            data = dataRefund.bookingDetail
                .filter(item => item.returnedTime === null)
                .map(item => ({
                    value: item.booking_id,
                    label: item.device_id
                }));
        }
        console.log(data);
        setDataOption(data);

    }

    useEffect(() => {
        transformedData();
    }, [dataRefund])

    const handleClose = () => {
        setDeviceRefund();
        setDataOption();
        props.setShow(false);
    }


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Trả thiết bị</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating ">
                        <Select
                            value={deviceRefund}
                            onChange={setDeviceRefund}
                            options={dataOption}
                            placeholder={"Thiết bị ..."}
                        />
                    </div>
                </Modal.Body>
                <ModalFooter>
                    <Button
                        variant='primary'
                        onClick={() => {
                            props.handleSubmitRefund(deviceRefund.value, deviceRefund.label);
                            handleClose();
                        }}
                    >
                        Trả
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default RefundDevice;