import Sugus from "./Sugus";

const sabores = ["limón", "naranja", "piña", "cereza", "fresa"] as const;

const flavorColors: Record<(typeof sabores)[number], string> = {
  limón: "#FDE23A",
  naranja: "#F28E40",
  piña: "#227BBE",
  cereza: "#AD3B52",
  fresa: "#EA464C",
};

const ListaSugus = () => {
  return (
    <div>
      <h2>Sugus</h2>
      <div className="sugus">
        {sabores.map((sabor) => (
          <Sugus key={sabor} sabor={sabor} color={flavorColors[sabor]} />
        ))}
      </div>
    </div>
  );
};

export default ListaSugus;
