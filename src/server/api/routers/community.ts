import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { z } from "zod";
import { fetchCommunitybyID } from "~/lib/data";
import { TRPCClientError } from "@trpc/client";

export const communityRouter = createTRPCRouter({
    getCommunityByID: publicProcedure
    .input(z.object({ communityId: z.string().uuid() }))
    .query(async ({input}) => {
        const { communityId } = input;
        try{
            const communityPage = await fetchCommunitybyID(communityId);
            if(!communityPage){
                throw new TRPCClientError("Not found");
            }
            return {communityPage};
        }
        catch (error) {
            throw new TRPCClientError("Error while fetching single News");
        }
    })
})
