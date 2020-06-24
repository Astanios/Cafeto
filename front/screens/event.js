import React, { useContext } from 'react';
import { ScrollView, Text, TouchableHighlight, View, Image, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CafeContext from '../cafeContext'

import styles from '../styles';

const Event = ({ navigation }) => {
    const { jwt, selected, user, setUpdate } = useContext(CafeContext);
    let { name, description, position, username, userId, id } = selected;
    const handleRemove = async () => {
        await fetch(`http://192.168.1.8:4000/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        navigation.navigate('Home');

    }
    //console.log(user, selected);
    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <Text style={styles.title} >
                        {name}
                    </Text>
                    <Text style={styles.text} >
                        Created by: {username}
                    </Text>
                    <Text style={styles.text} >
                        {description}
                    </Text>
                    <View View
                        style={styles.center}
                    >
                        <Image
                            source={require('../.gh-assets/landscape.jpg')}
                        />
                    </View>
                    <View View
                        style={styles.center}
                    >
                        <MapView
                            style={styles.mapStyle}
                        >

                            <Marker
                                coordinate={JSON.parse(position)}
                                title='Event Location'
                            />

                        </MapView>
                    </View>
                </View>
            </ScrollView>
            {user.id === userId &&
                <View style={styles.footer}>
                    <TouchableHighlight
                        style={styles.footerButton}
                        onPress={() => navigation.navigate('Create')}
                    >
                        <Text style={styles.buttonText}>Edit Event</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.footerButton}
                        onPress={handleRemove}
                    >
                        <Text style={styles.buttonText}>Remove Event</Text>
                    </TouchableHighlight>
                </View>
            }
        </View>
    )
}

export default Event;