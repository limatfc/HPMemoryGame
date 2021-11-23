import React from "react";
import { Card } from "./Card";
import underConstruction from "./underConstruction.jpg";

export class MediumGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { numberofclickedcards: 0 };
    this.revertCard = this.revertCard.bind(this);
  }

  revertCard() {}

  render() {
    return <img src={underConstruction} alt="" />;
    //this.props.shuffled.map((item) => (
    //<Card key={item} namesandImages={item} onClickHandler={() => {}} />
    // ));
  }
}
