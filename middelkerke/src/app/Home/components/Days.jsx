export default function Days({ listOfDays = [], today, selectedDays = [], onDayClick, reservedDays = []}) {
    return (
        <ul className="grid grid-cols-7 gap-1">
            {listOfDays.map((dayObj, index) => {
                const { date, isCurrentMonth } = dayObj;
                const isToday =
                    date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear();
                const dateString = date.toLocaleDateString();
                const isSelected = selectedDays.includes(dateString);
                return (
                    <li
                        key={index}
                        className={`flex items-center justify-center aspect-square size-20 border border-red-500 text-black
                        ${isToday ? "bg-red-500 text-white" : ""}
                        ${isSelected ? "bg-blue-300" : ""}
                        ${!isCurrentMonth ? "text-gray-400" : ""}
                        ${reservedDays.includes(dateString) ? "bg-green-500 text-white cursor-auto" : "cursor-pointer"}`}
                            onClick={() => reservedDays.includes(dateString) ? null : onDayClick(date)}
                        
                    >
                        {date.getDate()}
                    </li>
                );
            })}
        </ul>
    );
}