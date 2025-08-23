// import React, { useEffect, useState, useContext, useRef } from "react";
// import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
// import axios from "axios";
// import StoreContext from "../Context/StoreContext";

// import img1 from "../assets/profileDefault.png";
// import SharesButton from "./ShareButton";

// import { Toast } from "primereact/toast";

// const Profile = () => {
//   const { id } = useParams();
//   const { pathname } = useLocation();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const { store } = useContext(StoreContext);

//   const [writer, setWriter] = useState(null);
//   const [counts, setCounts] = useState({
//     total: 0,
//     pending: 0,
//     active: 0,
//     deactive: 0,
//     writer: 0,
//     magazines: 0,
//   });

//   const toast = useRef(null);

//   const isSharedView = searchParams.get('shared') === 'true';

//   const fetchWriter = async () => {
//     try {
//       const userId = id || store?.userInfo?.id;
//       if (!userId) return;

//       const res = await axios.get(`http://localhost:5500/api/news/writers/${userId}`, {
//         headers: { Authorization: `Bearer ${store.token}` },
//       });

//       setWriter(res.data.writer);
//     } catch (error) {
//       console.error("Profile fetch failed", error);
//     }
//   };

//   const fetchAdminCounts = async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:5000/api/news`, {
//         headers: { Authorization: `Bearer ${store.token}` },
//       });

//       setCounts({
//         total: data.news.length,
//         active: data.news.filter((n) => n.status === "active").length,
//         pending: data.news.filter((n) => n.status === "pending").length,
//         deactive: data.news.filter((n) => n.status === "deactive").length,
//         writer: data.news.filter((n) => n.createdByRole === "writer").length,
//         magazines: 0,
//       });
//     } catch (error) {
//       console.error("Failed to fetch admin stats", error);
//     }
//   };

//   useEffect(() => {
//     fetchWriter();
//     if (store.userInfo?.role === "admin" && !isSharedView) {
//       fetchAdminCounts();
//     }
//   }, [id, store.userInfo, isSharedView]);

//   if (!writer) return <p className="p-4">Loading profile...</p>;

//   const isCurrentUser = !id || id === store?.userInfo?.id;
//   const isAdmin = store.userInfo?.role === "admin";

//   const moveToMagazineData = () => {
//     navigate("/dashboard/magazineTable");
//   };

//   return (
//     <div className={`${isSharedView ? 'min-h-screen bg-gray-50 p-4' : ''}`}>
//       <div className={`${isSharedView ? 'max-w-2xl mx-auto' : 'max-w-4xl mx-auto mt-10'} bg-white p-6 rounded-lg shadow-md`}>
//         <Toast ref={toast} position="top-center" />

//         {isSharedView && (
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
//             <div className="w-20 h-1 bg-blue-600 mx-auto mt-2"></div>
//           </div>
//         )}

//         {/* Profile Info */}
//         <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
//           <img
//             src={writer.image ? `http://localhost:5000/uploads/${writer.image}` : img1}
//             alt="Profile"
//             className="w-28 h-28 rounded-full object-cover"
//           />
//           <div className="text-center sm:text-left">
//             <p className="text-lg"><strong>Name:</strong> {writer.name}</p>
//             <p className="text-lg"><strong>Email:</strong> {writer.email}</p>
//             <p className="text-lg"><strong>Category:</strong> {writer.category}</p>
//             <p className="text-lg"><strong>Role:</strong> {writer.role}</p>
//             <div className="mt-4 flex flex-row gap-3">
//               {isCurrentUser && !isSharedView && (
//                 <button
//                   onClick={() => navigate("/dashboard/profile/update")}
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                   Update Profile
//                 </button>
//               )}
//               {isAdmin && !isSharedView && (
//                 <SharesButton
//                   text={`Check out ${writer.name}'s profile!`}
//                   url={`${window.location.origin}${window.location.pathname}?shared=true`}
//                 />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Admin Stats */}
//         {isAdmin && isCurrentUser && !isSharedView && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8 text-center rounded p-4">
//             <div className="w-full p-6 flex flex-col items-center justify-center rounded-md bg-white shadow-lg">
//               <span className="text-xl font-bold">{counts.total}</span>
//               <span className="text-md">Total News</span>
//             </div>
//             <div className="w-full p-6 flex flex-col items-center justify-center rounded-md bg-white shadow-lg">
//               <span className="text-xl font-bold">{counts.pending}</span>
//               <span className="text-md">Pending News</span>
//             </div>
//             <div className="w-full p-6 flex flex-col items-center justify-center rounded-md bg-white shadow-lg">
//               <span className="text-xl font-bold">{counts.active}</span>
//               <span className="text-md">Active News</span>
//             </div>
//             <div className="w-full p-6 flex flex-col items-center justify-center rounded-md bg-white shadow-lg">
//               <span className="text-xl font-bold">{counts.deactive}</span>
//               <span className="text-md">Deactive News</span>
//             </div>
//             <div className="w-full p-6 flex flex-col items-center justify-center rounded-md bg-white shadow-lg">
//               <span className="text-xl font-bold">{counts.writer}</span>
//               <span className="text-md">No. of Writers</span>
//             </div>
//             <button
//               onClick={moveToMagazineData}
//               className={`w-full p-6 flex flex-col items-center justify-center rounded-md bg-white shadow-lg ${
//                 pathname === "/dashboard/magazineTable" ? "bg-gray-100 font-semibold" : ""
//               }`}
//             >
//               <span className="text-md">{counts.magazines}</span>
//               <span className="text-md">Total Magazines</span>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import img1 from "../assets/profileDefault.png";
// import img2 from "../assets/check.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
// import { IoNewspaperOutline } from "react-icons/io5";

// const AdminProfile = () => {
//   const [admin, setAdmin] = useState(null);
//   const location = useLocation();
//   const isSharedView = new URLSearchParams(location.search).get("shared") === "true";

//   const fetchAdminProfile = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5500/api/admin/get-admin-profile`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         setAdmin({
//           ...res.data.adminData,
//           stats: res.data.adminData.stats || {
//             total: 0,
//             active: 0,
//             pending: 0,
//             deactive: 0,
//           },
//         });
//       }
//       console.log(stats)
//     } catch (error) {
//       console.error("Error fetching admin profile", error);
//     }
//   };

//   useEffect(() => {
//     fetchAdminProfile();
//   }, []);

//   if (!admin) return <p className="p-4">Loading admin profile...</p>;

//   const isAdminProfile = admin.role === "admin";

//   return (
//     <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
//       {/* Profile Info */}
//       <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
//         <img
//           src={admin.adminimage || img1}
//           alt="Admin"
//           className="w-[140px] h-[140px] rounded-full object-fit"
//         />

//         <div className="text-center sm:text-left">
//           <p className="text-lg">
//             <strong>Name:</strong> {admin.name}
//           </p>
//           {/* <p className="text-lg">
//             <strong>AdminId:</strong> {admin.adminidcard}
//           </p> */}
//           <p className="text-lg">
//             <strong>Email:</strong> {admin.email}
//           </p>
//           <p className="text-lg">
//             <strong>Role:</strong> {admin.role}
//           </p>
//           <p className="text-lg">
//             <strong>Bio:</strong> {admin.bio}
//           </p>
//           <p className="text-lg">
//             <strong>LinkedIn:</strong>{" "}
//             <a
//               href={
//                 admin.publicprofile?.startsWith("http")
//                   ? admin.publicprofile
//                   : `https://${admin.publicprofile}`
//               }
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:underline"
//             >
//               {admin.publicprofile || "No LinkedIn profile"}
//             </a>
//           </p>

//           {!isSharedView && (
//             <div className="mt-4 flex flex-row gap-3">
//               <button
//                 onClick={() => (window.location.href = "/dashboard/profile/update")}
//                 className="bg-blue-600 text-white px-4 py-2   rounded hover:bg-blue-700"
//               >
//                 Update Profile
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Admin Stats */}
//       {isAdminProfile && (
//         <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//             <IoNewspaperOutline className="text-blue-500 text-4xl" />
//             <p className="text-xl font-bold">{admin.stats.total}</p>
//             <p className="text-sm text-gray-600">Total Articles</p>
//           </div>
//           <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//             <img src={img2} className="w-10 h-10" alt="Check" />
//             <p className="text-xl font-bold">{admin.stats.active}</p>
//             <p className="text-sm text-gray-600">Published</p>
//           </div>
//           <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//             <FontAwesomeIcon icon={faHourglassHalf} className="text-purple-600 text-3xl" />
//             <p className="text-xl font-bold">{admin.stats.pending}</p>
//             <p className="text-sm text-gray-600">Pending</p>
//           </div>
//           <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//             <span className="text-3xl">❌</span>
//             <p className="text-xl font-bold">{admin.stats.deactive}</p>
//             <p className="text-sm text-gray-600">Inactive</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminProfile;



import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import img1 from "../assets/profileDefault.png";
import img2 from "../assets/check.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { IoNewspaperOutline } from "react-icons/io5";
import { AppContext } from "../Context/AppContext";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const { backendURL } = useContext(AppContext);
  const [news, setNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
   const [counts, setCounts] = useState({
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      writer: 0,
      magazine: 0,
      dailypulse: 0,
    });
  const location = useLocation();
  const isSharedView = new URLSearchParams(location.search).get("shared") === "true";

  const fetchAdminProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5500/api/admin/get-admin-profile`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setAdmin({
          ...res.data.adminData,
          stats: res.data.adminData.stats || {
            // total: 0,
            // active: 0,
            // pending: 0,
            // deactive: 0,
          },
        });
        console.log("Admin stats:", res.data.adminData.stats);
      }
    } catch (error) {
      console.error("Error fetching admin profile", error);
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

const getAllNews = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/admin/get-all-writers-news`, {
        withCredentials: true,
      });
      setAllNews(data.news);
      setNews(data.news);

      setCounts({
        total: data.news.length,
        pending: data.news.filter((n) => n.status.toLowerCase() === "pending").length,
        approved: data.news.filter((n) => n.status.toLowerCase() === "approved").length,
        rejected: data.news.filter((n) => n.status.toLowerCase() === "rejected").length,
        writer: data.news.filter((n) => n.createdByRole === "writer").length,
     
      
      });
    } catch (error) {
      console.log(error);
    }
  };

   useEffect(() => {
      getAllNews();
    }, []);
  if (!admin) return <p className="p-4">Loading admin profile...</p>;

  // const isAdminProfile = admin.role === role;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
        <img
          src={admin.adminimage || img1}
          alt="Admin"
          className="w-[140px] h-[140px] rounded-full object-fit"
        />

        <div className="text-center sm:text-left">
          <p className="text-lg">
            <strong>Name:</strong> {admin.name || "N/A"}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {admin.email || "N/A"}
          </p>
          <p className="text-lg">
            <strong>Role:</strong> {admin.role || "N/A"}
          </p>
          <p className="text-lg">
            <strong>Bio:</strong> {admin.bio || "N/A"}
          </p>
          <p className="text-lg">
            <strong>LinkedIn:</strong>{" "}
            {admin.publicprofile ? (
              <a
                href={admin.publicprofile.startsWith("http") ? admin.publicprofile : `https://${admin.publicprofile}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {admin.publicprofile}
              </a>
            ) : (
              "No LinkedIn profile"
            )}
          </p>

          {!isSharedView && (
            <div className="mt-4 flex flex-row gap-3">
              <button
                onClick={() => (window.location.href = "/dashboard/profile/update")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Admin Stats */}
      
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
            <IoNewspaperOutline className="text-blue-500 text-4xl" />
            <p className="text-xl font-bold">{counts.total || 0}</p>
            <p className="text-sm text-gray-600">Total Blogs</p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
            <img src={img2} className="w-10 h-10" alt="Check" />
            <p className="text-xl font-bold">{counts.approved || 0}</p>
            <p className="text-sm text-gray-600">Published</p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
            <FontAwesomeIcon icon={faHourglassHalf} className="text-purple-600 text-3xl" />
            <p className="text-xl font-bold">{counts.pending || 0}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
            <span className="text-3xl">❌</span>
            <p className="text-xl font-bold">{counts.rejected || 0}</p>
            <p className="text-sm text-gray-600">Inactive</p>
          </div>
        </div>
   
    </div>
  );
};

export default AdminProfile;
