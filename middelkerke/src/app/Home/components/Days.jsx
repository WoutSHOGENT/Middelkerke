export default function Days({ listOfDays = [], today }) {
    return (
        <ul className="flex justify-between text-center text-sm flex-wrap">
            {listOfDays.map((dayObj, index) => {
                const { date, isCurrentMonth } = dayObj;
                const isToday =
                    date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear();

                return (
                    <li
                        key={index}
                        className={`w-1/7 flex justify-center mb-4 ${
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