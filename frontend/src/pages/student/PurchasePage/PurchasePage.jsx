import React, { useState } from "react";
import "./PurchasePage.css";
import SuccessPopup from "./SuccessPopup";
import FailurePopup from "./FailurePopup";
import RechargePopup from "./RechargePopup";
import { Link } from "react-router-dom";

const PurchasePage = () => {
  const [pagesToBuy, setPagesToBuy] = useState(10);
  const [totalFee, setTotalFee] = useState(5000);
  const [remainingPages, setRemainingPages] = useState(0);
  const [userBalance, setUserBalance] = useState(10000);
  const [popupType, setPopupType] = useState("");
  const pagePrice = 500;

  // Handles input change and recalculates total fee
  const handleInputChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 0);
    setPagesToBuy(value);
    setTotalFee(value * pagePrice);
  };

  const handlePurchase = () => {
    if (totalFee > userBalance) {
      setPopupType("failure");
      return;
    }

    // Deduct balance and add purchased pages
    setUserBalance(userBalance - totalFee);
    setRemainingPages(remainingPages + pagesToBuy);
    setPopupType("success");
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
