import { postRouter } from "~/server/api/routers/post";
import { homeRouter } from "~/server/api/routers/home";
import { createTRPCRouter } from "~/server/api/trpc";
import { postsRouter } from "./routers/posts";
import { communityRouter } from "./routers/community";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  home: homeRouter,
  posts: postsRouter,
  community: communityRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
