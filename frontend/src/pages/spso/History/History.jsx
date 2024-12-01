import React from "react";
import styles from "./History.module.css";
import "./History.module.css";

import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
const clx = classNames.bind(styles);

function SearchBar({onSearch}) {
  const [email, setEmail] = useState('');
  const [dateFrom, setDateFrom] = useState("2024-11-30");
  const [dateTo, setDateTo] = useState("2024-11-30");


  const handleFromChange = (event) => {
    setDateFrom(event.target.value);
  };
  const handleToChange = (event) => {
    setDateTo(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSearch = () => {
    onSearch({ email});
  };
  return (
    <div className={clx("conchim")}>
      <div className={clx("search-bar-wrapper")}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={clx("icon")} />
        <input
          type="text"
          placeholder="Nhập email..."
          className={clx("search-bar")}
          onChange={handleEmailChange}
        />
        <div className={clx("left-wrapper")}>
          <span style={{ fontSize: '20px' }}> Từ ngày </span>
          <input
            className={clx("label-date")}
            type="date"
            value={dateFrom}
            onChange={handleFromChange}
          />
          <span style={{ fontSize: '20px' }}>Đến ngày</span>
          <input
            className={clx("label-date")}
            type="date"
            value={dateTo}
            onChange={handleToChange}
            
          />
          
        </div>
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>
    </div>

  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className={clx("page")}>
      <button
        className={clx("butt")}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        ← Trước
      </button>
      <span>
        Trang {currentPage} / {totalPages}
      </span>
      <button
        className={clx("butt")}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Sau →
      </button>
    </div>
  );
}

function HistoryPage() {
  const [error, setError] = useState(''); // Để hiển thị lỗi (nếu có)
  const [history, setHistory] = useState([]);
  const [document, setDocument] = useState([]);
  const user_id = localStorage.getItem('user_id');
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading

  const getHistory = async (event) => {
    event?.preventDefault(); // Chỉ gọi event.preventDefault() nếu có event
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/spso/history', {
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

            const StudentID = documentData.document.StudentID;

            const response3 = await fetch('http://127.0.0.1:8000/api/getStudent?id=' + StudentID, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const StudentData = await response3.json();

            if (documentData.status === 'success' && printerData.status === 'success') {
              modifiedHistory[i] = {
                ...item,
                Student: StudentData.student.Name,
                Email: StudentData.student.Email,
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

  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = (searchData) => {
    console.log(searchData);
    const filteredData = history.filter(item =>
      item.Email.includes(searchData.email) // search by email
    );
    setSearchResults(filteredData);
  };


  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className={clx("wrapper")}>
      <h2 style={{ fontSize: '40px', color: '#696969' }}>LỊCH SỬ IN</h2>
      <SearchBar onSearch={handleSearch}/>
      <table className={clx("history-table")}>
        <thead>
          <tr>
            <th>STT</th> 
            <th>Sinh viên</th>
            <th>Email</th>
            <th>Tài liệu</th>
            <th>Thời gian</th>
            <th>Máy in</th>
            <th>Số trang</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((item, index) =>  (
            <tr key={item.Email}>
              <td>{index + 1}</td>
              <td>{item.Student}</td>
              <td>{item.Email}</td>

              <td>
                <Link to="#">{item.DocumentID}</Link>
              </td>
              <td>{item.StartTime}</td>
              <td>{item.PrinterID}</td>
              <td>{item.PagesPrinted}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}

export default HistoryPage;

