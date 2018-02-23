import React from 'react';


class SearchBar extends React.Component{

constructor (props){
  super(props);
  this.state={term:''};
}
  render(){
    return (


      <div className="search-bar">
        <input
        placeholder='Number of words'
        value={this.state.term}
        onChange={(event)=>this.onEventChange(event.target.value)} >
        </input>

       </div>



    );
  }

onEventChange(term)
 {
   this.setState({term});
   this.props.onSearch(term);
 }

}
export default SearchBar;
