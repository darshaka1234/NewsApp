import { NewsProp } from "@/types/newsType";
import { Text } from "@radix-ui/themes";
import React from "react";
import Renderhtml from "../dashboard/renderhtml";

interface Props {
  news: NewsProp[];
}

const Card = ({ news }: Props) => {
  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 2xl:grid-cols-3 ">
      {news.map((item) => (
        <div className="flex flex-col m-3 bg-gray-100 max-w-xl pr-3 pb-3 ">
          <div className="flex md:flex-row flex-col max-w-xl">
            <img
              className="h-96 w-full  object-cover md:h-auto md:w-48 "
              src={item.imageUrl}
              alt={item.title}
            />
            <div className="flex flex-col justify-start p-6">
              <h5
                className="mb-2 text-xl font-medium text-neutral-800"
                style={{ textOverflow: "ellipsis" }}
              >
                {item.title}
              </h5>
              <div className="flex justify-between w-full flex-col md:flex-row">
                <Text className="">
                  {item.pub_date.toLocaleString().split("T")[0]}
                </Text>
                <Text className="">{item.author}</Text>
              </div>
            </div>
          </div>
          <Renderhtml
            htmlContent={item.description}
            classname="max-w-xs max-h-10"
          />
          <Text className="flex text-xs justify-end ">See More...</Text>
        </div>
      ))}
    </div>
  );
};

export default Card;
