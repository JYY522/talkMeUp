import React from "react"

import "./Search.css"

function ImageSearch({handleMakeRequest}){

const clearStorage = () =>{
  console.log("clear")
  localStorage.removeItem("saveItems");
  window.location.reload();
}
  return(
     <div className="imageSearch">
       <form onSubmit={handleMakeRequest} className="imageSearch__form">
        <input autoComplete="off" name="searchValue" type="text" placeholder="search for images..."/>
        <button>Search</button>
       </form>
      <button className = "clearStorage" onClick = {clearStorage}>Clear Storage</button>
   </div>
)
}

export default ImageSearch