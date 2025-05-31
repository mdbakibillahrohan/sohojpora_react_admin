import React, { useState } from "react";
import { Input, Button, Card } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { ShieldAlert, ArrowRight } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("bardenhill@gmail.com");
  const [password, setPassword] = useState("00000000");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSlide,setActiveSlide] = useState(0);
  const navigate = useNavigate();


  const slideWithContent = [
    {
        image:'../../public/images/dsh2.png?height=800&width=600',
        title:'Control Center',
        description:'Manage your entire learning management system from one powerful dashboard. Monitor users, content, and analytics.'
    },
    {
        image:'../../public/images/dsh1.png?height=800&width=600',
        title:'User Management',
        description:'Easily manage users, assign roles, and monitor activity across the platform.'
    },
    {
        image:'../../public/images/dsh3.png?height=800&width=600',
        title:'Analytics Dashboard',
        description:'Gain insights into user engagement, course performance, and overall system health.'
    }   
  ]


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Admin login:", { email, password });
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex inset-0 w-full bg-white h-full sm:h-screen z-50 fixed flex-col bg-gradient-to-br from-white to-gray-100">
      {/*  header bar */}
      <div className="flex h-16 items-center justify-between border-b border-slate-700 bg-slate-900/50 px-6 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9  rounded-md bg-gradient-to-br flex justify-center  items-center text-xl  from-purple-600 to-indigo-700 p-1.5">
            <LockOutlined className=" !text-white" />
          </div>
          <span className="font-serif text-xl font-bold text-white">
            Sohoj-Pora<span className="text-amber-400">LMS</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-amber-400" />
          <span className="text-sm font-medium text-slate-300">
            Admin Access Only
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="grid w-full max-w-6xl gap-8 rounded-xl bg-white/30 p-4 backdrop-blur-sm md:grid-cols-2 md:p-0">
          {/* Left side - Image */}
          <div className="relative hidden overflow-hidden rounded-l-xl md:block">
            <div className="absolute  inset-0 bg-gradient-to-br from-purple-900/90 to-indigo-900/90 mix-blend-multiply">
            <img
              src={slideWithContent[activeSlide].image}
              alt="Admin Dashboard"
              className="h-full  transition-all  w-full object-cover brightness-90"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-8 text-white">
              <div className="mb-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur-sm">
                ADMINISTRATOR PORTAL
              </div>
              <h2 className="mb-2 text-3xl font-bold">{slideWithContent[activeSlide].title}</h2>
              <p className="mb-4 max-w-md text-slate-300">
                {slideWithContent[activeSlide].description}
              </p>
              <div className="flex gap-2">
                {slideWithContent.map((_,index)=> (
                    <div
                        key={index}
                        onClick={()=> setActiveSlide(index)}
                        className={`h-1 ${
                            activeSlide === index ? 'w-7 bg-amber-400':'w-3 bg-slate-500'
                        } rounded-full cursor-pointer`}
                    >
                    
                    </div>
                )
                )}
              </div>
            </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <Card className="border-none !bg-slate-600 p-8 backdrop-blur-sm">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-white">Admin Login</h2>
              <p className="text-slate-400">
                Enter your credentials to access the control panel
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-300"
                >
                  Admin Email
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 !border-slate-700 !bg-slate-800/50 pl-4 !text-white placeholder:!text-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-300"
                  >
                    Password
                  </label>
                  <Link
                    to="#"
                    className="text-xs font-medium !text-amber-400 hover:!text-amber-300"
                  >
                    Reset password
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 !border-slate-700 !bg-slate-800/50 pl-4 !text-white placeholder:!text-slate-400 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? (
                      <span className="text-xs">Hide</span>
                    ) : (
                      <span className="text-xs">Show</span>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex h-5 items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-amber-500"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="text-sm text-slate-400"
                >
                  Keep me signed in for 30 days
                </label>
              </div>

              <Button
                htmlType="submit"
                disabled={isLoading}
                className="!h-12 w-full !font-semibold !border-none !bg-gradient-to-r from-indigo-700 to-violet-700 !text-white hover:from-indigo-700 hover:to-violet-800"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Access Admin Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>

              <div className="mt-6 rounded-lg border border-slate-700 bg-amber-500/10 p-4 text-sm text-amber-300">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" />
                  <span className="font-medium">
                    Administrator Access Only
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  This portal is restricted to authorized system administrators.
                  Unauthorized access attempts will be logged and reported.
                </p>
              </div>
            </form>

            <div className="mt-8 text-center text-xs text-slate-500">
              <p className="text-gray-300">
                © 2025 Sohoj-Pora LMS. All rights reserved.
              </p>
              <p className="mt-1">
                <Link
                  to="#"
                  className="text-amber-400 hover:text-amber-300"
                >
                  Privacy Policy
                </Link>{" "}
                •{" "}
                <Link
                  to="#"
                  className="text-amber-400 hover:text-amber-300"
                >
                  Terms of Service
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;