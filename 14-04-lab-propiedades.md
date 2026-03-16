# 14.4. Lab Propiedades

**PDF: páginas 50–53** (libro: 46–49)

---

[← Índice](README.md) | [← Anterior: 14.3. Validacion Propiedades Personalizadas](14-03-validacion-propiedades-personalizadas.md) | [Siguiente: 15. Renderizado Condicional →](15-00-renderizado-condicional.md)

---

En este laboratorio vamos a ver como pasar a un mismo componente distintas propiedades para
poder reutilizarlo y que nos muestre la misma estructura pero con distintos datos.

Vamos a copiar la plantilla del proyecto que se ha realizado en el laboratorio reactjs-proyecto-
inicial y vamos a cambiarle el nombre del proyecto a reactjs-propiedades-lab.

Es posible que sea necesario volver a instalar las dependencias del proyecto para
que funcione correctamente. Para ello solo tenemos que lanzar el comando npm
install dentro de la carpeta del proyecto.

Ahora vamos a levantar el servidor de desarrollo con el comando:

```tsx
$ npm start
```

Una vez que tenemos el proyecto levantado, vamos a crear un componente funcional Sugus dentro
de la carpeta components.

Dentro de este componente vamos a poner la estructura inicial de este en el que nos encontraremos
con un div que hará de envoltorio de los sugus, y un párrafo para poner el sabor de los sugus.

**Archivo:** `/reactjs-propiedades-lab/src/components/Sugus.tsx`

```tsx
const Sugus = () => {
  // Hay que cambiarlo por el color de cada sugus
  const color = "white";
  return (
    <div>
      <p>Aquí va el sabor</p>
    </div>
  );
};

export default Sugus;
```

También le añadiremos unos estilos desde JavaScript, aplicándolos al atributo style.

**Archivo:** `/reactjs-propiedades-lab/src/components/Sugus.tsx`

```tsx
const styles = {
  envoltorio: {
     border: '1px solid black',
     width: '100px',
     height: '100px',
     borderRadius: '5px',
     color: 'white',
     position: 'relative',
     margin: '10px',
     overflow: 'hidden',
  },
  letras: {
  textAlign: 'center',
  transformOrigin: 'center center',
  transform: 'rotate(-45deg)',
  position: 'absolute',
  top: '25px',
  left: '30px',
  textShadow: '60px 0px 0px, -60px 0px 0px, -25px 30px 0px, 25px -30px 0px, 30px 30px 0px, -30px -30px 0px, 0px 60px
  0px, 0px -60px 0px',
  }
}

const Sugus = () => {
  // Hay que cambiarlo por el color de cada sugus
  const color = 'white'
  return (
    <div style={{...styles.envoltorio, backgroundColor: color}}>
      <p style={styles.letras}>Aquí va el sabor</p>
    </div>
  )
}

export default Sugus
```

Una vez que tenemos el componente sugus, vamos a ir al componente App para utilizar este.

Dentro de este otro componente, vamos a añadir la etiqueta de nuestro componente Sugus cinco
veces, una por cada sugus que existe.

**Archivo:** `/reactjs-propiedades-lab/src/components/App.tsx`

```tsx
import Sugus from "./Sugus";

const App = () => {
  return (
    <div>
      <Sugus />
      <Sugus />
      <Sugus />
      <Sugus />
      <Sugus />
    </div>
  );
};

export default App;
```

Y ahora que tenemos el componente varias veces, vamos a añadir sus propiedades para cada uno
de ellos. Las propiedades se añaden como atributos de las etiquetas HTML, por lo que vamos a
añadirle a cada etiqueta Sugus, un atributo sabor y otro color, con los valores que queremos que
se pinten estos.

**Archivo:** `/reactjs-propiedades-lab/src/components/App.tsx`

```tsx
import Sugus from "./Sugus";

const App = () => {
  return (
    <div>
      <Sugus sabor="limón" color="#FDE23A" />
      <Sugus sabor="naranja" color="#F28E40" />
      <Sugus sabor="piña" color="#227BBE" />
      <Sugus sabor="cereza" color="#AD3B52" />
      <Sugus sabor="fresa" color="#EA464C" />
    </div>
  );
};

export default App;
```

Una vez añadidas las propiedades, vamos a ver como las recibimos en el componente Sugus.

Como parámetro de la función del componente Sugus recibimos un objeto props, dentro del cual
encontraremos dos claves con sus dos valores, el color y el sabor. Por tanto, allí donde debemos
poner estos dos valores, vamos a asignar el valor de las propiedades.

**Archivo:** `/reactjs-propiedades-lab/src/components/Sugus.tsx`

```tsx
const styles = {
  envoltorio: {
    border: "1px solid black",
    width: "100px",
    height: "100px",
    borderRadius: "5px",
    color: "white",
    position: "relative",
    margin: "10px",
    overflow: "hidden",
  },
  letras: {
    textAlign: "center",
    transformOrigin: "center center",
    transform: "rotate(-45deg)",
    position: "absolute",
    top: "25px",
    left: "30px",
    textShadow: "60px 0px 0px, -60px 0px 0px, -25px 30px 0px, 25px -30px 0px, 30px 30px 0px, -30px -30px 0px, 0px 60px 0px, 0px -60px 0px",
  },
};

interface SugusProps {
  sabor: string;
  color: string;
}

const Sugus = ({ sabor, color }: SugusProps) => {
  return (
    <div style={{ ...styles.envoltorio, backgroundColor: color }}>
      <p style={styles.letras}>{sabor}</p>
    </div>
  );
};

export default Sugus;
```

Y con esto, hemos conseguido pintar los 5 tipos de sugus que existen utilizando un único

componente y pasandole los datos necesarios para pintarse como debe desde el exterior a través
del uso de las propiedades.
