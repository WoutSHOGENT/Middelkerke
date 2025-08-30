export default function Days({ listOfDays = [], today }) {
    return (
        <ul className="grid grid-cols-7">
            {listOfDays.map((dayObj, index) => {
                const { date, isCurrentMonth } = dayObj;
                const isToday =
                    date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear();

                return (
                    <li
                        key={index}
                        className={`flex items-center justify-center aspect-square size-20 border border-red-500 ${
                            isToday ? "bg-red-500" : ""
                        } ${!isCurrentMonth ? "text-gray-400" : ""}`}
                    >
                        {date.getDate()}
                    </li>
                );
            })}
        </ul>
    );
}