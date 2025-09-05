export default function Header({month, monthString, year, setMonth, setYear}){

    const handleClick = (direction) => {
        if(direction === 'L'){
           month == 0 ? (setMonth(11), setYear(year - 1)) : setMonth(month - 1); 
        }else{
            month == 11 ? (setMonth(0), setYear(year + 1)) : setMonth(month + 1); 
        }
    }

    return(
        <span className="flex space-between justify-between w-50 mb-4 text-black">
            <h1>{monthString} {year}</h1>
            <div>
                <button onClick={() => handleClick("L")} className="mr-5 pl-1 pr-1 border  hover:cursor-pointer"> L </button>
                <button onClick={() => handleClick("R")} className="border pl-1 pr-1 hover:cursor-pointer"> R </button>
            </div>
        </span>
    )
}