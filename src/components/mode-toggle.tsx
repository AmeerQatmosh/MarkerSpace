import * as React from "react"
import { Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

type Theme = "light" | "dark" | "system"

type ModeToggleProps = {
  showLabel?: boolean
}

export function ModeToggle({ showLabel = false }: ModeToggleProps) {
  const { theme, setTheme } = useTheme()

  const currentTheme = (theme as Theme) || "system"

  const Icon =
    currentTheme === "light"
      ? Sun
      : currentTheme === "dark"
      ? Moon
      : Monitor

  const label =
    currentTheme === "light"
      ? "Light"
      : currentTheme === "dark"
      ? "Dark"
      : "System"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size={showLabel ? "default" : "icon"}
          className="flex items-center gap-2 bg-card"
        >
          <Icon className="h-4 w-4" />

          {showLabel && <span className="text-sm">{label}</span>}

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="p-2">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


