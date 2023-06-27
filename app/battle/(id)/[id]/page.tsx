import React, { FC } from "react";
import MoveSelect from "@/components/MoveSelect";
const Page: FC<PageProps> = ({ params }) => {
  return (
    <div>
      <MoveSelect id={params.id}></MoveSelect>
    </div>
  );
};

export default Page;
