import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, Icon, ListItem } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';

class App extends Component {

  state = {
    values : []
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/values")
    .then((response) => {
      console.log(response);
      this.setState({
        values: response.data
      })
    })

  }

  render(){
    return (
      <div>
        {/* className="App"   */}
        {/* <header className="App-header"> */}
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
  <Header as='h2'>
  <Icon name='users' circular />
    <Header.Content>Reactivities</Header.Content>
  </Header>


  <List>
  {this.state.values.map((value: any) => (
             <ListItem key={value.id}>{value.id} - {value.name}</ListItem>
           ))}
  </List>

         
        {/* </header> */}
      </div>
    );
  }
  
}

export default App;
