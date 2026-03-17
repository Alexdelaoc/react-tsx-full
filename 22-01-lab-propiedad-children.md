# 22.1. Lab Propiedad Children

**PDF: páginas 110–114** (libro: 106–110)

---

[← Índice](README.md) | [← Anterior: 22. Propiedad Children](22-00-propiedad-children.md) | [Siguiente: 23. Fragments →](23-00-fragments.md)

---

En este laboratorio vamos a ver como utilizar la propiedad `children` en un componente que se
puede colapsar, trabajando **en TypeScript y TSX** y aprovechando los tipos para proteger qué
tipo de contenido puede ir dentro del acordeón.

Vamos a copiar la plantilla del proyecto que se ha realizado en el laboratorio `reactjs-proyecto-
inicial-lab` y vamos a cambiarle el nombre del proyecto a `reactjs-children-lab`.

Es posible que sea necesario volver a instalar las dependencias del proyecto para
que funcione correctamente. Para ello solo tenemos que lanzar el comando `npm
install` dentro de la carpeta del proyecto.

Ahora vamos a levantar el servidor de desarrollo con el comando:

```tsx
$ npm start
```

Empezaremos creando el componente `Acordeon` que se va a componer de una cabecera que
siempre se va a mostrar y el contenido que es aquello que queremos ocultar o expandir según
pulsemos sobre la cabecera.

---

## 1. Acordeón base con `children: ReactNode`

Primero vamos a definir un acordeón que acepte **cualquier contenido** como `children`, tipado
con `ReactNode`.

**Archivo:** `/reactjs-children-lab/src/components/Acordeon.tsx`

```tsx
import type { ReactNode, FC } from 'react'

type AcordeonProps = {
  children: ReactNode
  titulo: string
  cerrado?: boolean
}

const Acordeon: FC<AcordeonProps> = ({ children, titulo, cerrado = true }) => {
  return (
    <div>
      <div>
        <h3>{titulo}</h3>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Acordeon
```

Tanto el título como el contenido del acordeón vendrán desde los componentes superiores, por
tanto los vamos a recibir como propiedades **tipadas**.

Como el contenido no tiene porque mostrarse siempre con los mismos elementos de HTML, sino
que una vez podemos querer mostrar una lista, mientras que otra solo un párrafo de información,
vamos a pintar aquí aquello que pasen entre las etiquetas de apertura y cierre del componente. Es
decir, usaremos la propiedad `children` para indicar cuál es el contenido del `Acordeon`.

Otra propiedad que vamos a recibir es la que indica si el contenido tiene que aparecer expandido o
no al crear el componente.

---

## 2. Añadir estado en el acordeón

Ahora vamos a añadir un estado para indicarle al componente si tiene que estar colapsado o
expandido.

**Archivo:** `/reactjs-children-lab/src/components/Acordeon.tsx`

```tsx
import type { ReactNode, FC } from 'react'
import { useState } from 'react'

type AcordeonProps = {
  children: ReactNode
  titulo: string
  cerrado?: boolean
}

const Acordeon: FC<AcordeonProps> = ({ children, titulo, cerrado = true }) => {
  const [estaCerrado, setEstaCerrado] = useState<boolean>(cerrado)

  return (
    <div>
      <div>
        <h3>{titulo}</h3>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Acordeon
```

---

## 3. Sincronizar el estado con la prop `cerrado`

Como podemos indicarle desde la propiedad `cerrado` el estado inicial y la propiedad puede
cambiar desde el exterior, vamos a utilizar el hook de `useEffect` para inicializar y sincronizar el
estado con esa propiedad.

**Archivo:** `/reactjs-children-lab/src/components/Acordeon.tsx`

```tsx
import type { ReactNode, FC } from 'react'
import { useState, useEffect } from 'react'

type AcordeonProps = {
  children: ReactNode
  titulo: string
  cerrado?: boolean
}

const Acordeon: FC<AcordeonProps> = ({ children, titulo, cerrado = true }) => {
  const [estaCerrado, setEstaCerrado] = useState<boolean>(cerrado)

  useEffect(() => {
    setEstaCerrado(cerrado)
  }, [cerrado])

  return (
    <div>
      <div>
        <h3>{titulo}</h3>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Acordeon
```

---

## 4. Añadir el evento `onClick` en la cabecera

También tenemos que añadir el evento `click` sobre la cabecera para poder expandir y colapsar el
contenido.

**Archivo:** `/reactjs-children-lab/src/components/Acordeon.tsx`

```tsx
import type { ReactNode, FC } from 'react'
import { useState, useEffect } from 'react'

type AcordeonProps = {
  children: ReactNode
  titulo: string
  cerrado?: boolean
}

const Acordeon: FC<AcordeonProps> = ({ children, titulo, cerrado = true }) => {
  const [estaCerrado, setEstaCerrado] = useState<boolean>(cerrado)

  useEffect(() => {
    setEstaCerrado(cerrado)
  }, [cerrado])

  return (
    <div>
      <div onClick={() => setEstaCerrado(!estaCerrado)}>
        <h3>{titulo}</h3>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Acordeon
```

---

## 5. Estilos del acordeón

Para que se vea un poco mejor el `Acordeon` vamos a crear un archivo de estilo en el que
aprovecharemos para añadir las clases de abierto y cerrado que se encargan de modificar la
altura del contenido para que se colapse o se expanda.

**Archivo:** `/reactjs-children-lab/src/style.css`

```css
.acordeon {
  border: 1px solid black;
  border-radius: 5px;
}

.acordeon-heading {
  text-align: center;
  border-bottom: 2px solid black;
  cursor: pointer;
}

.acordeon-content {
  overflow: hidden;
}

.acordeon-content.cerrado {
  height: 0;
}

.acordeon-content.abierto {
  height: auto;
  padding: 20px;
}
```

Ahora importamos el archivo de estilos y le añadimos a nuestro componente las clases anteriores
en sus elementos correspondientes.

**Archivo:** `/reactjs-children-lab/src/components/Acordeon.tsx`

```tsx
import type { ReactNode, FC, ReactElement } from 'react'
import { useState, useEffect } from 'react'
import './Acordeon.css'

type AcordeonProps = {
  children: ReactNode
  titulo: string
  cerrado?: boolean
}

const Acordeon: FC<AcordeonProps> = ({ children, titulo, cerrado = true }) => {
  const [estaCerrado, setEstaCerrado] = useState<boolean>(cerrado)

  useEffect(() => {
    setEstaCerrado(cerrado)
  }, [cerrado])

  return (
    <div className="acordeon">
      <div
        className="acordeon-heading"
        onClick={() => setEstaCerrado(!estaCerrado)}
      >
        <h3>{titulo}</h3>
      </div>
      <div
        className={
          'acordeon-content ' + (estaCerrado ? 'cerrado' : 'abierto')
        }
      >
        {children}
      </div>
    </div>
  )
}
```

---

## 6. Versión con `children` tipado para listas (`<ul>`)

Hasta ahora, `children` es un `ReactNode` genérico. Vamos a crear una **variante** del acordeón
que solo acepte una lista (`<ul>`) como contenido, para que el tipo nos proteja de errores al usarlo.

**Archivo:** `/reactjs-children-lab/src/components/Acordeon.tsx`

```tsx
// ... mismo código anterior de imports y Acordeon ...

type AcordeonListaProps = {
  titulo: string
  cerrado?: boolean
  children: ReactElement<'ul'>
}

export const AcordeonLista: FC<AcordeonListaProps> = ({
  children,
  titulo,
  cerrado = true,
}) => {
  const [estaCerrado, setEstaCerrado] = useState<boolean>(cerrado)

  useEffect(() => {
    setEstaCerrado(cerrado)
  }, [cerrado])

  return (
    <div className="acordeon">
      <div
        className="acordeon-heading"
        onClick={() => setEstaCerrado(!estaCerrado)}
      >
        <h3>{titulo}</h3>
      </div>
      <div
        className={
          'acordeon-content ' + (estaCerrado ? 'cerrado' : 'abierto')
        }
      >
        {children}
      </div>
    </div>
  )
}

export default Acordeon
```

Con `children: ReactElement<'ul'>` estamos diciendo que este acordeón solo admite exactamente
un elemento `<ul>` como contenido. Si intentamos pasarle otra cosa (por ejemplo un `<div>`),
TypeScript nos avisará.

---

## 7. Usar el acordeón en `App.tsx`

Por último, vamos a utilizar ambos componentes en `App` para mostrar varias cosas que se puedan
colapsar.

**Archivo:** `/reactjs-children-lab/src/components/App.tsx`

```tsx
import type { FC } from 'react'
import Acordeon, { AcordeonLista } from './Acordeon'

const App: FC = () => {
  return (
    <div>
      <AcordeonLista titulo="Una lista de productos">
        <ul>
          <li>Albahaca</li>
          <li>Queso parmesano</li>
          <li>Pechuga de pollo</li>
          <li>Tomates</li>
        </ul>
      </AcordeonLista>

      <Acordeon titulo="Librería JS" cerrado={false}>
        <div>
          <h4>¿Qué es React?</h4>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/300px-React.svg.png"
            alt="Logo de React"
          />
          <p>
            React es una librería de JS que permite pintar interfaces de
            usuario...
          </p>
        </div>
      </Acordeon>
    </div>
  )
}

export default App
```

Con esto, en este lab has practicado:

- Tipar `children` con `ReactNode` en un acordeón genérico.
- Definir un tipo de props en TypeScript (`AcordeonProps` y `AcordeonListaProps`).
- Usar `FC` y `useState<boolean>` / `useEffect` con TypeScript.
- Crear una variante `AcordeonLista` que solo admite `<ul>` como contenido utilizando
  `ReactElement<'ul'>`, protegiendo así el tipo de `children`.

