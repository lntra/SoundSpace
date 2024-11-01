import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { z } from "zod";
import {
  fetchAllCommunities,
  fetchCommunitiesByQueryInfinite,
  fetchCommunitybyID,
} from "~/lib/data";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";

export const communityRouter = createTRPCRouter({
  getCommunityByID: publicProcedure
    .input(z.object({ communityId: z.string().uuid() }))
    .query(async ({ input }) => {
      const { communityId } = input;
      try {
        const communityPage = await fetchCommunitybyID(communityId);
        if (!communityPage) {
          throw new TRPCClientError("Not found");
        }
        return { communityPage };
      } catch (error) {
        throw new TRPCClientError("Error while fetching single News");
      }
    }),
  getAllCommunity: publicProcedure
    .input(
      z.object({
        current: z.number(),
        tag: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const current = input.current;

        const tag = input.tag;

        const allCommunities = await fetchAllCommunities(current, tag);

        return { allCommunities };
      } catch (error) {
        throw new TRPCClientError("Error returning News");
      }
    }),
  getAllCommunitybyQuery: publicProcedure
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

        const { allCommunities, nextCursor, hasNextPage } =
          await fetchCommunitiesByQueryInfinite(cursor, limit, search);

        return {
          allCommunities,
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
