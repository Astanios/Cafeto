import React from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import styles from '../styles';
import CafeContext from '../cafeContext'


const EventPreview = ({ navigation, title, i, index }) => {
    const { setSelected } = React.useContext(CafeContext);

    const handleClick = async () => {
        await setSelected(index);
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
                    {title}
                </Text>
                <Image
                    style={styles.previewImage}
                    source={require('../screens/landscape.jpg')}
                />
            </View>
        </TouchableHighlight >
    )
}

export default EventPreview;