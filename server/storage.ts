import { 
  users, type User, type InsertUser,
  forumCategories, type ForumCategory, type InsertForumCategory,
  threads, type Thread, type InsertThread,
  replies, type Reply, type InsertReply,
  productCategories, type ProductCategory, type InsertProductCategory,
  products, type Product, type InsertProduct,
  articleCategories, type ArticleCategory, type InsertArticleCategory,
  articles, type Article, type InsertArticle,
  videos, type Video, type InsertVideo,
  resources, type Resource, type InsertResource,
  cartItems, type CartItem, type InsertCartItem
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Forum operations
  getAllForumCategories(): Promise<ForumCategory[]>;
  getForumCategory(id: number): Promise<ForumCategory | undefined>;
  getForumCategoryBySlug(slug: string): Promise<ForumCategory | undefined>;
  createForumCategory(category: InsertForumCategory): Promise<ForumCategory>;
  
  getAllThreads(): Promise<Thread[]>;
  getThreadsByCategory(categoryId: number): Promise<Thread[]>;
  getThread(id: number): Promise<Thread | undefined>;
  createThread(thread: InsertThread): Promise<Thread>;
  
  getRepliesByThread(threadId: number): Promise<Reply[]>;
  createReply(reply: InsertReply): Promise<Reply>;
  likeReply(replyId: number): Promise<Reply>;
  
  // Shop operations
  getAllProductCategories(): Promise<ProductCategory[]>;
  getProductCategory(id: number): Promise<ProductCategory | undefined>;
  getProductCategoryBySlug(slug: string): Promise<ProductCategory | undefined>;
  createProductCategory(category: InsertProductCategory): Promise<ProductCategory>;
  
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Content operations
  getAllArticleCategories(): Promise<ArticleCategory[]>;
  getArticleCategoryBySlug(slug: string): Promise<ArticleCategory | undefined>;
  createArticleCategory(category: InsertArticleCategory): Promise<ArticleCategory>;
  
  getAllArticles(): Promise<Article[]>;
  getArticlesByCategory(categoryId: number): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  
  getAllVideos(): Promise<Video[]>;
  getVideo(id: number): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
  
  getAllResources(): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  
  // Cart operations
  getCartItems(userId: number): Promise<CartItem[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(userId: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private usersDb: Map<number, User>;
  private forumCategoriesDb: Map<number, ForumCategory>;
  private threadsDb: Map<number, Thread>;
  private repliesDb: Map<number, Reply>;
  private productCategoriesDb: Map<number, ProductCategory>;
  private productsDb: Map<number, Product>;
  private articleCategoriesDb: Map<number, ArticleCategory>;
  private articlesDb: Map<number, Article>;
  private videosDb: Map<number, Video>;
  private resourcesDb: Map<number, Resource>;
  private cartItemsDb: Map<number, CartItem>;
  
  private userIdCounter: number = 1;
  private forumCategoryIdCounter: number = 1;
  private threadIdCounter: number = 1;
  private replyIdCounter: number = 1;
  private productCategoryIdCounter: number = 1;
  private productIdCounter: number = 1;
  private articleCategoryIdCounter: number = 1;
  private articleIdCounter: number = 1;
  private videoIdCounter: number = 1;
  private resourceIdCounter: number = 1;
  private cartItemIdCounter: number = 1;
  
  constructor() {
    this.usersDb = new Map();
    this.forumCategoriesDb = new Map();
    this.threadsDb = new Map();
    this.repliesDb = new Map();
    this.productCategoriesDb = new Map();
    this.productsDb = new Map();
    this.articleCategoriesDb = new Map();
    this.articlesDb = new Map();
    this.videosDb = new Map();
    this.resourcesDb = new Map();
    this.cartItemsDb = new Map();
    
    // Initialize with some default data
    this.seedData();
  }
  
  private seedData() {
    // Create a default admin user
    this.createUser({
      username: "admin",
      password: "admin123", // In a real app, this would be hashed
      email: "admin@autodetailingnation.com",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      bio: "Administrator of Auto Detailing Nation",
      badge: "Admin",
      badgeColor: "red-500",
      isAdmin: true
    });
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.usersDb.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersDb.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.usersDb.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }
  
  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = {
      id,
      ...userData,
      joinedAt: now,
      postCount: 0,
      level: 1,
      isAdmin: userData.isAdmin ?? false
    };
    this.usersDb.set(id, user);
    return user;
  }
  
  // Forum operations
  async getAllForumCategories(): Promise<ForumCategory[]> {
    return Array.from(this.forumCategoriesDb.values());
  }
  
  async getForumCategory(id: number): Promise<ForumCategory | undefined> {
    return this.forumCategoriesDb.get(id);
  }
  
  async getForumCategoryBySlug(slug: string): Promise<ForumCategory | undefined> {
    return Array.from(this.forumCategoriesDb.values()).find(
      (category) => category.slug === slug
    );
  }
  
  async createForumCategory(category: InsertForumCategory): Promise<ForumCategory> {
    const id = this.forumCategoryIdCounter++;
    const newCategory: ForumCategory = { id, ...category };
    this.forumCategoriesDb.set(id, newCategory);
    return newCategory;
  }
  
  async getAllThreads(): Promise<Thread[]> {
    return Array.from(this.threadsDb.values());
  }
  
  async getThreadsByCategory(categoryId: number): Promise<Thread[]> {
    return Array.from(this.threadsDb.values()).filter(
      (thread) => thread.categoryId === categoryId
    );
  }
  
  async getThread(id: number): Promise<Thread | undefined> {
    return this.threadsDb.get(id);
  }
  
  async createThread(threadData: InsertThread): Promise<Thread> {
    const id = this.threadIdCounter++;
    const now = new Date();
    const thread: Thread = {
      id,
      ...threadData,
      createdAt: now,
      isHot: false,
      viewCount: 0
    };
    this.threadsDb.set(id, thread);
    return thread;
  }
  
  async getRepliesByThread(threadId: number): Promise<Reply[]> {
    return Array.from(this.repliesDb.values()).filter(
      (reply) => reply.threadId === threadId
    );
  }
  
  async createReply(replyData: InsertReply): Promise<Reply> {
    const id = this.replyIdCounter++;
    const now = new Date();
    const reply: Reply = {
      id,
      ...replyData,
      createdAt: now,
      likes: 0
    };
    this.repliesDb.set(id, reply);
    return reply;
  }
  
  async likeReply(replyId: number): Promise<Reply> {
    const reply = this.repliesDb.get(replyId);
    if (!reply) {
      throw new Error("Reply not found");
    }
    const updatedReply = { ...reply, likes: reply.likes + 1 };
    this.repliesDb.set(replyId, updatedReply);
    return updatedReply;
  }
  
  // Shop operations
  async getAllProductCategories(): Promise<ProductCategory[]> {
    return Array.from(this.productCategoriesDb.values());
  }
  
  async getProductCategory(id: number): Promise<ProductCategory | undefined> {
    return this.productCategoriesDb.get(id);
  }
  
  async getProductCategoryBySlug(slug: string): Promise<ProductCategory | undefined> {
    return Array.from(this.productCategoriesDb.values()).find(
      (category) => category.slug === slug
    );
  }
  
  async createProductCategory(category: InsertProductCategory): Promise<ProductCategory> {
    const id = this.productCategoryIdCounter++;
    const newCategory: ProductCategory = { id, ...category };
    this.productCategoriesDb.set(id, newCategory);
    return newCategory;
  }
  
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.productsDb.values());
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.productsDb.values()).filter(
      (product) => product.categoryId === categoryId
    );
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.productsDb.get(id);
  }
  
  async createProduct(productData: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const product: Product = {
      id,
      ...productData,
      rating: 0,
      reviewCount: 0
    };
    this.productsDb.set(id, product);
    return product;
  }
  
  // Content operations
  async getAllArticleCategories(): Promise<ArticleCategory[]> {
    return Array.from(this.articleCategoriesDb.values());
  }
  
  async getArticleCategoryBySlug(slug: string): Promise<ArticleCategory | undefined> {
    return Array.from(this.articleCategoriesDb.values()).find(
      (category) => category.slug === slug
    );
  }
  
  async createArticleCategory(category: InsertArticleCategory): Promise<ArticleCategory> {
    const id = this.articleCategoryIdCounter++;
    const newCategory: ArticleCategory = { id, ...category };
    this.articleCategoriesDb.set(id, newCategory);
    return newCategory;
  }
  
  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articlesDb.values());
  }
  
  async getArticlesByCategory(categoryId: number): Promise<Article[]> {
    return Array.from(this.articlesDb.values()).filter(
      (article) => article.categoryId === categoryId
    );
  }
  
  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articlesDb.values()).find(
      (article) => article.slug === slug
    );
  }
  
  async createArticle(articleData: InsertArticle): Promise<Article> {
    const id = this.articleIdCounter++;
    const now = new Date();
    const article: Article = {
      id,
      ...articleData,
      publishedAt: now
    };
    this.articlesDb.set(id, article);
    return article;
  }
  
  async getAllVideos(): Promise<Video[]> {
    return Array.from(this.videosDb.values());
  }
  
  async getVideo(id: number): Promise<Video | undefined> {
    return this.videosDb.get(id);
  }
  
  async createVideo(videoData: InsertVideo): Promise<Video> {
    const id = this.videoIdCounter++;
    const now = new Date();
    const video: Video = {
      id,
      ...videoData,
      views: 0,
      publishedAt: now
    };
    this.videosDb.set(id, video);
    return video;
  }
  
  async getAllResources(): Promise<Resource[]> {
    return Array.from(this.resourcesDb.values());
  }
  
  async getResource(id: number): Promise<Resource | undefined> {
    return this.resourcesDb.get(id);
  }
  
  async createResource(resourceData: InsertResource): Promise<Resource> {
    const id = this.resourceIdCounter++;
    const now = new Date();
    const resource: Resource = {
      id,
      ...resourceData,
      downloads: 0,
      publishedAt: now
    };
    this.resourcesDb.set(id, resource);
    return resource;
  }
  
  // Cart operations
  async getCartItems(userId: number): Promise<CartItem[]> {
    return Array.from(this.cartItemsDb.values()).filter(
      (item) => item.userId === userId
    );
  }
  
  async addToCart(cartItemData: InsertCartItem): Promise<CartItem> {
    // Check if product is already in cart
    const existingItem = Array.from(this.cartItemsDb.values()).find(
      (item) => item.userId === cartItemData.userId && item.productId === cartItemData.productId
    );
    
    if (existingItem) {
      // Update quantity instead of adding new item
      return this.updateCartItemQuantity(existingItem.id, existingItem.quantity + cartItemData.quantity);
    }
    
    const id = this.cartItemIdCounter++;
    const now = new Date();
    const cartItem: CartItem = {
      id,
      ...cartItemData,
      addedAt: now
    };
    this.cartItemsDb.set(id, cartItem);
    return cartItem;
  }
  
  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItemsDb.get(id);
    if (!cartItem) {
      return undefined;
    }
    
    const updatedItem = { ...cartItem, quantity };
    this.cartItemsDb.set(id, updatedItem);
    return updatedItem;
  }
  
  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItemsDb.delete(id);
  }
  
  async clearCart(userId: number): Promise<boolean> {
    const userCartItems = Array.from(this.cartItemsDb.values()).filter(
      (item) => item.userId === userId
    );
    
    for (const item of userCartItems) {
      this.cartItemsDb.delete(item.id);
    }
    
    return true;
  }
}

export const storage = new MemStorage();
