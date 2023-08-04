import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native'; // okrągła animacja ładowania
import { TouchableOpacity } from 'react-native'; // element klikalny
import * as Font from "expo-font";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontloaded: false
        };
    }

    render() {
        return (
            <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'darkslateblue' }} onPress={() => this.startApp()}>
                {
                    this.state.fontloaded
                        ?
                        <Text style={{
                            fontFamily: 'myfont',
                            fontSize: 64,
                            color: "white"
                        }}>Camera App</Text>
                        :
                        <ActivityIndicator size="large" color="white" />
                }
            </TouchableOpacity >
        );
    }

    startApp() {
        this.props.navigation.navigate("gallery")
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../assets/zen.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });

        setTimeout(() => {
            this.setState({ fontloaded: true })
        }, 500);
    }
}
