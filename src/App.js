import { Routes, Route } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import Layout from './Layout';
import HomePage from './component/HomePage/HomePage';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import ForgotPassword from './component/Auth/ForgotPassword';
import Admin from './component/Admin/Admin';
import ManageRooms from './component/Admin/ManageRooms/ManageRooms';
import ManageDevices from './component/Admin/ManageDevices/ManageDevices';
import DashBoard from './component/DashBoard/Dashboard';
import Student from './component/Students/Student';
import ManageStudent from './component/Admin/ManageStudents/ManageStudents';
import ManageEmployees from './component/Admin/ManageEmployees/ManageEmployees';



const NotFound = () => {
  return (
    <div className="container mt-4 alert alert-danger">

      404. NOT FOUND

    </div>
  )
}


const App = () => {


  return (

    <Suspense fallback="...is loading">

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path='/students' element={<Student />}>
          <Route index element={<DashBoard />} />
        </Route>
        <Route path='/admin' element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path='manage-students' element={<ManageStudent />} />
          <Route path='manage-employees' element={<ManageEmployees />} />
          <Route path='manage-rooms' element={<ManageRooms />} />
          <Route path='manage-devices' element={<ManageDevices />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes >


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <ToastContainer />


    </Suspense >
  );
}

export default App;
