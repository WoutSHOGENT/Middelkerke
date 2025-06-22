export default function Days({listOfDays = []}){
    return(
        <ul className="flex justify-between text-center text-sm flex-wrap">
            {listOfDays.map((day, index) => {
                return(
                    <li key={index} className="w-1/7 flex justify-center mb-4">
                        {day}
                    </li>
                )
            })}
        </ul>
    )
}