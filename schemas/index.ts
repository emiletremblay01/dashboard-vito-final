import * as z from "zod";

import { ExperienceCategory, ExperienceType } from "@prisma/client";

export const experienceSchema = z.object({
  thumbnailTitle: z.string().min(2, {
    message: "Le titre de la miniature est trop court.",
  }),
  thumbnailImage: z.string().url({
    message: "L'url de l'image de la miniature est invalide.",
  }),
  experienceCategory: z.nativeEnum(ExperienceCategory, {
    required_error: "Catégorie d'expérience requise.",
  }),
  experienceType: z.nativeEnum(ExperienceType, {
    required_error: "Type d'expérience requis.",
  }),
  title: z.string().min(2, {
    message: "Le titre de l'expérience est trop court.",
  }),
  description: z.string().min(2, {
    message: "La description de l'expérience est trop courte.",
  }),
  competences: z.string(),
  liensYoutube: z.string().url().optional(),

  images: z.object({ url: z.string() }).array(),
});
