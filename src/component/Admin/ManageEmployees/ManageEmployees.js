
import Accordion from 'react-bootstrap/Accordion';
import './ManageEmployees.scss';
import { useEffect, useState } from 'react';
import TableEmployees from './TableEmployees';
import ViewEmployee from './Modal/ModalViewEmployee';
import UpdateEmployee from './Modal/ModalUpdateEmployee';
import DeleteEmployee from './Modal/ModalDeleteEmployee';
import CreateEmployee from './Modal/ModalCreateEmployee';
// import _ from 'lodash';
import { getAllEmployee } from '../../../services/employeeServices';



const ManageEmployees = (props) => {

    const [showView, setShowView] = useState(false);
    const [dataView, setDataView] = useState("");

    const [showUpdate, setShowUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState("");

    const [showDelete, setShowDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState("");

    const LIMIT_EMPLOYEE = 5;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const [listEmployeePaginate, setListEmployeePaginate] = useState([]);


    const [listEmployees, setListEmployees] = useState([]);
    const [listEmployeesActive, setListEmployeesActive] = useState([]);



    useEffect(() => {
        fetchListEmployee();
    }, []);

    const fetchListEmployee = async () => {

        let data = await getAllEmployee();
        if (data && data.length > 0) {

            // console.log(listEmloyeeClone);
            setListEmployees(data);
        }
        else {
            console.log(data.message);
        }

    }



    useEffect(() => {
        if (listEmployees) {
            let listEmloyeeClone = listEmployees.filter(employee => employee.status === "Còn làm");
            setListEmployeesActive(listEmloyeeClone);
        }
    }, [listEmployees])



    useEffect(() => {
        CalPageCount();
    }, [listEmployeesActive])

    useEffect(() => {
        fetchListWithPaginate()
    }, [currentPage, listEmployeesActive])



    const CalPageCount = () => {
        const totalEmployees = listEmployeesActive.length;
        const totalPages = Math.ceil(totalEmployees / LIMIT_EMPLOYEE);
        setPageCount(totalPages);
        // console.log(currentPage);
    }

    const fetchListWithPaginate = () => {
        const startIndex = (currentPage - 1) * LIMIT_EMPLOYEE;
        const endIndex = startIndex + LIMIT_EMPLOYEE;
        const paginatedList = listEmployeesActive.slice(startIndex, endIndex);
        setListEmployeePaginate(paginatedList);
        // console.log(paginatedList);
    }



    const handleViewEmployee = (employee) => {
        setShowView(true);
        setDataView(employee);
    }

    const handleUpdateEmployee = (employee) => {
        setShowUpdate(true);
        setDataUpdate(employee);
    }

    const handleDeleteEmployee = (employee) => {
        setShowDelete(true);
        setDataDelete(employee);
    }

    // const handleSubmitDeleteEmployee = () => {
    //     const listEmployeesClone = _.cloneDeep(listEmployees);
    //     let index = listEmployeesClone.findIndex(item => item.id === dataDelete.id);
    //     if (index !== -1) {
    //         listEmployeesClone.splice(index, 1);
    //         setListEmployees(listEmployeesClone);
    //     }
    //     setShowDelete(false)
    // }

    return (
        <div className="manage-employees-container">
            <div className="title-page">
                Quản lý nhân viên
            </div>
            <hr />
            <div className="main-ms-container">
                <div>
                    <Accordion >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Thêm nhân viên</Accordion.Header>
                            <Accordion.Body>
                                <CreateEmployee
                                    listEmployees={listEmployees}
                                    fetchListEmployee={fetchListEmployee}
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className='table-employee'>
                    <TableEmployees
                        listEmployeePaginate={listEmployeePaginate}
                        handleViewEmployee={handleViewEmployee}
                        handleUpdateEmployee={handleUpdateEmployee}
                        handleDeleteEmployee={handleDeleteEmployee}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}

                    />

                </div>

            </div>
            <ViewEmployee
                show={showView}
                setShow={setShowView}
                dataView={dataView}

            />
            <UpdateEmployee
                show={showUpdate}
                setShow={setShowUpdate}
                dataUpdate={dataUpdate}
                fetchListEmployee={fetchListEmployee}
            />
            <DeleteEmployee
                show={showDelete}
                setShow={setShowDelete}
                dataDelete={dataDelete}
                setCurrentPage={setCurrentPage}
                fetchListEmployee={fetchListEmployee}
            // handleSubmitDeleteEmployee={handleSubmitDeleteEmployee}
            />

        </div>
    )
}

export default ManageEmployees;