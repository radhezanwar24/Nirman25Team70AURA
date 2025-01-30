"use client"

import { AuthProvider } from "@/context/auth-context"
import AccessibilitySettings from "@/components/AccessibilitySettings"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMessagePage = window.location.pathname.includes("/messenger/newMessagePage");
  
  return (
    <>
      {isMessagePage ? (
        children
      ) : (
        <AuthProvider>
          {children}
          <AccessibilitySettings />
        </AuthProvider>
      )}
    </>
  );
}
