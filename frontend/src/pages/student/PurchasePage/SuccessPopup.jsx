import React from "react";
import "./Popup.css";

const SuccessPopup = ({ onClose, purchasedPages, remainingPages, balance }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-icon" onClick={onClose}>
          &times;
        </span>
        <h2 className="text-success">GIAO DỊCH THÀNH CÔNG</h2>
        <p>
          Bạn đã mua thành công <strong>{purchasedPages}</strong> trang in!
        </p>
        <p>
          Số dư ví: <strong>{balance.toLocaleString()}đ</strong>
        </p>
        <p>
          Số trang còn lại: <strong>{remainingPages}</strong>
        </p>
        <button className="btn-success" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
