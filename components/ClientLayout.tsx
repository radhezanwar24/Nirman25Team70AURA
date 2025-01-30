"use client"

import { AuthProvider } from "@/context/auth-context"
import AccessibilitySettings from "@/components/AccessibilitySettings"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
<<<<<<< HEAD
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
=======
  return (
    <AuthProvider>
      {children}
      <AccessibilitySettings />
    </AuthProvider>
  )
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
}
