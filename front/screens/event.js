import React from 'react';
import { ScrollView, Text, TouchableHighlight, View, Image } from 'react-native';
import CafeContext from '../cafeContext'

import styles from '../styles';
const Event = ({ navigation }) => {
    const { events, setEvents, selected } = React.useContext(CafeContext);
    const { name, description } = selected !== null ? events[selected] : { name: null, description: null };
    const handleRemove = async () => {
        const aux = events.slice();//simplest way to clone an array, although what we'll do could be achieved through by directly operating in events, this would attempt against immutability principle, so it's better to just clone the array, process it and reasing it
        aux.splice(selected, 1);
        navigation.navigate('Home');
        await setEvents(aux);
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <Text style={styles.title} >
                        {name}
                    </Text>
                    <Text style={styles.text} >
                        {description}
                    </Text>
                    <View View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={require('./landscape.jpg')}
                        />
                    </View>
                    <View View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={require('./landscape.jpg')}
                        />
                    </View>
                </View>
            </ScrollView>
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
        </View>
    )
}

export default Event;