import { useReducer, type ChangeEvent, type SubmitEvent } from "react";
import "./Caja.css";

interface FormState {
  nombre: string;
  email: string;
  mensaje: string;
}

type FormAction =
  | { type: "actualizar_campo"; campo: keyof FormState; valor: string }
  | { type: "reset" };

const initialState: FormState = {
  nombre: "",
  email: "",
  mensaje: "",
};

function reducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "actualizar_campo":
      return { ...state, [action.campo]: action.valor };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

const Caja = () => {
  const [form, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: "actualizar_campo",
      campo: e.target.name as keyof FormState,
      valor: e.target.value,
    });
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos enviados:", form);
    dispatch({ type: "reset" });
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>Formulario con useReducer</h2>

      <label>
        Nombre:
        <input name="nombre" value={form.nombre} onChange={handleChange} />
      </label>

      <label>
        Email:
        <input name="email" type="email" value={form.email} onChange={handleChange} />
      </label>

      <label>
        Mensaje:
        <textarea name="mensaje" value={form.mensaje} onChange={handleChange} />
      </label>

      <div className="formulario-botones">
        <button type="submit">Enviar</button>
        <button type="button" onClick={() => dispatch({ type: "reset" })}>
          Limpiar
        </button>
      </div>
    </form>
  );
};

export default Caja;
