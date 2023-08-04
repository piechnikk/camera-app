import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

export default class FotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.shortClick()} onLongPress={() => this.longClick()}>
                <Image
                    style={{
                        width: this.props.width,
                        height: this.props.height,

                    }}
                    source={{ uri: this.props.uri }}
                />
                {
                    this.props.selected
                        ?
                        <View style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0, backgroundColor: "rgba(72,61,139,0.7)" }} />
                        :
                        <View />
                }
            </TouchableOpacity>
        );
    }

    shortClick(i) {
        this.props.shortClick()
    }
    longClick(i) {
        this.props.longClick()
    }
}
