import './DashBoard.scss'
import { IoFilter, IoTriangleOutline } from "react-icons/io5";
import { FaRegSquare } from "react-icons/fa";






const DashBoard = (props) => {
    return (
        <div className="dashboard-contanier">
            <div className="left-contanier">
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
                        <div className="form-check filter-child">
                            <input className="form-check-input" type="checkbox" id="child-1" />
                            <label className="form-check-label filter-child-name" htmlFor="child-1">
                                Zone A
                            </label>
                            <div className='filter-child-num'>
                                12
                            </div>
                        </div>
                        <div className="form-check filter-child">
                            <input className="form-check-input" type="checkbox" id="child-2" />
                            <label className="form-check-label filter-child-name" htmlFor="child-2">
                                Zone B
                            </label>
                            <div className='filter-child-num'>
                                12
                            </div>
                        </div>
                        <div className="form-check filter-child">
                            <input className="form-check-input" type="checkbox" value="" id="child-3" />
                            <label className="form-check-label filter-child-name" htmlFor="child-3">
                                Zone C
                            </label>
                            <div className='filter-child-num'>
                                12
                            </div>
                        </div>
                        <div className="form-check filter-child">
                            <input className="form-check-input" type="checkbox" value="" id="child-4" />
                            <label className="form-check-label filter-child-name" htmlFor="child-4">
                                Zone D
                            </label>
                            <div className='filter-child-num'>
                                12
                            </div>
                        </div>
                        <div className="form-check filter-child">
                            <input className="form-check-input" type="checkbox" value="" id="child-5" />
                            <label className="form-check-label filter-child-name" htmlFor="child-5">
                                Zone E
                            </label>
                            <div className='filter-child-num'>
                                12
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='filter-child'>
                        <div className='filter-child-title'>
                            Floor
                        </div>
                        <div className="form-check filter-child">
                            <input className="form-check-input" type="checkbox" id="child-6" />
                            <label className="form-check-label filter-child-name" htmlFor="child-6">
                                Floor 1
                            </label>
                            <div className='filter-child-num'>
                                12
                            </div>
                        </div>
                        <div className="form-check filter-child">
                            <input className="form-check-input" type="checkbox" id="child-7" />
                            <label className="form-check-label filter-child-name" htmlFor="child-7">
                                Floor 2
                            </label>
                            <div className='filter-child-num'>
                                12
                            </div>
                        </div>
                        <div className="form-check filter-child">
                            <input className="form-check-input" type="checkbox" value="" id="child-8" />
                            <label className="form-check-label filter-child-name" htmlFor="child-8">
                                Floor 3
                            </label>
                            <div className='filter-child-num'>
                                12
                            </div>
                        </div>
                        <div className="form-check filter-child">
                            <input className="form-check-input" type="checkbox" value="" id="child-9" />
                            <label className="form-check-label filter-child-name" htmlFor="child-9">
                                Floor 4
                            </label>
                            <div className='filter-child-num'>
                                12
                            </div>
                        </div>

                    </div>
                    <div className='btn-filter'>
                        <button>Filter</button>
                    </div>
                </div>

            </div>
            <div className="right-contanier">
                <div className='title'>
                    <div className='title-main'>
                        <IoTriangleOutline />
                        Floor Three
                    </div>
                    <div className='title-sub'>
                        <div className='title-available'>
                            <FaRegSquare />
                            Available
                        </div>
                        <div className='title-unavailable'>
                            <FaRegSquare />
                            Unavailable
                        </div>
                    </div>

                </div>
                <div className='room'>
                    <div className='room-name'>
                        Room
                    </div>
                    <div className='time'>
                        <div className='time-child'>6.am</div>
                        <div className='time-child'>7.am</div>
                        <div className='time-child'>8.am</div>
                        <div className='time-child'>9.am</div>
                        <div className='time-child'>10.am</div>
                        <div className='time-child'>11.am</div>
                        <div className='time-child'>12.am</div>
                        <div className='time-child'>1.pm</div>
                        <div className='time-child'>2.pm</div>
                        <div className='time-child'>3.pm</div>
                        <div className='time-child'>4.pm</div>
                        <div className='time-child'>5.pm</div>
                    </div>
                </div>
                <div className='room'>
                    <div className='room-name'>
                        Room 1
                    </div>
                    <div className='room-time'>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                    </div>
                </div>
                <div className='room'>
                    <div className='room-name'>
                        Room 2
                    </div>
                    <div className='room-time'>
                        <div className='room-time-child'></div>
                        <div className='room-time-child active'></div>
                        <div className='room-time-child active'></div>
                        <div className='room-time-child active'></div>
                        <div className='room-time-child active'></div>
                        <div className='room-time-child active'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child passive'></div>
                        <div className='room-time-child passive'></div>
                        <div className='room-time-child passive'></div>
                        <div className='room-time-child passive'></div>
                        <div className='room-time-child '></div>
                    </div>
                </div>
                <div className='room'>
                    <div className='room-name'>
                        Room 3
                    </div>
                    <div className='room-time'>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                    </div>
                </div>
                <div className='room'>
                    <div className='room-name'>
                        Room 4
                    </div>
                    <div className='room-time'>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                    </div>
                </div>
                <div className='room'>
                    <div className='room-name'>
                        Room 5
                    </div>
                    <div className='room-time'>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                    </div>
                </div>
                <div className='room'>
                    <div className='room-name'>
                        Room 6
                    </div>
                    <div className='room-time'>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                    </div>
                </div>
                <div className='room'>
                    <div className='room-name'>
                        Room 7
                    </div>
                    <div className='room-time'>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                    </div>
                </div>
                <div className='room'>
                    <div className='room-name'>
                        Room 8
                    </div>
                    <div className='room-time'>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                        <div className='room-time-child'></div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default DashBoard;