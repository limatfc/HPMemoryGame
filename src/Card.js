import React from "react";
import card from "./card.jpeg";
import "./Card.css";

export class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
    };
  }

  onClick(trueOrFalse) {
    this.setState({ isHidden: trueOrFalse });
    this.props.onClickHandler(this.props.namesandImages);
  }

  render() {
    if (this.state.isHidden) {
      return (
        <div>
          <img
            onClick={() => {
              this.onClick(false);
            }}
            class="cards all"
            src={card}
            alt="choosencard"
          />
        </div>
      );
    } else {
      if (this.props.namesandImages.includes("http")) {
        if (this.props.checked) {
          return (
            <div>
              <img
                class="images checked all"
                src={this.props.namesandImages}
                alt="characterface"
              />
            </div>
          );
        } else {
          return (
            <div>
              <img
                class="images all"
                src={this.props.namesandImages}
                alt="characterface"
              />
            </div>
          );
        }
      } else {
        if (this.props.checked) {
          return (
            <div class="names checked all">{this.props.namesandImages}</div>
          );
        } else {
          return <div class="names all">{this.props.namesandImages}</div>;
        }
      }
    }
  }
}
