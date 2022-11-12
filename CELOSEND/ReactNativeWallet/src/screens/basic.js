// Basic Imports
import React, { Component } from 'react';
import { Text, View, Pressable, Image, Dimensions, Animated, ScrollView } from 'react-native';
import Footer from './components/footer';
import Header from './components/header';
// Utils 
import reactAutobind from 'react-autobind';
// Utils Local
import ContextModule from '../utils/contextModule';
// Styles
import GlobalStyles from '../styles/styles';

function epsilonRound(num, zeros = 4) {
    return Math.round((num + Number.EPSILON) * Math.pow(10, zeros)) / Math.pow(10, zeros)
}

class Swap extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
        reactAutobind(this)
        this.mount = true
    }

    static contextType = ContextModule;

    async componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            this.mount = true
            this.mount && this.setState({
                
            })
        })
        this.props.navigation.addListener('blur', () => {
            this.mount = false
            this.setState({
                
            })
        })
    }

    componentWillUnmount() {
        this.mount = false
    }

    render() {
        return (
            <>
                <View style={GlobalStyles.container}>
                    <Header />
                    <View style={[GlobalStyles.main, { flexDirection: "column", alignItems: "center", paddingTop: 10 }]}>

                    </View>
                    <Footer navigation={this.props.navigation} />
                </View>
            </>
        );
    }
}

export default Swap;