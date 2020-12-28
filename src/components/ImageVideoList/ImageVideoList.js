import React from "react"
import ReactPlayer from 'react-player';
import "./ImageVideoList.css"
import{AiOutlineHeart} from "react-icons/ai";



const ImageList = ({both,search}) => {

  function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        obj[k] = v;
    }
    return obj;
}

function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}
   const newMap = localStorage.getItem("saveItems");
   let map = newMap !== null ? objToStrMap(JSON.parse(newMap)) : new Map();

  const save = (Item) => {
    let url = "";
    if(Item.type === "film" || Item.type ===  "animation"){     
         url = Item.videos.medium.url;   
    }else{
        url = Item.largeImageURL;   
    }  
      
    if(!map.has(search)){
          map.set(search, [])
    }
       
    map.get(search).push(url);
    var json = strMapToObj(map)
    localStorage.setItem("saveItems", JSON.stringify(json))
    const log = JSON.parse(localStorage.getItem("saveItems"));
      
    console.log(log);
     
  };


  
  return (
    <div className="container">
      <div className="row">
        { both.map(both => {
          
          return (
            
            <div key={both.id} className="col-md-4" style={{ marginBottom:"2rem" }}>
              <div className="imageList__container">
               {both.type === "film" || both.type === "animation"
              ? (<ReactPlayer controls width = "100%"  height="100%"  className="imageList__image" url={both.videos.small.url} alt={both.tags} /> )
             
              : (<img className="imageList__image" src={both.largeImageURL} alt={both.tags} />  )
               }
            
              </div>
              <div  className="image__details">
              <button onClick={() => save(both)}><AiOutlineHeart/>  Like</button>
            </div>
            </div>
          )
        }) }
        
      </div>
    </div>
  )
      
}

export default ImageList