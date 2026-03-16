type Props = {
  noticia: {
    titulo: string;
    contenido: string;
  };
};

const Noticia = ({ noticia }: Props) => {
  return (
    <div>
      <h3>{noticia.titulo}</h3>
      <p>{noticia.contenido}</p>
    </div>
  );
};

export default Noticia;
