import React from 'react';
import { Image, ScrollView, Text, TextInput, View, TouchableHighlight } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles';
import CafeContext from '../cafeContext'

const NewEvent = ({ navigation }) => {
    const { events, setEvents, selected, setSelected } = React.useContext(CafeContext);
    const [image, setImage] = React.useState(null);
    const [newEvent, setNewEvent] = React.useState(selected !== null ? events[selected] : {});
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

    const handleInput = async (e, attr) => await setNewEvent({ ...newEvent, [attr]: e });

    const handleSubmit = async () => {
        if (selected !== null) {
            const aux = events.slice();
            aux[selected] = newEvent;
            await setEvents(aux);
        } else {
            await setEvents([...events, newEvent]);
        }
        navigation.navigate('Home');
        await setSelected(null);
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
                        value={newEvent.name || ''}
                        onChangeText={e => handleInput(e, 'name')}
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
                        value={newEvent.description || ''}
                        onChangeText={e => handleInput(e, 'description')}
                    />
                </View>

                <View style={{ 'marginTop': 20 }}>
                    <TouchableHighlight
                        style={{ ...styles.footerButton }}
                        title='Select Image'
                        onPress={_pickImage}
                    >
                        <View>
                            <Text style={styles.buttonText}>Select Image</Text>
                        </View>
                    </TouchableHighlight>
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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