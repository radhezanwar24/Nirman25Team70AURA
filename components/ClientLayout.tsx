"use client"

import { AuthProvider } from "@/context/auth-context"
import AccessibilitySettings from "@/components/AccessibilitySettings"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
<<<<<<< HEAD
=======
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
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
  return (
    <AuthProvider>
      {children}
      <AccessibilitySettings />
    </AuthProvider>
  )
<<<<<<< HEAD
=======
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
}
