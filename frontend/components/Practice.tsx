// "use client"
// import { useState, useRef } from "react";

// const Practice = () => {
//   const [isCameraActive, setIsCameraActive] = useState(false);
//   const [recognizedSign, setRecognizedSign] = useState("");
//   const videoRef = useRef(null);

//   // Function to start the camera
//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//         setIsCameraActive(true);
//       }
//     } catch (error) {
//       console.error("Error accessing the camera:", error);
//       alert("Unable to access the camera. Please check permissions.");
//     }
//   };

//   // Function to stop the camera
//   const stopCamera = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const stream = videoRef.current.srcObject;
//       const tracks = stream.getTracks();
//       tracks.forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     }
//     setIsCameraActive(false);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <h1 className="text-2xl font-bold text-indigo-600 mb-4">Practice Sign Language</h1>
//       <div className="relative bg-white shadow-lg rounded-lg p-4 w-full max-w-md">
//         <div className="aspect-w-16 aspect-h-9">
//           <video
//             ref={videoRef}
//             className="rounded-lg border border-gray-300"
//             autoPlay
//             muted
//             playsInline
//           />
//         </div>
//         <div className="flex justify-between items-center mt-4">
//           {!isCameraActive ? (
//             <button
//               onClick={startCamera}
//               className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 transition"
//             >
//               Start Camera
//             </button>
//           ) : (
//             <button
//               onClick={stopCamera}
//               className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
//             >
//               Stop Camera
//             </button>
//           )}
//         </div>
//         <div className="mt-4">
//           <h2 className="text-lg font-semibold text-gray-700">Recognized Sign:</h2>
//           <div className="mt-2 p-4 border rounded-lg bg-gray-50 text-center text-gray-800">
//             {recognizedSign || "No sign detected yet."}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Practice;
