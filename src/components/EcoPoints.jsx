import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import supabase from "../../helpers/supabase";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

const rewardOptions = [
  {
    id: 1,
    title: "₹100 Off on Bamboo Products",
    points: 500,
    description: "Get ₹100 off on any bamboo product purchase above ₹500",
    image: "https://meticulousbplans.com/wp-content/uploads/2020/02/bamboo.jpg",
  },
  {
    id: 2,
    title: "20% Off on Eco-Friendly Bags",
    points: 800,
    description: "Get 20% discount on our collection of recycled material bags",
    image: "https://www.deyute.com/neofiles/image/eco-jute-bags.jpg",
  },
  {
    id: 3,
    title: "Free Metal Straw Set",
    points: 1000,
    description: "Redeem a set of 4 metal straws with cleaning brush",
    image:
      "https://i.etsystatic.com/34837732/r/il/62d9fd/3941508621/il_570xN.3941508621_3htk.jpg",
  },
  {
    id: 4,
    title: "₹500 Off on Solar Products",
    points: 2000,
    description: "Get ₹500 off on any solar-powered product",
    image:
      "https://cdn.shopify.com/s/files/1/0405/5747/8041/files/Gemini_Generated_Image_o8pjr8o8pjr8o8pj_480x480.jpg?v=1724908609",
  },
];
const RewardCard = ({ reward, userPoints, onRedeem }) => {
  const canRedeem = userPoints >= reward.points;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
        border: "1px solid rgba(46, 125, 50, 0.12)",
        borderRadius: 2,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(46, 125, 50, 0.15)",
        },
      }}
    >
      <Box
        component="img"
        src={reward.image}
        alt={reward.title}
        sx={{
          width: "100%",
          height: 200,
          objectFit: "cover",
          borderRadius: 1,
          mb: 2,
        }}
      />
      <Typography variant="h6" gutterBottom>
        {reward.title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 2, flex: 1 }}
      >
        {reward.description}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <EmojiEventsIcon sx={{ color: "#2E7D32" }} />
        <Typography variant="h6" color="#2E7D32">
          {reward.points} Points
        </Typography>
      </Box>
      <Button
        variant="contained"
        disabled={!canRedeem}
        onClick={() => onRedeem(reward)}
        sx={{
          background: canRedeem
            ? "linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)"
            : undefined,
          color: canRedeem ? "white" : undefined,
        }}
      >
        {canRedeem
          ? "Redeem Now"
          : `Need ${reward.points - userPoints} more points`}
      </Button>
    </Card>
  );
};

const EcoPoints = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedReward, setSelectedReward] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserPoints();
  }, []);

  // const fetchUserPoints = async () => {
  //   try {
  //     setLoading(true);
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();

  //     if (!user) throw new Error("User not authenticated");

  //     // Replace with your actual database query
  //     const { data, error } = await supabase
  //       .from("user_points")
  //       .select("points")
  //       .eq("user_id", user.id)
  //       .single();

  //     if (error) throw error;

  //     setUserPoints(data?.points || 0);
  //   } catch (error) {
  //     console.error("Error fetching points:", error);
  //     setError("Failed to load your points. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchUserPoints = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("User not authenticated");

      // Fetch user points safely
      const { data, error } = await supabase
        .from("user_points")
        .select("points")
        .eq("user_id", user.id)
        .maybeSingle(); // Use maybeSingle to avoid crashing when no rows are returned

      if (error) throw error;

      // Set points to 0 if no rows are found
      setUserPoints(data?.points || 0);
    } catch (error) {
      console.error("Error fetching points:", error);
      setError("Failed to load your points. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = (reward) => {
    setSelectedReward(reward);
    setOpenDialog(true);
  };

  const confirmRedemption = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("User not authenticated");

      // Replace with your actual redemption logic
      const { error } = await supabase.rpc("redeem_points", {
        points_to_redeem: selectedReward.points,
        user_id: user.id,
      });

      if (error) throw error;

      setUserPoints((prev) => prev - selectedReward.points);
      setOpenSnackbar(true);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error redeeming points:", error);
      setError("Failed to redeem points. Please try again later.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, px: 4 }}>
      {/* Points Display */}
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
          p: 4,
          borderRadius: 2,
          background: "linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)",
          color: "white",
        }}
      >
        <EmojiEventsIcon sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h3" gutterBottom>
          {userPoints} Points
        </Typography>
        <Typography variant="subtitle1">
          Earn more points by recycling and selling your waste products!
        </Typography>
      </Box>

      {/* Rewards Grid */}
      <Typography variant="h4" sx={{ mb: 4 }}>
        Available Rewards
      </Typography>
      <Grid container spacing={4}>
        {rewardOptions.map((reward) => (
          <Grid item xs={12} sm={6} md={4} key={reward.id}>
            <RewardCard
              reward={reward}
              userPoints={userPoints}
              onRedeem={handleRedeem}
            />
          </Grid>
        ))}
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Redemption</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to redeem {selectedReward?.title} for{" "}
            {selectedReward?.points} points?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={confirmRedemption} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          Successfully redeemed reward! Check your email for the voucher.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EcoPoints;
