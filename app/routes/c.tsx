import { redirect, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = () => {
  return {
    omar: "omar",
  };
};

export default function B() {
  const x = useLoaderData<typeof loader>();
  console.log(x);
  return <div>Cccc</div>;
}
