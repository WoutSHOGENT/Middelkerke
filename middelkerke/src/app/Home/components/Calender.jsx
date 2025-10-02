"use client";
import Header from "./Header";
import Days from "./Days";
import { useState, useMemo } from "react";
import mockdata from "../../../../api/mockdata.json";

const months = [
    "Januari", "Februari", "Maart", "April", "Mei",
    "Juni", "Juli", "Augustus", "September", "Oktober",
    "November", "December"
];
const weekdays = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

function getDayList(year, month) {
    const dayList = [];
    const today = new Date();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const firstWeekday = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();
    const lastDateOfLastMonth = new Date(year, month, 0).getDate();

    for (let i = 0; i < firstWeekday - 1; i++) {
        dayList.push({
            date: new Date(year, month - 1, lastDateOfLastMonth - (firstWeekday - 2) + i),
            isCurrentMonth: false
        });
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        dayList.push({
            date: new Date(year, month, i),
            isCurrentMonth: true
        });
    }

    const totalDays = dayList.length;
    const remaining = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
    for (let i = 1; i <= remaining; i++) {
        dayList.push({
            date: new Date(year, month + 1, i),
            isCurrentMonth: false
        });
    }

    return dayList;
}

export default function Calender() {
    const now = new Date();
    const [month, setMonth] = useState(now.getMonth());
    const [year, setYear] = useState(now.getFullYear());
    const [selectedDays, setSelectedDays] = useState([]);
    const [reservedDays, setReservedDays] = useState(mockdata.reservations.flatMap(reservation => reservation.dates));
    console.log(reservedDays)

    const dayList = useMemo(() => getDayList(year, month), [year, month]);

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

    return (
        <div className="flex flex-col items-center justify-center w-2/5 h-auto p-4 border-2 border-black">
            <Header
                month={month}
                monthString={months[month]}
                year={year}
                setMonth={setMonth}
                setYear={setYear}
            />
            <div>
                <ul className="grid grid-cols-7 text-center text-sm font-semibold mb-4 text-black">
                    {weekdays.map((day, index) => (
                        <li key={index} className="text-center">{day}</li>
                    ))}
                </ul>
                <Days
                    listOfDays={dayList}
                    today={now}
                    selectedDays={selectedDays}
                    onDayClick={handleDayClick}
                    reservedDays={reservedDays}
                />
                <button
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
                    onClick={handleReserve}
                    disabled={selectedDays.length === 0}
                >
                    Reserve Selected Days
                </button>
            </div>
        </div>
    );
}