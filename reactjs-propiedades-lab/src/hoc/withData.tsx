import { useEffect, useState, type ComponentType, type ReactNode } from "react";

const withData = <P extends object, TData = unknown>(
  WrappedCmp: ComponentType<P & { data: TData }>,
  url: string,
  Loader: ReactNode = <p>Loading...</p>,
) => {
  const WithData = (props: P) => {
    const [data, setData] = useState<TData | null>(null);
    const [cargandoDatos, setCargandoDatos] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(url);
        const datos: TData = await response.json();

        setTimeout(() => {
          setData(datos);
          setCargandoDatos(false);
        }, 1400);
      };

      fetchData();
    }, [url]);

    return <>{cargandoDatos ? Loader : <WrappedCmp {...props} data={data as TData} />}</>;
  };

  return WithData;
};

export default withData;
