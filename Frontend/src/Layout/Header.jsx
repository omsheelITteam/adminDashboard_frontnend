import React,{useContext} from 'react'
import profileDefault from "../assets/profileDefault.png";
import Sidebar from "./Sidebar";
import { AppContext } from '../Context/AppContext';

const Header = () => {
  const { userData } = useContext(AppContext); 
  // console.log(userData,"Admin")
  return (
    <div>
      <div className={`fixed top-4 left-0 w-full md:w-[calc(100vw-250px)] ${"" ? "md:left-[230px]" : "md:left-[250px]"} z-50 px-2 sm:px-4`}>
        <div className="w-full h-[70px] rounded bg-white shadow-sm flex items-center justify-between px-2 sm:px-4">
          {/* Sidebar button on left */}
          <Sidebar />

          {/* Right section: name + role + image aligned to end */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <div className="text-right truncate max-w-[120px] sm:max-w-none">
              <span className="text-xs sm:text-sm font-medium truncate">
                {userData?.name || "Unknown"}/
              </span>
              <span className="text-xs sm:text-sm font-medium text-black truncate">
                {userData?.role || "role"}
              </span>
            </div>

            <img
              src={userData?.adminimage || profileDefault}
              alt="Writer"
              className="w-[60px] h-[60px] rounded-full object-fit"
            />
          </div>
        </div>
      </div>  
    </div>
  )
}

export default Header




// import React, { useContext } from "react";
// import profileDefault from "../assets/profileDefault.png";
// import Sidebar from "./Sidebar";
// import {AppContext} from "../Context/AppContext"; // Import your context

// const Header = () => {
//   const { userData } = useContext(AppContext); // Get user data from context
// console.log(userData);
//   // const isAdmin = userData?.role === "admin";

//   return (
//     <div>
//       <div
//         className={`fixed top-4 left-0 
//         w-full md:w-[calc(100vw-250px)] 
//         ${"" ? "md:left-[230px]" : "md:left-[250px]"} 
//         z-50 px-2 sm:px-4`}
//       >
//         <div className="w-full h-[70px] rounded bg-white shadow-sm flex items-center justify-between px-2 sm:px-4">
//           {/* Sidebar button on left */}
//           <Sidebar />

//           {/* Right section: name + role + image aligned to end */}
//           <div className="flex items-center gap-2 sm:gap-4 ml-auto">
//             <div className="text-right truncate max-w-[120px] sm:max-w-none">
//               <span className=" text-xs sm:text-sm font-medium truncate">
//                 {userData?.writername || "Unknown"}/
//               </span>
//               <span className=" text-xs sm:text-sm font-medium text-black truncate">
//                 {userData?.role || "role"}
//               </span>
//             </div>

//                 <img
//               src={userData?.writerimage || profileDefault}
//               alt="Writer"
//               className="w-[60px] h-[60px] rounded-full object-cover"
//             />
//             {/* <img
//               src={
//                 userData?.writerimage
//                   ? `http://localhost:4000/uploads/${userData.writerimage}`
//                   : profileDefault
//               }
//               alt="Writer"
//               className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
//             /> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;
