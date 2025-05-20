import { pgTable, text, serial, integer, boolean, timestamp, json, foreignKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  avatar: text("avatar").default("https://images.unsplash.com/photo-1513721032312-6a18a42c8763?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"),
  bio: text("bio").default(""),
  badge: text("badge").default("Member"),
  badgeColor: text("badge_color").default("gray-500"),
  joinedAt: timestamp("joined_at").defaultNow(),
  postCount: integer("post_count").default(0),
  level: integer("level").default(1),
  isAdmin: boolean("is_admin").default(false),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, postCount: true, level: true, isAdmin: true, joinedAt: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Categories for the forum
export const forumCategories = pgTable("forum_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull(),
  colorClass: text("color_class").notNull(),
});

export const insertForumCategorySchema = createInsertSchema(forumCategories).omit({ id: true });
export type InsertForumCategory = z.infer<typeof insertForumCategorySchema>;
export type ForumCategory = typeof forumCategories.$inferSelect;

// Threads in the forum
export const threads = pgTable("threads", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: integer("author_id").notNull().references(() => users.id),
  categoryId: integer("category_id").notNull().references(() => forumCategories.id),
  createdAt: timestamp("created_at").defaultNow(),
  isHot: boolean("is_hot").default(false),
  viewCount: integer("view_count").default(0),
});

export const insertThreadSchema = createInsertSchema(threads).omit({ id: true, createdAt: true, isHot: true, viewCount: true });
export type InsertThread = z.infer<typeof insertThreadSchema>;
export type Thread = typeof threads.$inferSelect;

// Replies to threads
export const replies = pgTable("replies", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  authorId: integer("author_id").notNull().references(() => users.id),
  threadId: integer("thread_id").notNull().references(() => threads.id),
  createdAt: timestamp("created_at").defaultNow(),
  likes: integer("likes").default(0),
});

export const insertReplySchema = createInsertSchema(replies).omit({ id: true, createdAt: true, likes: true });
export type InsertReply = z.infer<typeof insertReplySchema>;
export type Reply = typeof replies.$inferSelect;

// Product categories
export const productCategories = pgTable("product_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  image: text("image").notNull(),
});

export const insertProductCategorySchema = createInsertSchema(productCategories).omit({ id: true });
export type InsertProductCategory = z.infer<typeof insertProductCategorySchema>;
export type ProductCategory = typeof productCategories.$inferSelect;

// Products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  price: integer("price").notNull(), // Stored in cents
  originalPrice: integer("original_price").notNull(), // Stored in cents
  discountPrice: integer("discount_price").notNull(), // Stored in cents
  rating: integer("rating").default(0), // Stored as rating * 10 (e.g., 4.5 -> 45)
  reviewCount: integer("review_count").default(0),
  inStock: boolean("in_stock").default(true),
  badge: json("badge").default(null), // { text: string, color: string } or null
  categoryId: integer("category_id").notNull().references(() => productCategories.id),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true, rating: true, reviewCount: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Articles
export const articleCategories = pgTable("article_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const insertArticleCategorySchema = createInsertSchema(articleCategories).omit({ id: true });
export type InsertArticleCategory = z.infer<typeof insertArticleCategorySchema>;
export type ArticleCategory = typeof articleCategories.$inferSelect;

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  authorId: integer("author_id").notNull().references(() => users.id),
  categoryId: integer("category_id").notNull().references(() => articleCategories.id),
  publishedAt: timestamp("published_at").defaultNow(),
  readTime: text("read_time").default("5 min read"),
});

export const insertArticleSchema = createInsertSchema(articles).omit({ id: true, publishedAt: true });
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;

// Videos
export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  thumbnail: text("thumbnail").notNull(),
  url: text("url").notNull(),
  duration: text("duration").notNull(),
  views: integer("views").default(0),
  creatorId: integer("creator_id").notNull().references(() => users.id),
  publishedAt: timestamp("published_at").defaultNow(),
});

export const insertVideoSchema = createInsertSchema(videos).omit({ id: true, views: true, publishedAt: true });
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;

// Resources
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // pdf, excel, text
  downloadUrl: text("download_url").notNull(),
  creatorId: integer("creator_id").notNull().references(() => users.id),
  publishedAt: timestamp("published_at").defaultNow(),
  downloads: integer("downloads").default(0),
});

export const insertResourceSchema = createInsertSchema(resources).omit({ id: true, downloads: true, publishedAt: true });
export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resources.$inferSelect;

// Shopping cart
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  productId: integer("product_id").notNull().references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
  addedAt: timestamp("added_at").defaultNow(),
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true, addedAt: true });
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;
