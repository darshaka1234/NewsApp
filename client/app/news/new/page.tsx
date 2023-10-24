"use client";
import JoditEditor from "jodit-react";
import { Button, Text, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsSchema } from "@/validationSchema/NewsSchema";
import z from "zod";
import { useState } from "react";
import { Callout } from "@radix-ui/themes";
import ErrorMessage from "@/app/components/errMsg";
import Spinner from "@/app/components/spinner";

const NewNewsPage = () => {
  type FormValues = z.infer<typeof NewsSchema>;
  const [err, setErr] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(NewsSchema),
  });
  const router = useRouter();

  const onHadleSubmit = async ({ title, author, description, image }: any) => {
    const newdata = { title, author, description, image: image[0] };
    try {
      setSubmitting(true);
      await axios.post("http://localhost:5000", newdata, {
        headers: {
          "x-auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzgwM2Y3Mzc0OWRjOWYyNGIxYzY2MyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5ODE2OTg0N30.RcD4xuYC4hUDjbKxt1wrr4TWcxKe7z2G4hg2jTDjpDg",
          "Content-Type": "multipart/form-data",
        },
      });
      setSubmitting(false);
      router.push("/news");
    } catch (err) {
      setSubmitting(false);
      setErr("unexpected error occured");
    }
  };

  return (
    <div className="max-w-xl">
      {err && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{err}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className=" space-y-5 flex flex-col"
        onSubmit={handleSubmit(onHadleSubmit)}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root>
          <TextField.Input placeholder="Arthor" {...register("author")} />
        </TextField.Root>
        <ErrorMessage>{errors.author?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <JoditEditor {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <input
          type="file"
          className="file-input file-input-bordered file-input-sm w-full max-w-xs"
          {...register("image")}
        />

        <Button className="max-w-xs" disabled={isSubmitting}>
          Submit New News{isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewNewsPage;
