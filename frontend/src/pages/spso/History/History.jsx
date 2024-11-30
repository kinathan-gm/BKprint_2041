import React from "react";
import styles from "./History.module.css";
import "./History.module.css";
import { useState } from "react";
import classNames from "classnames/bind";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";
const clx = classNames.bind(styles);
function SearchBar() {
    const [dateFrom, setDateFrom] = useState("2024-11-30");
  const [dateTo, setDateTo] = useState("2024-11-30");
  const handleFromChange = (event) => {
    setDateFrom(event.target.value);
  };
  const handleToChange = (event) => {
    setDateTo(event.target.value);
  };
  return (
    <div className={clx("conchim")}>
    <div className={clx("search-bar-wrapper")}>
    <FontAwesomeIcon icon={faMagnifyingGlass} className={clx("icon")} />
    <input
      type="text"
      placeholder="Nhập MSSV..."
      className={clx("search-bar")}
    />
    <div className={clx("left-wrapper")}>
    <span style={{fontSize: '20px'}}> Từ ngày </span>
    <input
    className={clx("label-date")}
     type="date"
     value={dateFrom}
     onChange={handleFromChange}
    />
    <span style={{fontSize: '20px'}}>Đến ngày</span> 
    <input
    className={clx("label-date")}
     type="date"
     value={dateTo}
     onChange={handleToChange}
    />
    </div>
  </div>
  </div>

  );
}

function PrintHistoryTable() {
  const historyData = [
    {
      mssv: 2222222,
      file: "report.pdf",
      time: "07:00 20/10/2024",
      printer: "001 - CS2 - H6 - Tầng 1",
      pages: 10,
    },
    {
        mssv: 222222,
        file: "report.pdf",
        time: "07:00 20/10/2024",
        printer: "001 - CS2 - H6 - Tầng 1",
        pages: 10,
    },
    {
        mssv: 2224222,
        file: "report.pdf",
        time: "07:00 20/10/2024",
        printer: "001 - CS2 - H6 - Tầng 1",
        pages: 10,
      },
      {
        mssv: 2221222,
        file: "report.pdf",
        time: "07:00 20/10/2024",
        printer: "001 - CS2 - H6 - Tầng 1",
        pages: 10,
      },
      {
        mssv: 2222224,
        file: "report.pdf",
        time: "07:00 20/10/2024",
        printer: "001 - CS2 - H6 - Tầng 1",
        pages: 10,
      },
  ];

  return (
    <table className={clx("history-table")}>
      <thead>
        <tr>
          <th>MSSV</th>
          <th>Tài liệu</th>
          <th>Thời gian</th>
          <th>Máy in</th>
          <th>Số trang</th>
        </tr>
      </thead>
      <tbody>
        {historyData.map((item) => (
          <tr key={item.mssv}>
            <td>{item.mssv}</td>
            <td>
              <Link to="#">{item.file}</Link>
            </td>
            <td>{item.time}</td>
            <td>{item.printer}</td>
            <td>{item.pages}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
  return (
      <div className={clx("wrapper")}>
        <h2 style={{fontSize: '40px', color:'#696969'}}>LỊCH SỬ IN</h2>
        <SearchBar />
        <PrintHistoryTable />
        <Pagination />
      </div>
  );
}

export default HistoryPage;
