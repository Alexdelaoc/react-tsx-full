# 16.2. Lab Lista Noticias

**PDF: páginas 59–61** (libro: 55–57)

---

[← Índice](README.md) | [← Anterior: 16.1. Atributo Key](16-01-atributo-key.md) | [Siguiente: 17. Eventos →](17-00-eventos.md)

---

En este laboratorio vamos a ver como mostrar una lista de noticias con los datos que se cargan de
un archivo JSON.

Vamos a copiar la plantilla del proyecto que se ha realizado en el laboratorio reactjs-proyecto-
inicial-lab y vamos a cambiarle el nombre del proyecto a reactjs-listas-lab.

Es posible que sea necesario volver a instalar las dependencias del proyecto para
que funcione correctamente. Para ello solo tenemos que lanzar el comando npm
install dentro de la carpeta del proyecto.

Ahora vamos a levantar el servidor de desarrollo con el comando:

```tsx
$ npm start
```

Empezamos por crear el archivo con los datos de las noticias a mostrar en src/data/noticias.json.

**Archivo:** `/reactjs-listas-lab/src/data/noticias.json`

```tsx
[
  {
    id: "8s63jd3las3",
    titulo: "Historiadores descubren que el caballo blanco de Santigo era blanco",

    contenido:
      "Rem ab, animi ea pariatur praesentium at omnis obcaecati officia ipsum aspernatur ratione doloribus debitis nisi eligendi illum architecto voluptates amet. Quibusdam voluptatibus, doloremque ipsa officia vitae quasireiciendis quod?",
  },
  {
    id: "36klsd38fdj",
    titulo: "El caballo del ajedrez se independiza y crea su propio juego de mesa de equitación",

    contenido:
      "Necessitatibus, sed nostrum fugit consectetur aliquam quaerat repellat eaque quo rerum esse culpa sequiexercitationem magni non ea officiis aut? Perspiciatis, aspernatur? Delectus ducimus non veritatis inventore quodlaboriosam tempora?",
  },
  {
    id: "hs2lsk8523i",
    titulo: "La orquesta del buque encallado en el Canal de Suez se niega a dejar de tocar",
    contenido:
      "Consectetur et consequatur sint. Quibusdam, nihil quasi modi dolorum, eaque doloribus vero id distinctio tenetur perspiciatis ducimus consequuntur aut iusto facilis itaque eum sequi dolores aspernatur explicabovoluptate laudantium minus.",
  },
  {
    id: "l29d64f-1s",
    titulo: "El Rover Perseverance atropella y pisa la única forma de vida que había en Marte",

    contenido:
      "Aliquid cupiditate omnis repellendus expedita laborum illo, corrupti voluptates sed, ducimus rerumeligendi? Adipisci voluptatum expedita eos quis beatae illum asperiores nemo omnis ratione? Blanditiis, deleniti? Remalias labore itaque.",
  },
  {
    id: "ux6-23e7c6",
    titulo: "España pondrá un sello a los turistas franceses para que puedan volver a entrar",

    contenido:
      "Aperiam commodi nemo beatae amet quibusdam? Sint quas ex dicta. Consequuntur quo pariatur corporis unde asperiores nesciunt reprehenderit cum, impedit, esse et omnis hic iste placeat voluptatum quisquam recusandae eius.",
  },
];
```

Ahora vamos a crear un componente Noticia dentro de la carpeta de components con el que
vamos a mostrar los datos de cada noticia.

Este componente recibirá como propiedad un objeto noticia con los datos de una noticia que
vamos a mostrar.

**Archivo:** `/reactjs-listas-lab/src/components/Noticia.tsx`

```tsx
const Noticia = ({ noticia }) => {
  return (
    <div>
      <h2>{noticia.titulo}</h2>
      <p>{noticia.contenido}</p>
    </div>
  );
};

export default Noticia;
```

Ahora nos vamos a ir al componente App donde empezaremos por cargar los datos de las noticias
del JSON, que será una simple importación del archivo.

**Archivo:** `/reactjs-listas-lab/src/components/App.tsx`

```tsx
import noticias from "../data/noticias.json";

const App = () => {
  return <div></div>;
};

export default App;
```

Una vez que tenemos los datos, usaremos el método map sobre el array de noticias con el que
vamos a crear un array de componentes Noticia.

**Archivo:** `/reactjs-listas-lab/src/components/App.tsx`

```tsx
import noticias from "../data/noticias.json";
import Noticia from "./Noticia";

const App = () => {
  return (
    <div>
      {noticias.map((noticia) => (
        <Noticia />
      ))}
    </div>
  );
};

export default App;
```

Ahora le vamos a pasar a cada componente Noticia la propiedad noticia con el objeto noticia que
obtenemos de iterar sobre el array, y además añadiremos la propiedad key cuyo valor será el
identificador de cada una de las noticias.

**Archivo:** `/reactjs-listas-lab/src/components/App.tsx`

```tsx
import noticias from "../data/noticias.json";
import Noticia from "./Noticia";

const App = () => {
  return (
    <div>
      {noticias.map((noticia) => (
        <Noticia key={noticia.id} noticia={noticia} />
      ))}
    </div>
  );
};

export default App;
```

Y con esto ya deberíamos de poder ver nuestras noticias en la aplicación.
