import React from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.css';

const clx = classNames.bind(styles);

const Sidebar = () => {
  return (
    <div className={clx('sidebar')}>
      <div className={clx('logo')}>MyApp</div>
      <ul className={clx('menu')}>
        <li className={clx('menu-item')}>Dashboard</li>
        <li className={clx('menu-item')}>Profile</li>
        <li className={clx('menu-item')}>Settings</li>
        <li className={clx('menu-item')}>Help</li>
        <li className={clx('menu-item')}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
