import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    mapStyle: {
        width: '80%',
        height: Dimensions.get('window').height / 2,
        borderColor: '#FB0C43',
        borderWidth: 1,
    },
    container: {
        flex: 1,
        paddingTop: 10,
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    footerButton: {
        alignItems: 'center',
        backgroundColor: '#FB0C43',
        margin: 5
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: '100%',
        backgroundColor: 'rgba(12, 6, 63, 0.91)',
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#FB0C43'
    },
    buttonText: {
        textAlign: 'center',
        padding: 5,
        color: 'white',
        margin: 5
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 10
    },
    text: {
        fontSize: 14,
        marginHorizontal: 15,
        textAlign: 'justify'
    },
    event: {
        flex: 1,
        height: '100%'
    },
    map: {
        flex: 1
    },
    floatingActionButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 30,
        left: 10,
        right: 10,
        borderRadius: 10,
    },
    preview: {
        height: 100,
        width: 100,
        backgroundColor: '#FB0C43',
        margin: 15
    },
    previewTitle: {
        height: 20,
        width: 100,
        color: '#fff',
        textAlign: 'center'
    },
    previewImage: {
        height: 80,
        width: 100
    },
    input: {
        flex: 1,
        alignSelf: 'center',
        borderBottomColor: 'rgb(218, 0, 33)',
        borderBottomWidth: 1,
        width: '80%',
        marginVertical: 10,
    }
});