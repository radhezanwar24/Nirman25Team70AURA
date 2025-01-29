"use client"

import { AuthProvider } from "@/context/auth-context"
import AccessibilitySettings from "@/components/AccessibilitySettings"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      {children}
      <AccessibilitySettings />
    </AuthProvider>
  )
}
