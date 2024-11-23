import { redirect, type MetaFunction } from "react-router";
import { useLoaderData } from "react-router";

export const clientLoader = () => {
  return {
    omar: "omar",
  };
};

export default function B() {
  const x = useLoaderData<typeof loader>();
  console.log(x);
  return <div>Cccc</div>;
}
