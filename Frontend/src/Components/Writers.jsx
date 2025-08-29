
// import React, { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import img1 from "../assets/profileDefault.png";
// import { FaEye } from "react-icons/fa";
// import axios from "axios";
// // import StoreContext from "../Context/StoreContext.js";

// import { AppContext } from "../Context/AppContext";

// const Writers = () => {
//   const { userData } = useContext(AppContext);
//   const navigate = useNavigate();
//   const [writers, setWriters] = useState([]);
//   const [allWriters, setAllWriters] = useState([]);

//   const get_writers = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:5500/api/admin/get-all-writers", {
//         withCredentials: true,
//       });
//       setWriters(data.writers);
//       setAllWriters(data.writers);
//       // console.log("Fetched writers:", data.writers);
      
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   const search_writers = (e) => {
//     const value = e.target.value.toLowerCase();
//     const filtered = allWriters.filter((writer) =>
//       writer.name.toLowerCase().includes(value) ||
//       writer.email.toLowerCase().includes(value) ||
//       writer.category.toLowerCase().includes(value)
//     );
//     setWriters(filtered);
//     // console.log("Filtered writers:", filtered);
//   };

//   useEffect(() => {
//     get_writers();
//   }, []);

//   const handleProfileClick = (id) => {
//     navigate(`/dashboard/writerprofile/${id}`);
//   };

//   return (
//     <div className="w-full overflow-auto">
//       <div className="bg-white rounded">
//         <div className="flex justify-between p-4 gap-2 flex-wrap">
//           <input
//             type="text"
//             onChange={search_writers}
//             placeholder="Search by name, email, category"
//             className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
//           />
//           <h2 className="text-xl font-medium text-white">Add Writers</h2>
//           {/* <Link
//             className="px-3 py-[6px] bg-white rounded-sm text-black hover:bg-purple-600 hover:text-white"
//             to="/dashboard/writer/add"
//           >
//             Add Writers
//           </Link> */}
//         </div>

//         <div className="relative overflow-x-auto p-2 sm:p-4 w-full">
//           <table className="min-w-[700px] w-full text-sm text-center text-slate-600">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50 rounded-[10%] bg-yellow-400 rounded-full">
//               <tr>
//                 <th className="px-7 py-3">No</th>
//                 <th>Image</th>
//                 <th className="px-4 py-3">Reporter Name</th>
//                 <th className="px-4 py-3">Email</th>
//                 <th className="px-4 py-3">Role</th>
//                 <th className="px-4 py-3">Writer Bio</th>
//                 <th className="px-4 py-3">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {writers.map((value, i) => (
//                 <tr key={i} className="bg-white border-b">
//                   <td className="px-6 p-4">{i + 1}</td>
//                   <td className="px-6 p-4 flex justify-center items-center">
//                     <img
//                       src={value.writerimage}
//                       alt="Writer"
//                       className="w-14 h-14 rounded-full object-cover"
//                     />

//                   </td>
//                   <td className="px-6 p-4">{value.writername}</td>
//                   <td className="px-6 p-4 break-words whitespace-nowrap">{value.email}</td>
//                   <td className="px-6 p-4">{value.role}</td>
//                   <td className="px-6 p-4">{value.writerbio.slice(0,10)}....</td>
//                   <td className="px-6 p-4">
//                    <div className="flex justify-center items-center gap-x-4 text-white ">
//   {/* {(userData && (userData.role === "admin" || userData.id === value.id)) && ( */}
//     <Link
//       className="p-4 bg-green-300 rounded-full"
//       to={`/dashboard/writer/profile/${value.id}`}
//       // onClick={() => handleProfileClick(value.id)}
//     >
//       <FaEye className="cursor-pointer text-green-600" />
//     </Link>
//   {/* // )} */}
// </div>

//                   </td>
//                 </tr>
//               ))}
//               {writers.length === 0 && (
//                 <tr>
//                   <td colSpan="7" className="text-center py-4 text-slate-500">
//                     No writers found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Writers;






import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../assets/profileDefault.png";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { AppContext } from "../Context/AppContext";

const Writers = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [writers, setWriters] = useState([]);
  const [allWriters, setAllWriters] = useState([]);
const {backendURL}=useContext(AppContext)
  const get_writers = async () => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/admin/get-all-writers`,
        { withCredentials: true }
      );
      setWriters(data.writers);
      setAllWriters(data.writers);
      // console.log('hello',data.writers);
      
    } catch (error) {
      console.log(error);
    }
  };

  const search_writers = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = allWriters.filter(
      (writer) =>
        writer.writername?.toLowerCase().includes(value) ||
        writer.email?.toLowerCase().includes(value) ||
        writer.category?.toLowerCase().includes(value) ||
         writer.role?.toLowerCase().includes(value)
    );
    setWriters(filtered);
  };

  useEffect(() => {
    get_writers();
  }, []);

  const handleProfileClick = (id) => {
    navigate(`/dashboard/writerprofile/${id}`);
  };

  return (
    <div className="w-full overflow-auto">
      <div className="bg-white rounded">
        {/* Search Bar */}
        <div className="flex justify-between p-4 gap-2 flex-wrap">
          <input
            type="text"
            onChange={search_writers}
            placeholder="Search by name, email, category"
            className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
          />
          {/* <h2 className="text-xl font-medium text-white">Add Writers</h2> */}
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-2 sm:p-4 w-full">
          <table className="w-full text-sm text-center text-slate-600">
            <thead className="text-xs text-gray-700 uppercase bg-yellow-400">
              <tr>
                <th className="px-7 py-3">No</th>
                <th>Image</th>
                <th className="px-4 py-3">Contributors</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Writer Bio</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {writers.map((value, i) => (
                <tr key={i} className="bg-white border-b">
                  <td className="px-6 p-4">{i + 1}</td>
                  <td className="px-6 p-4 flex justify-center items-center">
                    <img
                      src={value.writerimage || img1}
                      alt="Writer"
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shrink-0"
                    />
                  </td>
                  <td className="px-6 p-4">{value.writername}</td>
                  <td className="px-6 p-4 break-words whitespace-nowrap">
                    {value.email}
                  </td>
                  <td className="px-6 p-4">{value.role}</td>
                  <td className="px-6 p-4">
                    {value.writerbio ? value.writerbio.slice(0, 10) + "..." : ""}
                  </td>
                  <td className="px-6 p-4">
                    <div className="flex justify-center items-center gap-x-4 text-white ">
                      <Link
                        className="p-3 bg-green-300 rounded-full"
                        to={`/dashboard/writer/profile/${value.id}`}
                      >
                        <FaEye className="cursor-pointer text-green-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {writers.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-slate-500">
                    No writers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Writers;
