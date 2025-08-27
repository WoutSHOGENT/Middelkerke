export default function Days({ listOfDays = [], today }) {
    return (
        <ul className="flex flex-wrap text-center text-sm">
            {listOfDays.map((dayObj, index) => {
                const { date, isCurrentMonth } = dayObj;
                const isToday =
                    date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear();

                return (
                    <li
                        key={index}
                        className={`aspect-square flex-1 min-w-1/7 max-w-1/7 border border-red-600 flex items-center justify-center ${
                            isToday ? "bg-red-500" : ""
                        } ${!isCurrentMonth ? "text-gray-400" : ""}`}
                        style={{ boxSizing: "border-box" }}
                    >
                        {date.getDate()}
                    </li>
                );
            })}
        </ul>
    );
}