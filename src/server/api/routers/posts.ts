import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { z } from "zod";
import { fetchAllNews, fetchAllPosts, fetchCommentsbyID, fetchNewsbyID, fetchPostsbyID, fetchPostsByIDInfinite } from "~/lib/data";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";

export const postsRouter = createTRPCRouter({
    getAllPosts: publicProcedure
    .input(z.object({
        cursor: z.object({
          createdAt: z.date(),
          id: z.string(),
        }).optional(),
    }))
    .query(async ({ input }) => {
        try {
            const limit = 10;

            const cursor = input.cursor || null;
            
            const { allPosts, nextCursor, hasNextPage } = await fetchAllPosts( cursor, limit );

            return {
                allPosts,
                nextCursor,
                hasNextPage
            };
        } catch (error) {
        console.error('Error while fetching data:', error);
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Error while fetching data',
            cause: error,
        });
        }
    }),
    getPostsByIDInfinite: publicProcedure
    .input(z.object({
        cursor: z.object({
            createdAt: z.date(),
            id: z.string(),
        }).optional(),
        communityId: z.string().uuid()
    }))
    .query(async ({ input }) => {
        try {
            const limit = 10;

            const cursor = input.cursor || null;

            const communityId = input.communityId;
            
            const { allPosts, nextCursor, hasNextPage } = await fetchPostsByIDInfinite( cursor, limit, communityId );

            return {
                allPosts,
                nextCursor,
                hasNextPage
            };
        } catch (error) {
        console.error('Error while fetching data:', error);
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Error while fetching data',
            cause: error,
        });
        }
    }),
    getPostsByID : publicProcedure
    .input(z.object({
        postId : z.string().uuid()
    }))
    .query(async ({input}) => {
        const { postId } = input;
        try{
            const postData = await fetchPostsbyID(postId)
            return {postData};
        }
        catch (error) {
            console.error('Error while fetching data:', error);
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Error while fetching data',
                cause: error,
            });
        }
    }),
    getPostsComments : publicProcedure
    .input(z.object({
        postId : z.string().uuid()
    }))
    .query(async ({input}) => {
        const { postId } = input;

        try{
            
            const commentsData = await fetchCommentsbyID(postId)
            return {commentsData};

        } catch (error) {
            console.log('Database Error:',error);
            throw new Error('Failed to fetch comments data');
        }
    })
})
