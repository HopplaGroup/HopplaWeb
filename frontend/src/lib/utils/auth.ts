import "server-only";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cache } from "react";
import db from "./db";
import { Prisma } from "@prisma/client";

export const getUser = cache(
    async <T extends Prisma.UserInclude | undefined>(
        include?: T
    ): Promise<Prisma.UserGetPayload<{ include: T }> | null> => {
        try {
            let email = undefined
            let id = undefined;
            if (process.env.AUTH_TESTER_EMAIL) {
                email = process.env.AUTH_TESTER_EMAIL;
            } else {
                const { getUser: _getKindeUser } = getKindeServerSession();
                const kindeUser = await _getKindeUser();
                if (!kindeUser) {
                    throw new Error("Kinde user not found");
                }
             
                
                email = kindeUser.email || undefined;
                id = kindeUser.id || undefined;
            }


            let dbUser = null;
            if(email) {
                dbUser = await db.user.findUnique({
                    where: { email: email },
                    include,
                });
            }
            if(id ) {
                dbUser = dbUser || await db.user.findUnique({
                    where: { email: id },
                    include,
                });
            }

            return dbUser as any;
        } catch (error) {
            // console.error(error);
            return null;
        }
    }
);

