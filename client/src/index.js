import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './search_bar';
import List from './list';


class App extends React.Component {
  constructor(props){
  super(props);
  this.state={
    data : []
  };
  this.getdata=this.getdata.bind(this);
 }



 getdata(term) {
   fetch(`http://localhost:5000/api/${term}`)
     .then(response => response.json())
     .then(parsedJson => this.setState({data:parsedJson}))
     .catch(error => console.log(error))
   }



  render(){
    const videoSearch=_.debounce((term)=>{this.getdata(term)},600);
  return(
    <div>
      <SearchBar onSearch={videoSearch}/>
      <List listitems={this.state.data}/>
    </div>);
  }
}

ReactDOM.render(<App />,document.querySelector('.container'));
