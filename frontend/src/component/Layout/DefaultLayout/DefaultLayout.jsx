import classNames from "classnames/bind";
import styles from './DefaultLayout.module.css';
import Navbar from "../../NavigationBar/Navbar";
import { useLocation } from 'react-router-dom';
const clx = classNames.bind(styles);

function DefaultLayout({children, isAuthenticated, userType, userName}){
    const location = useLocation();
    const isHome = location.pathname === '/student'; 
    return (
        <div className={clx('wrapper')}>
            <Navbar isAuthenticated={isAuthenticated} userType={userType} userName={userName}/>
            <div className={clx('content')}>
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout;