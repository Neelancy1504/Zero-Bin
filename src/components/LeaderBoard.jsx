// import React, { useState, useEffect } from "react";
// import { Shield, Medal } from "lucide-react"; // Import Medal and Shield icons
// import RecyclingIcon from "@mui/icons-material/Recycling";
// import supabase from "../../helpers/supabase";

// const Leaderboard = () => {
//   const [leaderboardData, setLeaderboardData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLeaderboardData = async () => {
//       try {
//         // Fetch leaderboard data for all users
//         const { data, error } = await supabase
//           .from("user_points")
//           .select("user_id, points, users!inner(name)") // Join with the users table
//           .order("points", { ascending: false });

//         if (error) throw error;

//         // Map the data to include names and points
//         const formattedData = data.map((entry, index) => ({
//           rank: index + 1, // Add rank based on the index
//           name: entry.users?.name || "Anonymous", // Fallback to "Anonymous" if name is missing
//           points: entry.points,
//         }));

//         setLeaderboardData(formattedData);
//       } catch (error) {
//         console.error("Error fetching leaderboard data:", error);
//         setError("Failed to load leaderboard. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaderboardData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen w-full bg-[#32a137] p-6 flex items-center justify-center">
//         <div className="text-white text-xl">Loading leaderboard...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen w-full bg-[#7ab942] p-6 flex items-center justify-center">
//         <div className="text-red-500 text-xl">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-[#2E7D32] via-[#43A047] to-[#4CAF50] p-6">
//       <div className="bg-white p-4 rounded-xl">
//         <div className="flex items-center gap-4 mb-4">
//           <div className="w-16 h-16 border border-gray-400 flex items-center justify-center text-xs text-gray-400 rounded-full">
//             <RecyclingIcon sx={{ color: "#32a137", fontSize: 40, mr: 0 }} />
//           </div>
//           <h1 className="text-5xl font-bold tracking-wider">LeaderBoard</h1>
//         </div>

//         <div className="relative">
//           <div className="bg-[#32a137] text-white py-2 px-4 inline-block font-bold text-xl">
//             FINAL STANDINGS
//           </div>
//         </div>
//       </div>

//       <div className="mt-4 space-y-2">
//         <div className="grid grid-cols-12 gap-2 px-4 text-sm font-bold">
//           <div className="col-span-1 text-white">RANK</div>
//           <div className="col-span-9 text-white">NAME</div>
//           <div className="col-span-2 text-white text-right">ECOPOINTS</div>
//         </div>

//         {leaderboardData.map((entry) => (
//           <div
//             key={entry.rank}
//             className="grid grid-cols-12 gap-2 items-center bg-white p-2 rounded"
//           >
//             <div className="col-span-1 text-left font-bold text-xl pl-5">
//               {entry.rank}
//             </div>
//             <div className="col-span-9 flex items-center gap-2">
//               {/* Conditionally render Medal or Shield icon with animation */}
//               {entry.rank === 1 ? (
//                 <Medal
//                   className="w-8 h-8 text-black-500 animate-bounce"
//                   fill="#FFD700"
//                 /> // Gold medal for rank 1
//               ) : entry.rank === 2 ? (
//                 <Medal
//                   className="w-8 h-8 text-black-400 animate-bounce"
//                   fill="#C0C0C0"
//                 /> // Silver medal for rank 2
//               ) : entry.rank === 3 ? (
//                 <Medal
//                   className="w-8 h-8 text-black-800 animate-bounce"
//                   fill="#CD7F32"
//                 /> // Bronze medal for rank 3
//               ) : (
//                 <Shield className="w-8 h-8 text-black" fill="green" /> // Shield for others
//               )}
//               <span className="font-bold">{entry.name}</span>
//             </div>
//             <div className="col-span-2 text-right font-bold text-xl">
//               {entry.points}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Optional Footer */}
//       {/* <div className="text-center text-white text-sm mt-6">
//         <p>Edit this free ranking template from EDIT.org</p>
//         <p className="uppercase">www.yourwebpagehere.com</p>
//       </div> */}
//     </div>
//   );
// };

// export default Leaderboard;

import React, { useState, useEffect } from "react";
import { Shield, Medal } from "lucide-react"; // Import Medal and Shield icons
import RecyclingIcon from "@mui/icons-material/Recycling";
import supabase from "../../helpers/supabase";
import { Typography } from "@mui/material"; // Import Typography for consistent text styling

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        // Fetch leaderboard data for all users
        const { data, error } = await supabase
          .from("user_points")
          .select("user_id, points, users!inner(name)") // Join with the users table
          .order("points", { ascending: false });

        if (error) throw error;

        // Map the data to include names and points
        const formattedData = data.map((entry, index) => ({
          rank: index + 1, // Add rank based on the index
          name: entry.users?.name || "Anonymous", // Fallback to "Anonymous" if name is missing
          points: entry.points,
        }));

        setLeaderboardData(formattedData);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setError("Failed to load leaderboard. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#32a137] p-6 flex items-center justify-center">
        <Typography variant="h6" className="text-white">
          Loading leaderboard...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#7ab942] p-6 flex items-center justify-center">
        <Typography variant="h6" className="text-red-500">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#2E7D32] via-[#43A047] to-[#4CAF50] p-6">
      <div className="bg-white p-4 rounded-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 border border-gray-400 flex items-center justify-center text-xs text-gray-400 rounded-full">
            <RecyclingIcon sx={{ color: "#32a137", fontSize: 40, mr: 0 }} />
          </div>
          <Typography
            variant="h3"
            className="font-extrabold tracking-wider"
            sx={{ fontWeight: 600 }}
          >
            LEADERBOARD
          </Typography>
        </div>

        <div className="relative">
          <Typography
            variant="h5"
            className="bg-[#32a137] text-white py-2 px-4 inline-block font-bold"
          >
            FINAL STANDINGS
          </Typography>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="grid grid-cols-12 gap-2 px-4 text-sm font-bold">
          <Typography variant="body1" className="col-span-1 text-white">
            RANK
          </Typography>
          <Typography variant="body1" className="col-span-9 text-white">
            NAME
          </Typography>
          <Typography
            variant="body1"
            className="col-span-2 text-white text-right"
          >
            ECOPOINTS
          </Typography>
        </div>

        {leaderboardData.map((entry) => (
          <div
            key={entry.rank}
            className="grid grid-cols-12 gap-2 items-center bg-white p-2 rounded"
          >
            <Typography
              variant="body1"
              className="col-span-1 text-left font-bold text-xl pl-5"
            >
              {entry.rank}
            </Typography>
            <div className="col-span-9 flex items-center gap-2">
              {/* Conditionally render Medal or Shield icon with animation */}
              {entry.rank === 1 ? (
                <Medal
                  className="w-8 h-8 text-black-500 animate-bounce"
                  fill="#FFD700"
                /> // Gold medal for rank 1
              ) : entry.rank === 2 ? (
                <Medal
                  className="w-8 h-8 text-black-400 animate-bounce"
                  fill="#C0C0C0"
                /> // Silver medal for rank 2
              ) : entry.rank === 3 ? (
                <Medal
                  className="w-8 h-8 text-black-800 animate-bounce"
                  fill="#CD7F32"
                /> // Bronze medal for rank 3
              ) : (
                <Shield className="w-8 h-8 text-black" fill="green" /> // Shield for others
              )}
              <Typography variant="body1" className="font-bold">
                {entry.name}
              </Typography>
            </div>
            <Typography
              variant="body1"
              className="col-span-2 text-right font-bold text-xl"
            >
              {entry.points}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
