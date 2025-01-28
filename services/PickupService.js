import supabase from "../helpers/supabase";

export const createPickup = async (pickup) => {
  try {
    // First ensure user exists in users table
    const { error: userError } = await supabase
      .from("users")
      .upsert({ userid: pickup.userid }, { onConflict: "userid" });

    if (userError) throw userError;

    // Then create pickup
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

