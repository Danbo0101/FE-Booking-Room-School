import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { postCreateEmployee } from '../../../../services/employeeServices';

const CreateEmployee = (props) => {

    const { listEmployees } = props;

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [identificationNumber, setIdentificationNumber] = useState('');

    useEffect(() => {
        // console.log(listEmployees)
        handleEmployeeId();
    }, [listEmployees])



    const handleEmployeeId = () => {
        if (listEmployees.length === 0) {
            return;
        }

        let maxIndex = 0;
        for (let i = 1; i < listEmployees.length; i++) {
            if (listEmployees[i].employee_id > listEmployees[maxIndex].employee_id) {
                maxIndex = i;
            }
        }
        const maxEmployeeId = listEmployees[maxIndex].employee_id;
        const maxNumber = parseInt(maxEmployeeId.slice(2));
        const newNumber = maxNumber + 1;
        const newEmployeeId = "NV" + newNumber.toString().padStart(3, "0");
        setId(newEmployeeId);
        // console.log(newEmployeeId);
    }

    const handleKeyDown = (event) => {
        // console.log(event.key);
        if (event.key === "Enter") {
            handleSubmitCreateEmployee();
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const capitalizeName = (name) => {
        let words = name.toLowerCase().split(" ");
        let capitalizedWords = words.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
        return capitalizedWords.join(" ");
    }

    const resetDataCreate = () => {
        setName('');
        setEmail('');
        setPhoneNumber('');
        setIdentificationNumber('');
    }


    const handleSubmitCreateEmployee = async () => {

        //validate

        let isValidEmail = validateEmail(email)
        let phoneNumberPattern = /^(0[2-9]|84[2-9])(\d{8}|(\d{2}-){3}\d{2})$/;
        let isPhoneNumber = phoneNumberPattern.test(phoneNumber);

        // console.log(isPhoneNumber)
        switch (true) {
            case !name:
                toast.error("Invalid Name");
                return;
            case !isValidEmail:
                toast.error("Invalid Email");
                return;
            case !phoneNumber || !isPhoneNumber:
                toast.error("Invalid Phone Number");
                return;
            case !identificationNumber || identificationNumber.length !== 12 || !/^\d+$/.test(identificationNumber):
                toast.error("Invalid CCCD");
                return;
            default:
                break;
        }

        let data =
        {
            employee_id: id,
            email: email,
            name: name,
            phone_number: phoneNumber,
            identification_number: identificationNumber
        }

        // console.log(data)
        //api
        let res = await postCreateEmployee(data);
        if (!res.message) {
            toast.success("Create Employee Success");
            resetDataCreate();
        }
        else {
            toast.error("Create Employee Fail");
            console.log(res.message);
        }

    }




    return (
        <>
            <Form.Floating className="mb-3">
                <Form.Control
                    id="floatingInputCustom"
                    type="text"
                    placeholder="Phuong"
                    value={name}
                    onChange={(e) => setName(capitalizeName(e.target.value))}
                // onKeyDown={(event) => handleKeyDown(event)}
                />
                <label htmlFor="floatingInputCustom">Name</label>
            </Form.Floating>
            <Row className="g-2 ">
                <Col md>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="text"
                            placeholder="Phone"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        // onKeyDown={(event) => handleKeyDown(event)}
                        />
                        <label htmlFor="floatingInputCustom">Phone</label>
                    </Form.Floating>
                </Col>
                <Col md>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="text"
                            placeholder="CCCD"
                            value={identificationNumber}
                            onChange={(e) => setIdentificationNumber(e.target.value)}
                        // onKeyDown={(event) => handleKeyDown(event)}
                        />
                        <label htmlFor="floatingInputCustom">CCCD</label>
                    </Form.Floating>
                </Col>
            </Row>
            <Form.Floating className="mb-3">
                <Form.Control
                    id="floatingInputCustom"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(event) => handleKeyDown(event)}
                />
                <label htmlFor="floatingInputCustom">Email</label>
            </Form.Floating>

            <div className='btn-submit'>
                <Button
                    variant="outline-info"
                    onClick={() => handleSubmitCreateEmployee()}
                >Submit</Button>
            </div>


        </>
    )
}

export default CreateEmployee;