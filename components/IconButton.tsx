"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function Button({
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
    <button onClick={onClick} className={buttonClassName}>
      <FontAwesomeIcon
        icon={icon as IconProp}
        className={`${iconClassName} py-1 px-2`}
      />
    </button>
  );
}
