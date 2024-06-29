import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { z } from "zod";
import { fetchAllNews } from "lib/data";
import { TRPCClientError } from "@trpc/client";

export const homeRouter = createTRPCRouter({
  getNews: publicProcedure
    .input(z.object({ current: z.number().optional().default(0) }))
    .query(async ({ input }) => {
        const { current } = input;
        try{
            const newsArticles = await fetchAllNews(current);
            return {newsArticles};
        } catch (error){
            throw new TRPCClientError("Error while fetching data")
        }
    })
})
