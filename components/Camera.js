import React, { Component } from 'react';
import { View, Text, TouchableOpacity, BackHandler, ToastAndroid, Animated, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Camera } from "expo-camera";
import CircleButton from './CircleButton';
import * as MediaLibrary from "expo-media-library";
import RadioGroup from './RadioGroup';

export default class Kamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
            type: Camera.Constants.Type.back,  // typ kamery
            pos: new Animated.Value(Dimensions.get("window").height),
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
            ratioArr: ["4:3", "16:9"],
            wbArr: Object.keys(Camera.Constants.WhiteBalance).sort(),
            psArr: [],
            fmArr: Object.keys(Camera.Constants.FlashMode),

            ratio: "4:3",
            wb: "auto",
            ps: "4000x3000",
            fm: "auto",


            ratioHeight: (4 / 3)
        };
        this.isHidden = true
    }

    render() {
        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: "#333333", }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        style={{ width: this.state.width, height: this.state.width * this.state.ratioHeight }}
                        type={this.state.type}
                        onCameraReady={() => console.log("camera ready")}
                        ratio={this.state.ratio}
                        whiteBalance={this.state.wb}
                        pictureSize={this.state.ps}
                        flashMode={this.state.fm}
                    >
                    </Camera>


                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly", alignItems: "flex-end" }}>
                        <CircleButton text="arrows" size={80} onPress={() => this.changeCamera()} />
                        <CircleButton text="camera" size={100} onPress={() => this.takePhoto()} />
                        <CircleButton text="settings" size={80} onPress={() => this.toggle()} />
                    </View>
                    <Animated.View
                        style={[styles.animatedView, { transform: [{ translateY: this.state.pos }] }]} >
                        <ScrollView>
                            <RadioGroup
                                key="1"
                                groupName="WHITE BALANCE"
                                data={this.state.wbArr}
                                direction="column"
                                change={(group, name) => this.change(group, name)}
                                default="auto"
                            />
                            <RadioGroup
                                key="2"
                                groupName="FLASH MODE"
                                data={this.state.fmArr}
                                direction="column"
                                change={(group, name) => this.change(group, name)}
                                default="auto"
                            />
                            <RadioGroup
                                key="3"
                                groupName="CAMERA RATIO"
                                data={this.state.ratioArr}
                                direction="column"
                                change={(group, name) => this.change(group, name)}
                                default="4:3"
                            />
                            {this.state.psArr.length > 0
                                ?
                                <RadioGroup
                                    key="4"
                                    groupName="PICTURE SIZE"
                                    data={this.state.psArr}
                                    direction="column"
                                    change={(group, name) => this.change(group, name)}
                                    default={this.state.psArr[this.state.psArr.length - 1]}
                                /> : <View></View>
                            }

                        </ScrollView>

                    </Animated.View>
                </View>
            );
        }
    }
    change(group, name) {
        if (group == "WHITE BALANCE") {
            this.setState({ wb: name })
        } else if (group == "FLASH MODE") {
            this.setState({ fm: name })
        } else if (group == "CAMERA RATIO") {
            this.setState({ ratio: name })
        } else if (group == "PICTURE SIZE") {
            this.setState({ ps: name })
        }
        setTimeout(() => {
            this.getSizes()
            let rat = this.state.ratio.split(":")
            this.setState({ ratioHeight: rat[0] / rat[1] })
        }, 100);
    }

    toggle() {
        this.getSizes()
        let toPos = 0
        if (this.isHidden) toPos = 0; else toPos = this.state.height

        //animacja

        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
                useNativeDriver: true
            }
        ).start();

        this.isHidden = !this.isHidden;
    }

    changeCamera() {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }

    takePhoto = async () => {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
            ToastAndroid.showWithGravity(
                'zrobiono zdjęcie',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    componentDidMount = async () => {
        let { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status == 'granted' });
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);

        //ratios
        if (this.camera) {
            const ratios = await this.camera.getSupportedRatiosAsync()
            this.setState({ ratioArr: ratios })
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.route.params.fun()
        this.props.navigation.goBack()
        return true;
    }
    getSizes = async () => {
        if (this.camera) {
            const sizes = await this.camera.getAvailablePictureSizesAsync(this.state.ratio)
            this.setState({ psArr: sizes })
        }
    };
}

var styles = StyleSheet.create({

    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(50,50,50,0.7)",
        height: "100%",
        width: "50%",
    }
});