import type { Session, User } from "@prisma/client";
import type { JWT } from "@auth/core/jwt";


declare module "next-auth/jwt" {
    interface JWT {
        id: string,
        username?: string | null
    }
}

declare module "next-auth" {
    interface Session {
        user: User & {
            id: string
            username?: string | null
            name: string | null | undefined
            bio: string | null;
            website: string | null;
            gender: string | null;
            email: string | null | undefined;
            emailVerified: Date | null;
            image: string | null | undefined;
            createdAt: Date;
            updatedAt: Date;
        }
    }

    interface User {
        username?: string | null
    }
}
