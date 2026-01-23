import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ResourceCardProps {
  title: string
  href?: string
  icon?: React.ReactNode
  actions?: React.ReactNode
  highlighted?: boolean
  children?: React.ReactNode
}

export default function ResourceCard({
  title,
  href,
  icon,
  actions,
  highlighted,
  children,
}: ResourceCardProps) {
  return (
    <Card
      className={`p-4 rounded-xl border bg-card shadow-md ${
        highlighted ? "border-yellow-400" : "border-border"
      }`}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 p-0 pb-3">
        <div className="flex items-center gap-2">
          {icon}

          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              <CardTitle className="text-lg">{title}</CardTitle>
            </a>
          ) : (
            <CardTitle className="text-lg">{title}</CardTitle>
          )}
        </div>

        {actions}
      </CardHeader>

      <CardContent className="space-y-2 p-0">
        {children}
      </CardContent>
    </Card>
  )
}

