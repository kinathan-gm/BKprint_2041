import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LoginPage.module.css';
import { asset } from '../../assets/asset';
import { useLocation, useNavigate } from 'react-router-dom';

const clx = classNames.bind(styles);

function LoginPage() {
  const location = useLocation();
  const userType = location.state?.userType || 'student'; // Lấy userType từ route params
  const navigate = useNavigate();

  // State để quản lý thông tin nhập vào
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hàm xử lý đăng nhập
  const handleLogin = async (event) => {
    event.preventDefault();

    // Gửi request đến backend (Laravel)
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        userType: userType, 
      }),
    });

    const data = await response.json();

    if (data.status === 'success') {
      localStorage.setItem('user', JSON.stringify(data.user)); 
      localStorage.setItem('userType', data.userType); 
      localStorage.setItem('user_id', data.user_id);
      if (data.userType === 'student') {
        navigate('/student'); 
      } else if (data.userType === 'spso') {
        navigate('/spso'); 
      }
    } else {
      setError(data.message || 'Đăng nhập thất bại'); 
    }
  };

  return (
    <div className={clx('loginform')}>
      <img src={asset.logo} alt="logo back khoa" className={clx('logobk')} />
      <span>
        <img src={asset.sspsIcon} alt="logo ssps" className={clx('ssps')} />
      </span>
      <h1 className={clx('the')} style={{ fontSize: '50px' }}>
        Đăng nhập <b>{userType}</b>
      </h1>
      <div className={clx('form')}>
        <form className={clx('form-login')} onSubmit={handleLogin} action="#">
          <div className={clx('input-group')}>
            <input
              required
              type="text"
              id="username"
              name="username"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Tên đăng nhập</label>
          </div>
          <div className={clx('input-group')}>
            <input
              required
              type="password"
              id="password"
              name="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Mật khẩu</label>
          </div>
          {error && <div className={clx('error')}>{error}</div>} {/* Hiển thị thông báo lỗi */}
          <button type="submit" className={clx('login-button')}>
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
