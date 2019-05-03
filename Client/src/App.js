import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
const URL = 'https://us-central1-java-88af9.cloudfunctions.net/api/Onepiece/';

class App extends Component {
  //สร้างตัวแปร "character" : ในการเก็บตัวแปรแบบอาเรย์
  constructor(props) {
    super(props)
    this.state = {
      characters: []
    }
  }
  //ฟังก์ชัแยกสำหรับเรียกใช้ค่าภายใน API
  //เก็บค่าที่เรียกจาก API ไว้ในอาเรย์รูปแบบอาเรย์
  componentDidMount() {
    axios.get(URL)
      .then(res => {
        this.setState({ characters: res.data })
        console.log(res.data)
      })
  }
  //ฟังก์ชันแยกในการแสดงผล UI
  renderDisplay() {
    return _.map(this.state.characters, character => {
      return (
        <div className="wrap">
        <br/>
          <h2>name: {character.name}</h2> 
          <button className="btn btn-primary btn-lg disabled">Edit</button>
          <button className="btn btn-primary btn-lg disabled">Delete</button> 
        </div>
      )
    })
  }
  //ฟังก์ชัหลักในการแสดงผล UI
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="One-Piece" >
          </AppBar>
          <br/>
          {this.renderDisplay()}
        </div>
      </MuiThemeProvider>
    )
  }
  
}

export default App;
