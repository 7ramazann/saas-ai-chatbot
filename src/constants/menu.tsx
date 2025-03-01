import {JSX} from "react";
import DashboardIcon from "@/icons/dashboard-icon";
import ChatIcon from "@/icons/chat-icon";
import IntegrationsIcon from "@/icons/integrations-icon";
import {Calendar} from "lucide-react";

type SIDE_BAR_MENU_PROPS = {
    label: string
    icon: JSX.Element
    path: string
}

export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { label: "Conversations", path: "/conversations", icon: <ChatIcon /> },
    { label: "Integrations", path: "/integrations", icon: <IntegrationsIcon /> },
    { label: "Appointments", path: "/appointments", icon: <Calendar /> },
]