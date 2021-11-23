import React from "react";

export class FetchImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = { fetchImg: "", images: []}
        this.getData = this.getData.bind(this)
    }
   
    getData = async () => {
        try {
            const response = await fetch("http://hp-api.herokuapp.com/api/characters");
            const jsonResponse = await response.json();
            console.log(jsonResponse)
        } catch(e) {
            console.log(e)
        }
    }
    
    handleChange () {
        this.setState({ fetchImg: this.jsonResponse})
    }

    render(){
        return <div images={this.handleChange}> </div>
    }
};