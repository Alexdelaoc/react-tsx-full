# 22. Propiedad Children

**PDF: páginas 109–109** (libro: 105–105)

---

[← Índice](README.md) | [← Anterior: 21.1. Lab Referencias](21-01-lab-referencias.md) | [Siguiente: 22.1. Lab Propiedad Children →](22-01-lab-propiedad-children.md)

---

## Propiedad children

A veces nos encontramos con algunos componentes en los que su contenido no es algo fijo, sino que
podemos cambiarlo dependiendo de donde queramos utilizarlo como por ejemplo:

- Un carrousel de componentes (dentro podemos tener imagenes, cards…)

- Un componente colapsable (dentro podemos tener texto simple, listas…)

El contenido de estos componentes se les pasa entre las etiquetas de apertura y cierre de los
componentes contenedores.

```tsx
<MiBoton>Texto del botón</MiBoton>
```
El valor que tenemos entre las etiquetas de nuestros componentes le llegan a estos dentro de la
propiedad `children`.

```tsx
import type { ReactNode, FC } from 'react'

type MiBotonProps = {
  children: ReactNode
}

const MiBoton: FC<MiBotonProps> = ({ children }) => {
  return <button type="button">{children}</button>
}
```