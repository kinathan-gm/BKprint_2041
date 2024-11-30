import classNames from "classnames/bind";
import styles from './DashBoard.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faCaretUp, faCloudArrowUp, faFile, faPrint } from "@fortawesome/free-solid-svg-icons";
import { ResponsiveContainer, XAxis, YAxis, BarChart, LineChart, Bar, Line, CartesianGrid, Legend, Tooltip} from 'recharts'
import { useState } from "react";
const clx = classNames.bind(styles); 

function DashBoard() {
    const incomesData = [
        { month: "Jan", incomes: 10 },
        { month: "Feb", incomes: 15 },
        { month: "Mar", incomes: 7 },
        { month: "Apr", incomes: 20 },
        { month: "May", incomes: 12 },
    ];

    const printersData = [
        { printer: "Printer_1", times: 84 },
        { printer: "Printer_2", times: 104 },
        { printer: "Printer_3", times: 344 },
        { printer: "Printer_4", times: 281 },
        { printer: "Printer_5", times: 320 },
        { printer: "Printer_6", times: 442 },
        { printer: "Printer_7", times: 325 },
        { printer: "Printer_8", times: 498 },
        { printer: "Printer_9", times: 413 },
        { printer: "Printer_10",times: 156 }
    ]

    const [accessData, setAccessData] = useState({data: 0, increase: true, progress: 0});
    const [requestData, setRequestData] = useState({data: 0, increase: true, progress: 0});
    const [printData, setPrintData] = useState({data: 0, increase: true, progress: 0});
    const [pageData, setPageData] = useState({data: 0, increase: true, progress: 0});

    return (
        <div className={clx('wrapper')}>
            <div className={clx('container-1')}>
                <div className={clx('data-window-container')}>
                    <div className={clx('data-window')}>
                        <label className={clx('data-title')}>Số lượt truy cập</label>
                        <div className={clx('data-container')}>
                            <FontAwesomeIcon icon={faArrowRightToBracket} className={clx('data-icon', 'purple')}/>
                            <label className={clx('data')}>710.000</label>
                        </div>
                        <div className={clx('progress-container')}>
                            <FontAwesomeIcon icon={faCaretUp} className={clx('progress-icon', {'increase': true, 'decrease': false})}/>
                            <label className={clx('description')}><span className={clx('progress-data', {'increase': true, 'decrease': false})}>+10%</span>so với tháng trước</label>
                        </div>
                    </div>
                    <div className={clx('data-window')}>
                        <label className={clx('data-title')}>Số yêu cầu in</label>
                        <div className={clx('data-container')}>
                            <FontAwesomeIcon icon={faCloudArrowUp} className={clx('data-icon', 'pink')}/>
                            <label className={clx('data')}>1.000.000</label>
                        </div>
                        <div className={clx('progress-container')}>
                            <FontAwesomeIcon icon={faCaretUp} className={clx('progress-icon', {'increase': true, 'decrease': false})}/>
                            <label className={clx('description')}><span className={clx('progress-data', {'increase': true, 'decrease': false})}>+10%</span>so với tháng trước</label>
                        </div>
                    </div>
                    <div className={clx('data-window')}>
                        <label className={clx('data-title')}>Số lượt in</label>
                        <div className={clx('data-container')}>
                            <FontAwesomeIcon icon={faPrint} className={clx('data-icon', 'blue')}/>
                            <label className={clx('data')}>200.000</label>
                        </div>
                        <div className={clx('progress-container')}>
                            <FontAwesomeIcon icon={faCaretUp} className={clx('progress-icon', {'increase': true, 'decrease': false})}/>
                            <label className={clx('description')}><span className={clx('progress-data', {'increase': true, 'decrease': false})}>+10%</span>so với tháng trước</label>
                        </div>
                    </div>
                    <div className={clx('data-window')}>
                        <label className={clx('data-title')}>Số trang in</label>
                        <div className={clx('data-container')}>
                            <FontAwesomeIcon icon={faFile} className={clx('data-icon', 'golden')}/>
                            <label className={clx('data')}>980.000</label>
                        </div>
                        <div className={clx('progress-container')}>
                            <FontAwesomeIcon icon={faCaretUp} className={clx('progress-icon', {'increase': true, 'decrease': false})}/>
                            <label className={clx('description')}><span className={clx('progress-data', {'increase': true, 'decrease': false})}>+10%</span>so với tháng trước</label>
                        </div>
                    </div>
                </div>
                <div className={clx('income-graph-container')}>
                    <label className={clx('data-title')}>Biểu đồ doanh thu</label>
                    <div className={clx('income-graph')}>
                        <ResponsiveContainer width="100%" height={290}>
                            <LineChart data={incomesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="incomes" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div className={clx('printer-graph-container')}>
                <label className={clx('data-title')}>Biểu đồ tần suất sử dụng máy in</label>
                <div className={clx('printer-graph')}>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={printersData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="printer" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="times" fill="orangered" barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;