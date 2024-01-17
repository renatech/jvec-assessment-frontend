import "../App.css"

export const MySearch=(props)=>{
    return(
        <div id="search-container">
            <div id="search-icon"></div>
            <input type="text" placeholder="Search" onInput={(e)=>{props.search(e.target.value)}}/>
        </div>
    )
}