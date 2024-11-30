import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ConfigPage.module.css";

const clx = classNames.bind(styles);

function ConfigPage(){
  const [numPages, setNumPages] = useState(20);
  const [inputValue, setInputValue] = useState(""); 
  const [date, setDate] = useState("28-08-2024"); 
  const [tempDate, setTempDate] = useState("28-08-2024"); 
  const [allowedTypes, setAllowedTypes] = useState({
    XLS: false,
    DOC: false,
    JPG: false,
    PPT: false,
    PNG: false,
    PDF: false,
  });

  const toggleType = (type) => {
    setAllowedTypes((prevState) => ({ ...prevState, [type]: !prevState[type] }));
  };

  const handlePaperUpdate = () => {
    if (!isNaN(inputValue) && inputValue !== "" && parseInt(inputValue, 10) >= 0) {
      setNumPages(parseInt(inputValue, 10));
      setInputValue("");
    } else {
      alert("Vui lòng nhập một số hợp lệ!");
    }
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };
  
  const handleDateUpdate = () => {
    setDate(tempDate);
    alert("Đã cập nhật ngày!");
  };

  return (
    <div className={clx("wrapper")}>
      <h1>Cấu hình</h1>
      <div className={clx("container")}>
        {/* Số tờ cấp phát */}
        <div className={clx("paper")}>
          <span className={clx("bold-text")}>Số tờ cấp phát: </span>
          <span className={clx("number")}>{numPages}</span> tờ A4/một người dùng
          <input
            className={clx("label-paper")}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className={clx("button")} onClick={handlePaperUpdate}>
            Cập nhật
          </button>
        </div> 

        <div className={clx("date")}>
          <span className={clx("bold-text")}>Ngày cấp phát: </span>
          <span className={clx("number")}>{tempDate}</span>
          <input
            className={clx("label-date")}
            type="date"
            onChange={(e) => setTempDate(formatDate(e.target.value))}
          />
          <button className={clx("button-date")} onClick={handleDateUpdate}>
            Cập nhật
          </button>
        </div>

        {/* Loại file được phép tải */}
        <div className={clx("file-types")}>
          <span className={clx("bold-text")}>Loại file được phép tải lên:</span> 
          <div className={clx("label-input")}>
          {["XLS", "DOC", "JPG", "PPT", "PNG", "PDF"].map((type) => (
            <label  key={type}>
              <input
                type="checkbox"
                checked={allowedTypes[type]}
                onChange={() => toggleType(type)}
                className={clx("checkbox-input")}
              />
              {type}
            </label>
          ))}
          </div>
          <button className={clx("button-file")} onClick={() => console.log({allowedTypes})}>Cập nhật</button>
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;
