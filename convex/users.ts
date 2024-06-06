import { internalMutation, query } from "@/convex/_generated/server";
import { v } from "convex/values";

export const createUser = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    imageURL: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      imageURL: args.imageURL,
      clerkId: args.clerkId,
    });
  },
});

export const updateUser = internalMutation({
  args: {
    email: v.string(),
    imageURL: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      imageURL: args.imageURL,
      email: args.email,
    });

    const podcast = await ctx.db
      .query("podcast")
      .filter((q) => q.eq(q.field("authorId"), args.clerkId))
      .collect();

    await Promise.all(
      podcast.map(async (p) => {
        await ctx.db.patch(p._id, {
          authorImageURL: args.imageURL,
        });
      }),
    );
  },
});

export const deleteUser = internalMutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }
    await ctx.db.delete(user._id);
  },
});

export const getUserById = internalMutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
});


// this query is used to get the top user by podcast count.
// first the podcast is sorted by views, and then the user is sorted by total podcasts,
// so the user with the most podcasts will be at the top.
export const getTopUserByPodcastCount = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.db.query("users").collect();

    const userData = await Promise.all(
      user.map(async (u) => {
        const podcasts = await ctx.db
          .query("podcast")
          .filter((q) => q.eq(q.field("authorId"), u.clerkId))
          .collect();

        const sortedPodcast = podcasts.sort((a, b) => b.views - a.views);

        return {
          ...u,
          totalPodcasts: podcasts.length,
          podcasts: sortedPodcast.map((p) => ({
            podcastTitle: p.podcastTitle,
            podcastId: p._id,
          })),
        };
      }),
    );
  },
});
