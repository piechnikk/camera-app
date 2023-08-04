import React, { Component } from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import arrows from '../assets/arrows.png';
import camera from '../assets/camera.png';
import settings from '../assets/settings.png';

export default class CircleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let image = null
        if (this.props.text == "arrows") image = arrows
        else if (this.props.text == "camera") image = camera
        else image = settings

        return (
            <TouchableOpacity style={{ marginBottom: 20, backgroundColor: "darkslateblue", width: this.props.size, height: this.props.size, justifyContent: "center", alignItems: "center", borderRadius: 50 }} onPress={() => this.props.onPress()}>
                <Image source={image} style={{ width: this.props.size * 0.6, height: this.props.size * 0.6, resizeMode: 'contain' }} />
            </TouchableOpacity>
        );
    }
}
