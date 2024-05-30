import './Layout.scss';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Header from './component/Header/Header';



const Layout = (props) => {



    return (
        <div className="layout-container">

            <div className="header-container">
                <Header />
            </div>
            <div className='main-container'>
                <div className='layout-content'>
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>


        </div>
    )


}

export default Layout;