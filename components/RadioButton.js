import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

console.warn = () => { };

export default class RadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }} onPress={() => this.changeClick()}>
                <View style={{ borderRadius: 50, backgroundColor: "white", borderColor: "black", borderWidth: 1, width: 20, height: 20, marginHorizontal: 10, justifyContent: "center", alignItems: "center" }}>
                    {
                        this.props.selected == this.props.name
                            ?
                            <View style={{ borderRadius: 50, backgroundColor: "blue", width: 12, height: 12 }}></View>
                            :
                            <View></View>
                    }
                </View>
                <Text style={{ color: "white" }}> {this.props.name} </Text>
            </TouchableOpacity>
        );
    }

    changeClick() {
        this.props.changeClick(this.props.name)
    }
}
