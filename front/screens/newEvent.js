import React, { useState, useContext, useEffect } from 'react';
import { Image, ScrollView, Text, TextInput, View, TouchableHighlight, Alert } from 'react-native';
import ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';

import styles from '../styles';
import CafeContext from '../cafeContext'

const NewEvent = ({ navigation }) => {
    const { jwt, selected, user } = useContext(CafeContext);
    const [image, setImage] = useState(null);
    const [update, setUpdate] = useState(true);
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
    });

    const composeEvent = {
        name: eventName,
        description: eventDescription,
        userId: user.id,
        location: JSON.stringify(location)
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
            allowsEditing: true,
            aspect: [4, 3],
        });

        alert(result.uri);
        console.log(result)

        if (!result.cancelled) {
            setImage(result.uri);
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