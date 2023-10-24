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

  const onHadleSubmit = async ({ title, author, description, image }: any) => {
    const newdata = { title, author, description, image: image[0] };
    console.log(image[0]);
    await axios.post("http://localhost:5000", newdata, {
      headers: {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzgwM2Y3Mzc0OWRjOWYyNGIxYzY2MyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5ODE2OTg0N30.RcD4xuYC4hUDjbKxt1wrr4TWcxKe7z2G4hg2jTDjpDg",
        "Content-Type": "multipart/form-data",
      },
    });
    router.push("/news");
  };

  return (
    <form
      className="max-w-xl space-y-5 flex flex-col"
      onSubmit={handleSubmit(onHadleSubmit)}
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
