import React, { useContext } from 'react';
import { FlatList, ScrollView, Text, TouchableHighlight, View } from 'react-native';

import CafeContext from '../cafeContext'
import EventPreview from '../components/eventPreview';
import styles from '../styles';

const Home = ({ navigation }) => {
    const { events } = useContext(CafeContext);
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