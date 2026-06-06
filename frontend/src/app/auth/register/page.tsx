import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout title="Registration Screen (Screen 2)">
      <AuthCard maxWidth="register">
        <RegisterForm />
      </AuthCard>
    </AuthLayout>
  );
}
