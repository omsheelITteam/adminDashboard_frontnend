// import "./App.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import MainPage from "./Layout/MainPage.jsx";
// import Admindashboard from "./Pages/AdminDashboard/AdminDashboard.jsx";
// import Login from "./Pages/Login/Login";
// import Rolebase from "./Pages/RoleBased/RoleBase.jsx";
// // import AddWriters from "./Components/AddWriter";
// import Writers from "./Components/Writers";
// import Profile from "./Components/Profile";
// import Magazine from "./Components/Magazine";
// import MagazineTable from "./Pages/AdminDashboard/MagazineTable";
// import AdminVideoUploader from "./Components/AdminVideoUploader";
// // import AppContext from "./Context/StoreProviders"; 
// // import AppContext from "./Context/AppContext.jsx";
// // import decode_token from "./Data/index.js";
// import { AppContext } from "./Context/AppContext.jsx";

// function App() {
//   const token = localStorage.getItem("newToken");
//   const userInfo = decode_token(token);

//   return (
    
//       <BrowserRouter>
//         <ToastContainer position="top-right" autoClose={3000} />
//         <Routes>
        
//           <Route path="/" element={<Navigate to="/login" />} />
          
         
//           <Route path="/login" element={<Login />} />

        
//           <Route path="/dashboard" element={<MainPage />}>
            
            
//             <Route
//               index
//               element={
//                 userInfo?.role === "admin" ? (
//                   <Navigate to="/dashboard/admin" />
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             />

//             {/* Admin-only routes */}
           
//               <Route path="admin" element={<Admindashboard />} />
//               {/* <Route path="writer/add" element={<AddWriters />} /> */}
//               <Route path="writers" element={<Writers />} />
//               <Route path="magazine" element={<Magazine />} />
//               <Route path="writer/profile/:id" element={<Profile />} />
//               <Route path="magazineTable" element={<MagazineTable />} />
//               <Route path="live-video/upload" element={<AdminVideoUploader />} />
//             </Route>
//           </Routes>
        
//       </BrowserRouter>
    
//   );
// }

// export default App;






import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainPage from "./Layout/MainPage";
import LoginAdmin from "./Pages/Login/LoginAdmin";
import Unable from "./Pages/Login/Unable";

import Admindashboard from "./Pages/AdminDashboard/AdminDashboard";
import Writers from "./Components/Writers";
import Profile from "./Components/Profile";
import Magazine from "./Components/Magazine";
import MagazineTable from "./Pages/AdminDashboard/MagazineTable";
import AdminVideoUploader from "./Components/AdminVideoUploader";
import SettingsPage from "./Components/SettingPage";
import DailyPulse from "./Components/DailyPulse";
import News from "./Components/News";
import WriterProfile from "./Components/WriterProfile";
import DailyPulseTable from "./Pages/AdminDashboard/DailyPulseTable"
import NewsViewPage from "./Components/NewsViewPage";
import UpdateProfile from "./Components/UpdateProfile";
import RegisterAdmin from "./Pages/Login/RegisterAdmin";
import EmailVerification from "./Pages/Login/EmailVerification";
import ForgotPassword from "./Pages/Login/ForgotPassword";
import RegContributors from "./Components/RegContributors";

// top-level admin app
function App() {
  return (
    // <BrowserRouter>
    <>
    
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* <Route path="/" element={<Navigate to="/loginAdmin" replace />} /> */}
        <Route path="/" element={<RegisterAdmin/>}/>

        {/* Login page for admin */}
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/verify-email" element={<EmailVerification/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>

        {/* Dashboard parent route — MainPage must render <Outlet /> */}
        <Route path="/dashboard" element={<MainPage />}>
          {/* Public/accessible dashboard pages */}
          
          <Route path="admin" element={<Admindashboard />} />
          <Route path="writers" element={<Writers />} />
          <Route path="regwriters" element={<RegContributors/>}/>

          <Route path="magazine" element={<Magazine />} />
          <Route path="magazineTable" element={<MagazineTable />} />
          <Route path="dailypulseTable" element={<DailyPulseTable/>} />
          <Route path="Profile" element={<Profile />} />
          <Route path="writer/profile/:id" element={<WriterProfile/>} />
          <Route path="settingpage" element={<SettingsPage />} />
          <Route path="dailyPulse" element={<DailyPulse />} />
          <Route path="news" element={<News />} />
          {/* <Route path="news/view/:news_id" element={<NewsViewPage />} />
           */}
          <Route path="news/view/:news_id" element={<NewsViewPage />} />
         <Route path="profile/update" element={<UpdateProfile />} />
          {/* Admin video uploader */}
          <Route path="live-video/upload" element={<AdminVideoUploader />} />
          <Route path="unable-access" element={<Unable />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </>
    // </BrowserRouter>
  );
}

export default App;
