import './Admin.scss';
import Header from "../Header/Header";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';




const Admin = () => {

    // const role = "ADMIN";
    const role = useSelector(state => state.user.account.role);
    const accessToken = useSelector(state => state.user.account.accessToken);
    console.log(accessToken)
    return (
        <div className="admin-contanier">
            <div className="header-container">
                <Header
                    role={role}
                />
            </div>
            <div className="main-container">
                <PerfectScrollbar>
                    <Outlet />
                </PerfectScrollbar>
            </div>
        </div>
    )
}

export default Admin;