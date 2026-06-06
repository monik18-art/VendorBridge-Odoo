import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "login" | "register";
}

export const AuthCard: React.FC<AuthCardProps> = ({
  children,
  className = "",
  maxWidth = "login",
}) => {
  const widthClass =
    maxWidth === "login"
      ? "max-w-[400px]"
      : "max-w-[620px]";

  return (
    <div
      className={`w-full ${widthClass} bg-white rounded-[12px] border border-slate-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 md:p-8 transition-all duration-300 ${className}`}
    >
      <div className="flex flex-col items-center w-full">
        {/* Avatar Container */}
        <div className="w-24 h-24 rounded-full bg-brand-avatar-bg flex items-center justify-center mb-8 border border-white shadow-sm overflow-hidden select-none">
          <svg
            className="w-20 h-20 text-brand-avatar-icon mt-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 15a7 7 0 0114 0H5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
