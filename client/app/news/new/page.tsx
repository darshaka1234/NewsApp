"use client";
import JoditEditor from "jodit-react";
import { Button, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const NewNewsPage = () => {
  interface FormValues {
    title: string;
    author: string;
    description: string;
    image: File;
  }

  const { register, control, handleSubmit } = useForm<FormValues>();
  const router = useRouter();

  return (
    <form
      className="max-w-xl space-y-5 flex flex-col"
      onSubmit={handleSubmit(async (data: FormValues) => {
        await axios.post("http://localhost:5000/", data);
        router.push("/news");
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <TextField.Root>
        <TextField.Input placeholder="Arthor" {...register("author")} />
      </TextField.Root>

      <Controller
        name="description"
        control={control}
        render={({ field }) => <JoditEditor {...field} />}
      />
      <input
        type="file"
        className="file-input file-input-bordered file-input-sm w-full max-w-xs"
        {...register("image")}
      />
      <Button className="max-w-xs">Submit New News</Button>
    </form>
  );
};

export default NewNewsPage;
