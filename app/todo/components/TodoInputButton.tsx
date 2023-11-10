"use client";

import IconButton from "@/components/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function TodoInputButton({
  handleOnClick,
}: {
  handleOnClick: () => void;
}) {
  return (
    <IconButton
      onClick={handleOnClick}
      icon={faPlus}
      iconClassName="text-white"
      buttonClassName="bg-sky-500 hover:bg-sky-700 w-1/12 border rounded-sm"
    ></IconButton>
  );
}
