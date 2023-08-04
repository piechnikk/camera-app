import React, { Component } from 'react';
import { View, Text } from 'react-native';
import RadioButton from './RadioButton';

console.warn = () => { };

export default class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.default
        };
    }

    render() {
        return (
            <View style={{ flexDirection: this.props.direction, marginBottom: 20 }}>
                <View style={{ margin: 10, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "white", fontSize: 18 }}>{this.props.groupName}</Text>
                </View>
                {
                    this.props.data.map((el) => {
                        return <RadioButton name={el} selected={this.state.selected} changeClick={(name) => this.changeClick(name)} />
                    })
                }
            </View>
        );
    }

    changeClick(name) {
        this.setState({ selected: name })
        this.props.change(this.props.groupName, name)
    }
}
