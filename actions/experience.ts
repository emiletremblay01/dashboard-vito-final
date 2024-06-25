"use server";

import * as z from "zod";
import { experienceSchema } from "@/schemas";

import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
export const addExperience = async (data: z.infer<typeof experienceSchema>) => {
  try {
    const validatedFields = experienceSchema.safeParse(data);
    if (!validatedFields.success) {
      return { error: "Invalid Fields!" };
    }

    const {
      thumbnailTitle,
      thumbnailImage,
      experienceCategory,
      experienceType,
      title,
      description,
      competences,
      liensYoutube,
      images,
    } = validatedFields.data;

    const competencesArr =
      competences.trim() === ""
        ? []
        : competences
            .trim()
            .split(",")
            .map((competence) => competence.trim());

    const liensYoutubeArr = liensYoutube
      ? liensYoutube
          .trim()
          .split(",")
          .map((lien) => lien.trim())
      : [];

    const result = await prismadb.experience.create({
      data: {
        thumbnailTitle,
        thumbnailImage,
        experienceCategory,
        experienceType,
        title,
        description,
        competences: competencesArr,
        liensYoutube: liensYoutubeArr,
        images,
      },
    });

    revalidatePath("/");
    return {
      success: `Experience "${result.title}" successfully added to database!`,
    };
  } catch (error) {
    console.error(error);
    return { error: "Erreur interne!" };
  }
};

export const updateExperience = async (
  id: string,
  data: z.infer<typeof experienceSchema>,
) => {
  try {
    const validatedFields = experienceSchema.safeParse(data);
    if (!validatedFields.success) {
      return { error: "Invalid Fields!" };
    }

    const {
      thumbnailTitle,
      thumbnailImage,
      experienceCategory,
      experienceType,
      title,
      description,
      competences,
      liensYoutube,
      images,
    } = validatedFields.data;

    const competencesArr =
      competences.trim() === ""
        ? []
        : competences
            .trim()
            .split(",")
            .map((competence) => competence.trim());

    const liensYoutubeArr = liensYoutube
      ? liensYoutube
          .trim()
          .split(",")
          .map((lien) => lien.trim())
      : [];

    const result = await prismadb.experience.update({
      where: {
        id,
      },
      data: {
        thumbnailTitle,
        thumbnailImage,
        experienceCategory,
        experienceType,
        title,
        description,
        competences: competencesArr,
        liensYoutube: liensYoutubeArr,
        images,
      },
    });

    revalidatePath("/");
    return {
      success: `Experience "${result.title}" successfully updated in database!`,
    };
  } catch (error) {
    console.error(error);
    return { error: "Experience not found!" };
  }
};

export const deleteExperience = async (id: string) => {
  try {
    const result = await prismadb.experience.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
    return {
      success: `Experience "${result.title}" successfully deleted from database!`,
    };
  } catch (error) {
    console.error(error);
    return { error: "Experience not found!" };
  }
};
