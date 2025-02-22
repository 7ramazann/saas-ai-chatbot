"use server";

import prisma from "@/lib/prisma";

export async function createUser({ clerkId, fullname, type, stripeId }: { clerkId: string; fullname: string; type: string; stripeId?: string }) {
    try {
        const newUser = await prisma.user.create({
            data: {
                clerkId,
                fullname,
                type,
                stripeId: stripeId || "",
            },
        });
        return newUser;
    } catch (error) {
        console.error("❌ Error creating user in database", error);
        return null;
    }
}