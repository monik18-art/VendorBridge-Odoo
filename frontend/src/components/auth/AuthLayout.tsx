import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <main className="min-h-screen w-full bg-brand-bg flex flex-col items-center justify-center p-4 md:p-8 select-none transition-colors duration-300">
      {title && (
        <div className="mb-4 text-center">
          <h1 className="font-sans text-xs font-semibold text-brand-text-muted/80 tracking-wider uppercase">
            {title}
          </h1>
        </div>
      )}
      <div className="w-full flex justify-center items-center">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
