"use client";
import JoditEditor from "jodit-react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsSchema } from "@/validationSchema/NewsSchema";
import z from "zod";
import { useState } from "react";
import { Callout } from "@radix-ui/themes";
import ErrorMessage from "@/app/_components/errMsg";
import Spinner from "@/app/_components/spinner";
import { NewsProp } from "@/types/newsType";

interface Props {
  data?: NewsProp;
  edit: boolean;
  id?: string;
}

const NewsForm = ({ data, edit, id }: Props) => {
  type FormValues = z.infer<typeof NewsSchema>;
  const [err, setErr] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(NewsSchema),
  });
  const router = useRouter();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzgwM2Y3Mzc0OWRjOWYyNGIxYzY2MyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5ODE2OTg0N30.RcD4xuYC4hUDjbKxt1wrr4TWcxKe7z2G4hg2jTDjpDg";
  const onHadleSubmit = async ({ title, author, description, image }: any) => {
    const newdata = { title, author, description, image: image[0] };
    console.log(newdata);
    try {
      setSubmitting(true);
      edit
        ? await axios.put(`http://localhost:5000/${id}`, newdata, {
            headers: {
              "x-auth-token": token,
              "Content-Type": "multipart/form-data",
            },
          })
        : await axios.post("http://localhost:5000", newdata, {
            headers: {
              "x-auth-token": token,
              "Content-Type": "multipart/form-data",
            },
          });

      setSubmitting(false);
      router.push("/dashboard");
    } catch (err) {
      setSubmitting(false);
      setErr("unexpected error occured");
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(`http://localhost:5000/${id}`, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      });
      setSubmitting(false);
      router.push("/dashboard");
    } catch (err) {
      setDeleting(false);
      setErr("Error on Deleting");
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
        className=" space-y-5 flex flex-col mb-3"
        onSubmit={handleSubmit(onHadleSubmit)}
      >
        <TextField.Root>
          <TextField.Input
            placeholder="Title"
            defaultValue={data?.title}
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root>
          <TextField.Input
            placeholder="Arthor"
            defaultValue={data?.author}
            {...register("author")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.author?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={data?.description}
          control={control}
          render={({ field }) => <JoditEditor {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <input
          type="file"
          className="file-input file-input-bordered file-input-sm w-full max-w-xs #1d4ed8"
          {...register("image")}
        />

        <Button className="w-full hover:cursor-pointer" disabled={isSubmitting}>
          {edit ? "UPDATE" : "SUBMIT"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
      <div>
        <Button
          color="red"
          className="w-full hover:cursor-pointer "
          disabled={isSubmitting}
          onClick={handleDelete}
        >
          DELETE
          {isDeleting && <Spinner />}
        </Button>
      </div>
    </div>
  );
};

export default NewsForm;
