// import { supabase } from "../helpers/supabase";
// // import { uploadFile } from "./ImageService";

// export const createpickup = async (pickup) => {
//   try {
//     //upload
//     const { data, error } = await supabase
//       .from("pickup")
//       .upsert(pickup, { onConflict: ["id"] })
//       .select()
//       .single();
//     if (error) {
//       console.log("Could not create pickup", error);
//       return { success: false, msg: "Could not create pickupt" };
//     }
//     return { success: true, data: data };
//   } catch (error) {
//     console.log(error);
//     return { success: false, msg: "Could not create pickup" };
//   }
// };

import supabase from "../helpers/supabase";

export const createPickup = async (pickup) => {
  try {
    const { data, error } = await supabase
      .from("pickup")
      .insert(pickup)
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Could not create pickup", error);
    return { success: false, msg: error.message };
  }
};
