// import supabase from "../helpers/supabase";

// export const createPickup = async (pickup) => {
//   try {
//     const { data, error } = await supabase
//       .from("pickup")
//       .insert(pickup)
//       .select()
//       .single();

//     if (error) throw error;

//     return { success: true, data };
//   } catch (error) {
//     console.error("Could not create pickup", error);
//     return { success: false, msg: error.message };
//   }
// };

import supabase from "../helpers/supabase";

export const createPickup = async (pickup) => {
  try {
    // First ensure user exists in users table
    const { error: userError } = await supabase
      .from("users")
      .upsert({ userid: pickup.userid, points: 0 }, { onConflict: "userid" });

    if (userError) throw userError;

    // Then create pickup
    const { data, error } = await supabase
      .from("pickup")
      .insert(pickup)
      .select()
      .single();

    if (error) throw error;

    // // Update points
    // const { error: pointsError } = await supabase
    //   .from("users")
    //   .update({ points: supabase.raw("points + 50") })
    //   .eq("userid", pickup.userid);

    // if (pointsError) throw pointsError;

    return { success: true, data };
  } catch (error) {
    console.error("Could not create pickup", error);
    return { success: false, msg: error.message };
  }
};
// export const createPickup = async (pickup) => {
//   try {
//     const { data, error } = await supabase
//       .from("pickup")
//       .insert(pickup)
//       .select()
//       .single();

//     if (error) throw error;

//     // Update user points after successful pickup creation
//     const { error: pointsError } = await supabase.rpc("increment_user_points", {
//       userid: pickup.userid,
//       points_to_add: 50,
//     });

//     if (pointsError) throw pointsError;

//     return { success: true, data };
//   } catch (error) {
//     console.error("Could not create pickup", error);
//     return { success: false, msg: error.message };
//   }
// };
