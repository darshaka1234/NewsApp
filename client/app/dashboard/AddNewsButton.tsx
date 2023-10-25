import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const AddNewsButton = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/dashboard/new">Add News Article</Link>
      </Button>
    </div>
  );
};

export default AddNewsButton;
