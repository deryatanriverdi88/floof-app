import React, { Component } from "react";

export default class Form extends Component { 
 


  render() {
    // console.log(this.props)


    return (
      <form onChange={this.props.handleChange} >
        <h5>Add/Edit floooof</h5>
        <input type="text" name="name" value={this.props.name} />
        <input type="text" name="imgUrl" value={this.props.imgUrl} />
        {this.props.fox.id ?
        <input onClick={(e)  => this.props.handleEdit(e, this.props.fox)} type="submit" /> : <input type="submit" onClick={(e) => this.props.handleSave(e, this.props)} />}
      </form> 
    );
  }
}
