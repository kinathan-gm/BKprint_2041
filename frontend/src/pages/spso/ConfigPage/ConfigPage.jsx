import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ConfigPage.module.css";
import "./ConfigPage.module.css";

const clx = classNames.bind(styles);

const ConfigPage = () => {
  const [numPages, setNumPages] = useState(null);
  const [inputValue, setInputValue] = useState(""); 
  const [date, setDate] = useState(""); 
  const [tempDate, setTempDate] = useState(""); 
  const [allowedTypes, setAllowedTypes] = useState({
    XLS: false,
    DOCX: false,
    JPG: false,
    PPTX: false,
    PNG: false,
    PDF: false,
  });

  useEffect(() => {
    fetch("/api/printer-config")
      .then((response) => response.json())
      .then((data) => {
        if (data.config) {
          const dataConfig = data.config;
          setNumPages(dataConfig.DefaultPages);
          setDate(dataConfig.ConfigDate);
          setTempDate(dataConfig.ConfigDate); 

          const types = {};
          dataConfig.AllowedFileTypes.forEach((type) => {
            types[type] = true;
          });
          setAllowedTypes(types);
        }
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi lấy dữ liệu cấu hình:", error);
      });
  }, []); 

  const toggleType = (type) => {
    setAllowedTypes((prevState) => ({ ...prevState, [type]: !prevState[type] }));
  };

  const handlePaperUpdate = () => {
    if (!isNaN(inputValue) && inputValue !== "" && parseInt(inputValue, 10) >= 0) {
      setNumPages(parseInt(inputValue, 10));
      setInputValue("");

      fetch('/api/update-num-pages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numPages: parseInt(inputValue, 10) }), 
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert(data.message); 
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật số tờ cấp phát:', error);
          alert('Có lỗi xảy ra khi cập nhật số tờ cấp phát!');
        });
    } else {
      alert("Vui lòng nhập một số hợp lệ!");
    }
  };

  const handleDateUpdate = () => {
    setDate(tempDate);

    fetch('/api/update-config-date', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ configDate: tempDate }), // Gửi ngày cấp phát lên backend
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(data.message); // Hiển thị thông báo từ backend
      })
      .catch((error) => {
        console.error('Lỗi khi cập nhật ngày cấp phát:', error);
        alert('Có lỗi xảy ra khi cập nhật ngày cấp phát!');
      });
  };

    const handleFileTypesUpdate = () => {
      const allowedFileTypes = Object.keys(allowedTypes).filter((type) => allowedTypes[type]);
    
      fetch('/api/update-allowed-file-types', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ allowedFileTypes }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert(data.message);
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật loại file:', error);
          alert('Có lỗi xảy ra khi cập nhật loại file!');
        });
    };

  return (
    <div className={clx("wrapper")}>
      <h1>Cấu hình</h1>
        {/* Số tờ cấp phát */}
        <div className={clx("paper")}>
          <span>Số tờ cấp phát: </span>
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
          <span>Ngày cấp phát: </span>
          <span className={clx("number")}>{tempDate}</span> {}
          <input
            className={clx("label-date")}
            type="date"
            value={tempDate}  
            onChange={(e) => setTempDate(e.target.value)} 
            style={{ color: "#000" }}
          />
          <button className={clx("button-date")} onClick={handleDateUpdate}>
            Cập nhật
          </button>
        </div>

        {/* Loại file được phép tải */}
        <div className={clx("file-types")}>
          <span>Loại file được phép tải lên:</span> 
          <div className={clx("label-input")}>
            {["XLS", "DOCX", "JPG", "PPTX", "PNG", "PDF"].map((type) => (
              <label key={type}>
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
          <button className={clx("button-file")} onClick={handleFileTypesUpdate}>
            Cập nhật
          </button>
        </div>
    </div>
  );
};

export default ConfigPage;