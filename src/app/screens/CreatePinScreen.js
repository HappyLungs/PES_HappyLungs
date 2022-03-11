import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform, TextInput, Image, TouchableOpacity} from 'react-native';

import colors from '../config/colors';

const handlePress = () => console.log("clicked");


function CreatePinScreen(props) {
    return (
        <SafeAreaView
            style={styles.background}
        >
            <View
                style={styles.container}
            >
                <Text style={styles.title}> Create Pin</Text>
                <Text style={styles.subtitle}> Location</Text>
                <Text style={styles.subtitle}> Title
                    <Text style={styles.highlight}> *</Text>
                </Text>
                <TextInput style={styles.input}/>
                <Text style={styles.subtitle}> Description
                    <Text style={styles.highlight}> *</Text>
                </Text>
                <TextInput style={styles.input}/>
                <Text style={styles.subtitle}> Date</Text>
                <TextInput defaultValue='dd/mm/yyyy' style={styles.input} />
                <Text style={styles.subtitle}> Images</Text>
                <TouchableOpacity style={styles.containerImage} onPress={handlePress}>
                    <Image style={styles.image} fadeDuration={250} source={require("../../assets/addButton.png")}/>
                </TouchableOpacity>
                <Text style={styles.subtitle}> Rate</Text>

            </View>
        </SafeAreaView>        
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "flex-start",
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        alignItems: "center"
    },
    button: {
        width: '100%',
        height: 70,
        backgroundColor: "#2b7e58",
    },
    button2: {
        width: '100%',
        height: 70,
        backgroundColor: colors.secondary,
    },
    logo: {
        width: 100,
        height: 100,
    },
    container: {
        width: "100%",
        position: 'absolute',
        backgroundColor: colors.white,
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start", //main
        alignItems: "flex-start", //secondary
    },
    title: { 
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 30,
        paddingTop: 50,
        fontWeight: 'bold',
        color: '#12161b',
    },
    subtitle: { 
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontSize: 15,
        paddingTop: 25,
        paddingStart: 25,
        fontWeight: 'bold',
        color: '#12161b',
    },
    highlight: {
        color: "red",
    },
    input: {
        textAlign: 'left',
        justifyContent: "center",
        width: "85%",
        height: 35,
        left: 25,
        padding: 10,
        borderBottomWidth: 1.5,
    },
    containerImage: {
        left: 30,
        top: 5,
    },
    image: {
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        padding: 10,
        width: 40,
        height: 40,
    },
    btnContainer: {
        padding: 30,
      },
      // This only works on iOS
      datePicker: {
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
})

export default CreatePinScreen;