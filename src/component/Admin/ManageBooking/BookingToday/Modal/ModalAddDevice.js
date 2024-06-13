import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { ModalFooter } from 'react-bootstrap';
import { getDeviceCSVCAvailable } from '../../../../../services/roomServices';
import { useEffect, useState } from 'react';




const AddDevice = (props) => {

    const { show, dataAddDevice } = props;

    // console.log(dataAddDevice);


    const [capHdmi, setCapHdmi] = useState('');
    const [chiaKhoa, setChiaKhoa] = useState('');
    const [mayChieu, setMayChieu] = useState('');
    const [micro, setMicro] = useState('');
    const [remote, setRemote] = useState('');

    const [listCapHdmi, setListCapHdmi] = useState([]);
    const [listChiaKhoa, setListChiaKhoa] = useState([]);
    const [listMayChieu, setListMayChieu] = useState([]);
    const [listMicro, setListMicro] = useState([]);
    const [listRemote, setListRemote] = useState([]);



    const handleClose = () => {
        setCapHdmi('');
        setMayChieu('');
        setMicro('');
        setRemote('');
        props.setShow(false)
    }


    const fetchDeviceCSVCAvailable = async () => {

        let res = await getDeviceCSVCAvailable();
        if (!res.message) {
            setListCapHdmi(res.filter(item => item.category === 'Cáp HDMI').map(item => ({ value: item.id, label: item.id })));
            setListChiaKhoa(res.filter(item => item.category === 'Chìa Khóa').map(item => ({ value: item.id, label: item.id })));
            setListMayChieu(res.filter(item => item.category === 'Máy Chiếu').map(item => ({ value: item.id, label: item.id })));
            setListMicro(res.filter(item => item.category === 'Micro').map(item => ({ value: item.id, label: item.id })));
            setListRemote(res.filter(item => item.category === 'Remote').map(item => ({ value: item.id, label: item.id })));
        }
        else console.log(res.message);
    }


    useEffect(() => {
        fetchDeviceCSVCAvailable();
    }, [dataAddDevice])


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
                    <Modal.Title>Mượn thêm thiết bị cho phiếu mượn {dataAddDevice && dataAddDevice.bookingId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating p-2">
                        <Select
                            defaultValue={capHdmi}
                            onChange={setCapHdmi}
                            options={listCapHdmi}
                            placeholder={"Cáp HDMI..."}
                        />
                    </div>
                    <div className="form-floating p-2">
                        <Select
                            defaultValue={mayChieu}
                            onChange={setMayChieu}
                            options={listMayChieu}
                            placeholder={"Máy Chiếu..."}
                        />
                    </div>
                    <div className="form-floating p-2">
                        <Select
                            defaultValue={remote}
                            onChange={setRemote}
                            options={listRemote}
                            placeholder={"Remote ..."}
                        />
                    </div>
                    <div className="form-floating p-2">
                        <Select
                            defaultValue={micro}
                            onChange={setMicro}
                            options={listMicro}
                            placeholder={"Micro ..."}
                        />
                    </div>
                </Modal.Body>
                <ModalFooter>
                    <Button
                        variant='primary'
                        onClick={() => {
                            props.handleSubmitAddDevice([capHdmi.value, mayChieu.value, remote.value, micro.value].filter(value => value !== null && value !== undefined));
                            handleClose();
                        }}
                    >
                        Thêm
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
export default AddDevice;