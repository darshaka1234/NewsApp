import { NewsProp } from "@/types/newsType";
import { Table } from "@radix-ui/themes";
import React from "react";
import Renderhtml from "./renderhtml";
import Link from "./_component/MyLink";
import { para } from "../_components/textpata";

interface Prop {
  news: NewsProp[];
}

const NewsTable = ({ news }: Prop) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell align="center"> Image</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell
            className="hidden md:table-cell"
            align="center"
          >
            Title
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell
            className="hidden md:table-cell"
            align="center"
          >
            Author
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell
            className="hidden md:table-cell"
            align="center"
          >
            Published Date
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell
            className="hidden md:table-cell"
            align="center"
          >
            Description
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {news.map((item) => (
          <Table.Row key={item._id} style={{ height: "20px" }}>
            <Table.Cell className="hidden md:table-cell ">
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
                  classname="max-w-xs max-h-10 "
                />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {item.author}
            </Table.Cell>

            <Table.Cell className="hidden md:table-cell">
              {item.pub_date.toLocaleString().split("T")[0]}
            </Table.Cell>
            <Table.Cell
              className="hidden md:table-cell px-3 "
              width={500}
              style={{ height: "20px" }}
            >
              <Renderhtml
                htmlContent={item.description}
                classname="max-w-full max-h-16 overflow-hidden text-ellipsis white-space-nowrap"
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default NewsTable;
