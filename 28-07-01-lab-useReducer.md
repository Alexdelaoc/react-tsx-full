# 28.7.1. Lab Usereducer

**PDF: páginas 177–181** (libro: 173–177)

---

[← Índice](README.md) | [← Anterior: 28.6. Useref](28-06-useRef.md) | [Siguiente: 28.7. Usereducer →](28-07-useReducer.md)

---

En este laboratorio vamos a ver como mover un cuadrado por la ventana usando las teclas de las
flechas y gestionando el estado con el hook useReducer.

Vamos a copiar la plantilla del proyecto que se ha realizado en el laboratorio reactjs-proyecto-
inicial y vamos a cambiarle el nombre del proyecto a reactjs-hooks-usereducer-lab.

Es posible que sea necesario volver a instalar las dependencias del proyecto para
que funcione correctamente. Para ello solo tenemos que lanzar el comando npm
install dentro de la carpeta del proyecto.

Ahora vamos a levantar el servidor de desarrollo con el comando:

```tsx
$ npm start
```

Empezamos por crear un componente Caja que será el componente que vamos a mover por la
pantalla.

**Archivo:** `/reactjs-hooks-usereducer-lab/src/components/Caja.tsx`

```tsx
import React from "react";

const Caja = () => {
  return <div style={{ width: "100px", height: "100px", backgroundColor: "darkred", position: "absolute", left: "0px", top: "0px" }}></div>;
};

export default Caja;
```

Ahora que tenemos la caja, vamos a mostrarla en el componente App de la aplicación.

**Archivo:** `/reactjs-hooks-usereducer-lab/src/components/App.tsx`

```tsx
import React, { Component } from "react";
import Caja from "./Caja";

class App extends Component {
  render() {
    return (
      <div>
        <Caja />
      </div>
    );
  }
}

export default App;
```

Ahora vamos a crear nuestro reducer para gestionar la posición de la caja en la pantalla. Para esto
vamos a usar el hook useReducer al que le vamos a pasar una función de reducer y el estado
inicial como parámetros.

El estado será un objeto con la posición X e Y en la pantalla e inicialmente pondremos la caja
centrada en la pantalla.

En cuanto al reducer, es la función que va a recibir el estado actual y una acción que indica que
cambios hay que realizar al estado. En este caso en la acción recibiremos la tecla que se ha pulsado
y dentro de un bloque switch sumaremos o restaremos un valor a las coordenadas del estado
dependiendo de las teclas pulsadas.

**Archivo:** `/reactjs-hooks-usereducer-lab/src/components/Caja.tsx`

```tsx
import React from "react";

const initialState = {
  posX: window.innerWidth / 2 - 50,
  posY: window.innerHeight / 2 - 50,
};

function reducer(state, action) {
  switch (action.type) {
    case "ArrowLeft":
      return { ...state, posX: `${parseInt(state.posX) - 10}px` };
    case "ArrowRight":
      return { ...state, posX: `${parseInt(state.posX) + 10}px` };
    case "ArrowUp":
      return { ...state, posY: `${parseInt(state.posY) - 10}px` };
    case "ArrowDown":
      return { ...state, posY: `${parseInt(state.posY) + 10}px` };
    default:
      return state;
  }
}

const Caja = () => {
  return <div style={{ width: "100px", height: "100px", backgroundColor: "darkred", position: "absolute", left: "0px", top: "0px" }}></div>;
};

export default Caja;
```

Ahora que tenemos el reducer y el estado inicial, vamos a añadir el hook dentro del componente al
que le vamos a pasar estos dos argumentos y nos va a devolver el estado actual que serán las
coordenadas y la función de dispatch para poder emitir acciones al reducer.

Ya que tenemos las coordenadas, vamos a darselas como valor a las propiedades left y top de los
estilos del componente.

**Archivo:** `/reactjs-hooks-usereducer-lab/src/components/Caja.tsx`

```tsx
import React, { useReducer } from "react";

const initialState = {
  posX: window.innerWidth / 2 - 50,
  posY: window.innerHeight / 2 - 50,
};

function reducer(state, action) {
  switch (action.type) {
    case "ArrowLeft":
      return { ...state, posX: `${parseInt(state.posX) - 10}px` };
    case "ArrowRight":
      return { ...state, posX: `${parseInt(state.posX) + 10}px` };
    case "ArrowUp":
      return { ...state, posY: `${parseInt(state.posY) - 10}px` };
    case "ArrowDown":
      return { ...state, posY: `${parseInt(state.posY) + 10}px` };
    default:
      return state;
  }
}

const Caja = () => {
  const [coords, dispatch] = useReducer(reducer, initialState);

  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "darkred",
        position: "absolute",
        left: coords.posX,
        top: coords.posY,
      }}
    ></div>
  );
};

export default Caja;
```

Con estos cambios, la caja debería de aparecer centrada en la página, y solo nos queda poder
moverla.

Empezamos por añadir una función que recibe un evento y despacha la acción en la que se pasa el
nombre de la tecla que se ha pulsado.

**Archivo:** `/reactjs-hooks-usereducer-lab/src/components/Caja.tsx`

```tsx
import React, { useReducer } from "react";

const initialState = {
  posX: window.innerWidth / 2 - 50,
  posY: window.innerHeight / 2 - 50,
};

function reducer(state, action) {
  switch (action.type) {
    case "ArrowLeft":
      return { ...state, posX: `${parseInt(state.posX) - 10}px` };
    case "ArrowRight":
      return { ...state, posX: `${parseInt(state.posX) + 10}px` };
    case "ArrowUp":
      return { ...state, posY: `${parseInt(state.posY) - 10}px` };
    case "ArrowDown":
      return { ...state, posY: `${parseInt(state.posY) + 10}px` };
    default:
      return state;
  }
}

const Caja = () => {
  const [coords, dispatch] = useReducer(reducer, initialState);

  const dispatchAction = (e) => {
    dispatch({ type: e.key });
  };

  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "darkred",
        position: "absolute",
        left: coords.posX,
        top: coords.posY,
      }}
    ></div>
  );
};

export default Caja;
```

Para moverla con las flechas del teclado, necesitamos añadir un listener del evento keydown sobre
la página del navegador cuando se cargue este componente, además de que tendremos que quitar
el listener si el componente se elimina.
Vamos a usar el hook de useEffect donde añadiremos estos listeners y como solo queremos que
este hook se ejecute una sola vez, le pasaremos como segundo parámetro un array vacio. Y para poder eliminar el listener tendremos que devolver dentro del useEffect una función en la que llamemos al removeEventListener.

**Archivo:** `/reactjs-hooks-usereducer-lab/src/components/Caja.tsx`

```tsx
import React, { useReducer, useEffect } from "react";

const initialState = {
  posX: window.innerWidth / 2 - 50,
  posY: window.innerHeight / 2 - 50,
};

function reducer(state, action) {
  switch (action.type) {
    case "ArrowLeft":
      return { ...state, posX: `${parseInt(state.posX) - 10}px` };
    case "ArrowRight":
      return { ...state, posX: `${parseInt(state.posX) + 10}px` };
    case "ArrowUp":
      return { ...state, posY: `${parseInt(state.posY) - 10}px` };
    case "ArrowDown":
      return { ...state, posY: `${parseInt(state.posY) + 10}px` };
    default:
      return state;
  }
}

const Caja = () => {
  const [coords, dispatch] = useReducer(reducer, initialState);

  const dispatchAction = (e) => {
    dispatch({ type: e.key });
  };

  useEffect(() => {
    window.addEventListener("keydown", dispatchAction);
    return () => {
      window.removeEventListener("keydown", dispatchAction);
    };
  }, []);

  return (
    <div
      style={{ width: "100px", height: "100px", backgroundColor: "darkred", position: "absolute", left: coords.posX, top: coords.posY }}
    ></div>
  );
};

export default Caja;
```

Al añadir el listener, ya deberíamos de poder mover la caja por la pantalla usando las teclas de las
flechas del teclado.
