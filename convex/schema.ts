import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  podcasts: defineTable({
    audioStorageId: v.optional(v.id("_storage")),
    imageStorageId: v.optional(v.id("_storage")),
    user: v.id("users"),
    author: v.string(),
    authorId: v.string(),
    authorImageURL: v.string(),
    podcastTitle: v.string(),
    podcastDescription: v.string(),
    podcastImageURL: v.optional(v.string()),
    podcastAudioURL: v.optional(v.string()),
    voicePrompt: v.string(),
    imagePrompt: v.string(),
    voiceType: v.string(),
    audioDuration: v.number(),
    views: v.number(),
  })
    .searchIndex("searchAuthor", { searchField: "author" })
    .searchIndex("searchTitle", { searchField: "podcastTitle" })
    .searchIndex("searchDescription", { searchField: "podcastDescription" }),
  users: defineTable({
    email: v.string(),
    imageURL: v.string(),
    clerkId: v.string(),
    name: v.string(),
  }),
});
