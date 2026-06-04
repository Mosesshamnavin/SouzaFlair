import React, { useState } from "react";
import { toast } from "react-toastify";
import useScrollReveal from "../hooks/useScrollReveal";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const revealRef = useScrollReveal({ once: true });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currentState === "Sign Up") {
      toast.success(`Account created successfully for ${name}!`);
    } else {
      toast.success(`Welcome back! Logged in as ${email}`);
    }
  };

  return (
    <div
      ref={revealRef}
      className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-32 pb-24 max-w-7xl mx-auto flex items-center justify-center select-none"
    >
      <form
        onSubmit={onSubmitHandler}
        data-reveal
        className="reveal reveal-scale w-full max-w-md bg-white border border-secondary/15 rounded-sm p-8 sm:p-10 shadow-xl relative overflow-hidden"
      >
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-8 h-[1px] bg-secondary"></div>
        <div className="absolute top-0 left-0 w-[1px] h-8 bg-secondary"></div>
        <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-secondary"></div>
        <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-secondary"></div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl font-semibold tracking-wide text-primary">
            {currentState}
          </h2>
          <p className="font-sans text-[10px] tracking-[0.25em] text-text-muted mt-2 uppercase font-medium">
            Access your private atelier
          </p>
          <div className="w-10 h-[1.5px] bg-secondary mx-auto mt-4" />
        </div>

        <div className="space-y-5">
          {/* Name Field (Sign Up Only) */}
          {currentState === "Sign Up" && (
            <div className="relative">
              <input
                type="text"
                className="w-full bg-surface/50 border border-secondary/20 rounded-xs px-4 py-3.5 text-xs sm:text-sm text-primary placeholder-text-muted/50 outline-none focus:border-secondary transition-colors"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              className="w-full bg-surface/50 border border-secondary/20 rounded-xs px-4 py-3.5 text-xs sm:text-sm text-primary placeholder-text-muted/50 outline-none focus:border-secondary transition-colors"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type="password"
              className="w-full bg-surface/50 border border-secondary/20 rounded-xs px-4 py-3.5 text-xs sm:text-sm text-primary placeholder-text-muted/50 outline-none focus:border-secondary transition-colors"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Additional Links */}
        <div className="flex justify-between items-center mt-4 text-[10px] sm:text-xs tracking-wider text-text-muted">
          <p className="cursor-pointer hover:text-primary transition-colors">
            Forgot password?
          </p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer hover:text-secondary font-semibold transition-colors uppercase text-[9px] tracking-[0.2em]"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer hover:text-secondary font-semibold transition-colors uppercase text-[9px] tracking-[0.2em]"
            >
              Login Here
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="shimmer-btn-gold w-full mt-8 py-4 text-xs font-semibold tracking-[0.35em] uppercase rounded-sm border border-secondary/30 transition-all duration-300 shadow-lg cursor-pointer"
        >
          {currentState === "Login" ? "Sign In" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Login;
