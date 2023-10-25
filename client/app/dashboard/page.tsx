import NewsTable from "./newsTable";
import AddNewsButton from "./AddNewsButton";
import { NewsProp } from "@/types/newsType";

const News = async () => {
  const res = await fetch("http://localhost:5000", { cache: "no-store" });
  const news: NewsProp[] = await res.json();

  return (
    <div>
      <AddNewsButton />
      <NewsTable news={news} />
    </div>
  );
};

export default News;
