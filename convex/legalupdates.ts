/**
 * ---------- LEGAL UPDATES (ARTICLES) DATABASE LOGIC ----------
 * This file handles all backend CRUD operations (Create, Read, Update, Delete) for Legal Articles.
 *
 * - `createLegalUpdate`: Inserts a brand new article into the database structure.
 * - `generatedLegalUpdateImageUrl`: Grabs a secure URL from Convex for uploading new article thumbnail files.
 * - `getLegalUpdate`: Collects all articles from the database. Critically, it dynamically maps raw storage IDs back into live viewing internet URLs!
 * - `editLegalUpdateAction`: Updates an existing article. It intelligently refuses to erase old images unless a new one was sent.
 * - `deleteArticle`: Completely deletes a targeted article out of the database via its specific ID.
 */
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";

export const createLegalUpdate = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    publishedAt: v.string(),
    readTime: v.string(),
    featuredImageId: v.optional(v.id("_storage")),
    author: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    // STEP 1: Verify the author context securely.
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    // STEP 2: Mutate database directly by injecting the verified argument data + timestamps.
    const legalUpdate = await ctx.db.insert("legalupdates", {
      ...args,
      author: user.name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      featuredImageId: args.featuredImageId,
      views: 0,
    });

    // STEP 3: Return confirmation mapping for the frontend request logic.
    return {
      success: true,
      legalUpdate: {
        id: legalUpdate,
        ...args,
        author: user.name,
      },
    };
  },
});

export const generatedLegalUpdateImageUrl = mutation({
  args: {},

  handler: async (ctx) => {
    // STEP 1: Natively generate temporary file allocation URLs into our local storage pool.
    return await ctx.storage.generateUploadUrl();
  },
});

export const getLegalUpdate = query({
  handler: async (ctx) => {
    // STEP 1: Unpack all database arrays mapping entirely to 'legalupdates'.
    const legalUpdate = await ctx.db.query("legalupdates").collect();

    // STEP 2: Asynchronously build a payload list that interprets private ID references into public viewing domains.
    return await Promise.all(
      legalUpdate.map(async (article) => {
        // STEP 3: Attempt conversion natively.
        const featuredImage =
          article.featuredImageId !== undefined
            ? await ctx.storage.getUrl(article.featuredImageId)
            : null;

        // STEP 4: Deliver complete package combining text schema constraints + public images logic.
        return {
          ...article,
          featuredImage,
        };
      }),
    );
  },
});

export const editLegalUpdateAction = mutation({
  args: {
    id: v.id("legalupdates"),
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    publishedAt: v.string(),
    readTime: v.string(),
    featuredImageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    // STEP 1: Only execute modification if caller proves credentials exist contextually.
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    // STEP 2: Safely perform the selective Patch operation updating exactly only provided rows.
    await ctx.db.patch(args.id, {
      title: args.title,
      slug: args.slug,
      description: args.description,
      publishedAt: args.publishedAt,
      readTime: args.readTime,
      updatedAt: Date.now(),
      // STEP 3: Smartly append the 'featuredImageId' only if explicitly verified to have updated inside memory.
      ...(args.featuredImageId !== undefined && {
        featuredImageId: args.featuredImageId,
      }),
    });

    // STEP 4: Guarantee that UI resolves properly.
    return {
      success: true,
    };
  },
});

export const deleteArticle = mutation({
  args: {
    id: v.id("legalupdates"),
  },
  handler: async (ctx, args) => {
    // STEP 1: Disallow rogue actors from triggering cascading database deletes via contextual user checking.
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    // STEP 2: Command the table specifically passing target document ID explicitly.
    await ctx.db.delete(args.id);

    // STEP 3: Surface operation execution truth securely.
    return {
      success: true,
    };
  },
});

export const getLegalUpdatesBySlug = query({
  args: {
    articleId: v.id("legalupdates"),
  },
  handler: async (ctx, args) => {
    const article = await ctx.db.get(args.articleId);
    if (!article) return null;

    const featuredImage =
      article.featuredImageId !== undefined
        ? await ctx.storage.getUrl(article.featuredImageId)
        : null;

    return {
      ...article,
      featuredImage,
    };
  },
});

export const patchArticleAuthor = mutation({
  args: {
    id: v.id("legalupdates"),
    author: v.string(),
  },
  handler: async (ctx, args) => {
    // STEP 1: Confirm the article exists before patching.
    const article = await ctx.db.get(args.id);
    if (!article) {
      throw new Error("Article not found");
    }

    // STEP 2: Patch only the author field + update timestamp.
    await ctx.db.patch(args.id, {
      author: args.author,
      updatedAt: Date.now(),
    });

    return {
      success: true,
      message: `Author updated to "${args.author}"`,
    };
  },
});
