import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Escala e forma da identidade Trak: caixa-alta e tracking, mas cantos
 * arredondados. Uma versão anterior usava canto reto com borda de 2px e
 * alturas de 40/44/56px; ficou pesada demais, o CTA do header lia como um
 * bloco quadrado e os do Hero brigavam com a headline em vez de acompanhá-la.
 * As alturas agora são 32/36/40/48px — acima dos 24/28/32/36 do padrão shadcn,
 * que sumiam ao lado da tipografia gigante, e abaixo do exagero anterior.
 *
 * `hover` inverte para foreground/background — o mesmo "hover exagerado"
 * (RF-11) dos cards de Serviços, que invertem para o vermelho.
 */
const buttonVariants = cva(
  // Cor da borda e tracking são declarados por variante/tamanho, nunca na base:
  // dois utilitários sem modificador (`border-transparent` na base contra
  // `border-foreground` na variante, `tracking-[0.12em]` contra
  // `tracking-[0.1em]`) não têm especificidade para desempatar, e quem vence é
  // a ordem do CSS gerado. Era o que apagava a borda do botão `outline` e o que
  // deixava o tracking do tamanho `xs` sem efeito.
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border font-bold uppercase whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground hover:border-foreground hover:bg-foreground hover:text-background",
        // `border-foreground`: o antigo `border-border` (#0f0f0f1a) sobre o
        // papel #F7F4EE era invisível no tema claro (Fase A.2).
        outline:
          "border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background aria-expanded:bg-foreground aria-expanded:text-background",
        secondary:
          "border-secondary bg-secondary text-secondary-foreground hover:border-foreground hover:bg-foreground hover:text-background aria-expanded:border-secondary aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "border-transparent hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-2 px-4 text-xs tracking-[0.1em] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-8 gap-1.5 px-2.5 text-[0.6875rem] tracking-[0.08em] has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-3.5 text-xs tracking-[0.1em] has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2 px-6 text-sm tracking-[0.12em] has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-10",
        "icon-xs": "size-8 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
