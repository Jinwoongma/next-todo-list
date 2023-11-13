"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function IconButton({
  onClick,
  icon,
  iconClassName,
  buttonClassName,
}: {
  onClick?: () => void;
  icon?: IconProp;
  iconClassName?: string;
  buttonClassName?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`${buttonClassName} flex items-center justify-center flex-nowrap`}
    >
      <FontAwesomeIcon
        icon={icon as IconProp}
        className={`${iconClassName} text-xs py-2`}
      />
    </button>
  );
}
