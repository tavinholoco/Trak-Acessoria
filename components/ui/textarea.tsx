import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Mesmo tratamento do Input (Fase B.5): canto reto, borda de 2px.
        "flex field-sizing-content min-h-32 w-full rounded-none border-2 border-foreground/30 bg-transparent px-4 py-3 text-base transition-colors outline-none placeholder:text-muted-foreground hover:border-foreground/60 focus-visible:border-foreground focus-visible:ring-3 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
