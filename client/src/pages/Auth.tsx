import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const Auth = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { login, register } = useAuth();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = async (values: LoginFormValues) => {
    setIsLoggingIn(true);
    
    try {
      await login(values);
      
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      
      setLocation("/");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const onRegisterSubmit = async (values: RegisterFormValues) => {
    setIsRegistering(true);
    
    try {
      await register(values);
      
      toast({
        title: "Registration successful!",
        description: "Your account has been created. You are now logged in.",
      });
      
      setLocation("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred during registration.",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{activeTab === "login" ? "Login" : "Register"} - Auto Detailing Nation</title>
        <meta name="description" content="Login or create an account to join the Auto Detailing Nation community." />
      </Helmet>

      <div className="bg-[#121212] min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-montserrat font-bold text-white">Auto Detailing Nation</h1>
            <p className="mt-2 text-gray-400">Join the premier community for detailing enthusiasts</p>
          </div>

          <Card className="bg-[#1A1A1A] border-gray-800 shadow-xl">
            <Tabs defaultValue="login" onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-0 bg-[#222] rounded-t-lg rounded-b-none h-14">
                <TabsTrigger value="login" className="rounded-none data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white">
                  Login
                </TabsTrigger>
                <TabsTrigger value="register" className="rounded-none data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white">
                  Register
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="mb-0 pt-4">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Welcome Back</CardTitle>
                  <CardDescription className="text-gray-400">
                    Sign in to your account to continue your detailing journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Username</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your username" 
                                className="bg-[#2A2A2A] border-gray-700 text-white"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Enter your password" 
                                className="bg-[#2A2A2A] border-gray-700 text-white"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="text-right">
                        <a href="#" className="text-sm text-[#E53E3E] hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-[#E53E3E] hover:bg-red-700 text-white"
                        disabled={isLoggingIn}
                      >
                        {isLoggingIn ? 'Signing in...' : 'Sign In'}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
                  <div className="text-sm text-gray-400">
                    Don't have an account? 
                    <button 
                      className="ml-1 text-[#E53E3E] hover:underline"
                      onClick={() => setActiveTab("register")}
                    >
                      Register now
                    </button>
                  </div>
                </CardFooter>
              </TabsContent>
              
              <TabsContent value="register" className="mb-0 pt-4">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Create an Account</CardTitle>
                  <CardDescription className="text-gray-400">
                    Join our community and start sharing your detailing experiences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Username</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Choose a username" 
                                className="bg-[#2A2A2A] border-gray-700 text-white"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="Enter your email address" 
                                className="bg-[#2A2A2A] border-gray-700 text-white"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Create a password" 
                                className="bg-[#2A2A2A] border-gray-700 text-white"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Confirm Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Confirm your password" 
                                className="bg-[#2A2A2A] border-gray-700 text-white"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="text-sm text-gray-400">
                        By registering, you agree to our 
                        <a href="#" className="ml-1 text-[#E53E3E] hover:underline">Terms of Service</a>
                        <span className="mx-1">and</span>
                        <a href="#" className="text-[#E53E3E] hover:underline">Privacy Policy</a>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-[#E53E3E] hover:bg-red-700 text-white"
                        disabled={isRegistering}
                      >
                        {isRegistering ? 'Creating account...' : 'Create Account'}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
                  <div className="text-sm text-gray-400">
                    Already have an account? 
                    <button 
                      className="ml-1 text-[#E53E3E] hover:underline"
                      onClick={() => setActiveTab("login")}
                    >
                      Sign in
                    </button>
                  </div>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Auto Detailing Nation. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;