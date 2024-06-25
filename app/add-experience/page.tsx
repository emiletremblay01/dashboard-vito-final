import { AddExperienceForm } from "@/components/form-add-experience";

export default function AddExperiencePage() {
  return (
    <div className="container flex gap-6 p-2 pt-16">
      <div className="mx-auto w-full max-w-sm">
        <h2 className="text-2xl font-semibold">Ajouter une expérience</h2>
        <AddExperienceForm />
      </div>
    </div>
  );
}
