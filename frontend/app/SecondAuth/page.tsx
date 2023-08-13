"use client";
import Image from "next/image";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { main } from "@/font/color";
import { useEffect, useState } from "react";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 350,
  bgcolor: main.main4,
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

export default function secondAuth() {
  return (
    <Box>
      <Card sx={modalStyle}>
        <Stack
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></Stack>
      </Card>
    </Box>
  );
}
