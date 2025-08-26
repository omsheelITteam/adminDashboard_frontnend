import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/profileDefault.png";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const RegContributors = () => {
    const { userData } = useContext(AppContext);
    const navigate = useNavigate();
    const [writers, setWriters] = useState([]);
    const [allWriters, setAllWriters] = useState([]);
    const {backendURL}=useContext(AppContext)
    
    const [res, set_res] = useState({ id: "", loader: false });

    // Fetch all writers
    const get_writers = async () => {
        try {
            const { data } = await axios.get(
                `${backendURL}/api/admin/get-reg-writers`,
                { withCredentials: true }
            );
            if (data.success) {
                setAllWriters(data.writers);
                setWriters(data.writers);

                // console.log('hw');
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
        }
    };

    const search_writers = (e) => {
        const value = e.target.value.toLowerCase();
        const filtered = allWriters.filter(
            (writer) =>
                writer.name.toLowerCase().includes(value) ||
                writer.email.toLowerCase().includes(value) ||
                writer.category.toLowerCase().includes(value)
        );
        setWriters(filtered);
    };

    useEffect(() => {
        get_writers();
    }, []);

    // Navigate to profile page (fetch data in profile page itself)
    const handleProfileClick = (writerId) => {
        navigate(`/dashboard/writer/profile/${writerId}`);
    };

    // Update writer status
    const update_status = async (status, writerId) => {
        set_res({ id: writerId, loader: true });
        // console.log(writerId)
        try {
            const { data } = await axios.put(
                `${backendURL}/api/admin/update-writer-status`,
                { writerId, status },
                { withCredentials: true }
            );

            if (data.success) {
                await get_writers(); // Refresh table after status update
            }
        } catch (error) {
            console.error("Error updating writer status:", error);
        } finally {
            set_res({ id: "", loader: false });
        }
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
                </div>

                {/* Table */}
                <div className="overflow-x-auto p-2 sm:p-4 w-full">
                    <table className="w-full text-sm text-center text-slate-600">
                        <thead className="text-xs text-gray-700 uppercase bg-yellow-400">
                            <tr>
                                <th className="px-7 py-3">No</th>
                                <th>Image</th>
                                <th className="px-4 py-3">Reporter Name</th>
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
                                    <td className="px-6 p-4">{value.name}</td>
                                    <td className="px-6 p-4 break-words whitespace-nowrap">
                                        {value.email}
                                    </td>
                                    <td className="px-6 p-4">{value.contributor}</td>
                                    <td className="px-6 p-4">
                                        {value.writerbio ? value.writerbio.slice(0, 10) + "..." : ""}
                                    </td>
                                    <td className="px-6 p-4">
                                        <div className="flex gap-2 items-center flex-wrap">
                                            {value.status === "pending" && (
                                                <>
                                                    <FaCheckCircle
                                                        onClick={() => update_status("approved", value.id)}
                                                        className={`w-5 h-5 cursor-pointer text-green-600 hover:scale-110 transition-transform ${res.loader && res.id === value.id ? "opacity-50 cursor-not-allowed" : ""}`}
                                                    />
                                                    <FaTimesCircle
                                                        onClick={() => update_status("rejected", value.id)}
                                                        className={`w-5 h-5 cursor-pointer text-red-600 hover:scale-110 transition-transform ${res.loader && res.id === value.id ? "opacity-50 cursor-not-allowed" : ""}`}
                                                    />
                                                </>
                                            )}
                                            <FaEye
                                                onClick={() => handleProfileClick(value.id)}
                                                className="cursor-pointer text-green-600 w-8 h-8 p-2 bg-green-300 rounded-full hover:scale-110 transition-transform"
                                            />
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

export default RegContributors;
