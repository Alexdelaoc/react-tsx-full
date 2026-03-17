# 25.2. Lab Hoc Cargar Datos

**PDF: páginas 130–136** (libro: 126–132)

---

[← Índice](README.md) | [← Anterior: 25.1. Lab Hoc Estilos](25-01-lab-hoc-estilos.md) | [Siguiente: 26. Suspense →](26-00-suspense.md)

---

En este laboratorio vamos a ver como crear un higher order component que se encargará de pedir
unos datos para inyectarlos en un componente, y mostrar un spinner mientras se piden.

Vamos a copiar la plantilla del proyecto que se ha realizado en el laboratorio reactjs-proyecto-
inicial-lab y vamos a cambiarle el nombre del proyecto a reactjs-higher-order-components-
cargar-datos-lab.

Es posible que sea necesario volver a instalar las dependencias del proyecto para
que funcione correctamente. Para ello solo tenemos que lanzar el comando `npm
install` dentro de la carpeta del proyecto.

Ahora vamos a levantar el servidor de desarrollo con el comando:

```tsx
$ npm start
```

Empezaremos creando la siguiente estructura de archivos que después iremos rellenando:

- `src/hoc/withData.js`

- `src/components/InfoUsuario.tsx`

En este lab vamos a implementar el HOC **solo con funciones flecha y hooks**, sin clases.

---

## Paso 1: HOC básico con función flecha

Vamos a empezar a rellenar el hoc `withData` con una **función flecha** que recibe el componente
`WrappedCmp` y devuelve otro componente funcional que simplemente lo renderiza con las props
que reciba.

**Archivo:** `/reactjs-higher-order-components-cargar-datos-lab/src/hoc/withData.tsx`

```tsx
import type { ComponentType } from 'react'

const withData = <P extends object>(
  WrappedCmp: ComponentType<P>
) => {
  const WithData = (props: P) => {
    return (
      <>
        <WrappedCmp {...props} />
      </>
    )
  }

  return WithData
}

export default withData
```

La idea es que desde este hoc realicemos una petición GET a una URL para obtener los datos que se
le van a pasar a nuestro componente. Entonces vamos a hacer que nuestro hoc reciba también la
URL.

---

## Paso 2: Pedir datos con `fetch` y `useState`

Una vez que tenemos la URL, tenemos que hacer la petición, pero los datos recibidos tendremos que
almacenarlos en algún sitio para poder pasárselos al componente. Para ello usaremos **hooks**
(`useState` y `useEffect`) en lugar de clases.

**Archivo:** `/reactjs-higher-order-components-cargar-datos-lab/src/hoc/withData.tsx`

```tsx
import { useEffect, useState, type ComponentType } from 'react'

const withData = <P extends object, TData = unknown>(
  WrappedCmp: ComponentType<P & { data: TData | null }>,
  url: string
) => {
  const WithData = (props: P) => {
    const [data, setData] = useState<TData | null>(null)

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(url)
        const datos: TData = await response.json()
        setData(datos)
      }

      fetchData()
    }, [url])

    return (
      <>
        <WrappedCmp {...props} data={data} />
      </>
    )
  }

  return WithData
}

export default withData
```

Ahora que tenemos los datos ya se los podemos pasar a nuestro componente `WrappedCmp` de la
misma forma en que le pasamos cualquier valor, en forma de propiedad (`data`).

---

## Paso 3: Añadir estado de `cargandoDatos` y mostrar loading

Vamos a mejorar el HOC para hacer que **no se pinte el componente** que espera los datos hasta que
se hayan obtenido estos. Mientras se obtienen vamos a mostrar un mensaje de `Loading...`.

Para hacer esto vamos a añadir otro estado `cargandoDatos` que inicializamos a `true`, y mientras
este valor sea `true`, se mostrará el mensaje de loading.

**Archivo:** `/reactjs-higher-order-components-cargar-datos-lab/src/hoc/withData.tsx`

```tsx
import { useEffect, useState, type ComponentType } from 'react'

const withData = <P extends object, TData = unknown>(
  WrappedCmp: ComponentType<P & { data: TData | null }>,
  url: string
) => {
  const WithData = (props: P) => {
    const [data, setData] = useState<TData | null>(null)
    const [cargandoDatos, setCargandoDatos] = useState(true)

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(url)
        const datos: TData = await response.json()
        setData(datos)
        setCargandoDatos(false)
      }

      fetchData()
    }, [url])

    return (
      <>
        {cargandoDatos ? <p>Loading...</p> : <WrappedCmp {...props} data={data} />}
      </>
    )
  }

  return WithData
}

export default withData
```

---

## Paso 4: Simular retardo con `setTimeout`

De momento el mensaje de loading puede verse muy rápido. Vamos a poner el cambio de estado
dentro de un `setTimeout` para simular un pequeño retardo y ver que el mensaje se muestra.

**Archivo:** `/reactjs-higher-order-components-cargar-datos-lab/src/hoc/withData.tsx`

```tsx
import { useEffect, useState, type ComponentType } from 'react'

const withData = <P extends object, TData = unknown>(
  WrappedCmp: ComponentType<P & { data: TData | null }>,
  url: string
) => {
  const WithData = (props: P) => {
    const [data, setData] = useState<TData | null>(null)
    const [cargandoDatos, setCargandoDatos] = useState(true)

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(url)
        const datos: TData = await response.json()

        setTimeout(() => {
          setData(datos)
          setCargandoDatos(false)
        }, 1400)
      }

      fetchData()
    }, [url])

    return (
      <>
        {cargandoDatos ? <p>Loading...</p> : <WrappedCmp {...props} data={data} />}
      </>
    )
  }

  return WithData
}

export default withData
```

---

## Paso 5: Hacer configurable el loader

Por último para dejar este componente más completo, vamos a hacer que el loading se le pueda
configurar mandándoselo como parámetro del HOC de tal forma que podamos mostrar mensajes o
spinners que se adapten mejor a nuestra aplicación.

**Archivo:** `/reactjs-higher-order-components-cargar-datos-lab/src/hoc/withData.tsx`

```tsx
import { useEffect, useState, type ComponentType, type ReactNode } from 'react'

const withData = <P extends object, TData = unknown>(
  WrappedCmp: ComponentType<P & { data: TData | null }>,
  url: string,
  Loader: ReactNode = <p>Loading...</p>
) => {
  const WithData = (props: P) => {
    const [data, setData] = useState<TData | null>(null)
    const [cargandoDatos, setCargandoDatos] = useState(true)

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(url)
        const datos: TData = await response.json()

        setTimeout(() => {
          setData(datos)
          setCargandoDatos(false)
        }, 1400)
      }

      fetchData()
    }, [url])

    return (
      <>
        {cargandoDatos ? Loader : <WrappedCmp {...props} data={data} />}
      </>
    )
  }

  return WithData
}

export default withData
```

---

## Paso 6: Componente `InfoUsuario` (función flecha)

Ahora que tenemos el HOC completo, vamos a crear el componente que recibirá los datos y los
pintará.

**Archivo:** `/reactjs-higher-order-components-cargar-datos-lab/src/components/InfoUsuario.tsx`

```tsx
type RandomUserApiResponse = {
  results: Array<{
    name: {
      first: string
      last: string
    }
    email: string
    picture: {
      medium: string
    }
  }>
}

type InfoUsuarioProps = {
  data: RandomUserApiResponse
}

const InfoUsuario = ({ data }: InfoUsuarioProps) => {
  const { name, email, picture } = data.results[0]

  return (
    <div>
      <h2>
        {name.first} {name.last}
      </h2>
      <img src={picture.medium} alt={`Foto de ${name.first}`} />
      <p>✉️: {email}</p>
    </div>
  )
}

export default InfoUsuario
```

---

## Paso 7: Usar el HOC en `App` (función flecha)

Y ahora en el componente `App` vamos a utilizar nuestro HOC `withData` para inyectar en el
componente `InfoUsuario` los datos que obtenemos de la API de `https://randomuser.me/api/`.

**Archivo:** `/reactjs-higher-order-components-cargar-datos-lab/src/components/App.tsx`

```tsx
import withData from '../hoc/withData'
import InfoUsuario from './InfoUsuario'
import type { RandomUserApiResponse } from '../types/randomUser'

const App = () => {
  const InfoUsuarioWithData = withData<{}, RandomUserApiResponse>(
    InfoUsuario,
    'https://randomuser.me/api/'
  )

  return (
    <div>
      <InfoUsuarioWithData />
    </div>
  )
}

export default App
```

Con esto ya deberíamos de ver la información aleatoria de un usuario con el loader mientras se
cargan los datos.

---

## Paso 8: Usar un spinner más “molón”

Para hacer un poco más molón el ejemplo, vamos a utilizar algún spinner más currado. Para ello
utilizaremos la dependencia de `spinners-react` que podemos encontrar en:

`https://adexin.github.io/spinners/`.

Instalamos la dependencia en nuestro proyecto lanzando el comando:

```tsx
$ npm install --save spinners-react
```

Una vez instalada, buscamos el spinner que más nos guste y lo importamos dentro de nuestro
componente principal, y se lo vamos a pasar a nuestro HOC.

**Archivo:** `/reactjs-higher-order-components-cargar-datos-lab/src/components/App.tsx`

```tsx
import withData from '../hoc/withData'
import InfoUsuario from './InfoUsuario'
import { SpinnerDotted } from 'spinners-react'
import type { RandomUserApiResponse } from '../types/randomUser'

const App = () => {
  const InfoUsuarioWithData = withData<{}, RandomUserApiResponse>(
    InfoUsuario,
    'https://randomuser.me/api/',
    <SpinnerDotted size={50} thickness={100} speed={100} color="#36ad47" />
  )

  return (
    <div>
      <InfoUsuarioWithData />
    </div>
  )
}

export default App
```

