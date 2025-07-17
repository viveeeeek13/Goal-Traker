

import React from "react"
import DashboardWrapper from "../../../components/dashboard"


export const metadata = {
  title: "Dashboard | Goal Tracker",
  description: "Your goal tracking dashboard",
}

export default function DashboardLayout({ children }) {
  return <DashboardWrapper>{children}</DashboardWrapper>
}