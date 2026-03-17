# 18.1. Lab Estado

**PDF: páginas 68–82** (libro: 64–78)

---

[← Índice](README.md) | [← Anterior: 18. Estados](18-00-estados.md) | [Siguiente: 19. Flujo Datos →](19-00-flujo-datos.md)

---

En este laboratorio vamos a ver como utilizar el estado de los componentes con un panel de teclas
con el que hay que encontrar el código secreto pulsando sobre ellas. Tenemos que tener en cuenta
lo siguiente:

- Al pulsar sobre las teclas del 0 al 9 se añade el número pulsado al final del código actual.

- Al pulsar sobre la tecla CLD borramos el código y lo dejamos vacío.

- Al pulsar sobre la tecla DEL borramos el último número que contiene el código.

- No se pueden introducir más de 4 números.

- Cuando acertamos el código secreto se muestra en el display el mensaje CODE OK.

Vamos a copiar la plantilla del proyecto que se ha realizado en el laboratorio reactjs-proyecto-
inicial-lab y vamos a cambiarle el nombre del proyecto a reactjs-estado-lab.

Es posible que sea necesario volver a instalar las dependencias del proyecto para
que funcione correctamente. Para ello solo tenemos que lanzar el comando npm
install dentro de la carpeta del proyecto.

Ahora vamos a levantar el servidor de desarrollo con el comando:

```tsx
$ npm start
```
Empezaremos creando el siguiente archivo de estilos para que nuestro teclado no quede demasiado
cutre.

**Archivo:** `/reactjs-estado-lab/src/style.css`

```css
.panel-codigo-secreto {
  width: 150px;
  background-color: #242424;
}

.display {
  height: 50px;
  font-size: 2rem;
  font-style: italic;
  color: #34e89e;
  text-align: right;
}

.fila-teclas {
  display: flex;
}

.tecla {
  background-color: transparent;
  color: #34e89e;
  border: 1px solid #34e89e;
  width: 100%;
  height: 50px;
  cursor: pointer;
}

.tecla:hover {
  opacity: 0.6;
}
```
Ahora vamos a crear el componente PanelCodigoSecreto.tsx en la carpeta de components, y
pondremos el código de TSX que pinta el panel. Este componente será un componente de clase.

**Archivo:** `/reactjs-estado-lab/src/components/PanelCodigoSecreto.tsx`

```tsx
import React, { Component } from 'react'

class PanelCodigoSecreto extends Component {
  render() {
    return (
      <div className="panel-codigo-secreto">
        <div className="display">
        </div>
        <div className="teclas">
          <div className="fila-teclas">
             <button type="button" className="tecla">1</button>
             <button type="button" className="tecla">2</button>
             <button type="button" className="tecla">3</button>
          </div>
          <div className="fila-teclas">
             <button type="button" className="tecla">4</button>
             <button type="button" className="tecla">5</button>
             <button type="button" className="tecla">6</button>
          </div>
          <div className="fila-teclas">
             <button type="button" className="tecla">7</button>
             <button type="button" className="tecla">8</button>
             <button type="button" className="tecla">9</button>
          </div>
          <div className="fila-teclas">
             <button type="button" className="tecla">CLD</button>
             <button type="button" className="tecla">0</button>
             <button type="button" className="tecla">DEL</button>
          </div>
        </div>
      </div>
    )
  }

export default PanelCodigoSecreto;
```
Y antes de añadirle la lógica al componente vamos a mostrarlo en el componente App.tsx.

**Archivo:** `/reactjs-estado-lab/src/components/App.tsx`

```tsx
import PanelCodigoSecreto from './PanelCodigoSecreto';

const App = () => {
  return (
    <div>
      <PanelCodigoSecreto />
    </div>
  )
}

export default App
```
Si nos fijamos, los estilos no se están aplicando, esto se debe a que no los hemos importado en
nuestra aplicación. Tenemos que realizar la importación en el index.js.

**Archivo:** `/reactjs-estado-lab/src/index.js`

```tsx
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './style.css';

createRoot(document.getElementById('root')).render(<App />);
```
Ahora ya deberían de estar aplicándose los estilos correctamente.

En un tema posterior veremos porque hay que hacerlo así y que otras formas de trabajar con los estilos tenemos en React.
Ahora vamos a empezar a añadirle la lógica que nos piden al componente PanelCodigoSecreto.

Empezaremos por añadirle el estado que necesita. Utilizaremos dentro del estado la clave
codigoActual para ir almacenando el código que está escribiendo el usuario. Además también
vamos a guardar en el estado el código secreto que hay que adivinar, dentro de la clave
codigoSecreto.

Como estamos con un componente de clase, el estado lo tenemos que inicializar en el constructor
del componente.

**Archivo:** `/reactjs-estado-lab/src/components/PanelCodigoSecreto.tsx`

```tsx
import React, { Component } from 'react'

class PanelCodigoSecreto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigoSecreto: '3038',
      codigoActual: ''
    }
  }

    render() {
      return (
        <div className="panel-codigo-secreto">
          <div className="display">
          </div>
          <div className="teclas">
            <div className="fila-teclas">
               <button type="button" className="tecla">1</button>
               <button type="button" className="tecla">2</button>
               <button type="button" className="tecla">3</button>
            </div>
            <div className="fila-teclas">
               <button type="button" className="tecla">4</button>
               <button type="button" className="tecla">5</button>
               <button type="button" className="tecla">6</button>
            </div>
            <div className="fila-teclas">
               <button type="button" className="tecla">7</button>
               <button type="button" className="tecla">8</button>
               <button type="button" className="tecla">9</button>
            </div>
            <div className="fila-teclas">
               <button type="button" className="tecla">CLD</button>
               <button type="button" className="tecla">0</button>
               <button type="button" className="tecla">DEL</button>
            </div>
          </div>
        </div>
      )
    }
}

export default PanelCodigoSecreto;
```
Ahora vamos a sustituir el código que se está mostrando por defecto (0000) por el código actual que
se va almacenando en el estado.

**Archivo:** `/reactjs-estado-lab/src/components/PanelCodigoSecreto.tsx`

```tsx
import React, { Component } from 'react'

class PanelCodigoSecreto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigoSecreto: '3038',
      codigoActual: ''
    }
  }

    render() {
      return (
        <div className="panel-codigo-secreto">
          <div className="display">
            {this.state.codigoActual}
          </div>
          <div className="teclas">
            <div className="fila-teclas">
               <button type="button" className="tecla">1</button>
               <button type="button" className="tecla">2</button>
               <button type="button" className="tecla">3</button>
            </div>
            <div className="fila-teclas">
               <button type="button" className="tecla">4</button>
               <button type="button" className="tecla">5</button>
               <button type="button" className="tecla">6</button>
            </div>
            <div className="fila-teclas">
               <button type="button" className="tecla">7</button>
               <button type="button" className="tecla">8</button>
               <button type="button" className="tecla">9</button>
            </div>
            <div className="fila-teclas">
               <button type="button" className="tecla">CLD</button>
               <button type="button" className="tecla">0</button>
               <button type="button" className="tecla">DEL</button>
            </div>
          </div>
        </div>
      )
    }
}

export default PanelCodigoSecreto;
```
El siguiente paso es añadir el evento onClick en el bloque de teclas y crear la función a la que se va
a llamar desde el evento.

**Archivo:** `/reactjs-estado-lab/src/components/PanelCodigoSecreto.tsx`

```tsx
import React, { Component } from 'react'

class PanelCodigoSecreto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigoSecreto: '3038',
      codigoActual: ''
    }
  }

  handleClick(event) {
    // lógica por implementar
  }

  render() {
    return (
      <div className="panel-codigo-secreto">
        <div className="display">
          {this.state.codigoActual}
        </div>
        <div className="teclas" onClick={this.handleClick}>
          <div className="fila-teclas">
            <button type="button" className="tecla">1</button>
            <button type="button" className="tecla">2</button>
            <button type="button" className="tecla">3</button>
          </div>
          <div className="fila-teclas">
            <button type="button" className="tecla">4</button>
            <button type="button" className="tecla">5</button>
            <button type="button" className="tecla">6</button>
          </div>
          <div className="fila-teclas">
            <button type="button" className="tecla">7</button>
            <button type="button" className="tecla">8</button>
            <button type="button" className="tecla">9</button>
          </div>
          <div className="fila-teclas">
            <button type="button" className="tecla">CLD</button>
            <button type="button" className="tecla">0</button>
            <button type="button" className="tecla">DEL</button>
          </div>
        </div>
      </div>
    )
  }
}

export default PanelCodigoSecreto;
```
Dentro de la función del handleClick vamos a empezar sacando el texto de la tecla sobre la que se
ha pulsado accediendo al event.target.textContent.

También vamos a extraer del estado los dos valores que estamos almacenando.

**Archivo:** `/reactjs-estado-lab/src/components/PanelCodigoSecreto.tsx`

```tsx
import React, { Component } from 'react'

class PanelCodigoSecreto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigoSecreto: '3038',
      codigoActual: ''
    }
  }

  handleClick(event) {
    const teclaPulsada = event.target.textContent;
    const { codigoActual, codigoSecreto } = this.state;
    // siguiente lógica en pasos posteriores
  }

  render() {
    return (
      <div className="panel-codigo-secreto">
        <div className="display">
          {this.state.codigoActual}
        </div>
        <div className="teclas" onClick={this.handleClick}>
          <div className="fila-teclas">
            <button type="button" className="tecla">1</button>
            <button type="button" className="tecla">2</button>
            <button type="button" className="tecla">3</button>
          </div>
          <div className="fila-teclas">
            <button type="button" className="tecla">4</button>
            <button type="button" className="tecla">5</button>
            <button type="button" className="tecla">6</button>
          </div>
          <div className="fila-teclas">
            <button type="button" className="tecla">7</button>
            <button type="button" className="tecla">8</button>
            <button type="button" className="tecla">9</button>
          </div>
          <div className="fila-teclas">
            <button type="button" className="tecla">CLD</button>
            <button type="button" className="tecla">0</button>
            <button type="button" className="tecla">DEL</button>
          </div>
        </div>
      </div>
    )
  }
}

export default PanelCodigoSecreto;
```
Después de añadir el código anterior veremos que nos da un error en la consola y nos dice que no
se puede acceder a state de undefined. Esto se debe a que el objeto this es undefined en lugar de
ser la instancia de la clase en la que se encuentra este método.

Podemos solucionarlo bindeando en el constructor el this a esta función.

**Archivo:** `/reactjs-estado-lab/src/components/PanelCodigoSecreto.tsx`

```tsx
import React, { Component } from 'react'

class PanelCodigoSecreto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigoSecreto: '3038',
      codigoActual: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }
```
handleClick(event) {
```tsx
const teclaPulsada = event.target.textContent;
const { codigoActual, codigoSecreto } = this.state;

render() {
  return (
    <div className="panel-codigo-secreto">
      <div className="display">
        {this.state.codigoActual}
      </div>
      <div className="teclas" onClick={this.handleClick}>
        <div className="fila-teclas">
           <button type="button" className="tecla">1</button>
           <button type="button" className="tecla">2</button>
           <button type="button" className="tecla">3</button>
        </div>
        <div className="fila-teclas">
           <button type="button" className="tecla">4</button>

                   <button type="button" className="tecla">5</button>
                   <button type="button" className="tecla">6</button>
                </div>
                <div className="fila-teclas">
                   <button type="button" className="tecla">7</button>
                   <button type="button" className="tecla">8</button>
                   <button type="button" className="tecla">9</button>
                </div>
                <div className="fila-teclas">
                   <button type="button" className="tecla">CLD</button>
                   <button type="button" className="tecla">0</button>
                   <button type="button" className="tecla">DEL</button>
                </div>
              </div>
            </div>
        )
    }
}

export default PanelCodigoSecreto;
```
Solucionado el error anterior, vamos a poner los 3 casos de teclas que nos podemos encontrar, CLD,
DEL o una tecla numérica.

**Archivo:** `/reactjs-estado-lab/src/components/PanelCodigoSecreto.tsx`

```tsx
import React, { Component } from 'react'

class PanelCodigoSecreto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigoSecreto: '3038',
      codigoActual: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const teclaPulsada = event.target.textContent;
    const { codigoActual, codigoSecreto } = this.state;

    if (teclaPulsada === 'CLD') {
      // lógica en pasos siguientes
    } else if (teclaPulsada === 'DEL') {
      // lógica en pasos siguientes
    } else {
      if (codigoActual.length < 4) {
        // lógica en pasos siguientes
      }
    }
  }

  render() {
    return (
      <div className="panel-codigo-secreto">
        <div className="display">
          {this.state.codigoActual}
        </div>
        <div className="teclas" onClick={this.handleClick}>
          <div className="fila-teclas">
            <button type="button" className="tecla">1</button>
            <button type="button" className="tecla">2</button>
            <button type="button" className="tecla">3</button>
          </div>
          <div className="fila-teclas">
            <button type="button" className="tecla">4</button>
            <button type="button" className="tecla">5</button>
            <button type="button" className="tecla">6</button>
          </div>
          <div className="fila-teclas">
            <button type="button" className="tecla">7</button>
            <button type="button" className="tecla">8</button>
            <button type="button" className="tecla">9</button>
          </div>
          <div className="fila-teclas">
            <button type="button" className="tecla">CLD</button>
            <button type="button" className="tecla">0</button>
            <button type="button" className="tecla">DEL</button>
          </div>
        </div>
      </div>
    )
  }
}

export default PanelCodigoSecreto;
```
Ahora vamos a crear una variable nuevoCodigoActual en la que guardaremos el siguiente valor
del código.

- Cuando se pulsa CLD lo dejamos vacío.

- Cuando se pulsa DEL vamos a quitar el último carácter utilizando la función slice de los strings.

- Para el resto de casos (cuando pulsamos los números), vamos a comprobar primero si tenemos
4 números y si es así no hacemos nada. Pero si tenemos menos de 4 entonces vamos a añadir el
número pulsado al final del código actual.

**Archivo:** `/reactjs-estado-lab/src/components/PanelCodigoSecreto.tsx`

```tsx
import React, { Component } from 'react'

class PanelCodigoSecreto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigoSecreto: '3038',
      codigoActual: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }
```
handleClick(event) {
```tsx
const teclaPulsada = event.target.textContent;
const { codigoActual, codigoSecreto } = this.state;

    let nuevoCodigoActual = codigoActual;
    if (teclaPulsada === 'CLD') {
      nuevoCodigoActual = ''
    } else if (teclaPulsada === 'DEL') {
      nuevoCodigoActual = codigoActual.slice(0, codigoActual.length-1);
    } else {
      if (codigoActual.length < 4) {
        nuevoCodigoActual = codigoActual + teclaPulsada;
      }
    }
}

render() {
  return (
    <div className="panel-codigo-secreto">
      <div className="display">
        {this.state.codigoActual}
      </div>
      <div className="teclas" onClick={this.handleClick}>
        <div className="fila-teclas">
           <button type="button" className="tecla">1</button>
           <button type="button" className="tecla">2</button>
           <button type="button" className="tecla">3</button>
        </div>
        <div className="fila-teclas">
           <button type="button" className="tecla">4</button>
           <button type="button" className="tecla">5</button>
           <button type="button" className="tecla">6</button>
        </div>
        <div className="fila-teclas">
           <button type="button" className="tecla">7</button>
           <button type="button" className="tecla">8</button>
           <button type="button" className="tecla">9</button>

                </div>
                <div className="fila-teclas">
                   <button type="button" className="tecla">CLD</button>
                   <button type="button" className="tecla">0</button>
                   <button type="button" className="tecla">DEL</button>
                </div>
              </div>
            </div>
        )
    }
}

export default PanelCodigoSecreto;
```
Ahora vamos a cambiar el estado usando la función this.setState y pasandole el objeto con el
nuevo código.

**Archivo:** `/reactjs-estado-lab/src/components/PanelCodigoSecreto.tsx`

```tsx
import React, { Component } from 'react'

class PanelCodigoSecreto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigoSecreto: '3038',
      codigoActual: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }
```
handleClick(event) {
```tsx
const teclaPulsada = event.target.textContent;
const { codigoActual, codigoSecreto } = this.state;

let nuevoCodigoActual = codigoActual;
if (teclaPulsada === 'CLD') {
  nuevoCodigoActual = ''
} else if (teclaPulsada === 'DEL') {
  nuevoCodigoActual = codigoActual.slice(0, codigoActual.length-1);
```
} else {
```tsx
  if (codigoActual.length < 4) {
    nuevoCodigoActual = codigoActual + teclaPulsada;
  }
}

    this.setState({
      codigoActual: nuevoCodigoActual
    });
}

    render() {
      return (
        <div className="panel-codigo-secreto">
          <div className="display">
            {this.state.codigoActual}
          </div>
          <div className="teclas" onClick={this.handleClick}>
            <div className="fila-teclas">
               <button type="button" className="tecla">1</button>
               <button type="button" className="tecla">2</button>
               <button type="button" className="tecla">3</button>
            </div>
            <div className="fila-teclas">
               <button type="button" className="tecla">4</button>
               <button type="button" className="tecla">5</button>
               <button type="button" className="tecla">6</button>
            </div>
            <div className="fila-teclas">
               <button type="button" className="tecla">7</button>
               <button type="button" className="tecla">8</button>
               <button type="button" className="tecla">9</button>
            </div>
            <div className="fila-teclas">
               <button type="button" className="tecla">CLD</button>
               <button type="button" className="tecla">0</button>
               <button type="button" className="tecla">DEL</button>
            </div>
          </div>
        </div>
      )
    }
}

export default PanelCodigoSecreto;
```
Ya deberíamos de poder escribir el código, pero nos falta una última cosa. Tenemos que mostrar el
mensaje CODE OK cuando escribimos el código correcto, por lo que vamos a añadir en el else una
instrucción if para comprobar si el código actual es el código secreto, y en caso de serlo cambiar el
valor de nuevoCodigoActual.

**Archivo:** `/reactjs-estado-lab/src/components/PanelCodigoSecreto.tsx`

```tsx
import React, { Component } from 'react'

class PanelCodigoSecreto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigoSecreto: '3038',

      codigoActual: ''
    }
    this.handleClick = this.handleClick.bind(this);
}

handleClick(event) {

const teclaPulsada = event.target.textContent;
const { codigoActual, codigoSecreto } = this.state;

let nuevoCodigoActual = codigoActual;
if (teclaPulsada === 'CLD') {
  nuevoCodigoActual = ''
} else if (teclaPulsada === 'DEL') {
  nuevoCodigoActual = codigoActual.slice(0, codigoActual.length-1);

} else {

  if (codigoActual.length < 4) {
    nuevoCodigoActual = codigoActual + teclaPulsada;
    if (nuevoCodigoActual === codigoSecreto) {
      nuevoCodigoActual = 'CODE OK';
    }
  }
}

    this.setState({
      codigoActual: nuevoCodigoActual
    });
}

render() {
  return (
    <div className="panel-codigo-secreto">
      <div className="display">
        {this.state.codigoActual}
      </div>
      <div className="teclas" onClick={this.handleClick}>
        <div className="fila-teclas">
           <button type="button" className="tecla">1</button>
           <button type="button" className="tecla">2</button>
           <button type="button" className="tecla">3</button>
        </div>
        <div className="fila-teclas">
           <button type="button" className="tecla">4</button>
           <button type="button" className="tecla">5</button>
           <button type="button" className="tecla">6</button>
        </div>
        <div className="fila-teclas">
           <button type="button" className="tecla">7</button>
           <button type="button" className="tecla">8</button>
           <button type="button" className="tecla">9</button>
        </div>
        <div className="fila-teclas">

                   <button type="button" className="tecla">CLD</button>
                   <button type="button" className="tecla">0</button>
                   <button type="button" className="tecla">DEL</button>
                </div>
              </div>
            </div>
        )
    }
}

export default PanelCodigoSecreto;
```
Ya debería de funcionar el panel de teclas como se indicaba al principio.
