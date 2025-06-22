export default function Header({month, year}){

    

    return(
        <span className="flex space-between justify-between w-50 mb-4">
            <h1>{month} {year}</h1>
            <div>
                <span className="hover:cursor-pointer"> L </span>
                <span className="hover:cursor-pointer"> R </span>
            </div>
        </span>
    )
}