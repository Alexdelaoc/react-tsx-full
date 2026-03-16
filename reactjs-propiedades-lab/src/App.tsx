import { noticias } from "./data/noticias";
import Sugus from "./components/Sugus";
import Noticia from "./components/Noticia";

const App = () => {
  const sabores = ["limón", "naranja", "piña", "cereza", "fresa"] as const;
  const flavorColors: Record<(typeof sabores)[number], string> = {
    limón: "#FDE23A",
    naranja: "#F28E40",
    piña: "#227BBE",
    cereza: "#AD3B52",
    fresa: "#EA464C",
  };

  return (
    <section>
      <div>
        <h2>Sugus</h2>
        {sabores.map((sabor) => (
          <Sugus key={sabor} sabor={sabor} color={flavorColors[sabor]} />
        ))}
      </div>
      <div>
        <h2>Noticias</h2>
        {noticias.map((noticia) => (
          <Noticia key={noticia.id} noticia={noticia} />
        ))}
      </div>
    </section>
  );
};

export default App;
