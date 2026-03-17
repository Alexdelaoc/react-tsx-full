import { Suspense, lazy, useState } from "react";
import withData from "./hoc/withData";
import InfoUsuario from "./components/InfoUsuario";
import { SpinnerDotted } from "spinners-react";
import type { RandomUserApiResponse } from "./components/InfoUsuario";
import Reproductor from "./components/Reproductor";
import ListaNoticias from "./components/ListaNoticias";
import ListaSugus from "./components/ListaSugus";
import Inicio from "./components/Inicio";


const InfoUsuarioWithData = withData<object, RandomUserApiResponse>(
  InfoUsuario,
  "https://randomuser.me/api/",
  <SpinnerDotted size={50} thickness={100} speed={100} color="#36ad47" />,
);

const Admin = lazy(() => import("./components/Admin"));
const Carrito = lazy(() => import("./components/Carrito"));

const App = () => {
  const [esAdmin, setEsAdmin] = useState(false);
  return (
    <section>
      <div>
        <button type="button" onClick={() => setEsAdmin(!esAdmin)}>
          Toggle admin
        </button>
        {esAdmin ? (
          <Suspense fallback={<p>Loading...</p>}>
            <Admin />
            <Carrito />
          </Suspense>
        ) : (
          <Inicio />
        )}
      </div>
      <InfoUsuarioWithData />
      <Reproductor />
      <ListaNoticias />
      <ListaSugus />
    </section>
  );
};

export default App;
