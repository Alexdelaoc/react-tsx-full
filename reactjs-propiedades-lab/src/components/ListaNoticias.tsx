import { noticias } from "../data/noticias";
import Noticia from "./Noticia";

const ListaNoticias = () => {
  return (
    <div>
      <h2>Noticias</h2>
      <div>
        {noticias.map((noticia) => (
          <Noticia key={noticia.id} noticia={noticia} />
        ))}
      </div>
    </div>
  );
};

export default ListaNoticias;
