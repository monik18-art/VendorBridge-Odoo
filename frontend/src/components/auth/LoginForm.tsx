"use client";

import React, { useState } from "react";
import Link from "next/link";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { loginUser } from "@/lib/api";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = "Username or Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    setSuccessMessage(null);

    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await loginUser({ email, password });

      if (response.success) {
        setSuccessMessage(response.message || "Login successful!");
        // If integrating real cookies/redirects, you would redirect the user here:
        // window.location.href = "/dashboard";
      } else {
        setGeneralError(response.message || "Invalid credentials. Please try again.");
      }
    } catch {
      setGeneralError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col font-sans">
      {generalError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm font-medium">
          {generalError}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-md text-sm font-medium">
          {successMessage}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Input
            id="username-or-email"
            name="email"
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={errors.email}
            autoComplete="username"
            required
            aria-label="Username or Email"
          />
        </div>

        <div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            error={errors.password}
            autoComplete="current-password"
            required
            aria-label="Password"
          />
        </div>

        <div className="pt-1">
          <Button type="submit" isLoading={isLoading}>
            Login
          </Button>
        </div>
      </div>

      <div className="flex justify-end mt-2">
        <Link
          href="/auth/forgot-password"
          className="text-xs font-semibold text-[#0d6efd] hover:text-[#0b5ed7] transition-colors"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="flex justify-center mt-8 text-sm text-[#212529]">
        <span>Don&apos;t have an account?&nbsp;</span>
        <Link
          href="/auth/register"
          className="font-bold text-[#0d6efd] hover:text-[#0b5ed7] underline transition-colors"
        >
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
