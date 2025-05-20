import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserSchema, insertThreadSchema, insertReplySchema, insertCartItemSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // ===== User Routes =====
  
  // Register user
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username exists
      const existingByUsername = await storage.getUserByUsername(userData.username);
      if (existingByUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }
      
      // Check if email exists
      const existingByEmail = await storage.getUserByEmail(userData.email);
      if (existingByEmail) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      // Create user
      const user = await storage.createUser(userData);
      
      // Don't return password in response
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // In a real app, we'd use JWT or sessions
      // For simplicity, we'll just return user without password
      const { password: _, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get user by username
  app.get("/api/users/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // ===== Forum Routes =====
  
  // Get all forum categories
  app.get("/api/forum/categories", async (req, res) => {
    try {
      const categories = await storage.getAllForumCategories();
      
      // Add thread and reply counts to each category
      const categoriesWithCounts = await Promise.all(
        categories.map(async (category) => {
          const threads = await storage.getThreadsByCategory(category.id);
          
          // Count total replies for all threads in this category
          let replyCount = 0;
          for (const thread of threads) {
            const replies = await storage.getRepliesByThread(thread.id);
            replyCount += replies.length;
          }
          
          return {
            ...category,
            threadCount: threads.length,
            replyCount
          };
        })
      );
      
      res.json(categoriesWithCounts);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get all threads
  app.get("/api/forum/threads", async (req, res) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      
      let threads = categoryId
        ? await storage.getThreadsByCategory(categoryId)
        : await storage.getAllThreads();
      
      // Enrich threads with author and reply info
      const enrichedThreads = await Promise.all(
        threads.map(async (thread) => {
          const author = await storage.getUser(thread.authorId);
          const replies = await storage.getRepliesByThread(thread.id);
          
          // Get recent participants
          const recentParticipants = await Promise.all(
            [...new Set(replies.map(reply => reply.authorId))]
              .slice(0, 15) // Limit to 15 participants
              .map(async (authorId) => {
                const user = await storage.getUser(authorId);
                return {
                  username: user?.username || "Unknown",
                  avatar: user?.avatar || "",
                };
              })
          );
          
          // Get last reply time
          const lastReply = replies.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )[0];
          
          return {
            ...thread,
            author: author ? {
              id: author.id,
              username: author.username,
              avatar: author.avatar,
            } : {
              id: 0,
              username: "Unknown",
              avatar: "",
            },
            replyCount: replies.length,
            lastReplyTime: lastReply 
              ? formatTimeAgo(new Date(lastReply.createdAt)) 
              : "No replies yet",
            recentParticipants,
          };
        })
      );
      
      res.json(enrichedThreads);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get thread by id
  app.get("/api/forum/threads/:id", async (req, res) => {
    try {
      const threadId = parseInt(req.params.id);
      const thread = await storage.getThread(threadId);
      
      if (!thread) {
        return res.status(404).json({ message: "Thread not found" });
      }
      
      const author = await storage.getUser(thread.authorId);
      const replies = await storage.getRepliesByThread(threadId);
      
      const enrichedThread = {
        ...thread,
        author: author ? {
          id: author.id,
          username: author.username,
          avatar: author.avatar,
        } : {
          id: 0,
          username: "Unknown",
          avatar: "",
        },
        replyCount: replies.length,
      };
      
      res.json(enrichedThread);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Create thread
  app.post("/api/forum/threads", async (req, res) => {
    try {
      const threadData = insertThreadSchema.parse(req.body);
      const thread = await storage.createThread(threadData);
      res.status(201).json(thread);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid thread data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get replies for a thread
  app.get("/api/forum/threads/:id/replies", async (req, res) => {
    try {
      const threadId = parseInt(req.params.id);
      const replies = await storage.getRepliesByThread(threadId);
      
      // Enrich replies with author info
      const enrichedReplies = await Promise.all(
        replies.map(async (reply) => {
          const author = await storage.getUser(reply.authorId);
          
          return {
            ...reply,
            author: author ? {
              id: author.id,
              username: author.username,
              avatar: author.avatar,
            } : {
              id: 0,
              username: "Unknown",
              avatar: "",
            }
          };
        })
      );
      
      res.json(enrichedReplies);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Create reply
  app.post("/api/forum/threads/:id/replies", async (req, res) => {
    try {
      const threadId = parseInt(req.params.id);
      const thread = await storage.getThread(threadId);
      
      if (!thread) {
        return res.status(404).json({ message: "Thread not found" });
      }
      
      const replyData = insertReplySchema.parse({
        ...req.body,
        threadId
      });
      
      const reply = await storage.createReply(replyData);
      
      // Enrich reply with author info
      const author = await storage.getUser(reply.authorId);
      const enrichedReply = {
        ...reply,
        author: author ? {
          id: author.id,
          username: author.username,
          avatar: author.avatar,
        } : {
          id: 0,
          username: "Unknown",
          avatar: "",
        }
      };
      
      res.status(201).json(enrichedReply);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid reply data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Like a reply
  app.post("/api/forum/replies/:id/like", async (req, res) => {
    try {
      const replyId = parseInt(req.params.id);
      const reply = await storage.likeReply(replyId);
      res.json(reply);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // ===== Shop Routes =====
  
  // Get all product categories
  app.get("/api/shop/categories", async (req, res) => {
    try {
      const categories = await storage.getAllProductCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get all products
  app.get("/api/shop/products", async (req, res) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      
      const products = categoryId
        ? await storage.getProductsByCategory(categoryId)
        : await storage.getAllProducts();
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get product by id
  app.get("/api/shop/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const product = await storage.getProduct(productId);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // ===== Content Routes =====
  
  // Get all articles
  app.get("/api/learn/articles", async (req, res) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      
      const articles = categoryId
        ? await storage.getArticlesByCategory(categoryId)
        : await storage.getAllArticles();
      
      // Enrich articles with author info
      const enrichedArticles = await Promise.all(
        articles.map(async (article) => {
          const author = await storage.getUser(article.authorId);
          
          return {
            ...article,
            author: author ? {
              id: author.id,
              username: author.username,
              avatar: author.avatar,
            } : {
              id: 0,
              username: "Unknown",
              avatar: "",
            },
            date: formatDate(new Date(article.publishedAt)),
          };
        })
      );
      
      res.json(enrichedArticles);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get article by slug
  app.get("/api/learn/articles/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const article = await storage.getArticleBySlug(slug);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      const author = await storage.getUser(article.authorId);
      
      const enrichedArticle = {
        ...article,
        author: author ? {
          id: author.id,
          username: author.username,
          avatar: author.avatar,
        } : {
          id: 0,
          username: "Unknown",
          avatar: "",
        },
        date: formatDate(new Date(article.publishedAt)),
      };
      
      res.json(enrichedArticle);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get all videos
  app.get("/api/learn/videos", async (req, res) => {
    try {
      const videos = await storage.getAllVideos();
      
      // Enrich videos with creator info
      const enrichedVideos = await Promise.all(
        videos.map(async (video) => {
          const creator = await storage.getUser(video.creatorId);
          
          return {
            ...video,
            creator: creator ? {
              id: creator.id,
              username: creator.username,
              avatar: creator.avatar,
            } : {
              id: 0,
              username: "Unknown",
              avatar: "",
            }
          };
        })
      );
      
      res.json(enrichedVideos);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get video by id
  app.get("/api/learn/videos/:id", async (req, res) => {
    try {
      const videoId = parseInt(req.params.id);
      const video = await storage.getVideo(videoId);
      
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      const creator = await storage.getUser(video.creatorId);
      
      const enrichedVideo = {
        ...video,
        creator: creator ? {
          id: creator.id,
          username: creator.username,
          avatar: creator.avatar,
        } : {
          id: 0,
          username: "Unknown",
          avatar: "",
        }
      };
      
      res.json(enrichedVideo);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get all resources
  app.get("/api/learn/resources", async (req, res) => {
    try {
      const resources = await storage.getAllResources();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // ===== Cart Routes =====
  
  // Get user's cart
  app.get("/api/cart", async (req, res) => {
    try {
      const userId = parseInt(req.query.userId as string);
      
      if (!userId) {
        return res.status(400).json({ message: "User ID required" });
      }
      
      const cartItems = await storage.getCartItems(userId);
      
      // Enrich cart items with product data
      const enrichedCartItems = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          
          return {
            ...item,
            product: product || null
          };
        })
      );
      
      res.json(enrichedCartItems);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Add to cart
  app.post("/api/cart", async (req, res) => {
    try {
      const cartItemData = insertCartItemSchema.parse(req.body);
      
      // Check if product exists
      const product = await storage.getProduct(cartItemData.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      const cartItem = await storage.addToCart(cartItemData);
      
      // Enrich cart item with product data
      const enrichedCartItem = {
        ...cartItem,
        product
      };
      
      res.status(201).json(enrichedCartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Update cart item quantity
  app.patch("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      
      if (typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      
      const updatedItem = await storage.updateCartItemQuantity(id, quantity);
      
      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      // Enrich cart item with product data
      const product = await storage.getProduct(updatedItem.productId);
      const enrichedCartItem = {
        ...updatedItem,
        product: product || null
      };
      
      res.json(enrichedCartItem);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Remove from cart
  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.removeFromCart(id);
      
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Clear cart
  app.delete("/api/cart", async (req, res) => {
    try {
      const userId = parseInt(req.query.userId as string);
      
      if (!userId) {
        return res.status(400).json({ message: "User ID required" });
      }
      
      const success = await storage.clearCart(userId);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  return httpServer;
}

// Helper function to format relative time
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
}

// Helper function to format date
function formatDate(date: Date): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
