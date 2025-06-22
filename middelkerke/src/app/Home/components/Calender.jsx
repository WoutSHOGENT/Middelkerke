import Header from "./Header";
import Days from "./Days";

export default function Calender(){
    const months = [
        "Januari", "Februari", "Maart", "April", "Mei",
        "Juni", "Juli", "Augustus", "September", "Oktober",
        "November", "December"];
    const weekdays = [ "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfLastMonth = new Date(year, month, 0).getDate();
    const firstDayOfNextMonth = new Date(year, month + 1).getDay();
    const dayList = [];

        console.log("Last date of month: ", firstDayOfMonth);

    for (let i = firstDayOfMonth; i<6; i++){
        dayList.push(lastDateOfLastMonth - i);
    }

    dayList.reverse();

    for (let i = 1; i <= lastDateOfMonth; i++) {
        dayList.push(i);
    }

    for(let i = firstDayOfNextMonth; i <= 7; i++){
        dayList.push(i- firstDayOfNextMonth + 1);
    }

    return(
        <div className="flex flex-col items-center justify-center w-1/5 h-auto p-4 border-2 border-white">
            <Header month={months[month]} year={year}/>
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
                <Days listOfDays={dayList} />
            </div>
        </div>
    )
}