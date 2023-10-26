import React from "react";

interface Props {
  htmlContent: string;
  classname?: string;
}

const Renderhtml = ({ htmlContent, classname }: Props) => {
  return (
    <div>
      <div
        style={{ display: "block" }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        className={classname}
      />
      <p className="flex justify-end">See More...</p>
    </div>
  );
};

export default Renderhtml;
