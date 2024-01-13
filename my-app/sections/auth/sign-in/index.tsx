"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { FormProvider, RHFCheckbox, RHFTextField } from "@/components/rhf";
import LoadingButton from "@mui/lab/LoadingButton";
import { TurningLogo } from "@/assets";
import Image from "next/image";
import { Card, Grid } from "@mui/material";
import { useSignIn } from "./use-sign-in";

export default function SignInSection() {
  const { handleSubmit, onSubmit, methods } = useSignIn();
  return (
    <Container maxWidth="sm" sx={{ mt: 15 }}>
      <Card sx={{ p: 5 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Image src={TurningLogo} alt="" width={450} />
        </Box>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <RHFTextField
                name="username"
                type="text"
                variant="outlined"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <RHFCheckbox
                name="loggedIn"
                label="Remember me"
                sx={{
                  color: "#7b73fa",
                  "&.Mui-checked": {
                    color: "#7b73fa",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                variant="contained"
                type="submit"
                sx={{ borderRadius: "5px", py: 1, backgroundColor: "#7b73fa" }}
              >
                Login
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Card>
    </Container>
  );
}
