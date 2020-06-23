import React from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import styles from '../styles';
import CafeContext from '../cafeContext'


const EventPreview = ({ navigation, item }) => {
    const { setSelected } = React.useContext(CafeContext);

    const handleClick = async () => {
        await setSelected(item);
        navigation.navigate('Event');
    };
    return (
        <TouchableHighlight
            style={styles.preview}
            onPress={handleClick}
        >
            <View>
                <Text
                    style={styles.previewTitle}
                >
                    {item.name}
                </Text>
                <Image
                    style={styles.previewImage}
                    source={require('../.gh-assets/landscape.jpg')}
                />
            </View>
        </TouchableHighlight >
    )
}

export default EventPreview;