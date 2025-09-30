"use client";
import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import HeaderContent from "./HeaderContent";
const Header = () => {
  return (
      <AuthProvider>
        <HeaderContent />
      </AuthProvider>
  );
};

export default Header;
