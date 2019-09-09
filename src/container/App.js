import React, {Component} from 'react';
import './App.css';
import Navigation from '../component/Navigation/Navigation';
import Logo from '../component/Logo/Logo';
import ImageLinkForm from '../component/ImageLinkForm/ImageLinkForm';
import Rank from '../component/Rank/Rank';
import FaceRecognition from '../component/FaceRecognition/FaceRecognition';
import SignIn from '../component/SignIn/SignIn';
import Register from '../component/Register/Register';



const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
}
class App extends Component{
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      }
    }
  }

  loadUser = (data) =>{
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    })
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');//get the document from facerecognition
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      botRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
      fetch('https://pure-plains-53206.herokuapp.com/imageurl',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          input: this.state.input
      })
    })
      .then(response => response.json())
      .then( response => {
        if(response){
          fetch('https://pure-plains-53206.herokuapp.com/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          }).then(res => {
            return res.json();
          }).then(count => {
            this.setState(Object.assign
              (this.state.user, 
              {entries: count}))//Prevents changing the other values in teh user state
          })
          .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState);
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render(){
    return(
      <div className="App">
            <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
            { this.state.route === 'home' 
            ? <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
              </div>
            : (this.state.route === 'register' 
            ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )  
            }
      </div>
    )
  }
}

export default App;
