import React, { useState, useEffect } from "react";
import "./PrinterManagementPage.css";

function PrinterManagementPage() {
  const [printers, setPrinters] = useState([]);


  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPrinter, setCurrentPrinter] = useState(null);
  const [newPrinter, setNewPrinter] = useState({ name: "", location: "" });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/adminPrinters")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setPrinters(data.printers);
        }
      })
      .catch((error) => {
        console.error("Error fetching printers:", error);
      });
  }, []);

  const toggleStatus = (id) => {
    setPrinters((prevPrinters) =>
      prevPrinters.map((printer) =>
        printer.id === id
          ? { ...printer, status: printer.status === "on" ? "off" : "on" }
          : printer
      )
    );
  };

  // const handleAddPrinter = () => {
  //   if (!newPrinter.name || !newPrinter.location) return; // Prevent adding if fields are empty
  //   const newId = (printers.length + 1);
  //   setPrinters([...printers, { id: newId, ...newPrinter, status: "on" }]);
  //   setNewPrinter({ name: "", location: "" });
  //   setIsAddModalOpen(false);
  // };
  const handleAddPrinter = async () => {
    if (!newPrinter.name || !newPrinter.location) {
      alert("Vui lòng nhập đầy đủ thông tin trước khi thêm.");
      return;
    }

    const payload = {
      name: newPrinter.name,
      location: newPrinter.location,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/printers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Nếu API trả về thành công, thêm máy in mới vào danh sách
        const newId = (printers.length + 1);
        setPrinters((prevPrinters) => [
          ...prevPrinters,
          { id: newId, ...payload, status: "on" },
        ]);
        alert("Thêm máy in thành công!");
      } else {
        alert(`Lỗi: ${data.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Không thể kết nối đến server. Vui lòng thử lại.");
    } finally {
      setNewPrinter({ name: "", location: "", description: "" });
      setIsAddModalOpen(false);
    }
  };

  const handleOpenEditModal = (printer) => {
    setCurrentPrinter({ ...printer });
    setIsEditModalOpen(true);
  };

  // const handleSaveChanges = () => {
  //   setPrinters((prevPrinters) =>
  //     prevPrinters.map((printer) =>
  //       printer.id === currentPrinter.id ? currentPrinter : printer
  //     )
  //   );
  //   setIsEditModalOpen(false);
  //   setCurrentPrinter(null);
  // };
  const handleSaveChanges = async () => {
    if (!currentPrinter.name || !currentPrinter.location) {
      alert("Vui lòng nhập đầy đủ thông tin trước khi lưu.");
      return;
    }

    const payload = {
      name: currentPrinter.name,
      location: currentPrinter.location,
      status: currentPrinter.status,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/printers/${currentPrinter.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setPrinters((prevPrinters) =>
          prevPrinters.map((printer) =>
            printer.id === currentPrinter.id ? { ...printer, ...payload } : printer
          )
        );
        alert("Cập nhật máy in thành công!");
      } else {
        alert(`Lỗi: ${data.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Không thể kết nối đến server. Vui lòng thử lại.");
    } finally {
      setIsEditModalOpen(false);
      setCurrentPrinter(null);
    }
  };

  return (
    <div className="printer-management">
      <header className="header">
        <h1>Quản Lý Máy In</h1>
        <button
          className="add-printer-button"
          onClick={() => setIsAddModalOpen(true)}
        >
          Thêm máy in +
        </button>
      </header>
      <div className="search-bar">
        <input type="text" placeholder="Tìm kiếm..." className="search-input" />
      </div>
      <table className="printer-table">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Loại</th>
            <th>Vị trí</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {printers.map((printer) => (
            <tr key={printer.id}>
              <td>{printer.id}</td>
              <td>
                <a
                  href={`printers/${printer.id}`}
                >
                  {printer.name}
                </a>
              </td>
              <td>{printer.location}</td>
              <td>
                <span className={`status ${printer.status}`}>
                  {printer.status === "on" ? "Bật" : "Tắt"}
                </span>
              </td>
              <td>
                <button
                  className="toggle-button"
                  onClick={() => toggleStatus(printer.id)}
                >
                  {printer.status === "on" ? "Vô hiệu hóa" : "Kích hoạt"}
                </button>
                <button

                  className="update-button"
                  onClick={() => handleOpenEditModal(printer)}
                >
                  Cập nhật
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="footer">
        <div className="pagination">
          <button className="prev-button">Trước</button>
          <button className="next-button">Sau</button>
        </div>
      </footer>

      {/* Add Printer Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Thêm Máy In</h2>
              <button
                className="close-button"
                onClick={() => setIsAddModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddPrinter();
              }}
            >
              <div className="form-group">
                <label htmlFor="newPrinterName">Tên Máy In</label>
                <input
                  id="newPrinterName"
                  type="text"
                  value={newPrinter.name}
                  onChange={(e) =>
                    setNewPrinter({ ...newPrinter, name: e.target.value })
                  }
                  placeholder="Nhập tên máy in: Brand - Model"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPrinterLocation">Vị Trí</label>
                <input
                  id="newPrinterLocation"
                  type="text"
                  value={newPrinter.location}
                  onChange={(e) =>
                    setNewPrinter({ ...newPrinter, location: e.target.value })
                  }
                  placeholder="Nhập vị trí: CampusName -  BuildingName - RoomNumber"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="add-button">
                  Thêm
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Printer Modal */}
      {isEditModalOpen && currentPrinter && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Cập nhật máy in</h2>
              <button
                className="close-button"
                onClick={() => setIsEditModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveChanges();
              }}
            >
              <div className="form-group">
                <label htmlFor="printerName">Tên Máy In</label>
                <input
                  id="printerName"
                  type="text"
                  value={currentPrinter.name}
                  onChange={(e) =>
                    setCurrentPrinter({
                      ...currentPrinter,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="printerLocation">Vị Trí</label>
                <input
                  id="printerLocation"
                  type="text"
                  value={currentPrinter.location}
                  onChange={(e) =>
                    setCurrentPrinter({
                      ...currentPrinter,
                      location: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="save-button">
                  Lưu
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrinterManagementPage;
