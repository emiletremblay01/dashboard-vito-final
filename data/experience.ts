import prismadb from "@/lib/prismadb";

export const getAllExperiences = async () => {
  return prismadb.experience.findMany();
};

export const getExperienceById = async (id: string) => {
  return prismadb.experience.findUnique({
    where: {
      id,
    },
  });
};
