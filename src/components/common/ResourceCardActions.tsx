import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResourceCardActionsProps {
  onEdit?: () => void
  onDelete?: () => void
}

export default function ResourceCardActions({
  onEdit,
  onDelete,
}: ResourceCardActionsProps) {
  return (
    <div className="flex gap-1">
      {onEdit && (
        <Button size="icon" variant="ghost" onClick={onEdit}>
          <Pencil className="w-4 h-4" />
        </Button>
      )}

      {onDelete && (
        <Button size="icon" variant="ghost" onClick={onDelete}>
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      )}
    </div>
  )
}
