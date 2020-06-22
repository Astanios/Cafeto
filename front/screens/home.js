import React, { useState, useContext, useEffect } from 'react';
import { FlatList, ScrollView, Text, TouchableHighlight, View } from 'react-native';

import CafeContext from '../cafeContext'
import EventPreview from '../components/eventPreview';
import styles from '../styles';

const Home = ({ navigation }) => {
    const { events, jwt } = useContext(CafeContext);
    const [apiCall, setApiCall] = useState();
    async function getMoviesFromApi() {
        try {
            let response = await fetch('https://reactnative.dev/movies.json');
            let responseJson = await response.json();
            return responseJson.movies;
        } catch (error) {
            console.error(error);
        }
    }
    const getEventsFromApi = async () => {
        try {
            let response = await fetch('http://10.0.2.2:4000/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + jwt,
                }
            });
            let responseJson = await response.json();
            return responseJson.movies;
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        /*fetch('http://10.0.2.2:4000/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + jwt,
            }
        })
            .then((response) => response)
            .then((json) => setApiCall(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));*/
        const aux1 = getMoviesFromApi(), aux2 = getEventsFromApi();

        console.log('getMoviesFromApi: ', aux1);
        console.log('getEventsFromApi: ', aux2);
    }, []);
    console.log('apiCall: ', apiCall);
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            {!!events.length ? (
                <FlatList
                    data={events}
                    renderItem={({ item, index }) => <EventPreview navigation={navigation} title={item.name} index={index} />}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal={false}
                    numColumns={2}
                />
            ) : (
                    <Text>No events created</Text>
                )}
            <View style={styles.footer}>
                <TouchableHighlight
                    style={styles.footerButton}
                    onPress={() => navigation.navigate('Create')}
                >
                    <Text style={styles.buttonText}>Create Event</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}
export default Home;