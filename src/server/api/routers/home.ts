import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { z } from "zod";
import { fetchAllNews, fetchNewsbyID } from "~/lib/data";
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
        }),
    getNewsByID: publicProcedure
    .input(z.object({ newsId: z.string().uuid() }))
    .query(async ({input}) => {
        const { newsId } = input;
        try{
            const newsPage = await fetchNewsbyID(newsId);
            if(!newsPage){
                throw new TRPCClientError("Not found");
            }
            return {newsPage};
        }
        catch (error) {
            throw new TRPCClientError("Error while fetching single News");
        }
    })
})
