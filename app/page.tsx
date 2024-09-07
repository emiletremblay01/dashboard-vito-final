import { getAllExperiences } from "@/data/experience";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const revalidate = 0;
export default async function Home() {
  const experiences = await getAllExperiences();
  return (
    <div className="container">
      <div className="mb-4 mt-20 text-3xl font-bold">Expériences</div>
      <DataTable columns={columns} data={experiences} />
    </div>
  );
}
