import { NewsProp } from "@/types/newsType";
import React from "react";
import NewsForm from "../_component/NewsForm";

interface Props {
  params: { id: string };
}

const page = async ({ params: { id } }: Props) => {
  const res = await fetch(`http://localhost:5000/${id}`);
  const news: NewsProp = await res.json();

  return <NewsForm data={news} edit={true} id={id} />;
};

export default page;
