import React, { useContext, useEffect } from 'react';
import { FlatList, Text, TouchableHighlight, View } from 'react-native';

import CafeContext from '../cafeContext'
import EventPreview from '../components/eventPreview';
import styles from '../styles';

const Home = ({ navigation }) => {
    const { events, setEvents, jwt, user, setSelected, update, setUpdate } = useContext(CafeContext);

    useEffect(async () => {
        console.log('HOME USE EFFECT HOOK');
        const abortController = new AbortController()
        try {
            let res = await fetch('http://192.168.1.8:4000/', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + jwt
                },
                signal: abortController.signal
            });
            let checkUser = await fetch('http://192.168.1.8:4000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwt
                },
                body: JSON.stringify(user),
                signal: abortController.signal
            });
           setUpdate(false);

            res = await res.json();
            checkUser = await checkUser.json();
            setEvents(res);
        } catch (e) {
            console.error(e);
        }

        return function cancel() {
            abortController.abort()
        }
    }, [update]);

    const handleCreate = () => {
        setSelected(null);
        navigation.navigate('Create');
    };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            {events && events.length > 0 ? (
                <FlatList
                    data={events}
                    renderItem={({ item, index }) => <EventPreview navigation={navigation} item={item} />}
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
                    onPress={handleCreate}
                >
                    <Text style={styles.buttonText}>Create Event</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}
export default Home;