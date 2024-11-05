import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { z } from "zod";
import {
  fetchAllPosts,
  fetchCommentsbyID,
  fetchPostsbyID,
  fetchPostsByIDInfinite,
  fetchPostsByQueryInfinite,
} from "~/lib/data";
import { TRPCError } from "@trpc/server";

export const postsRouter = createTRPCRouter({
  getAllPosts: publicProcedure
    .input(
      z.object({
        cursor: z
          .object({
            createdAt: z.date(),
            id: z.string(),
          })
          .optional(),
        tags: z.string().optional(),
        route: z.string(),
        alternateLimit: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        let limit = 10;

        const alt = input.alternateLimit || undefined;

        if (alt !== undefined) {
          limit = alt;
        }

        const cursor = input.cursor || null;

        const tags = input.tags || undefined;

        const route = input.route;

        const { allPosts, nextCursor, hasNextPage } = await fetchAllPosts(
          cursor,
          limit,
          tags,
          route,
        );

        return {
          allPosts,
          nextCursor,
          hasNextPage,
        };
      } catch (error) {
        console.error("Error while fetching data:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error while fetching data",
          cause: error,
        });
      }
    }),
  getPostsByIDInfinite: publicProcedure
    .input(
      z.object({
        cursor: z
          .object({
            createdAt: z.date(),
            id: z.string(),
          })
          .optional(),
        communityId: z.string().uuid(),
        tags: z.string().optional(),
        route: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const limit = 10;

        const cursor = input.cursor || null;

        const communityId = input.communityId;

        const tags = input.tags || undefined;

        const route = input.route;

        const { allPosts, nextCursor, hasNextPage } =
          await fetchPostsByIDInfinite(cursor, limit, communityId, tags, route);

        return {
          allPosts,
          nextCursor,
          hasNextPage,
        };
      } catch (error) {
        console.error("Error while fetching data:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error while fetching data",
          cause: error,
        });
      }
    }),
  getPostsbyQueryInfinite: publicProcedure
    .input(
      z.object({
        cursor: z
          .object({
            createdAt: z.date(),
            id: z.string(),
          })
          .optional(),
        search: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const limit = 10;

        const cursor = input.cursor || null;

        const search = input.search;

        const { allPosts, nextCursor, hasNextPage } =
          await fetchPostsByQueryInfinite(cursor, limit, search);

        return {
          allPosts,
          nextCursor,
          hasNextPage,
        };
      } catch (error) {
        console.error("Error while fetching data:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error while fetching data",
          cause: error,
        });
      }
    }),
  getPostsByID: publicProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
      }),
    )
    .query(async ({ input }) => {
      const { postId } = input;
      try {
        const postData = await fetchPostsbyID(postId);
        return { postData };
      } catch (error) {
        console.error("Error while fetching data:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error while fetching data",
          cause: error,
        });
      }
    }),
  getPostsComments: publicProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
        type: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const postId = input.postId;
      const type = input.type;
      try {
        const commentsData = await fetchCommentsbyID(postId, type);
        return { commentsData };
      } catch (error) {
        console.log("Database Error:", error);
        throw new Error("Failed to fetch comments data");
      }
    }),
});
