import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NavbarSearch() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 rounded-md"
    >
      <Search className="h-4 w-4" />
      <span className="sr-only">Search</span>
    </Button>
  )
}
