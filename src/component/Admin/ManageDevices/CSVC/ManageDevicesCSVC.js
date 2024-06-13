import Accordion from 'react-bootstrap/Accordion';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import TableKey from './TableKey';
import TableRemote from './TableRemote';
import TableMicro from './TableMicro';
import TableHub from './TableHub';
import TableProjector from './TableProjector';
import { toast } from 'react-toastify';
import { getCreateDevice, patchUpdateDevice } from '../../../../services/deviceServices';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CreateIcon from '@mui/icons-material/Create';
import CreateDevice from '../Modal/ModalCreateDevice';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import UpdateDevice from '../Modal/ModalUpdateDevice';

const ManageDevicesCSVC = (props) => {

    const { devicesOfCSVC } = props;

    // console.log(devicesOfCSVC)

    const [currentPage, setCurrentPage] = useState(0);

    const [keyOfCSVC, setKeyOfCSVC] = useState([]);
    const [remoteOfCSVC, setRemoteOfCSVC] = useState([]);
    const [microOfCSVC, setMicroOfCSVC] = useState([]);
    const [hubOfCSVC, setHubOfCSVC] = useState([]);
    const [projectorOfCSVC, setProjectorOfCSVC] = useState([]);


    const handleDevicesOfCSVC = () => {
        let updatedKeyOfCSVC = [];
        let updatedRemoteOfCSVC = [];
        let updatedMicroOfCSVC = [];
        let updatedjHubOfCSVC = [];
        let updatedProjectorOfCSVC = [];

        for (const device of devicesOfCSVC) {
            if (device.status !== "Hỏng") {
                switch (device.category) {
                    case "Chìa Khóa":
                        updatedKeyOfCSVC.push(device);
                        break;
                    case "Remote":
                        updatedRemoteOfCSVC.push(device);
                        break;
                    case "Micro":
                        updatedMicroOfCSVC.push(device);
                        break;
                    case "Cáp HDMI":
                        updatedjHubOfCSVC.push(device);
                        break;
                    default:
                        updatedProjectorOfCSVC.push(device);
                        break;
                }
            }

        }

        setKeyOfCSVC(updatedKeyOfCSVC);
        setRemoteOfCSVC(updatedRemoteOfCSVC);
        setMicroOfCSVC(updatedMicroOfCSVC);
        setHubOfCSVC(updatedjHubOfCSVC);
        setProjectorOfCSVC(updatedProjectorOfCSVC);

        // console.log('check', keyOfCSVC);
        // console.log(keyOfClass);
        // console.log(remoteOfClass);
        // console.log(microOfClass);
    }

    useEffect(() => {
        handleDevicesOfCSVC()
    }, [devicesOfCSVC])


    const [showCreate, setShowCreate] = useState(false);
    const [isDeviceOfCSVC, setIsDeviceOfCSVC] = useState(false);

    const [showUpdate, setShowUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState("");

    const LIMIT_DEVICE = 2;


    const handleUpdateDevice = (data, category) => {

        data.category = category;
        setDataUpdate(data);
        setShowUpdate(true);

    }

    const handleUpdateStatusDevice = async () => {


        let data = {
            category: dataUpdate.category,
            room: dataUpdate.room
        }

        if (dataUpdate.status === "Hỏng") {
            data.status = 7;
        }
        else data.status = 6;


        let res = await patchUpdateDevice(dataUpdate.id, data);
        if (!res.message) {
            props.fetchListDevice();
            setShowUpdate(false);
            toast.success("Update Device Success");
        }
        else {
            toast.error("Update Device Fail");
            console.log(res.message);
        }

    }

    const handleSubmitCreateDevice = async (room, category) => {

        let data = {
            category,
            room,
        }

        let existingId = devicesOfCSVC.map(device => device.id);
        let newId;
        let tempCount = 1;
        do {
            newId = `${category}${room}-${tempCount}`;
            tempCount++;
        } while (existingId.includes(newId));

        data.id = newId;

        // console.log(data);

        let res = await getCreateDevice(data);
        if (!res.message) {
            props.fetchListDevice();
            // setShowCreate(false);
            toast.success(`Create Deviec At ${room} Success `);
        }
        else {
            console.log(res.message);
            toast.error(`Create Deviec At ${room} Fail `)
        }
    }

    const handleDeleteDevice = (device) => {
        // setShowDelete(true);
        // setDataDelete(device);


        // const listKeyClone = _.cloneDeep(keyOfClass);
        // let index = listKeyClone.findIndex(item => item.id === device.id);
        // if (index !== -1) {
        //     listKeyClone.splice(index, 1);
        //     setKeyOfClass(listKeyClone);
        // }

        alert('me');
    }



    return (
        <>
            <Accordion >
                <Accordion.Item eventKey="0">
                    <Accordion.Header
                        onClick={() => setCurrentPage(1)}
                    >Chìa khóa</Accordion.Header>
                    <Accordion.Body>
                        <TableKey
                            listKeyOfCSVC={keyOfCSVC}
                            handleUpdateDevice={handleUpdateDevice}
                            handleDeleteDevice={handleDeleteDevice}
                            LIMIT_DEVICE={LIMIT_DEVICE}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header
                        onClick={() => setCurrentPage(1)}
                    >Remote</Accordion.Header>
                    <Accordion.Body>
                        <TableRemote
                            listRemoteOfCSVC={remoteOfCSVC}
                            handleUpdateDevice={handleUpdateDevice}
                            handleDeleteDevice={handleDeleteDevice}
                            LIMIT_DEVICE={LIMIT_DEVICE}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}

                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header
                        onClick={() => setCurrentPage(1)}
                    >Micro</Accordion.Header>
                    <Accordion.Body>
                        <TableMicro
                            listMicroOfCSVC={microOfCSVC}
                            handleUpdateDevice={handleUpdateDevice}
                            handleDeleteDevice={handleDeleteDevice}
                            LIMIT_DEVICE={LIMIT_DEVICE}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}

                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header
                        onClick={() => setCurrentPage(1)}
                    >Hub</Accordion.Header>
                    <Accordion.Body>
                        <TableHub
                            listHubOfCSVC={hubOfCSVC}
                            handleUpdateDevice={handleUpdateDevice}
                            handleDeleteDevice={handleDeleteDevice}
                            LIMIT_DEVICE={LIMIT_DEVICE}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header
                        onClick={() => setCurrentPage(1)}
                    >Projector</Accordion.Header>
                    <Accordion.Body>
                        <TableProjector
                            listProjectorOfCSVC={projectorOfCSVC}
                            handleUpdateDevice={handleUpdateDevice}
                            handleDeleteDevice={handleDeleteDevice}
                            LIMIT_DEVICE={LIMIT_DEVICE}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Box sx={{ height: 150, transform: 'translateZ(0px)', flexGrow: 1 }}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                    direction='left'
                >
                    <SpeedDialAction
                        key="Create Device At CSVS"
                        icon={<BorderColorIcon />}
                        tooltipTitle="Create Device At CSVS"
                        onClick={() => {
                            setShowCreate(true);
                            setIsDeviceOfCSVC(true);
                        }}
                    />
                </SpeedDial>
            </Box>

            <CreateDevice
                show={showCreate}
                setShow={setShowCreate}
                isDeviceOfCSVC={isDeviceOfCSVC}
                handleSubmitCreateDevice={handleSubmitCreateDevice}
            />
            <UpdateDevice
                show={showUpdate}
                setShow={setShowUpdate}
                dataUpdate={dataUpdate}
                handleUpdateStatusDevice={handleUpdateStatusDevice}
            />
        </>
    )
}

export default ManageDevicesCSVC;