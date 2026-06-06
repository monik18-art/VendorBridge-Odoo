"use client";

import React, { useState } from "react";
import Link from "next/link";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import { registerUser } from "@/lib/api";

const ROLE_OPTIONS = [
  { value: "", label: "Role (Admin, Officer)" },
  { value: "admin", label: "Admin" },
  { value: "officer", label: "Officer" },
];

const COUNTRY_OPTIONS = [
  { value: "", label: "Country" },
  { value: "US", label: "United States" },
  { value: "IN", label: "India" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
];

export const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    country: "",
    password: "",
    confirmPassword: "",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
    }

    if (!formData.role) newErrors.role = "Role selection is required";
    if (!formData.country) newErrors.country = "Country selection is required";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      const response = await registerUser({
        email: formData.email,
        password: formData.password,
        // The backend only accepts email and password in the database model,
        // but we pass all form details in the API payload so developers can extend it easily.
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        role: formData.role,
        country: formData.country,
        additionalInfo: formData.additionalInfo,
      });

      if (response.success) {
        setSuccessMessage(response.message || "Registration successful!");
        // Clear form on success
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          role: "",
          country: "",
          password: "",
          confirmPassword: "",
          additionalInfo: "",
        });
      } else {
        setGeneralError(response.message || "Registration failed. Please try again.");
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
        {/* Two-column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Input
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              error={errors.firstName}
              required
              aria-label="First Name"
            />
          </div>
          <div>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              error={errors.lastName}
              required
              aria-label="Last Name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              required
              aria-label="Email Address"
            />
          </div>
          <div>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              error={errors.phoneNumber}
              required
              aria-label="Phone Number"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Select
              id="role"
              name="role"
              options={ROLE_OPTIONS}
              value={formData.role}
              onChange={handleInputChange}
              error={errors.role}
              required
              aria-label="Role"
            />
          </div>
          <div>
            <Select
              id="country"
              name="country"
              options={COUNTRY_OPTIONS}
              value={formData.country}
              onChange={handleInputChange}
              error={errors.country}
              required
              aria-label="Country"
            />
          </div>
        </div>

        {/* Added Password/Confirm Password fields for functionality */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Input
              id="register-password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              required
              aria-label="Password"
              autoComplete="new-password"
            />
          </div>
          <div>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              required
              aria-label="Confirm Password"
              autoComplete="new-password"
            />
          </div>
        </div>

        {/* Textarea Section */}
        <div>
          <Textarea
            id="additionalInfo"
            name="additionalInfo"
            label="Additional Information"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            value={formData.additionalInfo}
            onChange={handleInputChange}
            error={errors.additionalInfo}
            aria-label="Additional Information"
          />
        </div>

        <div className="pt-2">
          <Button type="submit" isLoading={isLoading}>
            Register
          </Button>
        </div>
      </div>

      <div className="flex justify-center mt-6 text-sm text-[#212529]">
        <span>Already have an account?&nbsp;</span>
        <Link
          href="/auth/login"
          className="font-bold text-[#0d6efd] hover:text-[#0b5ed7] underline transition-colors"
        >
          Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
