import { AddExperienceForm } from "@/components/form-add-experience";
import { getExperienceById } from "@/data/experience";
export default async function EditExperiencePage({
  params,
}: {
  params: { experienceId: string };
}) {
  const experience = await getExperienceById(params.experienceId);

  if (!experience) {
    return (
      <div className="container flex gap-6 p-2 pt-16">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="text-2xl font-semibold">No experience found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex gap-6 p-2 pt-16">
      <div className="mx-auto w-full max-w-sm">
        <h2 className="text-2xl font-semibold">Modifier une expérience</h2>
        <AddExperienceForm initialData={experience} />
      </div>
    </div>
  );
}
