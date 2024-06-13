import { useEffect, useState } from "react";
import Select from 'react-select';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";



const Filter = (props) => {


    const [zone, setZone] = useState(null);
    const [floor, setFloor] = useState(null)


    const zoneOptions = [
        { value: 'A', label: 'Zone A' },
        { value: 'B', label: 'Zone B' },
        { value: 'C', label: 'Zone C' },
        { value: 'D', label: 'Zone D' },
        { value: 'E', label: 'Zone E' }
    ];

    const floorOptions = [
        { value: '0', label: 'Floor 0' },
        { value: '1', label: 'Floor 1' },
        { value: '2', label: 'Floor 2' },
        { value: '3', label: 'Floor 3' },
    ];

    const handleReset = () => {
        setFloor(null);
        setZone(null);
    }

    const handleSubmitFilter = () => {
        if (!zone) {
            toast.warn("Invalid Zone");
            return
        }
        if (!floor) {
            toast.warn("Invalid Floor");
            return
        }
        props.handleFilter(zone.value, floor.value);
        handleReset();
    }

    return (
        <div className="filter">
            <div className="form-floating ">
                <Select
                    defaultValue={zone}
                    onChange={setZone}
                    options={zoneOptions}
                    placeholder={"Dãy ..."}
                />
            </div>
            <div className="form-floating ">
                <Select
                    defaultValue={floor}
                    onChange={setFloor}
                    options={floorOptions}
                    placeholder={"Lầu ..."}
                />
            </div>
            <span
                className="btn-filter"
                onClick={() => handleSubmitFilter()}>
                <IoMdCheckmarkCircleOutline />
            </span>
        </div>
    )
}

export default Filter;