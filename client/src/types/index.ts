// User types
export interface User {
  id: number;
  username: string;
  avatar: string;
  badge?: string;
  badgeColor?: string;
  joined?: string;
  posts?: number;
  level?: number;
}

// Forum types
export interface ForumCategory {
  id: number;
  name: string;
  slug: string;
  type: string;
  colorClass: string;
  threadCount: number;
  replyCount: number;
}

export interface Thread {
  id: number;
  title: string;
  author: {
    id: number;
    username: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  replyCount: number;
  lastReplyTime: string;
  isHot: boolean;
  categoryId?: number;
  recentParticipants: {
    username: string;
    avatar: string;
  }[];
}

export interface Reply {
  id: number;
  author: {
    id: number;
    username: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
}

// Activity in the forum
export interface Activity {
  user: {
    username: string;
    avatar: string;
  };
  action: string;
  targetName: string;
  targetUrl: string;
  timeAgo: string;
}

// Shop types
export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
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
  inStock: boolean;
  badge: {
    text: string;
    color: string;
  } | null;
  categoryId?: number;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

// Content types
export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    id: number;
    username: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: string;
}

export interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  duration: string;
  views: string;
  creator: {
    id: number;
    username: string;
    avatar: string;
  };
}

export interface Resource {
  id: number;
  name: string;
  description: string;
  type: string; // pdf, excel, text
  downloadUrl: string;
}

// Auth types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
