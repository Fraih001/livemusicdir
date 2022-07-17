import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { SET_ARTISTS, SET_CONCERTS } from './store';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import store from './store';
import Concerts  from './Concerts';
import Artists from './Artists';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import youtube from '../apis/youtube';

const root = createRoot(document.querySelector('#root'));

class _App extends Component{
    constructor(){
        super()
        this.state = {
            videos: [],
            selectedVideo: null
        }

    // this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    async componentDidMount(){
        try {
            this.props.loadData();
        }
        catch(er){
            console.log(er)
        }
    }

    handleFormSubmit = async(searchPhrase) => {
        const response = await youtube.get('/search', {
            params: {
                q: searchPhrase
            }
        })
        console.log(response.data.items)
        this.setState({
            videos: response.data.items
        })
    }

    handleVideoSelect = video => {
        this.setState({selectedVideo: video})
    }

    render(){
    const { handleFormSubmit } = this;

    return(
        <div>
            
            <SearchBar handleFormSubmit={ handleFormSubmit }/>
            <div>
            </div>
            <VideoDetail video={this.state.selectedVideo}/>
            <div>
            </div>
            <VideoList handleVideoSelect = {this.handleVideoSelect} videos={this.state.videos}/>

        </div>
    )}};

const mapDispatch = (dispatch) => {
    return {
        loadData: async()=>{
            const responses = await Promise.all([
                axios.get('/api/artists'),
                axios.get('/api/concerts')
            ]);
            dispatch({
                type: SET_ARTISTS,
                artists: responses[0].data
            });
            dispatch({
                type: SET_CONCERTS,
                concerts: responses[1].data
            });
        }
    }
}

const mapStateToProps = (state) => {
    return {
        artists: state.artists,
        concerts: state.concerts
    }
}

const App = connect(mapStateToProps, mapDispatch)(_App)

root.render(<Provider store={ store }><App/></Provider>);

