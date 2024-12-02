import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import SecondaryButton from '../../../component/SecondaryButton.jsx';
import styles from './StudentHistoryPage.module.css';

const clx = classNames.bind(styles);

const StudentHistoryPage = () => {
  const [error, setError] = useState(''); // Để hiển thị lỗi (nếu có)
  const [history, setHistory] = useState([]);
  const [document, setDocument] = useState([]);
  const user_id = localStorage.getItem('user_id');
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
  const getHistory = async (event) => {
    event?.preventDefault(); // Chỉ gọi event.preventDefault() nếu có event
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/student/history?user_id=' + user_id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setError('Đang lấy lịch sử...');
      const data = await response.json();

      if (data.status === 'success') {
        // // setHistory(data.history || []);

        const modifiedHistory = [...data.history];

        for (let i = 0; i < data.history.length; i++) {
          const item = data.history[i];

          try {
            const response = await fetch('http://127.0.0.1:8000/api/document?id=' + item.DocumentID, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            const response2 = await fetch('http://127.0.0.1:8000/api/printer?id=' + item.PrinterID, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            const printerData = await response2.json();

            const documentData = await response.json();

            if (documentData.status === 'success' && printerData.status === 'success') {
              modifiedHistory[i] = {
                ...item,
                DocumentID: documentData.document.FileName || 'Chưa có tên tài liệu',
                PrinterID: printerData.printer.Brand + ' ' + printerData.printer.Model || 'Chưa có tên máy in',
              };
            }
          } catch (error) {
            modifiedHistory[i] = {
              ...item,
              DocumentID: 'Lỗi khi lấy tên tài liệu',
              PrinterID: 'Lỗi khi lấy tên máy in',
            };
          } finally {
            setIsLoading(false);
          }
        }


        setHistory(modifiedHistory);
        setError(data.message || 'Lấy lịch sử thành công');
      } else {
        setError(data.message || 'Lấy lịch sử thất bại');
      }
    } catch (error) {

      setError('Đã có lỗi xảy ra khi lấy lịch sử, vui lòng thử lại!');
    }


  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className={clx('container')}>
      <div className={clx('alert-success')}>
        {isLoading ? (
          <div className="loading-container">
            <span className="loading-text">Đang lấy lịch sử...</span>
            
          </div>
        ) : (
          <span>{error}</span>
        )}
      </div>

      <div className={clx('title')}>
        <span>Lịch sử in</span>
      </div>

      <div className={clx('search-box')}>
        <input type="text" className={clx('search-input')} placeholder="Tìm kiếm..." />
        <div className={clx('search-icon')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17a6 6 0 100-12 6 6 0 000 12zm0 0l5 5m-5-5h.01" />
          </svg>
        </div>
      </div>

      <div className={clx('table-container')}>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tài liệu</th>
              <th>Máy in</th>
              <th>Thời gian</th>
              <th>Số trang</th>
              <th>Số bản</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={item.PrintJobID}>
                <td className={clx('truncate')}>{index + 1}</td>
                <td className={clx('truncate')}>{item.DocumentID}</td>
                <td className={clx('truncate')}>
                  {item.PrinterID}
                </td>
                <td className={clx('truncate')}>
                  {item.StartTime}
                </td>
                <td className={clx('truncate')}>
                  {item.PagesPrinted}
                </td>
                <td className={clx('truncate')}>
                  {item.Copies}
                </td>
                <td className={clx('status')}>
                  <span className={clx('status-btn')}>Đã in</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={clx('pagination')}>
          <div className={clx('text')}>Hiển thị 3/180 dòng</div>
          <div className={clx('buttons')}>
            <button className={clx('prev')}>&lt;-- Trước</button>
            <button className={clx('next')}>Sau --&gt;</button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default StudentHistoryPage;
