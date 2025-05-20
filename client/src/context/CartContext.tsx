import { createContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '@/types';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/hooks/use-auth';

interface CartState {
  cartItems: CartItem[];
  isLoading: boolean;
  error: string | null;
}

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => { subtotal: number; discount: number; total: number };
}

interface CartAction {
  type: string;
  payload?: any;
}

const initialState: CartState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'CART_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'CART_SUCCESS':
      return {
        ...state,
        isLoading: false,
        cartItems: action.payload,
        error: null,
      };
    case 'CART_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'CART_ADD_ITEM':
      return {
        ...state,
        isLoading: false,
        cartItems: [...state.cartItems, action.payload],
        error: null,
      };
    case 'CART_UPDATE_ITEM':
      return {
        ...state,
        isLoading: false,
        cartItems: state.cartItems.map(item => 
          item.id === action.payload.id ? action.payload : item
        ),
        error: null,
      };
    case 'CART_REMOVE_ITEM':
      return {
        ...state,
        isLoading: false,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
        error: null,
      };
    case 'CART_CLEAR':
      return {
        ...state,
        isLoading: false,
        cartItems: [],
        error: null,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const CartContext = createContext<CartContextType>({
  ...initialState,
  addToCart: async () => {},
  updateQuantity: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
  getCartTotal: () => ({ subtotal: 0, discount: 0, total: 0 }),
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Load cart items when user authenticates
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated && user) {
        dispatch({ type: 'CART_REQUEST' });
        
        try {
          // In a real app with API, we would fetch from the server
          // For now we'll get from local storage
          const cartData = localStorage.getItem('cart');
          if (cartData) {
            dispatch({ type: 'CART_SUCCESS', payload: JSON.parse(cartData) });
          } else {
            dispatch({ type: 'CART_SUCCESS', payload: [] });
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to load cart';
          dispatch({ type: 'CART_ERROR', payload: errorMessage });
        }
      } else {
        // Get cart from local storage for non-authenticated users
        const cartData = localStorage.getItem('cart');
        if (cartData) {
          dispatch({ type: 'CART_SUCCESS', payload: JSON.parse(cartData) });
        }
      }
    };

    loadCart();
  }, [isAuthenticated, user]);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  // Add item to cart
  const addToCart = async (product: Product, quantity: number = 1) => {
    dispatch({ type: 'CART_REQUEST' });
    
    try {
      // Check if product is already in cart
      const existingItem = state.cartItems.find(item => item.productId === product.id);
      
      if (existingItem) {
        // Update quantity instead
        await updateQuantity(existingItem.id, existingItem.quantity + quantity);
        return;
      }
      
      // In a real app, we would call API here
      // For now, we'll create a client-side cart item
      const newCartItem: CartItem = {
        id: Date.now(), // Use timestamp as temporary ID
        productId: product.id,
        quantity,
        product,
      };
      
      if (isAuthenticated && user) {
        // If authenticated, we would send to server
        // await apiRequest('POST', '/api/cart', { 
        //   userId: user.id, 
        //   productId: product.id, 
        //   quantity 
        // });
      }
      
      dispatch({ type: 'CART_ADD_ITEM', payload: newCartItem });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add item to cart';
      dispatch({ type: 'CART_ERROR', payload: errorMessage });
    }
  };

  // Update item quantity
  const updateQuantity = async (cartItemId: number, quantity: number) => {
    if (quantity < 1) return;
    
    dispatch({ type: 'CART_REQUEST' });
    
    try {
      // Find the cart item
      const cartItem = state.cartItems.find(item => item.id === cartItemId);
      
      if (!cartItem) {
        throw new Error('Cart item not found');
      }
      
      if (isAuthenticated && user) {
        // If authenticated, we would update on server
        // await apiRequest('PATCH', `/api/cart/${cartItemId}`, { quantity });
      }
      
      // Update locally
      const updatedItem = { ...cartItem, quantity };
      dispatch({ type: 'CART_UPDATE_ITEM', payload: updatedItem });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update cart item';
      dispatch({ type: 'CART_ERROR', payload: errorMessage });
    }
  };

  // Remove item from cart
  const removeFromCart = async (cartItemId: number) => {
    dispatch({ type: 'CART_REQUEST' });
    
    try {
      if (isAuthenticated && user) {
        // If authenticated, we would delete from server
        // await apiRequest('DELETE', `/api/cart/${cartItemId}`);
      }
      
      dispatch({ type: 'CART_REMOVE_ITEM', payload: cartItemId });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove item from cart';
      dispatch({ type: 'CART_ERROR', payload: errorMessage });
    }
  };

  // Clear cart
  const clearCart = async () => {
    dispatch({ type: 'CART_REQUEST' });
    
    try {
      if (isAuthenticated && user) {
        // If authenticated, we would clear on server
        // await apiRequest('DELETE', `/api/cart?userId=${user.id}`);
      }
      
      dispatch({ type: 'CART_CLEAR' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to clear cart';
      dispatch({ type: 'CART_ERROR', payload: errorMessage });
    }
  };

  // Calculate cart totals
  const getCartTotal = () => {
    const subtotal = state.cartItems.reduce(
      (total, item) => total + (item.product.originalPrice * item.quantity), 
      0
    );
    
    const discountedTotal = state.cartItems.reduce(
      (total, item) => total + (item.product.discountPrice * item.quantity), 
      0
    );
    
    const discount = subtotal - discountedTotal;
    
    return {
      subtotal,
      discount,
      total: discountedTotal
    };
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
