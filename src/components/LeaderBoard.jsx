// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Alert,
// } from "@mui/material";
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
//         const formattedData = data.map((entry) => ({
//           userId: entry.user_id,
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
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
//         EcoPoints Leaderboard
//       </Typography>

//       <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Rank</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell align="right">EcoPoints</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {leaderboardData.map((user, index) => (
//               <TableRow key={user.userId}>
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell align="right">{user.points}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default Leaderboard;

import React, { useState, useEffect } from "react";
import { Shield, Medal } from "lucide-react"; // Import Medal and Shield icons
import RecyclingIcon from "@mui/icons-material/Recycling";
import supabase from "../../helpers/supabase";

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
      <div className="min-h-screen w-full bg-[#7ab942] p-6 flex items-center justify-center">
        <div className="text-white text-xl">Loading leaderboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#7ab942] p-6 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#7ab942] p-6">
      <div className="bg-white p-4 rounded-t-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 border border-dashed border-gray-400 flex items-center justify-center text-xs text-gray-400">
            <RecyclingIcon sx={{ color: "#32a137", fontSize: 40, mr: 0 }} />
          </div>
          <h1 className="text-5xl font-bold tracking-wider">LEADERBOARD</h1>
        </div>

        <div className="relative">
          <div className="bg-[#7ab942] text-white py-2 px-4 inline-block font-bold text-xl">
            FINAL STANDINGS
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="grid grid-cols-12 gap-2 px-4 text-sm font-bold">
          <div className="col-span-1">RANK</div>
          <div className="col-span-9">NAME</div>
          <div className="col-span-2 text-right">ECOPOINTS</div>
        </div>

        {leaderboardData.map((entry) => (
          <div
            key={entry.rank}
            className="grid grid-cols-12 gap-2 items-center bg-white p-2 rounded"
          >
            <div className="col-span-1 text-center font-bold text-xl">
              {entry.rank}
            </div>
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
              <span className="font-bold">{entry.name}</span>
            </div>
            <div className="col-span-2 text-right font-bold text-xl">
              {entry.points}
            </div>
          </div>
        ))}
      </div>

      {/* Optional Footer */}
      {/* <div className="text-center text-white text-sm mt-6">
        <p>Edit this free ranking template from EDIT.org</p>
        <p className="uppercase">www.yourwebpagehere.com</p>
      </div> */}
    </div>
  );
};

export default Leaderboard;
