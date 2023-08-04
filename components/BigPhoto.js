import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import MyButton from './MyButton';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from 'expo-sharing';

export default class BigPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#333333" }}>
                <Image
                    resizeMode={'cover'}
                    style={{ width: "100%", height: "80%" }}
                    source={{ uri: this.props.route.params.uri }}
                />
                <View style={{ alignItems: "flex-end", margin: 20, }}>
                    <Text style={{ color: "white", fontSize: 20 }}>{this.props.route.params.rozmiar}</Text>
                </View>
                <View style={{ flex: 1, width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <MyButton title="SHARE" color="white" onPress={() => this.share()} />
                    <MyButton title="DELETE" color="white" onPress={() => this.delete()} />
                </View>
            </View>
        );
    }
    share() {
        Sharing.shareAsync(this.props.route.params.uri)
    }
    delete = async () => {
        await MediaLibrary.deleteAssetsAsync([this.props.route.params.id]);
        this.props.route.params.fun()
        this.props.navigation.goBack();
    }
}
