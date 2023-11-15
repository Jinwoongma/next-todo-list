"use client";

import { TodosContextType, useTodos } from "@/contexts/todoContext";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

export default function Header() {
  const { date, setDate } = useTodos() as TodosContextType;

  const handleDateChange = (newDate: DateValueType) => {
    if (newDate?.startDate) {
      // newDate가 DateValueType 객체인 경우
      const formattedDate = newDate.startDate.toString().split("T")[0];
      setDate(formattedDate);
    }
  };

  return (
    <div className="flex justify-between items-center pt-10 pb-5 w-full">
      <div className="text-4xl font-bold w-1/2">To-do List</div>
      <div className="w-1/3 border-solid border-slate-500  border rounded-md ">
        <Datepicker
          value={{ startDate: new Date(date), endDate: new Date(date) }} // 날짜 범위 형식에 맞춰 설정
          onChange={handleDateChange}
          maxDate={new Date()}
          primaryColor={"sky"}
          asSingle={true}
          useRange={false}
          displayFormat={"YYYY-MM-DD"}
          containerClassName="relative"
        />
      </div>
    </div>
  );
}
