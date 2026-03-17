# 24. Context Api

**PDF: páginas 117–118** (libro: 113–114)

---

[← Índice](README.md) | [← Anterior: 23. Fragments](23-00-fragments.md) | [Siguiente: 24.1. Lab Context Api →](24-01-lab-context-api.md)

---

## Context API

Cuando las aplicaciones van creciendo se vuelve muy difícil enviar datos desde los componentes
superiores a los componentes inferiores, además datos que son globales a toda la aplicación
tendríamos que pasarlos como propiedades por todo el árbol de componentes incluso por muchos
de ellos que seguramente no necesiten dichos datos.

Esto se puede solucionar fácilmente con alguna librería de gestión de estados como Redux, pero en
React implementaron algo que nos va a permitir compartir estos datos solo entre aquellos
componentes que los necesiten. Esto es el Context API.

Primero hay que crear un contexto que almacene los datos a compartir con otros componentes
```tsx
usando la función React.createContext.

export const MiContexto = React.createContext<string>('Aquí van los datos');
```
Después tenemos dos componentes:

- El Provider que es el que se va a encargar de proveer los datos. Este componente tiene que
envolver los componentes por los cuales se encuentre alguno que necesite los datos guardados
en el contexto.

```tsx
<MiContexto.Provider>
  <ComponenteA />
</MiContexto.Provider>
```
- El Consumer que es el componente que recibe los datos y se los pasa al componente que los
quiere utilizar. Recibe los datos como children en una función.

```tsx
<MiContexto.Consumer>
  {datos => (
     <p>Datos: {datos}</p>
  )}
</MiContexto.Consumer>
```
Algunos ejemplos para los que podríamos utilizar esta funcionalidad es para el tema de color de la
aplicación, el idioma en el que queremos mostrarla, saber si un usuario está logueado o no…

Podemos crear varios contextos o juntar datos dentro de un mismo contexto, eso depende de como
queramos organizar nuestro código.

Si los datos que se van a compartir a través de la Context API son dinámicos, es decir, que pueden
cambiar con las acciones de los usuarios, entonces tendremos que pasar estos datos como valor de
la propiedad value del provider, de tal forma que cada vez que estos sufran un cambio, los
consumidores puedan recibir la actualización automáticamente.

```tsx
<MiContexto.Provider value={datos}>
  <ComponenteA />
</MiContexto.Provider>
```
