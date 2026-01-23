import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

type CommandLink = {
  label: string
  path: string
}

const links: CommandLink[] = [
  { label: "Home", path: "/" },
  { label: "Collections", path: "/collections" },
  { label: "Statistics", path: "/statistics" },
  { label: "Features", path: "/features" },
  { label: "Support", path: "/support" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
  { label: "Notes", path: "/notes" },
  { label: "WatchList", path: "/watchlist" },
]

export function CommandSearch() {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  // Keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (path: string) => {
    setOpen(false)
    navigate(path)
  }

  return (
    <>
      {/* Navbar button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-md"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>

      {/* Command Palette */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            {links.map((link) => (
              <CommandItem
                key={link.path}
                value={link.label}
                onSelect={() => runCommand(link.path)}
              >
                {link.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
