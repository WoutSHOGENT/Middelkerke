export default function Days({ listOfDays = [], today }) {
    return (
        <ul className="flex justify-between text-center text-sm flex-wrap">
            {listOfDays.map((day, index) => {
                // Compare full date (day, month, year) for uniqueness
                const isToday =
                    day.getDate() === today.getDate() &&
                    day.getMonth() === today.getMonth() &&
                    day.getFullYear() === today.getFullYear();

                return (
                    <li
                        key={index}
                        className={`w-1/7 flex justify-center mb-4 ${
                            isToday ? "bg-red-500" : ""
                        }`}
                    >
                        {day.getDate()}
                    </li>
                );
            })}
        </ul>
    );
}