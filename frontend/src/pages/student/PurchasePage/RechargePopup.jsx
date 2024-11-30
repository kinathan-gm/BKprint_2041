import React, { useState } from "react";
import "./RechargePopup.css";

const RechargePopup = ({ onClose, onRecharge }) => {
  const [name, setName] = useState("NGUYỄN VĂN A");
  const [studentId, setStudentId] = useState("2212127");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState(""); // Allow blank for custom user input

  // Handle recharge submission
  const handleRecharge = () => {
    // Remove all formatting (dots, commas) for validation
    const normalizedAmount = parseInt(amount.replace(/[.,]/g, ""), 10) || 0;

    if (!password) {
      alert("Vui lòng nhập mật khẩu!");
      return;
    }

    if (normalizedAmount < 500 || normalizedAmount % 500 !== 0) {
      alert(
        "Số tiền nạp tối thiểu là 500 VND và phải là bội số của 500. Vui lòng nhập số tiền hợp lệ!"
      );
      return;
    }

    onRecharge(normalizedAmount); // Trigger the recharge
    onClose(); // Close popup
  };

  // Handle user input for the amount
  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[.,]/g, ""); // Remove commas and dots
    if (/^\d*$/.test(rawValue)) {
      setAmount(rawValue); // Allow only numeric input
    }
  };

  // Format the amount when the user leaves the field
  const handleAmountBlur = () => {
    const numericValue = parseInt(amount.replace(/[.,]/g, ""), 10) || 0;

    if (numericValue > 0) {
      // Format with commas for "vi-VN" locale
      setAmount(numericValue.toLocaleString("vi-VN"));
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content recharge-popup">
        <h2 className="popup-title">Nạp tiền từ hệ thống BKPAY</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRecharge();
          }}
        >
          <div className="form-group">
            <label>Họ và tên *</label>
            <input type="text" value={name} disabled className="input-field" />
          </div>
          <div className="form-group">
            <label>Mã số sinh viên *</label>
            <input
              type="text"
              value={studentId}
              disabled
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <div className="form-group">
            <label>Nhập số tiền cần nạp *</label>
            <input
              type="text"
              value={amount} // Display raw or formatted value
              onChange={handleAmountChange} // Allow free typing
              onBlur={handleAmountBlur} // Format after leaving the field
              className="input-field"
              placeholder="Nhập số tiền (bội số của 500)"
            />
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="confirm-button">
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RechargePopup;
