"use client";

import { Card, CardContent, Modal, Box, Typography } from "@mui/material";
import { useState, ReactDOM } from "react";
import { createPortal } from "react-dom";
import { main } from "@/components/public/Layout";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  };
};

export default useModal;
