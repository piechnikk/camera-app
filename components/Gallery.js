import React, { Component } from 'react';
import { View, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import MyButton from './MyButton';
import FotoItem from './FotoItem';
import * as MediaLibrary from "expo-media-library";

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            numColumns: 5,
            photos: [],
            loaded: false,
            selected: [],
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <MyButton title="GRID/LIST" color="black" onPress={() => this.gridList()}></MyButton>
                    <MyButton title="OPEN CAMERA" color="black" onPress={() => this.openCamera()}></MyButton>
                    <MyButton title="REMOVE SELECTED" color="black" onPress={() => this.remove()}></MyButton>
                </View>
                <View style={{ flex: 10 }}>
                    {
                        this.state.loaded
                            ?
                            <FlatList
                                numColumns={this.state.numColumns}
                                key={this.state.numColumns}
                                data={this.state.photos}
                                renderItem={({ item, index }) => <FotoItem width={this.state.width / this.state.numColumns} height={this.state.width / this.state.numColumns} uri={item.uri} selected={item.selected} shortClick={() => this.shortClick(index)} longClick={() => this.longClick(index)} />}
                            />
                            :
                            <ActivityIndicator size="large" color="darkslateblue" />
                    }
                </View>
            </View>
        );
    }
    shortClick(i) {
        if (this.state.selected.length > 0) {
            let x = [...this.state.photos]
            x[i].selected = !x[i].selected
            if (x[i].selected) {
                this.state.selected.push(this.state.photos[i])
            } else {
                let index = this.state.selected.indexOf(this.state.photos[i])
                this.state.selected.splice(index, 1)
            }
            this.setState({
                photos: [...x],
                selected: [...this.state.selected]
            })
        } else {
            let rozmiar = "" + this.state.photos[i].height + "x" + this.state.photos[i].width
            this.props.navigation.navigate("big", { uri: this.state.photos[i].uri, rozmiar: rozmiar, id: this.state.photos[i].id, fun: () => this.getPhotos() })
            // console.log("ojoj", this.state.photos[i]);
        }
    }
    longClick(i) {
        let x = [...this.state.photos]
        x[i].selected = !x[i].selected
        if (x[i].selected) {
            this.state.selected.push(this.state.photos[i])
        } else {
            let index = this.state.selected.indexOf(this.state.photos[i])
            this.state.selected.splice(index, 1)
        }
        this.setState({
            photos: [...x],
            selected: [...this.state.selected]
        })
    }

    openCamera() {
        this.props.navigation.navigate("camera", { fun: () => this.getPhotos() })
    }

    gridList() {
        this.setState({
            numColumns: this.state.numColumns == 1 ? 5 : 1
        })
    }

    getPhotos = async () => {
        this.setState({
            loaded: false
        })
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,           // ilość pobranych assetów
            mediaType: 'photo',    // typ pobieranych danych, photo jest domyślne
            sortBy: [[MediaLibrary.SortBy.default, false]]
        })
        let arr = obj.assets.map((el) => {
            el.selected = false
            return el
        })
        this.setState({
            photos: arr,
            loaded: true
        })
    }

    remove = async () => {
        await MediaLibrary.deleteAssetsAsync(this.state.selected);
        this.getPhotos()
        this.setState({ selected: [] })
    }

    componentDidMount = async () => {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        } else {
            this.getPhotos()
        }
    }
}
