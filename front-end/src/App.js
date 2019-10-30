import React, { Component } from "react";
import Form from "./Form";
import CardContainer from "./CardContainer";
import ShowDetails from "./ShowDetails";
import "./App.scss";

export default class App extends Component {

  state = {
    foxes: [], 
    foxItem: {}, 
    name: "",
    imgUrl: ""
  }

  handleShowClick = (fox) => {
    // console.log("hey", fox )
    this.setState({
      foxItem: fox,
      name: fox.name,
      imgUrl: fox.img_url
    })
  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSave  = (event, fox) => {
    console.log("save button", fox.name)
    event.preventDefault()
    fetch("http://localhost:3000/foxes", {
      method:'POST',
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({
        name: this.state.name ,
        img_url: this.state.imgUrl
      })
    })
    .then(res => res.json())
    .then(foxObject => {
      this.setState({
       foxes: [foxObject, ...this.state.foxes]
      })
    })
    .then(
      this.setState({
        name: '',
        imgUrl: ''
      })
    )
  }

  handleEdit = (event, fox) => {
    console.log("edit button", fox.id)
    
    event.preventDefault()
    fetch(`http://localhost:3000/foxes/${fox.id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        img_url: this.state.imgUrl
      })
    })
    .then(res => res.json())
    .then(foxObject => {
      const foxes = this.state.foxes.map((fox => {
        return fox.id === foxObject.id ? foxObject : fox
      })) 
      this.setState({
        foxes: foxes,
        foxItem: foxObject
       })
    })
    .then(
      this.setState({
        name: '',
        imgUrl: ''
      })
    )
  }

  componentDidMount(){
    fetch("http://localhost:3000/foxes")
    .then(res => res.json())
    .then(foxObject => {
      this.setState({
        foxes: foxObject
      })
    })
  }

  render() {
    return (
      <React.Fragment>
        <Form fox={this.state.foxItem} 
        name={this.state.name} 
        imgUrl={this.state.imgUrl}
        handleChange={this.handleChange}
        handleSave={this.handleSave}
        handleEdit={this.handleEdit} />

        <CardContainer foxes={this.state.foxes} 
        handleShowClick={this.handleShowClick} />

        <ShowDetails fox={this.state.foxItem}/>
  
      </React.Fragment>
    );
  }
}
