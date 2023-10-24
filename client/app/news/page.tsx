import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const News = () => {
  return (
    <div>
      <div>
        <Button>
          <Link href="/news/new">New Issue</Link>
        </Button>
      </div>
    </div>
  );
};

export default News;
