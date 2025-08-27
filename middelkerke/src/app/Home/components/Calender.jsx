import Header from "./Header";
import Days from "./Days";
import { useState } from "react";

export default function Calender(){
    const months = [
        "Januari", "Februari", "Maart", "April", "Mei",
        "Juni", "Juli", "Augustus", "September", "Oktober",
        "November", "December"];
    const weekdays = [ "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
    const date = new Date();
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    // const month = date.getMonth();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    var firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfLastMonth = new Date(year, month, 0).getDate();
    var firstDayOfNextMonth = new Date(year, month + 1).getDay();
    const dayList = [];

    if(firstDayOfMonth == 0){
        firstDayOfMonth = 7;
    }

    if(firstDayOfNextMonth == 0){
        firstDayOfNextMonth = 7;
    }

    for (let i = 0; i < firstDayOfMonth - 1; i++) {
        dayList.push({
            date: new Date(year, month - 1, lastDateOfLastMonth - i),
            isCurrentMonth: false
        });
    }
    dayList.reverse();

    for (let i = 1; i <= lastDateOfMonth; i++) {
        dayList.push({
            date: new Date(year, month, i),
            isCurrentMonth: true
        });
    }

    if (firstDayOfNextMonth != 1) {
        for (let i = firstDayOfNextMonth; i <= 7; i++) {
            dayList.push({
                date: new Date(year, month + 1, i - firstDayOfNextMonth + 1),
                isCurrentMonth: false
            });
        }
    }
    

    return(
        <div className="flex flex-col items-center justify-center w-1/5 h-auto p-4 border-2 border-white">
            <Header month={month} monthString={months[month]} year={year} setMonth={setMonth} setYear={setYear}/>
            <div>
                <ul className="flex justify-between text-center text-sm font-semibold mb-4">
                    {weekdays.map((day, index) => {
                        return(
                            <li key={index} className="w-1/7">
                                {day}
                            </li>
                        )
                    })
                    }
                </ul>
                <Days listOfDays={[...dayList]} today={date} />
            </div>
        </div>
    )
}