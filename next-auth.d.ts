import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";


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
