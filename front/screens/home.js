import React, { useContext, useEffect, useCallback } from 'react';
import {
    FlatList,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import {
    useFocusEffect,
} from '@react-navigation/native';
import CafeContext from '../cafeContext'
import EventPreview from '../components/eventPreview';
import styles from '../styles';

const Home = ({ navigation }) => {
    const { events, setEvents, jwt, user, setSelected } = useContext(CafeContext);
    const abortController = new AbortController();

    useFocusEffect(
        useCallback(() => {
            getAllEvents();
        }, [])
    );

    useEffect(async () => {
        checkUser();
        return function cancel() {
            abortController.abort()
        }
    }, []);
    const getAllEvents = async () => {
        try {
            let res = await fetch('http://192.168.1.8:4000/', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + jwt
                },
                signal: abortController.signal
            });
            res = await res.json();
            setEvents(res);
        } catch (e) {
            console.error(e);
        }
    };
    const checkUser = async () => {
        try {
            const abortController = new AbortController()
            let checkUser = await fetch('http://192.168.1.8:4000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwt
                },
                body: JSON.stringify(user),
                signal: abortController.signal
            });
            checkUser = await checkUser.json();
        } catch (e) {
            console.error(e);
        }
    };
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