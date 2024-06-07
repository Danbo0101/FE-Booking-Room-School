import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { toast } from 'react-toastify';


const Filter = (props) => {


    // const [zone, setZone] = useState('');
    // const [floor, setFloor] = useState('');

    const { zone, floor } = props;


    const handleZoneChange = (e, selectedZone) => {
        if (e.target.checked) {
            props.setZone(selectedZone);
        } else {
            props.setZone('');
        }
    };

    const handleFloorChange = (e, selectedFloor) => {
        if (e.target.checked) {
            props.setFloor(selectedFloor);
        } else {
            props.setFloor(null);
        }
    };


    return (
        <>

            <div className='title'>
                Filter By
                <IoFilter />
            </div>
            <hr />
            <div className='filter-content'>
                <div className='filter-child'>
                    <div className='filter-child-title'>
                        Zone
                    </div>
                    {['A', 'B', 'C', 'D', 'E'].map((z) => (
                        <div className="form-check filter-child" key={z}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`zone-${z}`}
                                onChange={(e) => handleZoneChange(e, z)}
                                checked={zone === z}
                            />
                            <label className="form-check-label filter-child-name" htmlFor={`zone-${z}`}>
                                Zone {z}
                            </label>
                        </div>
                    ))}
                </div>
                <hr />
                <div className='filter-child'>
                    <div className='filter-child-title'>
                        Floor
                    </div>
                    {[0, 1, 2, 3].map((f) => (
                        <div className="form-check filter-child" key={f}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`floor-${f}`}
                                onChange={(e) => handleFloorChange(e, f)}
                                checked={floor === f}
                            />
                            <label className="form-check-label filter-child-name" htmlFor={`floor-${f}`}>
                                Floor {f}
                            </label>
                        </div>
                    ))}

                </div>
                <div className='btn-filter'>
                    <button onClick={() => props.filterByZoneAndFloor()}>Filter</button>
                </div>
            </div>


        </>
    )
}


export default Filter;