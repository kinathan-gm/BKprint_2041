import classNames from "classnames/bind";
import styles from './DashBoard.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faCaretUp, faCloudArrowUp, faFile, faPrint } from "@fortawesome/free-solid-svg-icons";
import { ResponsiveContainer, XAxis, YAxis, BarChart, LineChart, Bar, Line, CartesianGrid, Legend, Tooltip } from 'recharts'
import { useState, useEffect } from "react";
const clx = classNames.bind(styles);

function DashBoard() {

    const [income, setIncome] = useState({});;

    const [totalIncome, setTotalIncome] = useState([]);

    const [totalJob, setTotalJob] = useState([]);
    const [totalJobCompleted, setTotalJobCompleted] = useState([]);

    const [totalPages, setTotalPages] = useState([]);

    const [printers, setPrinters] = useState([]);

    const getData = async (event) => {
        event?.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/dashboard', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();

            if (data.status === 'success') {
                const formattedIncome = {
                    Income8: parseFloat(data.Income?.Income8 || 0),
                    Income9: parseFloat(data.Income?.Income9 || 0),
                    Income10: parseFloat(data.Income?.Income10 || 0),
                    Income11: parseFloat(data.Income?.Income11 || 0),
                    Income12: parseFloat(data.Income?.Income12 || 0),
                };

                setIncome(formattedIncome);
                setTotalIncome(data.totalIncome || []);
                setTotalJob(data.printJobCount || []);
                setTotalPages(data.totalPages || []);
                setTotalJobCompleted(data.printJobCompletedCount || []);
                setPrinters(data.printers || []);
            }
        }
        catch (error) {

        }
    }
    useEffect(() => {
        getData();
    }, []);


    const incomesData = [
        { month: "Aug", incomes: income.Income8 },
        { month: "Sep", incomes: income.Income9 },
        { month: "Oct", incomes: income.Income10 },
        { month: "Nov", incomes: income.Income11 },
        { month: "Dec", incomes: income.Income12 },
    ];
    console.log(incomesData);

    const printersData = printers.map((printer, index) => ({
        printer: `${printer.Brand} ${printer.Model}`.length > 10
            ? `${printer.Brand} ${printer.Model}`.slice(0, 10) + "..."
            : `${printer.Brand} ${printer.Model}`,
        fullPrinter: `${printer.Brand} ${printer.Model}`, // Lưu tên đầy đủ
        times: [1, 2, 0, 2, 3, 0, 1, 2, 0, 1][index], // Dữ liệu times cho từng máy in
    }));


    const [accessData, setAccessData] = useState({ data: 0, increase: true, progress: 0 });
    const [requestData, setRequestData] = useState({ data: 0, increase: true, progress: 0 });
    const [printData, setPrintData] = useState({ data: 0, increase: true, progress: 0 });
    const [pageData, setPageData] = useState({ data: 0, increase: true, progress: 0 });

    return (
        <div className={clx('wrapper')}>
            <div className={clx('container-1')}>
                <div className={clx('data-window-container')}>
                    <div className={clx('data-window')}>
                        <label className={clx('data-title')}>Tổng doanh thu</label>
                        <div className={clx('data-container')}>
                            <FontAwesomeIcon icon={faArrowRightToBracket} className={clx('data-icon', 'purple')} />
                            <label className={clx('data')}>{totalIncome}</label>
                        </div>
                        <div className={clx('progress-container')}>
                            <FontAwesomeIcon icon={faCaretUp} className={clx('progress-icon', { 'increase': true, 'decrease': false })} />
                            <label className={clx('description')}><span className={clx('progress-data', { 'increase': true, 'decrease': false })}>+10%</span>so với tháng trước</label>
                        </div>
                    </div>
                    <div className={clx('data-window')}>
                        <label className={clx('data-title')}>Số yêu cầu in</label>
                        <div className={clx('data-container')}>
                            <FontAwesomeIcon icon={faCloudArrowUp} className={clx('data-icon', 'pink')} />
                            <label className={clx('data')}>{totalJob}</label>
                        </div>
                        <div className={clx('progress-container')}>
                            <FontAwesomeIcon icon={faCaretUp} className={clx('progress-icon', { 'increase': true, 'decrease': false })} />
                            <label className={clx('description')}><span className={clx('progress-data', { 'increase': true, 'decrease': false })}>+10%</span>so với tháng trước</label>
                        </div>
                    </div>
                    <div className={clx('data-window')}>
                        <label className={clx('data-title')}>Số lượt in</label>
                        <div className={clx('data-container')}>
                            <FontAwesomeIcon icon={faPrint} className={clx('data-icon', 'blue')} />
                            <label className={clx('data')}>{totalJobCompleted}</label>
                        </div>
                        <div className={clx('progress-container')}>
                            <FontAwesomeIcon icon={faCaretUp} className={clx('progress-icon', { 'increase': true, 'decrease': false })} />
                            <label className={clx('description')}><span className={clx('progress-data', { 'increase': true, 'decrease': false })}>+10%</span>so với tháng trước</label>
                        </div>
                    </div>
                    <div className={clx('data-window')}>
                        <label className={clx('data-title')}>Số trang in</label>
                        <div className={clx('data-container')}>
                            <FontAwesomeIcon icon={faFile} className={clx('data-icon', 'golden')} />
                            <label className={clx('data')}>{totalPages}</label>
                        </div>
                        <div className={clx('progress-container')}>
                            <FontAwesomeIcon icon={faCaretUp} className={clx('progress-icon', { 'increase': true, 'decrease': false })} />
                            <label className={clx('description')}><span className={clx('progress-data', { 'increase': true, 'decrease': false })}>+10%</span>so với tháng trước</label>
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
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div style={{ backgroundColor: "white", padding: "5px", border: "1px solid #ccc" }}>
                                                <p>{payload[0].payload.fullPrinter}</p> {/* Hiển thị tên đầy đủ */}
                                                <p>Số lần sử dụng: {payload[0].payload.times}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />

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