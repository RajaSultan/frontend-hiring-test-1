import { authActions } from "@/slices/auth/reducer";
import { useDispatch } from "@/store";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { CallsTable } from "./table";
import Image from "next/image";
import { TurningLogo } from "@/assets";

const DashboardSection = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(authActions.logout());
    router.push("/login");
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Image src={TurningLogo} alt="" width={450} />
        </Box>
        <Button
          size="small"
          variant="contained"
          onClick={handleLogout}
          sx={{ backgroundColor: "#7b73fa", textTransform: "unset" }}
        >
          Logout
        </Button>
      </Box>
      <Box py={5} px={2}>
        <Typography variant="h5">Turning Technology Frontend Test</Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mt: 1,
          }}
        >
          Filter By Test
        </Typography>
        <Box mt={2}>
          <CallsTable />
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardSection;
