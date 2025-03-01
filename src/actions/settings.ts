"use server";
import { currentUser } from "@clerk/nextjs"; // Fetch the current authenticated user
import { PrismaClient } from "@prisma/client"; // Prisma client for database operations

const prisma = new PrismaClient();

export const onIntegrateDomain = async (domain: string, icon: string) => {
    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized" };

    try {
        // Fetch the user's subscription and count their current domains.
        const userSubscription = await prisma.subscription.findUnique({
            where: { userId: user.id },
            include: { domains: true },
        });

        if (!userSubscription) {
            return { status: 403, message: "No subscription found for the user" };
        }

        // Check if the domain already exists.
        const existingDomain = await prisma.domain.findUnique({
            where: { domain },
        });

        if (existingDomain) {
            return { status: 409, message: "Domain already exists" };
        }

        // Check the subscription plan and enforce limits.
        const subscriptionPlan = userSubscription.plan; // Assuming the plan is stored in the subscription
        const maxDomainsAllowed = subscriptionPlan === "premium" ? 10 : 1; // Example logic for domain limits

        if (userSubscription.domains.length >= maxDomainsAllowed) {
            return { status: 403, message: "Domain limit reached for your subscription plan" };
        }

        // Create a new domain entry and link it to the user.
        await prisma.domain.create({
            data: {
                domain,
                icon,
                userId: user.id,
            },
        });

        return { status: 200, message: "Domain successfully added" };
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error" };
    }
};