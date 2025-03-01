import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import Sidebar from "@/components/sidebar/sidebar";

export default async function IntegrationsPage() {
    const user = await currentUser();

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-xl font-bold text-gray-800">You need to log in!</h1>
                    <p className="text-gray-600">Please log in to access your dashboard.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.firstName}!</h1>
                <p className="text-gray-600">This is your Integrations page.</p>
            </div>
        </div>
    );
}