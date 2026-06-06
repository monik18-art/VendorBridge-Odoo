import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout title="Login Screen (Screen 1)">
      <AuthCard maxWidth="login">
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
}
