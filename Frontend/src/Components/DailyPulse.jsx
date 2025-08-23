// // // // import React from 'react'
// // // // import { useContext, useState } from 'react';
// // // // import { AppContext } from "../Context/AppContext";
// // // // // const DailyPulse = () => {
// // // // //     const [dailyPulseImges, setDailyPulseImages] = useState([]);
// // // // //     const [loading, setLoading] = useState(false);
// // // // //     const [error, setError] = useState(null);
// // // // //     const { backendURL } = useContext(AppContext);
// // // // //     const handleImageUpload = async (e) => {
// // // // //         e.preventDefault();
// // // // //         setLoading(true);
// // // // //         setError(null);

// // // // //         const formData = new FormData();
// // // // //         for (let i = 0; i < dailyPulseImges.length; i++) {
// // // // //             formData.append('dailyPulseImages', dailyPulseImges[i]);
// // // // //         }

// // // // //         try {
// // // // //             const response = await fetch(`${backendURL}/api/admin/upload-daily-pulse`, {
// // // // //                 method: 'POST',
// // // // //                 body: formData,
// // // // //                 credentials: 'include'
// // // // //             });

// // // // //             if (!response.ok) {
// // // // //                 throw new Error('Failed to upload images');
// // // // //             }

// // // // //             const data = await response.json();
// // // // //             console.log(data);
// // // // //             alert("Daily Pulse images uploaded successfully!");
// // // // //         } catch (err) {
// // // // //             console.error(err);
// // // // //             setError("Failed to upload images");
// // // // //         } finally {
// // // // //             setLoading(false);
// // // // //         }
// // // // //     };
// // // // //   return (
// // // // //     <div>
// // // // //         <h1 className="text-2xl font-bold text-center mt-8">Daily Pulse</h1>
// // // // //         <form onSubmit={handleImageUpload} className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
// // // // //             <div className="mb-4">
// // // // //                 <label className="block text-sm font-medium text-gray-700 mb-2">Upload Daily Pulse Images</label>
// // // // //                 <input
// // // // //                     type="file"
// // // // //                     multiple
// // // // //                     accept="image/*"
// // // // //                     onChange={(e) => setDailyPulseImages([...e.target.files])}
// // // // //                     className="w-full border border-gray-300 rounded p-2"
// // // // //                 />
// // // // //             </div>
// // // // //             <button
// // // // //                 type="submit"
// // // // //                 disabled={loading}
// // // // //                 className={`w-full bg-blue-500 text-white py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
// // // // //             >
// // // // //                 {loading ? 'Uploading...' : 'Upload'}
// // // // //             </button>
// // // // //             {error && <p className="text-red-500 mt-2">{error}</p>}
// // // // //         </form>
// // // // //         <div className="mt-8">  
// // // // //             <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>
// // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
// // // // //                 {dailyPulseImges.map((image, index) => (
// // // // //                     <img
// // // // //                         key={index}
// // // // //                         src={URL.createObjectURL(image)}
// // // // //                         alt={`Daily Pulse ${index + 1}`}
// // // // //                         className="w-full h-auto rounded shadow"
// // // // //                     />
// // // // //                 ))}
// // // // //             </div>


// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default DailyPulse
// // // // const DailyPulse = () => {
// // // //   const [dailyPulseImages, setDailyPulseImages] = useState([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState(null);
// // // //   const { backendURL } = useContext(AppContext);

// // // //   const handleImageUpload = async (e) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);
// // // //     setError(null);

// // // //     const formData = new FormData();
// // // //     for (let i = 0; i < dailyPulseImages.length; i++) {
// // // //       formData.append('dailyPulseImages', dailyPulseImages[i]);
// // // //     }

// // // //     try {
// // // //       const response = await fetch(`${backendURL}/api/admin/upload-daily-pulse`, {
// // // //         method: 'POST',
// // // //         body: formData,
// // // //         credentials: 'include'
// // // //       });

// // // //       if (!response.ok) throw new Error('Failed to upload images');

// // // //       const data = await response.json();
// // // //       console.log(data);
// // // //       alert("Daily Pulse images uploaded successfully!");
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       setError("Failed to upload images");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <h1 className="text-2xl font-bold text-center mt-8">Daily Pulse</h1>
// // // //       <form onSubmit={handleImageUpload} className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
// // // //         <div className="mb-4">
// // // //           <label className="block text-sm font-medium text-gray-700 mb-2">Upload Daily Pulse Images</label>
// // // //           <input
// // // //             type="file"
// // // //             multiple
// // // //             accept="image/*"
// // // //             onChange={(e) => setDailyPulseImages([...e.target.files])}
// // // //             className="w-full border border-gray-300 rounded p-2"
// // // //           />
// // // //         </div>
// // // //         <button
// // // //           type="submit"
// // // //           disabled={loading}
// // // //           className={`w-full bg-blue-500 text-white py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
// // // //         >
// // // //           {loading ? 'Uploading...' : 'Upload'}
// // // //         </button>
// // // //         {error && <p className="text-red-500 mt-2">{error}</p>}
// // // //       </form>

// // // //       {/* Image Preview */}
// // // //       <div className="mt-8">  
// // // //         <h2 className="text-xl font-semibold mb-4">Preview</h2>
// // // //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
// // // //           {dailyPulseImages.map((image, index) => (
// // // //             <img
// // // //               key={index}
// // // //               src={URL.createObjectURL(image)}
// // // //               alt={`Daily Pulse ${index + 1}`}
// // // //               className="w-full h-auto rounded shadow"
// // // //             />
// // // //           ))}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DailyPulse;
// // // import React, { useState, useContext } from "react";
// // // import { AppContext } from "../Context/AppContext";

// // // const DailyPulse = () => {
// // //   const [title, setTitle] = useState("");
// // //   const [description, setDescription] = useState("");
// // //   const [dailyPulseImages, setDailyPulseImages] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);
// // //   const { backendURL } = useContext(AppContext);

// // //   const handleImageUpload = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setError(null);

// // //     const formData = new FormData();
// // //     formData.append("title", title);
// // //     formData.append("description", description);

// // //     for (let i = 0; i < dailyPulseImages.length; i++) {
// // //       formData.append("dailyPulseImages", dailyPulseImages[i]);
// // //     }

// // //     try {
// // //       const response = await fetch(`${backendURL}/api/admin/upload-daily-pulse`, {
// // //         method: "POST",
// // //         body: formData,
// // //         credentials: "include",
// // //       });

// // //       if (!response.ok) throw new Error("Failed to upload images");

// // //       const data = await response.json();
// // //       console.log(data);
// // //       alert("Daily Pulse uploaded successfully!");

// // //       // Reset form
// // //       setTitle("");
// // //       setDescription("");
// // //       setDailyPulseImages([]);
// // //     } catch (err) {
// // //       console.error(err);
// // //       setError("Failed to upload Daily Pulse");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h1 className="text-2xl font-bold text-center mt-8">Daily Pulse</h1>
// // //       <form
// // //         onSubmit={handleImageUpload}
// // //         className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md"
// // //       >
// // //         {/* Title */}
// // //         <div className="mb-4">
// // //           <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
// // //           <input
// // //             type="text"
// // //             value={title}
// // //             onChange={(e) => setTitle(e.target.value)}
// // //             required
// // //             className="w-full border border-gray-300 rounded p-2"
// // //             placeholder="Enter title"
// // //           />
// // //         </div>

// // //         {/* Description */}
// // //         <div className="mb-4">
// // //           <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
// // //           <textarea
// // //             value={description}
// // //             onChange={(e) => setDescription(e.target.value)}
// // //             required
// // //             rows="3"
// // //             className="w-full border border-gray-300 rounded p-2"
// // //             placeholder="Enter description"
// // //           />
// // //         </div>

// // //         {/* Images */}
// // //         <div className="mb-4">
// // //           <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
// // //           <input
// // //             type="file"
// // //             multiple
// // //             accept="image/*"
// // //             onChange={(e) => setDailyPulseImages([...e.target.files])}
// // //             className="w-full border border-gray-300 rounded p-2"
// // //           />
// // //         </div>

// // //         {/* Submit */}
// // //         <button
// // //           type="submit"
// // //           disabled={loading}
// // //           className={`w-full bg-blue-500 text-white py-2 rounded ${
// // //             loading ? "opacity-50 cursor-not-allowed" : ""
// // //           }`}
// // //         >
// // //           {loading ? "Uploading..." : "Upload"}
// // //         </button>

// // //         {error && <p className="text-red-500 mt-2">{error}</p>}
// // //       </form>

// // //       {/* Image Preview */}
// // //       {dailyPulseImages.length > 0 && (
// // //         <div className="mt-8 max-w-4xl mx-auto">
// // //           <h2 className="text-xl font-semibold mb-4">Preview</h2>
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
// // //             {dailyPulseImages.map((image, index) => (
// // //               <img
// // //                 key={index}
// // //                 src={URL.createObjectURL(image)}
// // //                 alt={`Daily Pulse ${index + 1}`}
// // //                 className="w-full h-auto rounded shadow"
// // //               />
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default DailyPulse;
// // import React, { useState } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";

// // const DailyPulse = () => {
// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [images, setImages] = useState([]);

// //   const handleFileChange = (e) => {
// //     setImages(Array.from(e.target.files));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!title || !description || images.length === 0) {
// //       toast.error("Please fill all fields and upload at least one image");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("Title", title);
// //     formData.append("description", description);

// //     // Append multiple files
// //     images.forEach((file) => {
// //       formData.append("dailyPulseImages", file);
// //     });

// //     try {
// //       const res = await axios.post(
// //         "http://localhost:5500/api/admin/upload-daily-pulse",
// //         formData,
// //         {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         }
// //       );

// //       if (res.data.success) {
// //         toast.success("Daily Pulse uploaded successfully!");
// //         setTitle("");
// //         setDescription("");
// //         setImages([]);
// //       } else {
// //         toast.error(res.data.message || "Failed to upload");
// //       }
// //     } catch (error) {
// //       console.error("Upload error:", error);
// //       toast.error(error.response?.data?.message || "Error uploading");
// //     }
// //   };

// //   return (
// //     <div className="max-w-lg mx-auto p-4 bg-white rounded shadow">
// //       <h2 className="text-xl font-bold mb-4">Upload Daily Pulse</h2>
// //       <form onSubmit={handleSubmit}>
// //         <label className="block mb-2 font-semibold">Title</label>
// //         <input
// //           type="text"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //           className="w-full p-2 border rounded mb-4"
// //         />

// //         <label className="block mb-2 font-semibold">Description</label>
// //         <textarea
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //           className="w-full p-2 border rounded mb-4"
// //           rows={4}
// //         ></textarea>

// //         <label className="block mb-2 font-semibold">Images</label>
// //         <input
// //           type="file"
// //           accept="image/*"
// //           multiple
// //           onChange={handleFileChange}
// //           className="mb-4"
// //         />

// //         <button
// //           type="submit"
// //           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
// //         >
// //           Upload
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default DailyPulse;
// import React, { useState } from "react";
// import { X, Upload, Camera } from "lucide-react";

// const DailyPulse = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImages(files);
    
//     // Create preview URLs
//     const previews = files.map(file => ({
//       file,
//       url: URL.createObjectURL(file),
//       name: file.name,
//       size: (file.size / 1024 / 1024).toFixed(2) // Size in MB
//     }));
    
//     // Clean up previous URLs to prevent memory leaks
//     imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
//     setImagePreviews(previews);
//   };

//   const removeImage = (index) => {
//     const newImages = images.filter((_, i) => i !== index);
//     const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
//     // Clean up the removed preview URL
//     URL.revokeObjectURL(imagePreviews[index].url);
    
//     setImages(newImages);
//     setImagePreviews(newPreviews);
//   };

//   const handleSubmit = async () => {
//     if (!title || !description || images.length === 0) {
//       alert("Please fill all fields and upload at least one image");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("Title", title);
//     formData.append("description", description);
    
//     // Append multiple files
//     images.forEach((file) => {
//       formData.append("dailyPulseImages", file);
//     });

//     try {
//       // Simulate API call - replace with your actual endpoint
//       console.log("Uploading Daily Pulse...");
//       console.log("Title:", title);
//       console.log("Description:", description);
//       console.log("Images:", images.length);
      
//       // Simulate success
//       setTimeout(() => {
//         alert("Daily Pulse uploaded successfully!");
//         setTitle("");
//         setDescription("");
//         setImages([]);
//         setImagePreviews([]);
//       }, 1000);
      
//       /* 
//       // Your actual API call:
//       const res = await axios.post(
//         "http://localhost:5500/api/admin/upload-daily-pulse",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
      
//       if (res.data.success) {
//         alert("Daily Pulse uploaded successfully!");
//         setTitle("");
//         setDescription("");
//         setImages([]);
//         setImagePreviews([]);
//       } else {
//         alert(res.data.message || "Failed to upload");
//       }
//       */
//     } catch (error) {
//       console.error("Upload error:", error);
//       alert("Error uploading");
//     }
//   };

//   // Clean up URLs when component unmounts
//   React.useEffect(() => {
//     return () => {
//       imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
//     };
//   }, []);

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Daily Pulse</h2>
      
//       <div onSubmit={handleSubmit} className="space-y-6">
//         {/* Title Input */}
//         <div>
//           <label className="block mb-2 font-semibold text-gray-700">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//             placeholder="Enter title..."
//           />
//         </div>

//         {/* Description Input */}
//         <div>
//           <label className="block mb-2 font-semibold text-gray-700">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
//             rows={4}
//             placeholder="Enter description..."
//           />
//         </div>

//         {/* File Upload */}
//         <div>
//           <label className="block mb-2 font-semibold text-gray-700">Images</label>
//           <div className="relative">
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleFileChange}
//               className="hidden"
//               id="image-upload"
//             />
//             <label
//               htmlFor="image-upload"
//               className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
//             >
//               <div className="text-center">
//                 <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
//                 <p className="text-gray-600">Click to upload images</p>
//                 <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB each</p>
//               </div>
//             </label>
//           </div>
          
//           {images.length > 0 && (
//             <p className="mt-2 text-sm text-gray-600">
//               {images.length} image{images.length !== 1 ? 's' : ''} selected
//             </p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="button"
//           onClick={handleSubmit}
//           className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition font-semibold"
//           disabled={images.length === 0}
//         >
//           Upload Daily Pulse
//         </button>
//       </div>

//       {/* Image Previews */}
//       {imagePreviews.length > 0 && (
//         <div className="mt-8">
//           <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
//             <Camera className="mr-2 h-5 w-5" />
//             Image Previews ({imagePreviews.length})
//           </h3>
          
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {imagePreviews.map((preview, index) => (
//               <div key={index} className="relative group">
//                 <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
//                   <img
//                     src={preview.url}
//                     alt={`Preview ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
                  
//                   {/* Remove Button */}
//                   <button
//                     type="button"
//                     onClick={() => removeImage(index)}
//                     className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
                  
//                   {/* Image Info Overlay */}
//                   <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 opacity-0 group-hover:opacity-100 transition">
//                     <p className="text-xs truncate">{preview.name}</p>
//                     <p className="text-xs text-gray-300">{preview.size} MB</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DailyPulse;

import React, { useState } from "react";
import { X, Upload, Camera } from "lucide-react";
import axios from "axios";
const DailyPulse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    
    // Add new files to existing images array
    const updatedImages = [...images, ...newFiles];
    setImages(updatedImages);
    
    // Create preview URLs for new files only
    const newPreviews = newFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) // Size in MB
    }));
    
    // Add new previews to existing previews
    setImagePreviews(prev => [...prev, ...newPreviews]);
    
    // Clear the input value so the same file can be selected again if needed
    e.target.value = '';
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    // Clean up the removed preview URL
    URL.revokeObjectURL(imagePreviews[index].url);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async () => {
    if (!title || !description || images.length === 0) {
      alert("Please fill all fields and upload at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("Title", title);
    formData.append("description", description);
    
    // Append multiple files
    images.forEach((file) => {
      formData.append("dailyPulseImages", file);
    });

    try {
      // Simulate API call - replace with your actual endpoint
      console.log("Uploading Daily Pulse...");
      console.log("Title:", title);
      console.log("Description:", description);
      console.log("Images:", images.length);
      
      // Simulate success
      setTimeout(() => {
        alert("Daily Pulse uploaded successfully!");
        setTitle("");
        setDescription("");
        setImages([]);
        setImagePreviews([]);
      }, 1000);
      
      
      // Your actual API call:
      const res = await axios.post(
        "http://localhost:5500/api/admin/upload-daily-pulse",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      
      if (res.data.success) {
        alert("Daily Pulse uploaded successfully!");
        setTitle("");
        setDescription("");
        setImages([]);
        setImagePreviews([]);
      } else {
        alert(res.data.message || "Failed to upload");
      }
      
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading");
    }
  };

  // Clean up URLs when component unmounts
  React.useEffect(() => {
    return () => {
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
    };
  }, []);

  return (
    <div className="max-w-2xl mt-4 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Daily Pulse</h2>
      
      <div onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Enter title..."
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
            rows={4}
            placeholder="Enter description..."
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="inline-block  mb-2 font-semibold text-gray-700">Images</label>
          <div className="relative ">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <div className="text-center">
                <Upload className="mx-auto h-8 w-12 text-gray-400 mb-2" />
                <p className="text-gray-600">Click to add more images</p>
                <p className="text-sm text-gray-500">Select images one by one or multiple at once</p>
              </div>
            </label>
          </div>
          
          {images.length > 0 && (
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {images.length} image{images.length !== 1 ? 's' : ''} selected
              </p>
              <button
                type="button"
                onClick={() => {
                  // Clear all images and previews
                  imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
                  setImages([]);
                  setImagePreviews([]);
                }}
                className="text-sm text-red-600 hover:text-red-800 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition font-semibold"
          disabled={images.length === 0}
        >
          Upload Daily Pulse
        </button>
      </div>

      {/* Image Previews */}
      {imagePreviews.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
            <Camera className="mr-2 h-5 w-5" />
            Image Previews ({imagePreviews.length})
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                  <img
                    src={preview.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  
                  {/* Image Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 opacity-0 group-hover:opacity-100 transition">
                    <p className="text-xs truncate">{preview.name}</p>
                    <p className="text-xs text-gray-300">{preview.size} MB</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyPulse;