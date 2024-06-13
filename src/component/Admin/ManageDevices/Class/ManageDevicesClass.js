import Accordion from 'react-bootstrap/Accordion';
import TableKey from './TableKey';
import { useEffect, useState } from 'react';
import TableRemote from './TableRemote';
import TableMicro from './TableMicro';
import _ from 'lodash';
import UpdateDevice from '../Modal/ModalUpdateDevice';
import { getCreateDevice, patchUpdateDevice } from '../../../../services/deviceServices';
import { toast } from 'react-toastify';
import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CreateIcon from '@mui/icons-material/Create';
import CreateDevice from '../Modal/ModalCreateDevice';


const ManageDevicesOfClass = (props) => {

    const { devicesOfClass } = props;

    const [currentPage, setCurrentPage] = useState(0);

    const [keyOfClass, setKeyOfClass] = useState([]);
    const [remoteOfClass, setRemoteOfClass] = useState([]);
    const [microOfClass, setMicroOfClass] = useState([]);


    const [showCreate, setShowCreate] = useState(false);
    const [isDeviceOfCSVC, setIsDeviceOfCSVC] = useState(false);

    const [showUpdate, setShowUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState("");

    const LIMIT_DEVICE = 2;

    const handleDevicesOfClass = () => {
        let updatedKeyOfClass = [];
        let updatedRemoteOfClass = [];
        let updatedMicroOfClass = [];

        for (const device of devicesOfClass) {
            if (device.status !== "Hỏng") {
                switch (device.category) {
                    case "Chìa Khóa":
                        updatedKeyOfClass.push(device);
                        break;
                    case "Remote":
                        updatedRemoteOfClass.push(device);
                        break;
                    default:
                        updatedMicroOfClass.push(device);
                        break;
                }
            }
        }

        setKeyOfClass(updatedKeyOfClass);
        setRemoteOfClass(updatedRemoteOfClass);
        setMicroOfClass(updatedMicroOfClass);

        // console.log(keyOfClass);
        // console.log(remoteOfClass);
        // console.log(microOfClass);
    }

    useEffect(() => {
        handleDevicesOfClass()
    }, [devicesOfClass])


    const handleUpdateDevice = (data, category) => {

        data.category = category;
        setDataUpdate(data);
        setShowUpdate(true);

    }

    const handleUpdateStatusDevice = async () => {


        let data = {};

        if (dataUpdate.status === "Hỏng") {
            data.status = 7;
        }
        else data.status = 6;

        console.log(dataUpdate.id, data);


        let res = await patchUpdateDevice(dataUpdate.id, data);
        console.log(res);
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

        let existingId = devicesOfClass.map(device => device.id);
        let newId;
        let tempCount = 1;
        do {
            newId = `${category}${room}-${tempCount}`;
            tempCount++;
        } while (existingId.includes(newId));

        data.id = newId;

        let res = await getCreateDevice(data);
        if (!res.message) {
            props.fetchListDevice();

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
                            listKeyOfClass={keyOfClass}
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
                            listRemoteOfClass={remoteOfClass}
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
                            listMicroOfClass={microOfClass}
                            handleUpdateDevice={handleUpdateDevice}
                            handleDeleteDevice={handleDeleteDevice}
                            LIMIT_DEVICE={LIMIT_DEVICE}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}

                        />
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
            <Box sx={{ height: 250, transform: 'translateZ(0px)', flexGrow: 1 }}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                    direction='left'
                >
                    <SpeedDialAction
                        key="Create Device At Room"
                        icon={<CreateIcon />}
                        tooltipTitle="Create Device At Room"
                        onClick={() => {
                            setShowCreate(true);
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

export default ManageDevicesOfClass;