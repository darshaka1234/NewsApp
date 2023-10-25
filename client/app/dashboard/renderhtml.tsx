import React from "react";

interface Props {
  htmlContent: string;
  classname?: string;
}

const Renderhtml = ({ htmlContent, classname }: Props) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      className={classname}
    />
  );
};

export default Renderhtml;
