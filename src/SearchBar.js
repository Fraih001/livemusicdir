import React, { Component } from 'react';
import { connect } from 'react-redux';

class _SearchBar extends Component{
    constructor(){
      super()

    this.state = {
        search: ''
    };
}

    handleChange=(ev)=>{
        this.setState({
            search: ev.target.value
        })
    };

    handleSubmit=(ev)=>{
        console.log(this.state.search)
        ev.preventDefault();
        // console.log(this.props)
        this.props.handleFormSubmit(this.state.search);
        this.setState({
            search: ""
        })
    }

    render(){
        const { handleSubmit, handleChange } = this;

        return (
            <div id='main-search' >
                <form>
                    <label className='label-search'>Search For Your Favorite Live Show!</label>
                    <div>
                    <input onChange={ handleChange } name='video-search' type='text' value={this.state.search}/>
                    <button onClick={ handleSubmit }>SEARCH</button>
                    </div>
                </form>
            </div>
        )
    }
};



const SearchBar = connect(null)(_SearchBar);

export default SearchBar
