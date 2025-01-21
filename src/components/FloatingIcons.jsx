import { Box } from "@mui/material";
import ForestIcon from "@mui/icons-material/Forest";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

import ParkIcon from "@mui/icons-material/Park";
import GrassIcon from "@mui/icons-material/Grass";
import AirIcon from "@mui/icons-material/Air";
import SpaIcon from "@mui/icons-material/Spa";

const icons = [
  { Icon: ForestIcon, delay: 0 },
  { Icon: LocalFloristIcon, delay: 2 },
  { Icon: WaterDropIcon, delay: 4 },

  { Icon: ParkIcon, delay: 3 },
  { Icon: GrassIcon, delay: 5 },
  { Icon: AirIcon, delay: 2 },
  { Icon: SpaIcon, delay: 4 },
];

const FloatingIcon = ({ Icon, delay, index }) => (
  <Box
    sx={{
      position: "absolute",
      animation: `float 10s ease-in-out infinite ${delay}s`,
      color: "rgba(46, 125, 50, 0.15)",
      fontSize: "2rem",
      zIndex: 0,
      "@keyframes float": {
        "0%": {
          transform: "translateY(0px) rotate(0deg)",
        },
        "50%": {
          transform: "translateY(-20px) rotate(180deg)",
        },
        "100%": {
          transform: "translateY(0px) rotate(360deg)",
        },
      },
      ...getRandomPosition(index),
    }}
  >
    <Icon sx={{ fontSize: "inherit" }} />
  </Box>
);

const getRandomPosition = (index) => {
  const positions = [
    { left: "5%", top: "10%" },
    { right: "10%", top: "15%" },
    { left: "15%", bottom: "20%" },
    { right: "8%", bottom: "25%" },
    { left: "20%", top: "40%" },
    { right: "15%", top: "45%" },
    { left: "10%", bottom: "35%" },
    { right: "20%", bottom: "30%" },
  ];
  return positions[index % positions.length];
};

const FloatingIcons = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {icons.map(({ Icon, delay }, index) => (
        <FloatingIcon key={index} Icon={Icon} delay={delay} index={index} />
      ))}
    </Box>
  );
};

export default FloatingIcons;
