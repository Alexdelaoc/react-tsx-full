export type RandomUserApiResponse = {
  results: Array<{
    name: {
      first: string;
      last: string;
    };
    email: string;
    picture: {
      medium: string;
    };
  }>;
};

type InfoUsuarioProps = {
  data: RandomUserApiResponse;
};

const InfoUsuario = ({ data }: InfoUsuarioProps) => {
  const { name, email, picture } = data.results[0];

  return (
    <div>
      <h2>
        {name.first} {name.last}
      </h2>
      <img src={picture.medium} alt={`Foto de ${name.first}`} />
      <p>✉️: {email}</p>
    </div>
  );
};

export default InfoUsuario;
