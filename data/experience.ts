import prismadb from "@/lib/prismadb";

export const getAllExperiences = async () => {
  return prismadb.experience.findMany();
};
