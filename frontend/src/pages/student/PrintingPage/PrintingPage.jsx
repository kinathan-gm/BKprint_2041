import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from './PrintingPage.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faClose, faCloudArrowUp, faFile, faFileExcel, faFilePdf, faFilePowerpoint, faFileWord, faImages, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const clx = classNames.bind(styles)

function PrintingPage(){
    const fileInputRef = useRef();

    const [file, setFile] = useState(null);
    const [side, setSide] = useState(1);
    const [popup, setPopup] = useState(false);
    const [popupset, setPopupSet] = useState({});
    const [fileset, setFileSet] = useState({icon: faFile, theme: 'default-theme'});
    const [printers, setPrinters] = useState([]); // Danh sách máy in từ API
    const [allowedFileTypes, setAllowedFileTypes] = useState([]);

    // const printers = ['001 - CS2 - H6 - Tầng 1', '002 - CS2 - H6 - Tầng 1', '003 - CS2 - H6 - Tầng 1' ];

    const popupSets = [
        {
            title: 'LỖI TẢI TỆP TIN',
            message: 'Định dạng tệp tin không được hỗ trợ hoặc vượt quá dung lượng cho phép ! ',
            icon: faTriangleExclamation,
            theme: 'failure',
            btnContent: 'Thử lại',
            link: ''
        },
        {
            title: 'LỖI THIẾU SỐ TRANG IN',
            message: 'Số trang in của bạn không đủ đẻ thực hiện việc in, hãy mua thêm để in',
            icon: faTriangleExclamation,
            theme: 'failure',
            btnContent: 'Mua trang in',
            link: '/student/buying'
        },
        {
            title: 'YÊU CẦU THÀNH CÔNG',
            message: 'Yêu cầu của bạn đã được gửi đi. Tài liệu sẽ sớm được in !',
            icon: faCircleCheck,
            theme: 'success',
            btnContent: 'Trở lại',
            link: ''
        },
    ]

    const papers = ['A5', 'A4', 'A3'];

    const iconMap = {
        'image/png': {
            icon: faImages,
            theme: 'image'
        },

        'image/jpg': {
            icon: faImages,
            theme: 'image'
        },

        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
            icon: faFileWord,
            theme: 'doc'
        },

        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
            icon: faFileExcel,
            theme: 'excel'
        },

        "application/pdf": {
            icon: faFilePdf,
            theme: 'pdf'
        },

        "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
            icon: faFilePowerpoint,
            theme: 'ppt'
        },
    }

    const fetchPrinters = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/printers");
            const data = await response.json();
            if (data.status === "success") {
                setPrinters(data.printers);
                setAllowedFileTypes(data.AllowedFileTypes.AllowedFileTypes);
                console.log(data.AllowedFileTypes)
            } else {
                console.error("Failed to fetch printers");
            }
        } catch (error) {
            console.error("Error fetching printers:", error);
        }
    };

    useEffect(() => {
        fetchPrinters();
    }, []);

    const showFile = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileExtension = selectedFile.name.split('.').pop().toUpperCase(); // Lấy phần mở rộng file
            console.log(fileExtension)
            console.log(allowedFileTypes)

            if (allowedFileTypes.includes(fileExtension)) {
                setFile(selectedFile);
                setFileSet(iconMap[selectedFile.type] || { icon: faFile, theme: 'default-theme' });
            } else {
                // Loại file không hợp lệ
                setPopupSet(popupSets[0]);
                openPopupBox();
            }
        }
    };

    const clearFile = () => {
        setFile(null);
        setFileSet({icon: faFile, theme: 'default-theme'});
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const openPopupBox = () => {
        setPopup(true); // Open the popup
    };

    const closePopupBox = () => {
        setPopup(false); // Close the popup
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); 
        
        if (file === null) {
            openPopupBox();
        } else if (!allowedFileTypes.includes(file.type.split('/')[1].toUpperCase())) {
            setPopupSet(popupSets[0]);
            openPopupBox();
        } else if (file.size > 100 * 1024 * 1024) { // 100MB limit
            setPopupSet(popupSets[1]);
            openPopupBox();
        } else {
            setPopupSet(popupSets[2]);
            openPopupBox();
        }
    };

    return (
        <div className={clx('wrapper')}>
            <div className={clx('file-container')}>
                <h2>Tải tệp lên</h2>
                {file === null ? (
                    <div className={clx('file-area')}>
                        <h3>Tải tài liệu lên</h3>
                        <FontAwesomeIcon className={clx('cloud')} icon={faCloudArrowUp}/>
                        <p><span>Định dạng cho phép:</span> {allowedFileTypes.join(", ")}</p>
                        <p><span>Kích thước tối đa:</span>100MB</p>
                    </div>
                ):(
                    <div className={clx('file-area')}>
                        <FontAwesomeIcon icon={fileset.icon} className={clx('file-icon', fileset.theme)}/>
                        <a download={file.name} href={URL.createObjectURL(file)} className={clx('file-name')}>{file.name}</a>
                    </div>
                )}
                <div className={clx('file-input')}>
                    <input ref={fileInputRef} onChange={(e) => showFile(e)} type="file" id='file' className={clx("file-input__input")}/>
                    <label htmlFor="file" className={clx("file-input__label")}>
                        Tải lên
                    </label>
                </div>
            </div>
            <div className={clx('props-container')}>
                <h2>Thuộc tính trang in</h2>
                <form className={clx('props-form')} onSubmit={(e) => handleFormSubmit(e)}>
                    <fieldset disabled={file === null} >
                        <div className={clx('printer-field')}>
                            <label htmlFor="printer-cb" className={clx('input-label', 'text-bold')}>Chọn máy in</label>
                            <div className={clx('combo-box', 'width-large')} >
                                <select id="printer-cb">
                                    {printers.map((printer, index) => (
                                        <option key={index} value={printer.PrinterID}>
                                            {printer.Brand} - {printer.Model} ({printer.CampusName} - {printer.BuildingName} - {printer.RoomNumber})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={clx('paper-field')}>
                            <div className={clx('paper-cbbox')}>
                                <label htmlFor="paper-cb" className={clx('input-label', 'text-bold')}>Khổ giấy</label>
                                <div className={clx('combo-box', 'width-medium')} >
                                    <select id="paper-cb">
                                        {papers.map((paper,index) => (
                                            <option key={index}>{paper}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={clx('orient-cbbox')}>
                                <label htmlFor="orient-cb" className={clx('input-label', 'text-bold')}>Hướng</label>
                                <div className={clx('combo-box', 'width-medium')} >
                                    <select id="orient-cb">
                                        <option>Dọc</option>
                                        <option>Ngang</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={clx('print-field')}>
                            <div className={clx('copies-box')}>
                                <label htmlFor="copies-nbox" className={clx('input-label', 'text-bold')}>Số bản in</label>
                                <div className={clx('number-box', 'width-medium')}>
                                    <input type="number" id="copies-nbox" defaultValue={1} min={1} required/>
                                </div>
                            </div>
                            <div className={clx('radio-box')}>
                                <input className={clx('radio-input')} onChange={() => {setSide(1)}} checked={side === 1} type="radio" id='radio1'/>
                                <label className={clx('input-label', 'text-bold')} htmlFor="radio1">In 1 mặt</label>
                            </div>
                            <div className={clx('radio-box')}>
                                <input className={clx('radio-input')} onChange={() => {setSide(2)}} checked={side === 2} type="radio" id="radio2"/>
                                <label className={clx('input-label', 'text-bold')} htmlFor="radio2">In 2 mặt</label>
                            </div>
                        </div>
                        <div className={clx('margin-field')}>
                            <label className={clx('input-label', 'text-bold')}>Căn lề</label>
                            <div className={clx('margin-lr')}>
                                <div className={clx('margin-nbox')}>
                                    <label htmlFor="lmargin-box" className={clx('input-label', 'text-normal')}>Trái</label>
                                    <div className={clx('number-box', 'small')}>
                                        <input type="number" id='lmargin-box' defaultValue={0} min={0} step={0.25} required/>
                                        <label className={clx('unit')} htmlFor="lmargin-box">inches</label>
                                    </div>
                                </div>
                                <div className={clx('margin-nbox')}>
                                    <label htmlFor="rmargin-box" className={clx('input-label', 'text-normal')}>Phải</label>
                                    <div className={clx('number-box', 'small')} >
                                        <input type="number" id='rmargin-box' defaultValue={0} min={0} step={0.25} required/>
                                        <label className={clx('unit')} htmlFor="rmargin-box">inches</label>
                                    </div>
                                </div>
                            </div>
                            <div className={clx('margin-tb')}>
                                <div className={clx('margin-nbox')}>
                                    <label htmlFor="tmargin-box" className={clx('input-label', 'text-normal')}>Trên</label>
                                    <div className={clx('number-box', 'small')} >
                                        <input type="number" id='tmargin-box' defaultValue={0} min={0} step={0.25} required/>
                                        <label className={clx('unit')} htmlFor="tmargin-box">inches</label>
                                    </div>
                                </div>
                                <div className={clx('margin-nbox')}>
                                    <label htmlFor="bmargin-box" className={clx('input-label', 'text-normal')}>Dưới</label>
                                    <div className={clx('number-box', 'small')} >
                                        <input type="number" id='bmargin-box' defaultValue={0}  min={0} step={0.25} required/>
                                        <label className={clx('unit')} htmlFor="bmargin-box">inches</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={clx('btn-field')}>
                            <button type="button" onClick={clearFile} className={clx('round-btn', 'cancel', {'disabled': file === null})}>Hủy</button>
                            <button type="submit" className={clx('round-btn', 'confirm', {'disabled': file === null})}>In</button>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div className={clx('popup', {'visible': popup, 'collapse': !popup, 'active': popup})}>
                <div className={clx('popup-overlay')} onClick={closePopupBox}></div>
                <div className={clx('popup-content')}>
                    <button>
                        <FontAwesomeIcon icon={faClose} onClick={closePopupBox}/>
                    </button>
                    <FontAwesomeIcon className={clx('popup-icon', popupset.theme)} icon={popupset.icon}/>
                    <h2 className={clx(popupset.theme)}>{popupset.title}</h2>
                    <p>{popupset.message}</p>
                    <Link onClick={closePopupBox} className={clx('popup-btn')}>{popupset.btnContent}</Link>
                </div>
            </div>
        </div>
    )
}

export default PrintingPage;