import { redirect, type MetaFunction } from "@remix-run/node";

export const loader = async () => {
  return redirect("/signin");
};
export default function B() {
  return <div>B</div>;
}
