# 26.1. Lab Suspense

**PDF: páginas 138–141** (libro: 134–137)

---

[← Índice](README.md) | [← Anterior: 26. Suspense](26-00-suspense.md) | [Siguiente: 27. Portals →](27-00-portals.md)

---

En este laboratorio vamos a ver como cargar un componente únicamente cuando se pide
renderizarlo y no en el primer renderizado con el resto de la aplicación como venimos haciendo
hasta ahora.

Vamos a copiar la plantilla del proyecto que se ha realizado en el laboratorio reactjs-proyecto-
inicial-lab y vamos a cambiarle el nombre del proyecto a reactjs-suspense-lab.

Es posible que sea necesario volver a instalar las dependencias del proyecto para
que funcione correctamente. Para ello solo tenemos que lanzar el comando npm
install dentro de la carpeta del proyecto.

Ahora vamos a levantar el servidor de desarrollo con el comando:

```tsx
$ npm start
```
Empezaremos creando los dos componentes que mostraremos en nuestra aplicación.

**Archivo:** `/reactjs-suspense-lab/src/components/Inicio.tsx`

```tsx
const Inicio = () => {
  return (
    <div>
      <h1>Inicio</h1>
    </div>
  )
}

export default Inicio
```
**Archivo:** `/reactjs-suspense-lab/src/components/Admin.tsx`

```tsx
const Admin = () => {
  return (
    <div>
      <h1>Panel de administración</h1>
    </div>
  )
}

export default Admin
```
Ahora vamos a ir al componente raíz, el App, para mostrar un componente u otro dependiendo de
una condición.

**Archivo:** `/reactjs-suspense-lab/src/components/App.tsx`

```tsx
import { useState } from 'react';
import Inicio from './Inicio';
import Admin from './Admin';

const App = () => {
  const [esAdmin, setEsAdmin] = useState(false);

    return (
      <div>
        <button type="button" onClick={() => setEsAdmin(!esAdmin)}>Toggle admin</button>
        {esAdmin ? <Admin /> : <Inicio />}
      </div>
    )
}

export default App
```
Tal cual está el código ahora mismo todo el código se va a descargar la primera vez que entremos a
la aplicación. Ahora toca modificar este componente para hacer que el componente Admin solo se
descargue cuando se vaya a mostrar, por lo que vamos a importar Suspense y lazy que
utilizaremos para ello.

**Archivo:** `/reactjs-suspense-lab/src/components/App.tsx`

```tsx
import { Suspense, lazy, useState } from 'react';
import Inicio from './Inicio';
import Admin from './Admin';

const App = () => {
  const [esAdmin, setEsAdmin] = useState(false);

    return (
      <div>
        <button type="button" onClick={() => setEsAdmin(!esAdmin)}>Toggle admin</button>
        {esAdmin ? <Admin /> : <Inicio />}
      </div>
    )
}

export default App
```
El siguiente paso es envolver el componente de Admin entre las etiquetas de Suspense y añadir
sobre esta la propiedad fallback con el componente o elemento a mostrar mientras se descarga el
componente de forma diferida.

Dentro del componente Suspense meteremos el componente de Admin.

**Archivo:** `/reactjs-suspense-lab/src/components/App.tsx`

```tsx
import { Suspense, lazy, useState } from 'react';
import Inicio from './Inicio';
import Admin from './Admin';

const App = () => {
  const [esAdmin, setEsAdmin] = useState(false);

return (
  <div>
    <button type="button" onClick={() => setEsAdmin(!esAdmin)}>Toggle admin</button>
    {

esAdmin
?
<Suspense fallback={<p>Loading...</p>}>
   <Admin />
</Suspense>

:
          <Inicio />
        }
      </div>
    )
}

export default App
```
Por último, usaremos la función lazy para importar dentro de ella el componente de Admin para
que solo se descargue su código cuando se ejecute la función que le pasamos como parámetro.

**Archivo:** `/reactjs-suspense-lab/src/components/App.tsx`

```tsx
import { Suspense, lazy, useState } from 'react';
import Inicio from './Inicio';

const Admin = lazy(() => import('./Admin'));

const App = () => {
  const [esAdmin, setEsAdmin] = useState(false);

return (
  <div>
    <button type="button" onClick={() => setEsAdmin(!esAdmin)}>Toggle admin</button>
    {
esAdmin
?
<Suspense fallback={<p>Loading...</p>}>
   <Admin />
</Suspense>
:

            <Inicio />
          }
        </div>
    )
}

export default App
```
Ahora podemos comprobar que cuando entramos en la página se muestra el componente Inicio, y
al pulsar el botón para mostrar el componente de Admin podremos ver que se descarga su código
desde la pestaña de Developer tools > Network.
