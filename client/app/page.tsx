import { NewsProp } from "@/types/newsType";
import Card from "./_components/card";

const Home = async () => {
  const res = await fetch("http://localhost:5000", { cache: "no-store" });
  const news: NewsProp[] = await res.json();

  return (
    <div>
      <Card news={news} />
    </div>
  );
};

export default Home;
