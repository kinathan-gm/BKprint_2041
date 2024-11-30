import React from "react";
import "./StudentHistoryPage.css";
import { Link } from "react-router-dom";

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Tìm kiếm..." />
    </div>
  );
}

function PrintHistoryTable() {
  const historyData = [
    {
      id: 1,
      file: "report.pdf",
      time: "07:00 20/10/2024",
      status: "Đang xử lý",
      pages: 10,
    },
    {
      id: 2,
      file: "mangmaytinh.pdf",
      time: "17:00 10/10/2024",
      status: "Đã in",
      pages: 15,
    },
    {
      id: 3,
      file: "cnxh.pdf",
      time: "07:00 20/10/2024",
      status: "Đã in",
      pages: 30,
    },
    {
      id: 4,
      file: "lichbaocao.pdf",
      time: "19:00 29/10/2024",
      status: "Đã in",
      pages: 1,
    },
    {
      id: 5,
      file: "lichbaocao.pdf",
      time: "19:00 29/10/2024",
      status: "Đã in",
      pages: 1,
    },
  ];

  return (
    <table className="print-history-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tài liệu</th>
          <th>Thời gian</th>
          <th>Trạng thái</th>
          <th>Số trang</th>
        </tr>
      </thead>
      <tbody>
        {historyData.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              <Link to="#">{item.file}</Link>
            </td>
            <td>{item.time}</td>
            <td
              className={
                item.status === "Đang xử lý" ? "processing" : "printed"
              }
            >
              {item.status}
            </td>
            <td>{item.pages}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Pagination() {
  return (
    <div className="pagination">
      <button className="prev">← Trước</button>
      <span>Hiển thị 5/180 dòng</span>
      <button className="next">Sau →</button>
    </div>
  );
}

function StudentHistoryPage() {
  return (
    <div>
      <div className="history-page">
        <h2>LỊCH SỬ IN</h2>
        <SearchBar />
        <PrintHistoryTable />
        <Pagination />
      </div>
    </div>
  );
}

export default StudentHistoryPage;
