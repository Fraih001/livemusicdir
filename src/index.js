import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { SET_ARTISTS, SET_CONCERTS } from './store';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import store from './store';
import Concerts  from './Concerts';
import Artists from './Artists'

const root = createRoot(document.querySelector('#root'));

class _App extends React.Component{
    async componentDidMount(){
        try {
            this.props.loadData();
        }
        catch(er){
            console.log(er)
        }
    }
    render(){
    console.log(this.props)
    return(
        
        <div>
        <div>
                <Artists/>
                </div>
            <div>
                <Concerts/>
                </div>
        </div>

               
            

    )
    }
    }

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

