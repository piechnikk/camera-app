import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{ alignItems: "center", justifyContent: "center", margin: 10, flex: 1, }}>
                <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "center", color: this.props.color }}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

MyButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};