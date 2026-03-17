import { useReducer } from "react";
import "./Carrito.css";

// ──────────────────────────────────────────────
// 1. TIPOS DEL ESTADO
// ──────────────────────────────────────────────
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface CarritoState {
  productos: Producto[];
  descuento: number; // porcentaje 0-100
}

// ──────────────────────────────────────────────
// 2. ACTIONS — cada una describe QUÉ pasó
//    El "payload" son los datos extra que acompañan a la acción
// ──────────────────────────────────────────────
type CarritoAction =
  | { type: "agregar"; payload: { id: number; nombre: string; precio: number } }
  //                   ^^^^^^^ payload = los datos del producto a añadir
  | { type: "eliminar"; payload: { id: number } }
  //                    ^^^^^^^ payload = solo necesitamos el id
  | { type: "cambiar_cantidad"; payload: { id: number; cantidad: number } }
  //                            ^^^^^^^ payload = id + nueva cantidad
  | { type: "aplicar_descuento"; payload: { porcentaje: number } }
  | { type: "vaciar" };
  // "vaciar" no tiene payload — no necesita datos extra

// ──────────────────────────────────────────────
// 3. REDUCER — función pura que recibe (estado, acción)
//    y devuelve el NUEVO estado
// ──────────────────────────────────────────────
function carritoReducer(state: CarritoState, action: CarritoAction): CarritoState {
  switch (action.type) {
    case "agregar": {
      const existente = state.productos.find((p) => p.id === action.payload.id);
      if (existente) {
        return {
          ...state,
          productos: state.productos.map((p) =>
            p.id === action.payload.id ? { ...p, cantidad: p.cantidad + 1 } : p,
          ),
        };
      }
      return {
        ...state,
        productos: [...state.productos, { ...action.payload, cantidad: 1 }],
      };
    }

    case "eliminar":
      return {
        ...state,
        productos: state.productos.filter((p) => p.id !== action.payload.id),
      };

    case "cambiar_cantidad":
      return {
        ...state,
        productos: state.productos.map((p) =>
          p.id === action.payload.id ? { ...p, cantidad: action.payload.cantidad } : p,
        ),
      };

    case "aplicar_descuento":
      return { ...state, descuento: action.payload.porcentaje };

    case "vaciar":
      return { ...state, productos: [], descuento: 0 };

    default:
      return state;
  }
}

// ──────────────────────────────────────────────
// 4. DATOS DE EJEMPLO (catálogo)
// ──────────────────────────────────────────────
const catalogo = [
  { id: 1, nombre: "Camiseta", precio: 19.99 },
  { id: 2, nombre: "Pantalón", precio: 39.99 },
  { id: 3, nombre: "Zapatillas", precio: 59.99 },
  { id: 4, nombre: "Gorra", precio: 14.99 },
];

const initialState: CarritoState = {
  productos: [],
  descuento: 0,
};

// ──────────────────────────────────────────────
// 5. COMPONENTE — usa dispatch para enviar acciones
// ──────────────────────────────────────────────
const Carrito = () => {
  //                  ^^^^^^^^ DISPATCHER — la función que envía acciones al reducer
  const [state, dispatch] = useReducer(carritoReducer, initialState);

  const total = state.productos.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
  const totalConDescuento = total * (1 - state.descuento / 100);

  return (
    <div className="carrito-container">
      <h2>Carrito de compra</h2>

      {/* CATÁLOGO — dispatch con payload del producto */}
      <div className="catalogo">
        <h3>Catálogo</h3>
        {catalogo.map((prod) => (
          <div key={prod.id} className="catalogo-item">
            <span>
              {prod.nombre} — {prod.precio.toFixed(2)}€
            </span>
            <button
              type="button"
              onClick={() =>
                // ACTION con payload: enviamos los datos del producto
                dispatch({ type: "agregar", payload: prod })
              }
            >
              Añadir
            </button>
          </div>
        ))}
      </div>

      {/* CARRITO */}
      <div className="carrito-lista">
        <h3>Tu carrito ({state.productos.length})</h3>
        {state.productos.length === 0 && <p>Carrito vacío</p>}
        {state.productos.map((p) => (
          <div key={p.id} className="carrito-item">
            <span>{p.nombre}</span>
            <input
              type="number"
              min="1"
              value={p.cantidad}
              onChange={(e) =>
                // ACTION con payload: id + nueva cantidad
                dispatch({
                  type: "cambiar_cantidad",
                  payload: { id: p.id, cantidad: Number(e.target.value) },
                })
              }
            />
            <span>{(p.precio * p.cantidad).toFixed(2)}€</span>
            <button
              type="button"
              onClick={() =>
                // ACTION con payload: solo el id
                dispatch({ type: "eliminar", payload: { id: p.id } })
              }
            >
              Quitar
            </button>
          </div>
        ))}
      </div>

      {/* DESCUENTO */}
      <div className="carrito-descuento">
        <label>
          Descuento (%):
          <input
            type="number"
            min="0"
            max="100"
            value={state.descuento}
            onChange={(e) =>
              dispatch({
                type: "aplicar_descuento",
                payload: { porcentaje: Number(e.target.value) },
              })
            }
          />
        </label>
      </div>

      {/* TOTAL */}
      <div className="carrito-total">
        {state.descuento > 0 && <p className="precio-tachado">Total: {total.toFixed(2)}€</p>}
        <p className="precio-final">Total: {totalConDescuento.toFixed(2)}€</p>
        <button
          type="button"
          onClick={() =>
            // ACTION sin payload
            dispatch({ type: "vaciar" })
          }
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
};

export default Carrito;
