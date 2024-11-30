import React, { useState, useEffect, useRef } from 'react';
import { asset } from '../../assets/asset';
import classNames from 'classnames/bind';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBell, faBellSlash } from '@fortawesome/free-regular-svg-icons';
import { faBellConcierge, faChevronDown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const clx = classNames.bind(styles)

function Navbar({isAuthenticated, userType, userName}) {
  const notifications = [
    {
      title: 'Tài liệu đã được in',
      time: '17:00 21/11/2024',
      content: 'Tài liệu cnpm.pdf của bạn đã được in. Vui lòng đến Tầng 6-H6-CS2 để nhận. Xin cảm ơn !'
    },
    {
      title: 'Tài liệu đã được in',
      time: '17:00 21/11/2024',
      content: 'Tài liệu cnpm.pdf của bạn đã được in. Vui lòng đến Tầng 6-H6-CS2 để nhận. Xin cảm ơn !'
    },
    {
      title: 'Tài liệu đã được in',
      time: '17:00 21/11/2024',
      content: 'Tài liệu cnpm.pdf của bạn đã được in. Vui lòng đến Tầng 6-H6-CS2 để nhận. Xin cảm ơn !'
    },
    {
      title: 'Tài liệu đã được in',
      time: '17:00 21/11/2024',
      content: 'Tài liệu cnpm.pdf của bạn đã được in. Vui lòng đến Tầng 6-H6-CS2 để nhận. Xin cảm ơn !'
    },
    {
      title: 'Tài liệu đã được in',
      time: '17:00 21/11/2024',
      content: 'Tài liệu cnpm.pdf của bạn đã được in. Vui lòng đến Tầng 6-H6-CS2 để nhận. Xin cảm ơn !'
    },
  ]

  const [menu,setMenu] = useState("Trang chủ")
  const [userOpen, setUserOpen] = useState(false);
  const [notiOpen, setNotiOpen] = useState(false);

  const userRef = useRef(null);
  const notiRef = useRef(null);
  const userButtonRef = useRef(null);
  const notiButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userRef.current && !userRef.current.contains(event.target)
          && userButtonRef.current && !userButtonRef.current.contains(event.target)) {
        setUserOpen(false);
      }

      if (notiRef.current && !notiRef.current.contains(event.target)
          && notiButtonRef.current && !notiButtonRef.current.contains(event.target)) {
        setNotiOpen(false);
      } 
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
  return (
    <div className={clx("navbar")}>
      <div ref={userRef} className={clx('user-popup', {'active': userOpen, 'inactive': !userOpen})}>
          <div className={clx('report')}>Báo cáo sự cố</div>
          <div className={clx('info')}>Thông tin</div>
          <div className={clx('logout')} id='logout'>
            <FontAwesomeIcon icon={faRightFromBracket}/>
            <div htmlFor='logout'><b>Đăng xuất</b></div>
          </div>
      </div>
      <div ref={notiRef} className={clx('notification-popup', {'active': notiOpen, 'inactive': !notiOpen})}>
          <div className={clx('noti-popup-title')}><b>Thông báo</b></div>
          {
            notifications.map((noti, index) => (
              <div className={clx('notification')} key={index}>
                <div className={clx('seperator')}></div>
                <div className={clx('notification-inner')}>
                  <div className={clx('noti-title-area')}>
                    <label className={clx('noti-title')}>{noti.title}</label>
                    <label className={clx('noti-time')}>{noti.time}</label>
                  </div>
                  <p className={clx('noti-content')}>{noti.content}</p>
                </div>
              </div>
            ))
          }
      </div>
      <div className={clx("navbar-left")}>
        <img src={asset.logo} alt="BK-SSPS logo" className={clx("logo")} />
        <span className={clx("navbar-brand", 'primary-text')}>BK-</span>
        <span className={clx("navbar-brand", 'dark-text')}>SSPS</span>
      </div>
      <div className={clx("navbar-center")}>
         {isAuthenticated === true ? 
         (userType === 'student' ? 
          (<ul className={clx('list')}>
            <li className={clx('nav-item')}><Link className={clx('nav-link')} to='/student'>Trang chủ</Link></li>
            <li className={clx('nav-item')}><Link className={clx('nav-link')} to='/student/print'>In tài liệu</Link></li>
            <li className={clx('nav-item')}><Link className={clx('nav-link')} to='/student/buy'>Mua trang in</Link></li>
            <li className={clx('nav-item')}><Link className={clx('nav-link')} to='/student/history'>Lịch sử</Link></li>
          </ul>)
         :(<ul className={clx('list')} >
          <li className={clx('nav-item')}><Link className={clx('nav-link')} to='/spso'>Trang chủ</Link></li>
          <li className={clx('nav-item')}><Link className={clx('nav-link')} to='/spso/manage'>Quản lý máy in</Link></li>
          <li className={clx('nav-item')}><Link className={clx('nav-link')} to='/spso/config'>Cấu hình</Link></li>
          <li className={clx('nav-item')}><Link className={clx('nav-link')} to='/spso/history'>Lịch sử</Link></li>
        </ul>))
         :(<ul className={clx('list')} ></ul>)}
      </div>
      {isAuthenticated === true ? 
      (
        <div className={clx("navbar-right")}>
          <button ref={notiButtonRef} className={clx("user-button")} onClick={() => setNotiOpen(!notiOpen)}>
            <div className={clx('pulse', {'emphasize': true})}>
              <FontAwesomeIcon icon={faBell} className={clx('icon', {'emphasize': true})}/>
            </div>
          </button>
          <div className={clx("user-avatar")}>{userName}</div>
          <button ref={userButtonRef} className={clx("user-button")} onClick={() => setUserOpen(!userOpen)}>
            <FontAwesomeIcon icon={faChevronDown} className={clx('icon')}/>
          </button>
        </div>
      )
      :(
        <div className={clx("navbar-right")}>
          <Link to='/role' className={clx('login-btn')}>Đăng nhập</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;