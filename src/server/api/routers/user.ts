import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { z } from "zod";
import {
  createUserAccount,
  fetchAllUserComments,
  fetchAllUserCommunities,
  fetchAllUserFollowed,
  fetchAllUserFollowedCount,
  fetchAllUserFollowing,
  fetchAllUserFollowingCount,
  fetchAllUserLikedPosts,
  fetchAllUserPosts,
  fetchAllUserSaved,
  fetchUserAccount,
  fetchUserAccountById,
} from "~/lib/data";
import { TRPCError } from "@trpc/server";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cookies = require("js-cookie");
import { userSessionData } from "~/app/utils/userSessionData";

export const userRouter = createTRPCRouter({
  getUserFollowed: publicProcedure
    .input(
      z.object({
        cursor: z
          .object({
            id: z.string(),
          })
          .optional(),
        userId: z.string().uuid(),
      }),
    )
    .query(async ({ input }) => {
      const limit = 10;

      const cursor = input.cursor || null;

      const userId = input.userId;

      const { allPosts, nextCursor, hasNextPage } = await fetchAllUserFollowed(
        cursor,
        limit,
        userId,
      );

      return {
        allPosts,
        nextCursor,
        hasNextPage,
      };
    }),
  getUserFollowing: publicProcedure
    .input(
      z.object({
        cursor: z
          .object({
            id: z.string(),
          })
          .optional(),
        userId: z.string().uuid(),
      }),
    )
    .query(async ({ input }) => {
      const limit = 10;

      const cursor = input.cursor || null;

      const userId = input.userId;

      const { allPosts, nextCursor, hasNextPage } = await fetchAllUserFollowing(
        cursor,
        limit,
        userId,
      );

      return {
        allPosts,
        nextCursor,
        hasNextPage,
      };
    }),
  getUserFollowingCommunities: publicProcedure
    .input(
      z.object({
        cursor: z
          .object({
            id: z.string(),
          })
          .optional(),
        userId: z.string().uuid(),
      }),
    )
    .query(async ({ input }) => {
      const limit = 10;

      const cursor = input.cursor || null;

      const userId = input.userId;

      const { allCommunities, nextCursor, hasNextPage } =
        await fetchAllUserCommunities(cursor, limit, userId);

      return {
        allCommunities,
        nextCursor,
        hasNextPage,
      };
    }),
  getUserFollowedCount: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const id = input.id;

      const data = await fetchAllUserFollowedCount(id);
      const count = data !== null ? data : null;

      return {
        count,
      };
    }),
  getUserFollowingCount: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const id = input.id;

      const data = await fetchAllUserFollowingCount(id);
      const count = data !== null ? data : null;

      return {
        count,
      };
    }),
  getUserSaved: publicProcedure
    .input(
      z.object({
        cursor: z
          .object({
            createdAt: z.date(),
            id: z.string(),
          })
          .optional(),
        userId: z.string().uuid(),
      }),
    )
    .query(async ({ input }) => {
      const limit = 10;

      const cursor = input.cursor || null;

      const userId = input.userId;

      const { allPosts, nextCursor, hasNextPage } = await fetchAllUserSaved(
        cursor,
        limit,
        userId,
      );

      return {
        allPosts,
        nextCursor,
        hasNextPage,
      };
    }),
  getUserPosts: publicProcedure
    .input(
      z.object({
        cursor: z
          .object({
            createdAt: z.date(),
            id: z.string(),
          })
          .optional(),
        userId: z.string().uuid(),
      }),
    )
    .query(async ({ input }) => {
      const limit = 10;

      const cursor = input.cursor || null;

      const userId = input.userId;

      const { allPosts, nextCursor, hasNextPage } = await fetchAllUserPosts(
        cursor,
        limit,
        userId,
      );

      return {
        allPosts,
        nextCursor,
        hasNextPage,
      };
    }),
  getUserComments: publicProcedure
    .input(
      z.object({
        cursor: z
          .object({
            createdAt: z.date(),
            id: z.string(),
          })
          .optional(),
        userId: z.string().uuid(),
      }),
    )
    .query(async ({ input }) => {
      const limit = 10;

      const cursor = input.cursor || null;

      const userId = input.userId;

      const { allPosts, nextCursor, hasNextPage } = await fetchAllUserComments(
        cursor,
        limit,
        userId,
      );

      return {
        allPosts,
        nextCursor,
        hasNextPage,
      };
    }),
  getUserLikes: publicProcedure
    .input(
      z.object({
        cursor: z
          .object({
            createdAt: z.date(),
            id: z.string(),
          })
          .optional(),
        userId: z.string().uuid(),
      }),
    )
    .query(async ({ input }) => {
      const limit = 10;

      const cursor = input.cursor || null;

      const userId = input.userId;

      const { allPosts, nextCursor, hasNextPage } =
        await fetchAllUserLikedPosts(cursor, limit, userId);

      return {
        allPosts,
        nextCursor,
        hasNextPage,
      };
    }),
  getUser: publicProcedure
    .input(z.object({ token: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      const { token } = input;

      if (!token) {
        return null;
      }

      const user = await userSessionData(token);

      if (!user) {
        throw new Error("Invalid or expired token");
      }

      return {
        user,
      };
    }),
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const email = input.email.toLowerCase();
      const password = input.password;

      console.log("Login method called with:", { email, password });

      try {
        const data = await fetchUserAccount(email);
        const user = data !== null ? data[0] : null;

        if (!user) {
          console.log("No user found");
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "NO USER FOUND",
          });
        }

        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
          console.log("Password does not match");
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "WRONG CREDENTIALS",
          });
        }

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
          throw new Error("JWT_SECRET environment variable is not set");
        }

        const token = jwt.sign(
          {
            userId: user.id,
            email: user.email,
            name: user.name,
            url_icon: user.url_icon,
            url_banner: user.url_banner,
            description: user.description,
          },
          jwtSecret,
          { expiresIn: "1h" },
        );

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          url_icon: user.url_icon,
          url_banner: user.url_banner,
          description: user.description,
          token,
        };
      } catch (error) {
        console.error("Error during login:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: error });
      }
    }),
  edit: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        name: z.string(),
        email: z.string().email(),
        url_icon: z.string().optional(),
        url_banner: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, name, email, url_icon, url_banner, description } = input;

      console.log("Edit method called with:", {
        url_icon,
        url_banner,
        description,
      });

      try {
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
          throw new Error("JWT_SECRET environment variable is not set");
        }

        const token = jwt.sign(
          {
            userId: input.id,
            email: input.email,
            name: input.name,
            url_icon: input.url_icon,
            url_banner: input.url_banner,
            description: input.description,
          },
          jwtSecret,
          { expiresIn: "1h" },
        );

        return {
          token,
        };
      } catch (error) {
        console.error("Error during updating cookie:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: error });
      }
    }),
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(3).max(50),
        name: z.string().min(1).max(25),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password, name } = input;

      console.log("Register method called with:", { email, password, name });

      try {
        const existingUser = await fetchUserAccount(email);
        const existingUserName = await fetchUserAccount(email, name);

        if (existingUser && existingUser.length > 0) {
          console.log("User already exists");
          throw new TRPCError({
            code: "CONFLICT",
            message: "USER MAIL ALREADY EXISTS",
          });
        }

        if (existingUserName && existingUserName.length > 0) {
          console.log("Username already exists");
          throw new TRPCError({
            code: "CONFLICT",
            message: "USERNAME ALREADY EXISTS",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUserAccount(email, hashedPassword, name);

        console.log("User registered successfully:", newUser);

        if (!newUser) {
          throw new Error("Criação de usuário falhou");
        }

        return {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          image: newUser.url_icon,
          image_banner: newUser.url_banner,
        };
      } catch (error) {
        console.error("Error during registration:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: error });
      }
    }),
  getOtherUsers: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const id = input.id;

      const data = await fetchUserAccountById(id);
      const user = data !== null ? data[0] : null;

      return {
        user,
      };
    }),
});
