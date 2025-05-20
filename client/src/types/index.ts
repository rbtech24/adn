// User related types
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: string | null;
  bio: string | null;
  badge: string | null;
  badgeColor: string | null;
  joinedAt: Date;
  postCount: number;
  level: number;
  isAdmin: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Forum related types
export interface ForumCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  threadCount: number;
}

export interface Thread {
  id: number;
  title: string;
  content: string;
  authorId: number;
  categoryId: number;
  createdAt: Date;
  isHot: boolean;
  viewCount: number;
  replyCount: number;
}

export interface Reply {
  id: number;
  content: string;
  authorId: number;
  threadId: number;
  createdAt: Date;
  likes: number;
}

// Shop related types
export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface BadgeInfo {
  text: string;
  color: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  discountPrice: number;
  rating: number;
  reviewCount: number;
  categoryId: number;
  inStock: boolean;
  badge: BadgeInfo | null;
}

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  product: Product;
  quantity: number;
  addedAt: Date;
}

// Content related types
export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  articleCount: number;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  summary: string;
  image: string;
  categoryId: number;
  authorId: number;
  publishedAt: Date;
  tags: string[];
  readTime?: string;
  excerpt: string;
}

export interface Video {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  views: number;
  authorId: number;
  categoryId: number;
  publishedAt: Date;
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  thumbnailUrl: string;
  fileType: string;
  fileSize: string;
  downloads: number;
  authorId: number;
  publishedAt: Date;
}