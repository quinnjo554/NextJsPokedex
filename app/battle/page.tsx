import React from "react";
import { FC } from "react";
import BattleLanding from "@/components/BattleLanding";

const Page: FC<PageProps> = ({ params }) => {
  return (
    <div className="text-black">
      <BattleLanding></BattleLanding>
    </div>
  );
};

export default Page;
