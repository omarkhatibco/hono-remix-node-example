import { redirect, type MetaFunction } from "@remix-run/node";

export const loader = async (c) => {
  console.log(c);

  return redirect("/signin");
};
export default function B() {
  return <div>B</div>;
}
