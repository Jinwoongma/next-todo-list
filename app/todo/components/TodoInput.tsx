"use client";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TodoInput() {
  return (
    <label className="relative block">
      <span className="sr-only">Search</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg className="h-4 w-4" viewBox="0 0 20 20">
          <FontAwesomeIcon
            icon={faPencil as IconProp}
            className="text-slate-500"
          />
        </svg>
      </span>
      <input
        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="할일을 입력해주세요.."
        type="text"
        name="search"
      />
    </label>
  );
}
