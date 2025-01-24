import React, { useState, useEffect } from "react";
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
        src={reward.image_url}
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

const RewardsPage = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReward, setSelectedReward] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserPoints();
    fetchRewards();
  }, []);

  const fetchUserPoints = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("user_points")
        .select("points")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;

      setUserPoints(data?.points || 0);
    } catch (error) {
      console.error("Error fetching points:", error);
      setError("Failed to load your points. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRewards = async () => {
    try {
      const { data, error } = await supabase.from("rewards").select("*");
      if (error) throw error;

      setRewards(data || []);
    } catch (error) {
      console.error("Error fetching rewards:", error);
      setError("Failed to load rewards. Please try again later.");
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

      <Typography variant="h4" sx={{ mb: 4 }}>
        Available Rewards
      </Typography>
      <Grid container spacing={4}>
        {rewards.map((reward) => (
          <Grid item xs={12} sm={6} md={4} key={reward.id}>
            <RewardCard
              reward={reward}
              userPoints={userPoints}
              onRedeem={handleRedeem}
            />
          </Grid>
        ))}
      </Grid>

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

export default RewardsPage;
