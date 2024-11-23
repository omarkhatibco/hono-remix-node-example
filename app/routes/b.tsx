import { redirect, type MetaFunction } from "react-router";

export const clientLoader = async (c) => {
  console.log(c);

  return redirect("/signin");
};
export default function B() {
  return <div>B</div>;
}
