"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, LogOut, Calendar, Sun, Moon, ChevronDown, ChevronRight } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import DashboardIcon from "@/icons/dashboard-icon";
import ChatIcon from "@/icons/chat-icon";
import IntegrationsIcon from "@/icons/integrations-icon";
import EmailIcon from "@/icons/email-icon";
import SettingsIcon from "@/icons/settings-icon";
import DevicesIcon from "@/icons/devices-icon";

const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
    { label: "Conversations", href: "/conversations", icon: <ChatIcon /> },
    { label: "Integrations", href: "/integrations", icon: <IntegrationsIcon /> },
    { label: "Appointments", href: "/appointments", icon: <Calendar /> },
];

const optionsItems = [
    { label: "Email Marketing", href: "/email-marketing", icon: <EmailIcon /> },
    { label: "Settings", href: "/settings", icon: <SettingsIcon /> },
];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [optionsOpen, setOptionsOpen] = useState(true);

    useEffect(() => {
        setDarkMode(localStorage.getItem("theme") === "dark");
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleTheme = () => {
        const newTheme = darkMode ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark", !darkMode);
    };

    return (
        <>
            {isMobile && !collapsed && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setCollapsed(true)}></div>
            )}
            <div className={`h-screen bg-sky-800 text-white transition-all flex flex-col ${collapsed ? "w-16" : "w-64"} ${isMobile ? "absolute" : ""}`}>
                <div className="flex items-center justify-between p-4">
                    {!collapsed && <span className="font-bold text-xl">MailGenie</span>}
                    <button onClick={() => setCollapsed(!collapsed)} className="text-white">
                        <Menu size={24} />
                    </button>
                </div>

                <nav className="flex flex-col gap-4 mt-4 flex-grow">
                    {!collapsed && <div className="px-3 text-sm font-semibold text-gray-300 uppercase">Menu</div>}
                    {menuItems.map((item, index) => (
                        <SidebarItem key={index} {...item} collapsed={collapsed} />
                    ))}

                    {!collapsed && (
                        <button className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-300 uppercase w-full" onClick={() => setOptionsOpen(!optionsOpen)}>
                            Options
                            {optionsOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        </button>
                    )}
                    {optionsOpen &&
                        optionsItems.map((item, index) => (
                            <SidebarItem key={index} {...item} collapsed={collapsed} />
                        ))}
                </nav>

                <div className="p-3">
                    <button onClick={toggleTheme} className="flex items-center gap-2 hover:bg-sky-700">
                        {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                        {!collapsed && <span>{darkMode ? "Dark" : "Light"}</span>}
                    </button>
                </div>

                <div className="p-3">
                    <button onClick={toggleTheme} className="flex items-center gap-2 hover:bg-sky-700">
                        {!collapsed && <DevicesIcon />}
                    </button>
                </div>

                <div className="p-3">
                    <button className={`flex items-center gap-2 w-full text-white hover:bg-sky-700 transition ${collapsed ? "justify-center" : ""}`}>
                        <LogOut size={24} />
                        {!collapsed && <SignOutButton />}
                    </button>
                </div>
            </div>
        </>
    );
};

const SidebarItem = ({ href, icon, label, collapsed }: any) => (
    <Link href={href} className="flex items-center gap-2 p-3 hover:bg-sky-700 transition">
        {icon}
        {!collapsed && <span>{label}</span>}
    </Link>
);

export default Sidebar;
