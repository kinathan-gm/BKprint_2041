import React, { useState,useEffect } from "react";
import "./PurchasePage.css";
import SuccessPopup from "./SuccessPopup";
import FailurePopup from "./FailurePopup";
import RechargePopup from "./RechargePopup";
import { Link } from "react-router-dom";
import axios from "axios";

const PurchasePage = () => {
  const [pagesToBuy, setPagesToBuy] = useState(10);
  const [totalFee, setTotalFee] = useState(5000);
  const [remainingPages, setRemainingPages] = useState(0);
  const [userBalance, setUserBalance] = useState(10000);
  const [popupType, setPopupType] = useState("");
  const pagePrice = 500;

  // Handles input change and recalculates total fee
  useEffect(() => {
    const fetchBalancePage = async () => {
      try {
        // Lấy user từ localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.StudentID) {
          console.error("User không tồn tại hoặc thiếu idStudent");
          return;
        }

        // Gọi API
        const response = await axios.get(`http://127.0.0.1:8000/api/students/${user.StudentID}/getBalancePage`);
        setRemainingPages(response.data.balancePage); // Cập nhật remainingPages
      } catch (error) {
        console.error("Lỗi khi lấy balancePage:", error);
      }
    };

    fetchBalancePage();
  }, []);
  const handleInputChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 0);
    setPagesToBuy(value);
    setTotalFee(value * pagePrice);
  };

  const handlePurchase = async () => {
    if (totalFee > userBalance) {
      setPopupType("failure");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.StudentID) {
          console.error("User không tồn tại hoặc thiếu idStudent");
          return;
        }
      // Gửi yêu cầu đến API
      const response = await axios.post(
        `http://127.0.0.1:8000/api/students/${user.StudentID}/paymentPage`, // Thay ID sinh viên bằng ID thực tế
        {
          amount: totalFee,
          paymentMethod: "credit-card", // Hoặc phương thức thanh toán khác
          page: pagesToBuy,
        }
      );

      // Cập nhật số dư và số trang còn lại từ phản hồi API
      const { balancePage } = response.data;
      setRemainingPages(remainingPages + pagesToBuy);
      setUserBalance(userBalance - totalFee); // Giảm số dư hiện tại
      setPopupType("success");
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      setPopupType("failure");
    }
  };

  const handleRecharge = () => {
    setPopupType("recharge");
  };

  const closePopup = () => {
    setPopupType("");
  };

  const addBalance = (amount) => {
    setUserBalance(userBalance + amount); // Add balance
    setPopupType(""); // Close the recharge popup
  };

  return (
    <div>
      <div className="purchase-section">
        <h2 className="title">MUA TRANG IN</h2>
        <div className="info">
          <span>
            Số trang in còn lại:{" "}
            <span className="highlight-red">{remainingPages} (khổ A4)</span>
          </span>
        </div>
        <div className="purchase-input">
          <label className="input-label">Số lượng trang in cần mua:</label>
          <input
            type="number"
            value={pagesToBuy}
            onChange={handleInputChange}
            className="input-box"
          />
          <button className="purchase-button" onClick={handlePurchase}>
            THANH TOÁN
          </button>
          <button className="recharge-button" onClick={handleRecharge}>
            Nạp Tiền
          </button>
        </div>
        <div className="total-fee">
          <span>
            Tổng lệ phí:{" "}
            <span className="highlight-green">
              {totalFee.toLocaleString()}đ
            </span>
          </span>
          <div className="note">
            (Lệ phí: {pagePrice.toLocaleString()}đ/trang in khổ A4)
          </div>
          <div className="balance">
            Số dư hiện tại:{" "}
            <span className="highlight-green">
              {userBalance.toLocaleString()}đ
            </span>
          </div>
        </div>
      </div>

      {/* Popups */}
      {popupType === "success" && (
        <SuccessPopup
          onClose={closePopup}
          purchasedPages={pagesToBuy}
          remainingPages={remainingPages}
          balance={userBalance}
        />
      )}
      {popupType === "failure" && <FailurePopup onClose={closePopup} />}
      {popupType === "recharge" && (
        <RechargePopup onClose={closePopup} onRecharge={addBalance} />
      )}
    </div>
  );
};

export default PurchasePage;
