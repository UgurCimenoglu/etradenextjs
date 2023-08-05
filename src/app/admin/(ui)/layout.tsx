import AdminDrawer from "@/components/AdminComponents/Drawer";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <AdminDrawer>{children}</AdminDrawer>;
};

export default AdminLayout;
