import React from "react";
import "./Popup.css";

const FailurePopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-icon" onClick={onClose}>
          &times;
        </span>
        <h2 className="text-danger">GIAO DỊCH THẤT BẠI</h2>
        <div>
          <b>
            Giao dịch không thành công. Vui lòng kiểm tra lại số dư hoặc kết nối
            mạng!
          </b>
        </div>
        <div style={{ marginTop: "20px" }}>
          <button className="btn-failure" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailurePopup;
