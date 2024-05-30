
import Accordion from 'react-bootstrap/Accordion';
import CreateStudent from './Modal/ModalCreateStudent';
import './ManageStudents.scss';
import { useEffect, useState } from 'react';
import ViewStudent from './Modal/ModalViewStudent';
import UpdateStudent from './Modal/ModalUpdateStudent';
import DeleteStudent from './Modal/ModalDeleteStudent';
import TableStudent from './TableStudent';
import _ from 'lodash';


const ManageStudent = (props) => {

    const [showView, setShowView] = useState(false);
    const [dataView, setDataView] = useState("");

    const [showUpdate, setShowUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState("");

    const [showDelete, setShowDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState("");

    const LIMIT_STUDENT = 5;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)


    const [listStudent, setListStudent] = useState([
        {
            id: 1,
            name: "Phung",
            phone: "09123456789",
            className: "D21CQCN01-N",
            email: "N21DCCN631@student.ptithcm.edu.vn"
        },
        {
            id: 2,
            name: "Phuc",
            phone: "09123456789",
            className: "D21CQCN01-N",
            email: "N21DCCN633@student.ptithcm.edu.vn"
        },
        {
            id: 3,
            name: "Phuong",
            phone: "09123456789",
            className: "D21CQCN01-N",
            email: "N21DCCN632@student.ptithcm.edu.vn"
        },
        {
            id: 4,
            name: "Phat",
            phone: "09123456789",
            className: "D21CQCN01-N",
            email: "N21DCCN630@student.ptithcm.edu.vn"
        },
        {
            id: 5,
            name: "Phung",
            phone: "09123456789",
            className: "D21CQCN01-N",
            email: "N21DCCN631@student.ptithcm.edu.vn"
        },
        {
            id: 6,
            name: "Phuc",
            phone: "09123456789",
            className: "D21CQCN01-N",
            email: "N21DCCN633@student.ptithcm.edu.vn"
        },
        {
            id: 7,
            name: "Phuong",
            phone: "09123456789",
            className: "D21CQCN01-N",
            email: "N21DCCN632@student.ptithcm.edu.vn"
        },
        {
            id: 8,
            name: "Phat",
            phone: "09123456789",
            className: "D21CQCN01-N",
            email: "N21DCCN630@student.ptithcm.edu.vn"
        },
        {
            id: 9,
            name: "Phung",
            phone: "09123456789",
            className: "D21CQCN01-N",
            email: "N21DCCN631@student.ptithcm.edu.vn"
        },
        {
            id: 10,
            name: "Phuc",
            phone: "09123456789",
            className: "D21CQCN01-N",
            email: "N21DCCN633@student.ptithcm.edu.vn"
        },
        {
            id: 11,
            name: "Phuong",
            phone: "09123456789",
            className: "D21CQCN01-N",
            email: "N21DCCN632@student.ptithcm.edu.vn"
        },
        {
            id: 12,
            name: "Phat",
            phone: "09123456789",
            className: "D21CQCN01-N",
            email: "N21DCCN630@student.ptithcm.edu.vn"
        }
    ])

    const [listStudentPaginate, setListStudentPaginate] = useState([]);

    useEffect(() => {
        CalPageCount();
    }, [listStudent])

    useEffect(() => {
        fetchListWithPaginate()
    }, [currentPage, listStudent])


    const CalPageCount = () => {
        const totalStudents = listStudent.length;
        const totalPages = Math.ceil(totalStudents / LIMIT_STUDENT);
        setPageCount(totalPages);
        // console.log(currentPage);
    }

    const fetchListWithPaginate = () => {
        const startIndex = (currentPage - 1) * LIMIT_STUDENT;
        const endIndex = startIndex + LIMIT_STUDENT;
        const paginatedList = listStudent.slice(startIndex, endIndex);
        setListStudentPaginate(paginatedList);
        console.log(paginatedList);
    }



    const handleViewStudent = (student) => {
        setShowView(true);
        setDataView(student);
    }

    const handleUpdateStudent = (student) => {
        setShowUpdate(true);
        setDataUpdate(student);
    }

    const handleDeleteStudent = (student) => {
        setShowDelete(true);
        setDataDelete(student);

    }

    const handleSubmitDeleteStudent = () => {
        const listStudentClone = _.cloneDeep(listStudent);
        let index = listStudentClone.findIndex(item => item.id === dataDelete.id);
        if (index !== -1) {
            listStudentClone.splice(index, 1);

            setListStudent(listStudentClone);
        }
        setShowDelete(false)
    }

    return (
        <div className="manage-student-container">
            <div className="title-page">
                Manage Students
            </div>
            <hr />
            <div className="main-ms-container">
                {/* <div>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Add Students</Accordion.Header>
                            <Accordion.Body>
                                <CreateStudent />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div> */}
                <div className='table-student'>
                    <TableStudent
                        // listStudent={listStudent}
                        listStudentPaginate={listStudentPaginate}
                        handleViewStudent={handleViewStudent}
                        handleUpdateStudent={handleUpdateStudent}
                        handleDeleteStudent={handleDeleteStudent}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />

                </div>

            </div>
            <ViewStudent
                show={showView}
                setShow={setShowView}
                dataView={dataView}
            />
            <UpdateStudent
                show={showUpdate}
                setShow={setShowUpdate}
                dataUpdate={dataUpdate}
            />
            <DeleteStudent
                show={showDelete}
                setShow={setShowDelete}
                dataDelete={dataDelete}
                setCurrentPage={setCurrentPage}
                handleSubmitDeleteStudent={handleSubmitDeleteStudent}
            />
        </div>
    )
}

export default ManageStudent;