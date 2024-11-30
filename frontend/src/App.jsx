import React from 'react'
import LoginPage from'./pages/LoginPage/LoginPage'
import RolePage from './pages/LoginPage/RolePage'
import ConfigPage from './pages/spso/ConfigPage/ConfigPage'
import PrinterManagementPage from './pages/spso/PrinterManagementPage/PrinterManagementPage'
import StudentHistoryPage from './pages/student/StudentHistoryPage/StudentHistoryPage'
import DefaultLayout from './component/Layout/DefaultLayout/DefaultLayout'
import AuthLayout from './component/Layout/AuthLayout/AuthLayout'
import PrintingPage from './pages/student/PrintingPage/PrintingPage'
import PurchasePage from './pages/student/PurchasePage/PurchasePage'
import DashBoard from './pages/spso/DashBoard/DashBoard'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/homePage/Homepage'

const App = () => {
  return (
    <div className='app'>
        <Routes>
        <Route path='/' element={<DefaultLayout isAuthenticated={false}><HomePage/></DefaultLayout>}/>
          <Route path='/login' element={<AuthLayout><LoginPage/></AuthLayout>}/>
          <Route path='/role' element={<AuthLayout><RolePage/></AuthLayout>}/>

          <Route path='/student' element={<DefaultLayout isAuthenticated={true} userType={'student'} userName={'N'}><HomePage/></DefaultLayout>}/>
          <Route path='/student/print' element={<DefaultLayout isAuthenticated={true} userType={'student'} userName={'N'}><PrintingPage/></DefaultLayout>}/>
          <Route path='/student/history' element={<DefaultLayout isAuthenticated={true} userType={'student'} userName={'N'}><StudentHistoryPage /></DefaultLayout>} />
          <Route path='/student/buy' element={<DefaultLayout isAuthenticated={true} userType={'student'} userName={'N'}><PurchasePage/></DefaultLayout>} />  
          
          <Route path='/spso' element = {<DefaultLayout isAuthenticated={true} userType={'spso'} userName={'N'}><DashBoard/></DefaultLayout>}/>       
          <Route path='/spso/manage' element={<DefaultLayout isAuthenticated={true} userType={'spso'} userName={'N'}><PrinterManagementPage/></DefaultLayout>}/>   
          <Route path='/spso/config' element={<DefaultLayout isAuthenticated={true} userType={'spso'} userName={'N'}><ConfigPage/></DefaultLayout>}/>    
          <Route path='/spso/history'/>    
       </Routes>  
    </div>
  )
}

export default App