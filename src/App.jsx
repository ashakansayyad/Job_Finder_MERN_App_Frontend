
import {Login,Register,Joblist,Jobdetail,Addjob,Notfound} from './pages/index'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {UserProvider} from './Context/UserContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  
  return (
    <UserProvider>
   <BrowserRouter>
   <Routes>
    <Route path='/'  element={<Joblist/>}/>
    <Route path='/login'  element={<Login />} />
    <Route path='/register'  element={<Register/>} />
    <Route path='/editjob/:id' element={<Addjob/>} />
    <Route path='/addjob' element={<Addjob/>}/>
    <Route path='*'   element={<Notfound/>}/>
    <Route path='/list/:id' element={<Jobdetail/>}/>
    
    <Route path='/list' element={<Joblist/>}>
     <Route index element={<Joblist/>} />  {/* index route is the default child route when no subpath is specified.} */}
    </Route>
   
   </Routes>
   <ToastContainer />
   </BrowserRouter>
   </UserProvider>
  )
}

export default App
