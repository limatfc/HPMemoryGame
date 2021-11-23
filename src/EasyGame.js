import React from "react";
import { Card } from "./Card";

export class EasyGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenCard: [],
      namesLinks: [],
      namesStrings: [],
      pairs: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.createCheck = this.createCheck.bind(this);
  }

  handleClick(namesandImages) {
    this.setState((prevState) => {
      const arrayChosenCards = [...prevState.chosenCard];
      arrayChosenCards.push(namesandImages);
      return { chosenCard: arrayChosenCards };
    });
    // this.props.revertCard();
  }

  componentDidUpdate() {
    const transform = this.transformLowerCase();
    this.collectionNamesFromLinks(transform);
    this.collectionNames(transform);
    this.statusComparing();
  }

  transformLowerCase() {
    const chosenCard = this.state.chosenCard;
    let lowerCaseArray = chosenCard.map((item) => {
      return item.toLocaleLowerCase();
    });
    return lowerCaseArray;
  }

  collectionNamesFromLinks(lowerCaseArray) {
    let nameLink = [];
    lowerCaseArray.forEach((item) => {
      if (item.includes("http")) {
        let splittedArray1 = item.split("/");
        let splitedArray2 = splittedArray1[4].split(".");
        nameLink.push(splitedArray2[0]);
      }
    });
    if (
      this.state.namesLinks.length !== nameLink.length &&
      nameLink.length > 0
    ) {
      return this.setState({ namesLinks: nameLink });
    }
  }

  collectionNames(lowerCaseArray) {
    let nameString = [];
    lowerCaseArray.forEach((item) => {
      if (item.includes(" ")) {
        nameString.push(item);
      }
    });
    if (
      this.state.namesStrings.length !== nameString.length &&
      nameString.length > 0
    ) {
      return this.setState({ namesStrings: nameString });
    }
  }

  statusComparing() {
    //console.log(this.state.namesStrings, this.state.namesLinks);
    const pairsArray = [];
    if (
      this.state.namesStrings.length > 0 &&
      this.state.namesLinks.length > 0
    ) {
      this.state.namesStrings.forEach((item) => {
        this.state.namesLinks.forEach((na) => {
          if (item.includes(na)) {
            pairsArray.push(item);
            pairsArray.push(na);
          }
        });
      });
    }
    if (
      this.state.pairs.length !== pairsArray.length &&
      pairsArray.length > 0
    ) {
      return this.setState({ pairs: pairsArray });
    }
  }

  createCheck(x) {
    let data = x.toLocaleLowerCase();
    if (data.includes(" ")) {
      let includesName = this.state.pairs.includes(data);
      return includesName;
    }
    if (data.includes("http")) {
      let split1 = data.split("/");
      let split2 = split1[4].split(".");
      let includesLink = this.state.pairs.includes(split2[0]);
      return includesLink;
    }
  }

  render() {
    return this.props.shuffled.map((item) => (
      <Card
        key={item}
        namesandImages={item}
        onClickHandler={this.handleClick}
        checked={this.createCheck(item)}
      />
    ));
  }
}
