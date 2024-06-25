"use client";

import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { addExperience, updateExperience } from "@/actions/experience";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { experienceSchema } from "@/schemas";
import { ExperienceCategory, ExperienceType } from "@prisma/client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Experience } from "@prisma/client";

export function AddExperienceForm({
  initialData,
}: {
  initialData?: Experience | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          competences: initialData.competences.join(", "),
          liensYoutube: initialData.liensYoutube[0],
        }
      : {
          images: [],
          competences: "",
        },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof experienceSchema>) {
    startTransition(() => {
      if (!initialData) {
        addExperience(values).then((result) => {
          if (result.error) {
            toast(result.error);
            return;
          }
          toast(result.success);
          router.push("/");
        });
        return;
      }

      updateExperience(initialData.id, values).then((result) => {
        if (result.error) {
          toast(result.error);
          return;
        }
        toast(result.success);
        router.push("/");
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
        <Tabs defaultValue="infos" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="infos" className="flex-1">
              1
            </TabsTrigger>
            <TabsTrigger value="thumbnail" className="flex-1">
              2
            </TabsTrigger>
            <TabsTrigger value="extras" className="flex-1">
              3 (Optionnel)
            </TabsTrigger>
          </TabsList>
          {/* INFO TAB */}
          <TabsContent className="space-y-8 rounded border p-4" value="infos">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Experience Omega" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full gap-2">
              <FormField
                control={form.control}
                name="experienceCategory"
                render={({ field }) => (
                  <FormItem className="basis-1/2">
                    <FormLabel>Catégorie</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ExperienceCategory).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experienceType"
                render={({ field }) => (
                  <FormItem className="basis-1/2">
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ExperienceType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez votre expérience en détail..."
                      className="h-44 resize-none overflow-y-scroll"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          {/* THUMBNAIL TAB */}
          <TabsContent
            className="space-y-8 rounded border p-4"
            value="thumbnail"
          >
            <FormField
              control={form.control}
              name="thumbnailTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre du thumbnail</FormLabel>
                  <FormControl>
                    <Input placeholder="Stage Chez Joe Caron" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnailImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      values={field.value ? [field.value] : []}
                      disabled={isPending}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormDescription>
                    Ajoutez une image carrée pour un meilleur résultat.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          {/* EXTRAS TAB */}
          <TabsContent className="space-y-8 rounded border p-4" value="extras">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photos</FormLabel>
                  <FormControl>
                    <ImageUpload
                      values={field.value.map((image) => image.url)}
                      disabled={isPending}
                      onChange={(url) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.url !== url,
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Ajoutez des images carrées pour un meilleur résultat.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="competences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compétences</FormLabel>
                  <FormControl>
                    <Input placeholder="Protools,Sound Design" {...field} />
                  </FormControl>
                  <FormDescription>
                    Séparez les compétences par une virgule.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="liensYoutube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vidéo Youtube</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Ajoutez le lien de la vidéo Youtube.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <Button type="submit" className="mt-4 w-full" disabled={isPending}>
          {initialData ? "Sauvegarder" : "Ajouter"}
        </Button>
      </form>
    </Form>
  );
}
