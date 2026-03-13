# 20.3. Componentdidmount

**PDF: páginas 87–87** (libro: 83–83)

---

[← Índice](README.md) | [← Anterior: 20.2. Getderivedstatefromprops](20-02-getDerivedStateFromProps.md) | [Siguiente: 20.4. Shouldcomponentupdate →](20-04-shouldComponentUpdate.md)

---

El componentDidMount es el método que se ejecuta después de montar (insertar el componente
en el árbol) el componente utilizaremos para tareas de inicialización:

- Peticiones HTTP para obtener datos de la red

- Inicilizar observables y timers

- Crear elementos del DOM con otras librerías (jQuery)
```tsx
componentDidMount() {

  fetch('https://miapp.com/api/datos')
    .then(resp => resp.json())
    .then(datos => {
       this.setState({datos});
    })
}
```
