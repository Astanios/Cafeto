import React, { useState, useContext, useEffect } from 'react';
import { Image, ScrollView, Text, TextInput, View, TouchableHighlight, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';

import styles from '../styles';
import CafeContext from '../cafeContext'

const NewEvent = ({ navigation }) => {
    const { jwt, selected, user } = useContext(CafeContext);
    const [image, setImage] = useState(null);
    const [update, setUpdate] = useState(true);
    const [uploadImage, setUploadImage] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [location, setLocation] = useState({
        latitude: 51.5078788,
        longitude: -0.0877321,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009
    });

    useEffect(() => {
        if (!!selected && update) {
            setUpdate(false);
            setEventName(selected.name.slice());
            setEventDescription(selected.description.slice());
            setLocation(JSON.parse(selected.position));
        }
        (async () => {
            if (Constants.platform.ios) {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    });

    const composeEvent = {
        name: eventName,
        description: eventDescription,
        userId: user.id,
        location: JSON.stringify(location)
    };

    const postImage = async () => {
        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = image;
        let filename = localUri.split('/').pop();
        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('photo', { uri: localUri, name: filename, type });
        res = await fetch('http://192.168.1.8:4000/uploadfile', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + jwt

            },
        });
        return res;
    };

    const createEvent = async () => {
        try {
            let res = await fetch('http://192.168.1.8:4000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwt
                },
                body: JSON.stringify(composeEvent)
            });
            res = await res.json();
        } catch (e) {
            console.error(e);
        }
    };

    const updateEvent = async () => {
        try {
            let res = await fetch(`http://192.168.1.8:4000/${selected.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwt
                },
                body: JSON.stringify(composeEvent)
            });
            res = await res.json();
        } catch (e) {
            console.error(e);
        }
    };

    const _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setUploadImage(true);
        }
    };

    const handleName = (e, attr) => setEventName(e);
    const handleDescription = (e, attr) => setEventDescription(e);

    const handleMap = async ({ nativeEvent: { coordinate } }) => {
        await setLocation(coordinate);
    };

    const handleSubmit = async () => {
        if (!eventName || !eventDescription) {
            Alert.alert(
                "Empty fields",
                "Please, provide name and description of the event before submitting.",
                [
                    { text: "OK", onPress: () => { } }
                ]
            );

        } else {
            if (selected !== null) {
                await updateEvent();
            } else {
                await createEvent();
            }
            if (uploadImage)
                await postImage();
            navigation.navigate('Home');
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View
                    style={styles.input}
                >
                    <TextInput
                        name='name'
                        style={{ height: 40 }}
                        placeholder='Event name'
                        value={eventName}
                        onChangeText={handleName}
                    />
                </View>
                <View
                    style={styles.input}
                >
                    <TextInput
                        style={{ height: 40 }}
                        placeholder='Event description'
                        name='description'
                        multiline={true}
                        numberOfLines={4}
                        value={eventDescription}
                        onChangeText={handleDescription}
                    />
                </View>

                <View style={styles.center}>
                    <TouchableHighlight
                        style={{ ...styles.footerButton, width: '80%' }}
                        title='Select Image'
                        onPress={_pickImage}
                    >
                        <View>
                            <Text style={styles.buttonText}>Select Image</Text>
                        </View>
                    </TouchableHighlight>
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>
                <View View
                    style={styles.center}
                >
                    <MapView
                        style={styles.mapStyle}
                        onPress={handleMap}
                    >

                        <Marker
                            coordinate={location}
                            title='Event Location'
                        />

                    </MapView>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableHighlight
                    style={styles.footerButton}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default NewEvent;