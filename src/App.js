import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import './App.css';

/* Clarifai API */
const app = new Clarifai.App({
  apiKey: '682fe18e14694652a2f9eb061bcf767e'
});

/* Particles */
const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: '#3ca9d1',
        blur: 10
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    };
  }

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayBox = box => {
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)

      .then(response => this.displayBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
