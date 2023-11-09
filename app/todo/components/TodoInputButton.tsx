"use client";

import React from "react";

export default function TodoInputButton({
  handleOnClick,
}: {
  handleOnClick: () => void;
}) {
  return (
    <button
      className="bg-sky-500 w-1/12 border text-white rounded-md text-2xl"
      onClick={handleOnClick}
    >
      +
    </button>
  );
}
