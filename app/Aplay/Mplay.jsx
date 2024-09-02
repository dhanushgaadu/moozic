import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { View, Text,Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
function Mplay({ url }) {
    const [sound, setSound] = useState();
    const [playstate, setplaystate] = useState("stopped");
    async function pauseSound() {
        console.log('Pausing Sound');
        await sound.pauseAsync();
        setplaystate("paused");
    }
    async function playSound() {
        await sound.playAsync();
        setplaystate("playing");
    }
    async function stopSound() {
        console.log('Stopping Sound');
        await sound.stopAsync();
        setplaystate("stopped");
    }
    async function loadSound(url) {
        const { sound } = await Audio.Sound.createAsync(
            { uri: url }
        )
            setSound(sound);
    }
    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);
    useEffect(() => {
        loadSound(url).then(() => {
        playSound();
    })}, []);
    if (url) {
        if (playstate == "playing" || playstate == "paused") {
            if (playstate == "paused") {
                return (
                    <View style={styles.elements}>
                        <TouchableOpacity onPress={() => { playSound(url) }}>
                            <FontAwesome6 style={styles.icons}name="play" size={50} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { stopSound() }}>
                            <FontAwesome6 style={styles.icons}name="stop" size={50} color="white" />
                        </TouchableOpacity>
                    </View>)
            }
            else {
                return (
                    <View style={styles.elements}>
                        <TouchableOpacity onPress={() => { pauseSound() }}>
                            <FontAwesome6 style={styles.icons} name="pause" size={50} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { stopSound() }}>
                            <FontAwesome6 style={styles.icons}name="stop" size={50} color="white" />
                        </TouchableOpacity>
                    </View>)
            }
        }
        else {
            return (
                <View style={styles.elements}>
                    <TouchableOpacity onPress={() => { playSound(url) }}>
                        <FontAwesome6 style={styles.icons}name="play" size={50} color="white" />
                    </TouchableOpacity>
                </View>
            )
        }


    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    elements: {
        flexDirection: "row",
        alignItems: "center",
        borderStartColor: "white",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 50,
        textAlign: "center"
    },
    icons: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: "grey",
        margin: 10

    },
    image:{
        width: 300,
        height: 300,
        margin: 10,
        padding: 30,
        borderRadius: 50,
    },
    stack:{
        margin : 10,
        padding: 10,
        borderRadius: 50,
        width: "90%",
        height: "80%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#272727",
    }
});

export default function UI() {
    const { title,image,url } = useLocalSearchParams();
    return (
        <View style={styles.container}>
            <View style={styles.stack}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.text}>{title}</Text>
            <Mplay url={url} />
            </View>
        </View>
    )
}