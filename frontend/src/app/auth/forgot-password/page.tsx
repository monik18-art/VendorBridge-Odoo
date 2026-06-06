"use client";

import React, { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setSuccess(null);

    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess("If that email is registered, we've sent instructions to reset your password.");
      setEmail("");
    }, 1000);
  };

  return (
    <AuthLayout title="Forgot Password">
      <AuthCard maxWidth="login">
        <form onSubmit={handleSubmit} className="w-full flex flex-col font-sans">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-brand-text">Reset Password</h2>
            <p className="text-xs text-brand-text-muted mt-1 leading-normal">
              Enter your email address and we will send you a link to reset your password.
            </p>
          </div>

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-md text-sm font-medium">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <Input
              id="forgot-email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(undefined);
              }}
              error={error}
              required
              aria-label="Email Address"
            />

            <Button type="submit" isLoading={isLoading}>
              Send Reset Link
            </Button>
          </div>

          <div className="flex justify-center mt-6 text-sm text-[#212529]">
            <Link
              href="/auth/login"
              className="font-bold text-[#0d6efd] hover:text-[#0b5ed7] underline transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
