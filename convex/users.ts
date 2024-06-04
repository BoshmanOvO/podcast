import { internalMutation } from "@/convex/_generated/server";
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