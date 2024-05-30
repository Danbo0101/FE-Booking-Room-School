import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './ManageDevices.scss'
import { useEffect, useState } from 'react';
import ManageDevicesOfClass from './Class/ManageDevicesClass';
import ManageDevicesCSVC from './CSVC/ManageDevicesCSVC';
import { getAllDevice } from '../../../services/deviceServices';

const ManageDevices = (props) => {

    // Mathietbi: Key01, loaithietbi: Key, MaPhong: 2A08, trangthai: hong

    const listDevices = [
        {
            id: 'Key01',
            name: 'Key',
            roomAt: '2A08',
            status: 1 // 0 is die, 1 is life
        },
        {
            id: 'Key02',
            name: 'Key',
            roomAt: '2A016',
            status: 1 // 0 is die, 1 is life
        },
        {
            id: 'Key03',
            name: 'Key',
            roomAt: '2A024',
            status: 1 // 0 is die, 1 is life
        },
        {
            id: 'Key03',
            name: 'Key',
            roomAt: '2A024',
            status: 0 // 0 is die, 1 is life
        },
        {
            id: 'Key11',
            name: 'Key',
            roomAt: 'CSVC',
            status: 1 // 0 is die, 1 is life
        },
        {
            id: 'Remote01',
            name: 'Remote',
            roomAt: '2A08',
            status: 1 // 0 is die, 1 is life
        },
        {
            id: 'Remote02',
            name: 'Remote',
            roomAt: '2A016',
            status: 1 // 0 is die, 1 is life
        },
        {
            id: 'Remote03',
            name: 'Remote',
            roomAt: '2A024',
            status: 1 // 0 is die, 1 is life
        },
        {
            id: "Remote03",
            name: 'Remote',
            roomAt: '2A024',
            status: 0 // 0 is die, 1 is life
        },
        {
            id: "Remote11",
            name: 'Remote',
            roomAt: 'CSVC',
            status: 1 // 0 is die, 1 is life
        },
        {
            id: "Micro01",
            name: 'Micro',
            roomAt: '2A08',
            status: 1 // 0 is die, 1 is life
        },
        {
            id: "Micro02",
            name: 'Micro',
            roomAt: '2A016',
            status: 1 // 0 is die, 1 is life
        },
        {
            id: "Micro03",
            name: 'Micro',
            roomAt: '2A024',
            status: 1 // 0 is die, 1 is life
        },
        {
            id: "Micro03",
            name: 'Micro',
            roomAt: '2A024',
            status: 0 // 0 is die, 1 is life
        },
        {
            id: "Micro11",
            name: 'Micro',
            roomAt: 'CSVC',
            status: 1 // 0 is die, 1 is life
        },
        {
            id: "Hub11",
            name: 'Hub',
            roomAt: 'CSVC',
            status: 1 // 0 is die, 1 is life
        },
        {
            id: "Projector11",
            name: 'Projector',
            roomAt: 'CSVC',
            status: 1 // 0 is die, 1 is life
        },
    ]

    const [devicesOfClass, setDevicesOfClass] = useState([]);
    const [devicesOfCSVC, setDevicesOfCSVC] = useState([]);




    const fetchListDevice = async () => {

        let data = await getAllDevice();
        if (!data.message) {
            let updateDevicesOfClass = [];
            let updateDevicesOfCSVC = [];
            for (const device of data) {
                if (device.room === 'CSVC') {
                    updateDevicesOfCSVC.push(device);
                } else {
                    updateDevicesOfClass.push(device);
                }
            }

            setDevicesOfCSVC(updateDevicesOfCSVC);
            setDevicesOfClass(updateDevicesOfClass);
        }
        else {
            console.log(data.message);
        }


        // console.log(keyOfCSVC);
        // console.log(remoteOfCSVC);
        // console.log(microOfCSVC);
        // console.log(hubOfCSVC);
        // console.log(projectorOfCSVC);
        // console.log(keyOfClass);
        // console.log(remoteOfClass);
        // console.log(microOfClass);

    }

    useEffect(() => {
        fetchListDevice()
    }, [])

    return (
        <div className='manage-devices-container'>
            <div className="title-page">
                Manage Devices
            </div>
            <hr />
            <div className="main-ms-container">
                <Tabs
                    defaultActiveKey="Class"
                    id="tab"
                    className="mb-3"
                    justify
                >
                    <Tab eventKey="Class" title="Class">
                        <ManageDevicesOfClass
                            devicesOfClass={devicesOfClass}
                            fetchListDevice={fetchListDevice}
                        />
                    </Tab>
                    <Tab eventKey="CSVC" title="CSVC">
                        <ManageDevicesCSVC
                            devicesOfCSVC={devicesOfCSVC}
                            fetchListDevice={fetchListDevice}
                        />
                    </Tab>

                </Tabs>


            </div>
        </div>
    )
}

export default ManageDevices;
