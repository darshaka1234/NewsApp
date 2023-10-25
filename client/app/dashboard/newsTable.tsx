import { NewsProp } from "@/types/newsType";
import { Table } from "@radix-ui/themes";
import React from "react";
import Renderhtml from "./renderhtml";
import Link from "./_component/MyLink";

interface Prop {
  news: NewsProp[];
}

const NewsTable = ({ news }: Prop) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell> Image</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Title
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Author
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Published Date
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            description
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {news.map((item) => (
          <Table.Row key={item._id}>
            <Table.Cell className="hidden md:table-cell">
              <img src={item.imageUrl} className="max-w-xs max-h-20" />
            </Table.Cell>
            <Table.Cell>
              <Link href={`/dashboard/${item._id}`}>{item.title}</Link>
              <div className="block md:hidden">
                <img src={item.imageUrl} className="max-w-xs max-h4" />
              </div>
              <div className="block md:hidden">{item.author}</div>
              <div className="block md:hidden">
                {item.pub_date.toLocaleString().split("T")[0]}
              </div>
              <div className="block md:hidden">
                <Renderhtml
                  htmlContent={item.description}
                  classname="max-w-xs max-h-10"
                />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {item.author}
            </Table.Cell>

            <Table.Cell className="hidden md:table-cell">
              {item.pub_date.toLocaleString().split("T")[0]}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Renderhtml
                htmlContent={item.description}
                classname="max-w-xs max-h-10"
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default NewsTable;
