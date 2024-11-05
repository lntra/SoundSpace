import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { z } from "zod";
import {
  fetchAllNewsArticles,
  fetchAllNewsDefault,
  fetchAllNewsNews,
  fetchAllNewsRecent,
  fetchAllNewsTrending,
  fetchNewsbyID,
  fetchNewsByQueryInfinite,
} from "~/lib/data";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";

export const homeRouter = createTRPCRouter({
  getNewsDefault: publicProcedure.query(async ({ input }) => {
    try {
      const newsArticles = await fetchAllNewsDefault();
      return { newsArticles };
    } catch (error) {
      throw new TRPCClientError("Error while fetching data");
    }
  }),
  getNewsbyTrending: publicProcedure
    .input(
      z.object({
        cursor: z
          .object({
            clicks: z.number(),
            id: z.string(),
          })
          .optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const limit = 6;

        const cursor = input.cursor || null;

        const { allNews, nextCursor, hasNextPage } = await fetchAllNewsTrending(
          cursor,
          limit,
        );

        return {
          allNews,
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
  getNewsbyRecent: publicProcedure
    .input(
      z.object({
        cursor: z
          .object({
            createdAt: z.date(),
            id: z.string(),
          })
          .optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const limit = 6;

        const cursor = input.cursor || null;

        const { allNews, nextCursor, hasNextPage } = await fetchAllNewsRecent(
          cursor,
          limit,
        );

        return {
          allNews,
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
  getNewsbyArticles: publicProcedure
    .input(
      z.object({
        cursor: z
          .object({
            createdAt: z.date(),
            id: z.string(),
          })
          .optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const limit = 6;

        const cursor = input.cursor || null;

        const { allNews, nextCursor, hasNextPage } = await fetchAllNewsArticles(
          cursor,
          limit,
        );

        return {
          allNews,
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
  getNewsbyNews: publicProcedure
    .input(
      z.object({
        cursor: z
          .object({
            createdAt: z.date(),
            id: z.string(),
          })
          .optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const limit = 6;

        const cursor = input.cursor || null;

        const { allNews, nextCursor, hasNextPage } = await fetchAllNewsNews(
          cursor,
          limit,
        );

        return {
          allNews,
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
  getNewsByID: publicProcedure
    .input(z.object({ newsId: z.string().uuid() }))
    .query(async ({ input }) => {
      const { newsId } = input;
      try {
        const newsPage = await fetchNewsbyID(newsId);
        if (!newsPage) {
          throw new TRPCClientError("Not found");
        }
        return { newsPage };
      } catch (error) {
        throw new TRPCClientError("Error while fetching single News");
      }
    }),
  getAllNewsbyQuery: publicProcedure
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
        const limit = 5;

        const cursor = input.cursor || null;

        const search = input.search;

        const { allNews, nextCursor, hasNextPage } =
          await fetchNewsByQueryInfinite(cursor, limit, search);

        return {
          allNews,
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
});
