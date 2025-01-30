// import supabase from "../helpers/supabase";

// export const createPickup = async (pickup) => {
//   try {
//     // First ensure user exists in users table
//     const { error: userError } = await supabase
//       .from("users")
//       .upsert({ userid: pickup.userid }, { onConflict: "userid" });

//     if (userError) throw userError;

//     // Then create pickup
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

// import supabase from "../helpers/supabase";

// export const createPickup = async (pickup) => {
//   try {
//     // First get the user's details from auth
//     const { data: { user }, error: authError } = await supabase.auth.getUser();
//     if (authError) throw authError;

//     // Ensure user exists in users table with required fields
//     const { error: userError } = await supabase
//       .from("users")
//       .upsert({
//         userid: pickup.userid,
//         name: user.user_metadata?.full_name || user.user_metadata?.name,
//         email: user.email
//       }, {
//         onConflict: "userid"
//       });

//     if (userError) throw userError;

//     // Then create pickup
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
// import supabase from "../helpers/supabase";

// export const createPickup = async (pickup) => {
//   try {
//     // First get the user's details from auth
//     const { data: { user }, error: authError } = await supabase.auth.getUser();
//     if (authError) throw authError;

//     // Ensure user exists in users table with required fields
//     const { error: userError } = await supabase
//       .from("users")
//       .upsert({
//         userid: pickup.userid,
//         name: user.user_metadata?.full_name || user.user_metadata?.name,
//         email: user.email
//       }, {
//         onConflict: "userid"
//       });

//     if (userError) throw userError;

//     // Then create pickup
//     const { data, error } = await supabase
//       .from("pickup")
//       .insert({
//         userid: pickup.userid,
//         recycling_center_id: pickup.recycling_center_id,
//         recycling_center_name: pickup.recycling_center_name,
//         recycling_center_address: pickup.recycling_center_address,
//         address: pickup.address,
//         date: pickup.date,
//         timeslot: pickup.timeslot,
//         vehicle: pickup.vehicle
//         // status will default to 'Scheduled' as per schema
//       })
//       .select()
//       .single();

//     if (error) throw error;
//     return { success: true, data };

//   } catch (error) {
//     console.error("Could not create pickup", error);
//     return { success: false, msg: error.message };
//   }
// };

//deepseek
// import supabase from "../helpers/supabase";

// export const createPickup = async (pickup) => {
//   try {
//     // First get the user's details from auth
//     const {
//       data: { user },
//       error: authError,
//     } = await supabase.auth.getUser();
//     if (authError) throw authError;

//     // Ensure user exists in users table with required fields
//     const { error: userError } = await supabase.from("users").upsert(
//       {
//         userid: pickup.userid,
//         name: user.user_metadata?.full_name || user.user_metadata?.name,
//         email: user.email,
//       },
//       {
//         onConflict: "userid",
//       }
//     );

//     if (userError) throw userError;

//     // Validate required fields
//     if (
//       !pickup.recycling_center_id ||
//       !pickup.recycling_center_name ||
//       !pickup.recycling_center_address
//     ) {
//       throw new Error("Invalid recycling center details");
//     }

//     // Then create pickup
//     const { data, error } = await supabase
//       .from("pickup")
//       .insert({
//         userid: pickup.userid,
//         recycling_center_id: pickup.recycling_center_id,
//         recycling_center_name: pickup.recycling_center_name,
//         recycling_center_address: pickup.recycling_center_address,
//         address: pickup.address,
//         date: pickup.date,
//         timeslot: pickup.timeslot,
//         vehicle: pickup.vehicle,
//         // status will default to 'Scheduled' as per schema
//       })
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
    // First get the user's details from auth
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError) throw authError;

    // Ensure user exists in users table with required fields
    const { error: userError } = await supabase.from("users").upsert(
      {
        userid: pickup.userid,
        name:
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          "Unknown",
        email: user.email,
      },
      {
        onConflict: "userid",
      }
    );

    if (userError) throw userError;

    // Allow null recycling_center_id but provide default values for other fields
    const pickupData = {
      userid: pickup.userid,
      recycling_center_id: pickup.recycling_center_id || null, // Allow null
      recycling_center_name: pickup.recycling_center_name || "Unknown Center",
      recycling_center_address:
        pickup.recycling_center_address || "No Address Provided",
      address: pickup.address,
      date: pickup.date,
      timeslot: pickup.timeslot,
      vehicle: pickup.vehicle,
    };

    console.log("Final Pickup Data:", pickupData); // Debugging: Log final pickup object

    // Insert pickup request
    const { data, error } = await supabase
      .from("pickup")
      .insert(pickupData)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Could not create pickup", error);
    return { success: false, msg: error.message };
  }
};
