"use client";
import AdminDrawer from "@/components/AdminComponents/Drawer";
import React from "react";
import useProductHub from "@/hooks/useProductHub";
import useOrderHub from "@/hooks/useOrderHub";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  useProductHub();
  useOrderHub();
  return <AdminDrawer>{children}</AdminDrawer>;
};

export default AdminLayout;
