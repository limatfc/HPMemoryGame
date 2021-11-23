import React from "react";
import "./App.css";
import initial from "./initial.jpg";
import { EasyGame } from "./EasyGame";
import { MediumGame } from "./MediumGame";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      names: [],
      selectedDifficult: null,
    };
    // this.randomNamesAndImages = this.randomNamesAndImages.bind(this);
  }

  async fetchImage() {
    try {
      const response = await fetch(
        "https://hp-api.herokuapp.com/api/characters"
      );
      const jsonResponse = await response.json();

      return jsonResponse;
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    const arrayJsonResponse = await this.fetchImage();
    const arrayNames = [];
    const arrayImages = [];
    for (let i = 0; i < arrayJsonResponse.length; i++) {
      const name = arrayJsonResponse[i].name;
      const image = arrayJsonResponse[i].image;
      let addS = image.replace("http", "https");
      if (name && image) {
        arrayNames.push(name);
        arrayImages.push(addS);
      }
    }
    this.setState({ names: arrayNames, images: arrayImages });
  }

  randomList() {
    const indexList = [];
    if (this.state.names.length) {
      do {
        const random = Math.floor(Math.random() * this.state.names.length);
        if (!indexList.includes(random)) {
          indexList.push(random);
        }
      } while (indexList.length < 10);
    }
    return indexList;
  }

  pickImages(indexList) {
    let pickedImages = [];
    for (let i = 0; i < indexList.length; i++) {
      pickedImages.push(this.state.images[indexList[i]]);
    }
    return pickedImages;
  }

  pickNames(indexList) {
    let pickedNames = [];
    for (let i = 0; i < indexList.length; i++) {
      pickedNames.push(this.state.names[indexList[i]]);
    }
    return pickedNames;
  }

  joinNamesAndImages(pickedNames, pickedImages) {
    let randomItems = [];
    randomItems.push(pickedNames, pickedImages);
    let totalItems = randomItems.flat();
    return totalItems;
  }

  randomNamesAndImages(arrayTotal) {
    const shuffledArray = [];
    if (this.state.names.length) {
      do {
        for (let i = 0; i < arrayTotal.length; i++) {
          const random = Math.floor(Math.random() * arrayTotal.length);
          if (!shuffledArray.includes(arrayTotal[random])) {
            shuffledArray.push(arrayTotal[random]);
          }
        }
      } while (shuffledArray.length < 20);
    }
    return shuffledArray;
  }

  render() {
    let indexes = this.randomList();
    let arrayTotal = this.joinNamesAndImages(
      this.pickNames(indexes),
      this.pickImages(indexes)
    );
    const shuffled = this.randomNamesAndImages(arrayTotal);
    return (
      <div id="complete">
        <div id="head">
          <h1>Welcome!</h1>
          <h2>Let's play a game?</h2>
          <h3>Memory Game</h3>
          <button>I don't know how to play</button>
          <h3>How big of a challenge are you ready to face?</h3>
          <button onClick={() => this.setState({ selectedDifficult: "easy" })}>
            Small
          </button>
          <button
            onClick={() => this.setState({ selectedDifficult: "medium" })}
          >
            Medium
          </button>
        </div>
        <div id="body">
          {this.state.selectedDifficult === null && (
            <img src={initial} alt="" />
          )}
          {this.state.selectedDifficult === "easy" && (
            <EasyGame shuffled={shuffled} />
          )}
          {this.state.selectedDifficult === "medium" && (
            <MediumGame shuffled={shuffled} />
          )}
        </div>
      </div>
    );
  }
}
