import React ,{Component} from "react"

import ImageVideoList from "./components/ImageVideoList/ImageVideoList"
import Search from "./components/Search/Search"

const API_TOKEN = "API_KEY";

class App extends Component {
   constructor(props){
    super()
    this.state = {
      searchValue:"",
      all:[],
      error: null
    }
    
   }
    

  handleMakeRequest = async (e) => {
    e.preventDefault()
    const searchValue = e.target.elements.searchValue.value
    this.setState({searchValue:searchValue})
    const video = await fetch(`https://pixabay.com/api/videos/?key=${API_TOKEN}&q=${searchValue}`)
    const image = await fetch(`https://pixabay.com/api/?key=${API_TOKEN}&q=${searchValue}`)
   
    const videos = await video.json()
    const videoHit = videos.hits
    const images = await image.json()
    // console.log(images);
    const imageHit = images.hits

    const newAll = [];
    for(var i = 0; i < 2 && i < videoHit.length; i++){
      let num = Math.random()*videoHit.length;
      num = Math.floor(num);
      newAll.push(videoHit[num]);
      videoHit.splice(num, 1)
    }

    for(var j = 0; j < 7 && j < imageHit.length; j++){
      let num = Math.random()*imageHit.length;
      num = Math.floor(num);
      newAll.push(imageHit[num]);
      imageHit.splice(num, 1)
    }
    // console.log(videoHit)
    if (!searchValue) {
      this.setState({ error: "Please provide a value." })
    }else if(newAll.length === 0){
      this.setState({error:"Sorry, we can't find"})
    }else {
      this.setState({
         all: newAll,
         error: null })
    }
  
  }
  render() {
   
    return (
      <div>
     
        <Search handleMakeRequest={this.handleMakeRequest} />
        { 
          this.state.error !== null ? 
          <div style={{ color:"#fff", textAlign:"center" }}>{ this.state.error }</div> : 
          <ImageVideoList both ={this.state.all} search = {this.state.searchValue} /> 
          
        }
        
        
      </div>
    )
  }
}

export default App
