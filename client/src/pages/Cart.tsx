import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { CartItem } from "@/types";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      await updateQuantity(cartItemId, newQuantity);
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    await removeFromCart(cartItemId);
  };

  const handleClearCart = async () => {
    await clearCart();
  };

  const handleApplyCoupon = () => {
    setIsApplyingCoupon(true);
    
    // Simulate coupon application
    setTimeout(() => {
      setIsApplyingCoupon(false);
      if (couponCode.toUpperCase() === "DETAIL10") {
        setIsCouponApplied(true);
      } else {
        setIsCouponApplied(false);
        alert("Invalid coupon code. Try 'DETAIL10' for 10% off.");
      }
    }, 1000);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      alert("Checkout functionality will be implemented in the future!");
    }, 1500);
  };

  const { subtotal, discount, total } = getCartTotal();
  const additionalDiscount = isCouponApplied ? subtotal * 0.1 : 0; // 10% discount if coupon applied

  return (
    <>
      <Helmet>
        <title>Your Cart - Auto Detailing Nation Shop</title>
        <meta name="description" content="View and manage items in your shopping cart" />
      </Helmet>

      <div className="bg-[#121212] py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-montserrat font-bold text-white mb-6">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="bg-[#1A1A1A] rounded-xl p-8 text-center">
              <div className="w-24 h-24 bg-[#2D2D2D] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-montserrat font-semibold text-white mb-3">Your cart is empty</h2>
              <p className="text-gray-400 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Link href="/shop">
                <Button className="bg-[#E53E3E] hover:bg-red-700 text-white">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <div className="bg-[#1A1A1A] rounded-xl overflow-hidden mb-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-800">
                        <TableHead className="text-white">Product</TableHead>
                        <TableHead className="text-white text-right">Price</TableHead>
                        <TableHead className="text-white text-center">Quantity</TableHead>
                        <TableHead className="text-white text-right">Total</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map((item: CartItem) => (
                        <TableRow key={item.id} className="border-b border-gray-800">
                          <TableCell className="py-4">
                            <div className="flex items-center">
                              <div className="h-16 w-16 rounded-md overflow-hidden mr-4">
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="text-white font-medium">{item.product.name}</h3>
                                {item.product.badge && (
                                  <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded bg-${item.product.badge.color} text-white`}>
                                    {item.product.badge.text}
                                  </span>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-300 text-right">
                            ${item.product.discountPrice.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center">
                              <button 
                                className="bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white w-8 h-8 flex items-center justify-center rounded-l-md"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <div className="bg-[#2D2D2D] text-white w-10 h-8 flex items-center justify-center">
                                {item.quantity}
                              </div>
                              <button 
                                className="bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white w-8 h-8 flex items-center justify-center rounded-r-md"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-300 text-right font-medium">
                            ${(item.product.discountPrice * item.quantity).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <button 
                              className="text-gray-400 hover:text-[#E53E3E]"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    className="border-gray-700 text-gray-300 hover:text-white hover:bg-[#2D3748]"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </Button>
                  <Link href="/shop">
                    <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:bg-[#2D3748]">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Order summary */}
              <div>
                <div className="bg-[#1A1A1A] rounded-xl p-6">
                  <h2 className="text-xl font-montserrat font-semibold text-white mb-6">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-[#E53E3E]">
                        <span>Product Discounts</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    {isCouponApplied && (
                      <div className="flex justify-between text-[#E53E3E]">
                        <span>Coupon (DETAIL10)</span>
                        <span>-${additionalDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-300 pt-3 border-t border-gray-800">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between text-white font-bold pt-3 border-t border-gray-800">
                      <span>Total</span>
                      <span>${(total - additionalDiscount).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Coupon code */}
                  <div className="mb-6">
                    <label htmlFor="coupon" className="block text-sm font-medium text-gray-300 mb-2">
                      Coupon Code
                    </label>
                    <div className="flex">
                      <Input
                        id="coupon"
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="bg-[#2D2D2D] border-gray-700 text-gray-200 rounded-r-none focus:ring-[#E53E3E] focus:border-[#E53E3E]"
                        placeholder="Enter coupon code"
                      />
                      <Button 
                        className="bg-[#E53E3E] hover:bg-red-700 text-white rounded-l-none"
                        onClick={handleApplyCoupon}
                        disabled={isApplyingCoupon || !couponCode}
                      >
                        {isApplyingCoupon ? 'Applying...' : 'Apply'}
                      </Button>
                    </div>
                    {isCouponApplied && (
                      <p className="text-green-500 text-sm mt-1">Coupon applied successfully!</p>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full bg-[#E53E3E] hover:bg-red-700 text-white py-6 text-lg font-montserrat font-semibold"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                  </Button>
                  
                  <div className="mt-6 text-center text-gray-400 text-sm">
                    <p>Secure checkout powered by Stripe</p>
                    <div className="flex justify-center space-x-2 mt-2">
                      <span>
                        <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-visa"><title id="pi-visa">Visa</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688"></path></svg>
                      </span>
                      <span>
                        <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-master"><title id="pi-master">Mastercard</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><circle fill="#EB001B" cx="15" cy="12" r="7"></circle><circle fill="#F79E1B" cx="23" cy="12" r="7"></circle><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path></svg>
                      </span>
                      <span>
                        <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-amex"><title id="pi-amex">American Express</title><g fill="none"><path fill="#000" d="M35,0 L3,0 C1.3,0 0,1.3 0,3 L0,21 C0,22.7 1.4,24 3,24 L35,24 C36.7,24 38,22.7 38,21 L38,3 C38,1.3 36.6,0 35,0 Z" opacity=".07"></path><path fill="#006FCF" d="M35,1 C36.1,1 37,1.9 37,3 L37,21 C37,22.1 36.1,23 35,23 L3,23 C1.9,23 1,22.1 1,21 L1,3 C1,1.9 1.9,1 3,1 L35,1"></path><path fill="#FFF" d="M8.971,10.268 L9.745,12.144 L8.203,12.144 L8.971,10.268 Z M25.046,10.346 L22.069,10.346 L22.069,11.173 L24.998,11.173 L24.998,12.412 L22.075,12.412 L22.075,13.334 L25.052,13.334 L25.052,14.073 L27.129,11.828 L25.052,9.488 L25.046,10.346 L25.046,10.346 Z M10.983,8.006 L14.978,8.006 L15.865,9.941 L16.687,8 L27.057,8 L28.135,9.19 L29.25,8 L34.013,8 L30.494,11.852 L33.977,15.68 L29.143,15.68 L28.065,14.49 L26.94,15.68 L10.03,15.68 L9.536,14.49 L8.406,14.49 L7.911,15.68 L4,15.68 L7.286,8 L10.716,8 L10.983,8.006 Z M19.646,9.084 L17.407,9.084 L15.907,12.62 L14.282,9.084 L12.06,9.084 L12.06,13.894 L10,9.084 L8.007,9.084 L5.625,14.596 L7.18,14.596 L7.674,13.406 L10.27,13.406 L10.764,14.596 L13.484,14.596 L13.484,10.661 L15.235,14.602 L16.425,14.602 L18.165,10.673 L18.165,14.603 L19.623,14.603 L19.647,9.083 L19.646,9.084 Z M28.986,11.852 L31.517,9.084 L29.695,9.084 L28.094,10.81 L26.546,9.084 L20.652,9.084 L20.652,14.602 L26.462,14.602 L28.076,12.864 L29.624,14.602 L31.499,14.602 L28.987,11.852 L28.986,11.852 Z"></path></g></svg>
                      </span>
                      <span>
                        <svg viewBox="0 0 38 24" version="1.1" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-paypal"><title id="pi-paypal">PayPal</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"></path><path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"></path><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"></path></svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;