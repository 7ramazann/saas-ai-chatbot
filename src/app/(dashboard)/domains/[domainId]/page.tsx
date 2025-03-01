import React from "react";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Sidebar from "@/components/sidebar/sidebar";

type Domain = {
    id: string;
    name: string;
    icon: string | null;
    description?: string;
};

// Mock function to fetch domain details (replace with your actual data fetching logic)
const fetchDomain = async (domainId: string): Promise<Domain | null> => {
    const domains = [
        { id: "1", name: "example.com", icon: "/icons/example.png", description: "This is an example domain." },
        { id: "2", name: "test.com", icon: null, description: "This is a test domain." },
    ];

    return domains.find((domain) => domain.id === domainId) || null;
};

export default async function DomainPage({ params }: { params: { domainId: string } }) {
    const user = await currentUser();
    const domain = await fetchDomain(params.domainId);

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

    if (!domain) {
        notFound();
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold text-gray-800">{domain.name}</h1>
                {domain.icon && (
                    <Image
                        src={domain.icon}
                        alt={domain.name}
                        width={48}
                        height={48}
                        className="rounded mt-2"
                    />
                )}
                <p className="text-gray-600 mt-4">{domain.description}</p>
            </div>
        </div>
    );
}