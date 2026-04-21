import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const bookings = await ctx.db.query("bookings").collect();
    const articles = await ctx.db.query("legalupdates").collect();

    const pendingBookings = bookings.filter(
      (booking) => booking.status === "pending",
    );
    const confirmedBookings = bookings.filter(
      (booking) => booking.status === "confirmed",
    );
    const totalBookings = bookings.length;
    const totalArticles = articles.length;

    return {
      pendingBookings: pendingBookings.length,
      confirmedBookings: confirmedBookings.length,
      totalBookings,
      totalArticles,
    };
  },
});

export const getBookingStats = query({
  args: {},
  handler: async (ctx, args) => {
    const bookings = await ctx.db.query("bookings").collect();
    const now = Date.now();

    // 7 days ago
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

    // 14 days ago

    const fourteenDaysAgo = now - 14 * 24 * 60 * 60 * 1000;

    // Bookings in last seven days

    const thisWeekBookings = bookings.filter(
      (booking) => booking.createdAt >= sevenDaysAgo,
    ).length;

    // Bookings in last 14 days

    const lastTwoWeeksBookings = bookings.filter(
      (booking) =>
        booking.createdAt >= fourteenDaysAgo &&
        booking.createdAt < sevenDaysAgo,
    ).length;

    // difference

    const increase = thisWeekBookings - lastTwoWeeksBookings;
    // Calculate the change percentage

    // Percentage change
    const percentage =
      lastTwoWeeksBookings === 0 ? 0 : (increase / lastTwoWeeksBookings) * 100;

    return {
      thisWeekBookings: thisWeekBookings,
      lastTwoWeeksBookings: lastTwoWeeksBookings,
      increase: increase,
      percentage: percentage,
    };
  },
});

export const getLatestBookings = query({
  args: {},
  handler: async (ctx) => {
    const bookings = await ctx.db.query("bookings").order("desc").take(5);
    return bookings;
  },
});

export const getPopularArticles = query({
  args: {},
  handler: async (ctx) => {
    const articles = await ctx.db.query("legalupdates").order("desc").take(5);
    
    return await Promise.all(
      articles.map(async (article) => {
        const featuredImage =
          article.featuredImageId !== undefined
            ? await ctx.storage.getUrl(article.featuredImageId)
            : null;

        return {
          ...article,
          featuredImage,
        };
      })
    );
  },
});

export const incrementViews = mutation({
  args: {
    id: v.id("legalupdates"),
  },

  handler: async (ctx, args) => {
    const legalUpdate = await ctx.db.get(args.id);

    if (!legalUpdate) {
      throw new Error("Article not found");
    }

    await ctx.db.patch(args.id, {
      views: (legalUpdate.views || 0) + 1,
    });
  },
});

export const getArticleStats = query({
  args: {},
  handler: async (ctx, args) => {
    const articles = await ctx.db.query("legalupdates").collect();
    const now = Date.now();

    // 7 days ago
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

    // 14 days ago

    const fourteenDaysAgo = now - 14 * 24 * 60 * 60 * 1000;

    // Articles in last seven days

    const thisWeekArticles = articles.filter(
      (article) => article.createdAt >= sevenDaysAgo,
    ).length;

    // Articles in last 14 days

    const lastTwoWeeksArticles = articles.filter(
      (article) =>
        article.createdAt >= fourteenDaysAgo &&
        article.createdAt < sevenDaysAgo,
    ).length;

    // difference

    const increase = thisWeekArticles - lastTwoWeeksArticles;
    // Calculate the change percentage

    // Percentage change
    const percentage =
      lastTwoWeeksArticles === 0 ? 0 : (increase / lastTwoWeeksArticles) * 100;

    return {
      thisWeekArticles: thisWeekArticles,
      lastTwoWeeksArticles: lastTwoWeeksArticles,
      increase: increase,
      percentage: percentage,
    };
  },
});
