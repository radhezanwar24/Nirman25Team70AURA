<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Bell, Shield, User, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    profileVisibility: true
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
<<<<<<< HEAD
      redirect("/auth/signin")
=======
      redirect("/settings/page")
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
    }
  }, [status])

  if (status === "loading" || !mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const handleSettingChange = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {/* Theme Settings */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Sun className="mr-2 h-5 w-5" />
          Appearance
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Theme</Label>
            <p className="text-sm text-muted-foreground">
              Choose between light and dark theme
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email updates about your account activity
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={() => handleSettingChange("emailNotifications")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications about matches and messages
              </p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={() => handleSettingChange("pushNotifications")}
            />
          </div>
        </div>
      </Card>

      {/* Privacy Settings */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          Privacy
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Profile Visibility</Label>
              <p className="text-sm text-muted-foreground">
                Make your profile visible to other users
              </p>
            </div>
            <Switch
              checked={settings.profileVisibility}
              onCheckedChange={() => handleSettingChange("profileVisibility")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about new features and updates
              </p>
            </div>
            <Switch
              checked={settings.marketingEmails}
              onCheckedChange={() => handleSettingChange("marketingEmails")}
            />
          </div>
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <User className="mr-2 h-5 w-5" />
          Account
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Email Address</Label>
              <p className="text-sm text-muted-foreground">
                {session?.user?.email || "No email set"}
              </p>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Password</Label>
              <p className="text-sm text-muted-foreground">
                Last changed 3 months ago
              </p>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>
          <div className="pt-4 border-t">
            <Button variant="destructive">
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
<<<<<<< HEAD
=======
=======
export default function Settings() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Settings</h1>
      {/* Add settings content here */}
    </div>
  )
}

>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
