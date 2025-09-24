import Header from "./Header";
import Days from "./Days";
import { useState } from "react";
import mockdata from "../mockdate.json";

export default function Calender(){
    const months = [
        "Januari", "Februari", "Maart", "April", "Mei",
        "Juni", "Juli", "Augustus", "September", "Oktober",
        "November", "December"];
    const weekdays = [ "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
    const date = new Date();
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [selectedDays, setSelectedDays] = useState([]);
    const [reservedDays, setReservedDays] = useState(mockdata.dates);
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    var firstDayOfMonth = new Date(year, month, 1).getDay() == 0 ? 7 : new Date(year, month, 1).getDay();
    const lastDateOfLastMonth = new Date(year, month, 0).getDate();
    var firstDayOfNextMonth = new Date(year, month + 1).getDay() == 0 ? 7 : new Date(year, month + 1).getDay();
    const dayList = [];

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

    const handleDayClick = (date) => {
        const dateString = date.toLocaleDateString();
        setSelectedDays(prev =>
            prev.includes(dateString)
                ? prev.filter(d => d !== dateString)
                : [...prev, dateString]
        );
    };

    const handleReserve = () => {
        const alreadyReserved = selectedDays.filter(day => reservedDays.includes(day));
        if (alreadyReserved.length > 0) {
            alert("These days have already been reserved: " + alreadyReserved.join(", "));
            setSelectedDays([]);
            return;
        }
        setReservedDays(prev => [...prev, ...selectedDays]);
        alert("Reserved days: " + selectedDays.join(", "));
        setSelectedDays([]);
    };

    return(
        <div className="flex flex-col items-center justify-center w-2/5 h-auto p-4 border-2 border-black">
            <Header month={month} monthString={months[month]} year={year} setMonth={setMonth} setYear={setYear}/>
            <div>
                <ul className="grid grid-cols-7 text-center text-sm font-semibold mb-4 text-black">
                    {weekdays.map((day, index) => (
                        <li key={index} className="text-center">{day}</li>
                    ))}
                </ul>
                <Days
                    listOfDays={dayList}
                    today={date}
                    selectedDays={selectedDays}
                    onDayClick={handleDayClick}
                    reservedDays={reservedDays}
                />
                <button
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                    onClick={handleReserve}
                >
                    Reserve Selected Days
                </button>
            </div>
        </div>
    )
}