import React from 'react'
import classNames from 'classnames/bind'
import styles from './RolePage.module.css';
import { asset } from '../../assets/asset'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import {faUserGroup} from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const clx = classNames.bind(styles)

function RolePage() {
  return (
      <div className={clx('Role')}>
           <img 
            src={asset.logo} 
            alt="logo back khoa"
            className={clx("logobk")}
             />
            <span>
            <img 
            src={asset.sspsIcon} 
            alt="logo ssps"
            className={clx("ssps")}
             />
            </span>
            <h1 className={clx('the')} style={{fontSize: '50px'}}> Bạn là ai ai ?</h1>
            <div className={clx('choose')}>
                 <Link to="/login" 
                       state={{ userType: 'student' }}>
                      <button type="submit"className={clx('butt')}>
                       <FontAwesomeIcon icon={faGraduationCap} className={clx('icon')}/>
                      <span>Sinh Viên</span>
                      </button>
                  </Link>
                  <Link  to="/login" 
                       state={{ userType: 'spso' }}>
                      <button type="submit" className={clx('butt')} >
                      <FontAwesomeIcon icon={faUserGroup} className={clx('iconsp')}/>
                     <span> SPSO</span>
                     </button>
                  </Link>
           </div>   
        </div>
  )
}

export default RolePage;