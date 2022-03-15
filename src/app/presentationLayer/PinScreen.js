import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform, TouchableOpacity, Image} from 'react-native';

import colors from '../config/stylesheet/colors';

import { Rating } from 'react-native-ratings';

const handlePress = () => console.log("clicked");

function StatisticsScreen(props) {

    return (
        <SafeAreaView
            style={styles.background}
        >
            <View
                style={styles.container}
            >
                <Image style={styles.pinImage} fadeDuration={0} source={require("../../assets/noimage.png")}/>
                <View style={styles.stroke}/>
                <Text style={styles.title}> Pin Name</Text>
                <Text style={styles.text}> Pin Description</Text>
                <View
                    style={styles.containerBtn}
                >
                    <TouchableOpacity style={styles.containerImage} onPress={handlePress}>
                        <Image style={styles.image} fadeDuration={250} source={require("../../assets/ubication.png")}/>
                        <Text style={styles.text}> Pin Ubication</Text>
                        <Text style={styles.ubication}> See On Map</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerImage} onPress={handlePress}>
                        <Image style={styles.image} fadeDuration={250} source={require("../../assets/calendar.png")}/>
                        <Text style={styles.text}> dd/mm/yyyy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerImage} onPress={handlePress}>
                        <Image style={styles.image} fadeDuration={250} source={require("../../assets/comments.png")}/>
                        <Text style={styles.text}> 5</Text>
                        <Text style={styles.ubication}> See Comments</Text>
                    </TouchableOpacity>
                    <Rating imageSize={20} fractions={0} style={{padding: 10, marginLeft: 40, alignSelf:'flex-start'}}/>
                </View>
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
        alignItems: "flex-start"
    },
    container: {
        width: "100%",
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        position: 'absolute',
        flex: 1,     
        flexDirection: "column",
        justifyContent: "flex-start", //main
        alignItems: "flex-start", //secondary
        alignItems: "center",
    },
    btnText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    btn: {
        marginStart: 5,
        marginEnd: 5,
        justifyContent: 'center',
        borderRadius: 5,
        borderBottomWidth: 5,
        borderRadius: 5,
        width: 80,
        height: 35,
        borderBottomColor: colors.green2,
        backgroundColor: colors.green1,
    },
    containerBtn: {
        //backgroundColor: colors.green1,
        alignSelf: "flex-start",
        marginTop: 25,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        //padding: 10,
    },
    containerImage: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start',
        marginLeft: 40,
        padding: 10,
        marginBottom: 10,
    },
    pinImage: {
        width: 300,
        height: 300,
    },
    image: {
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        padding: 10,
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    stroke: {
        backgroundColor: "black",
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10,
        width: "80%",
        height: "0.5%",
    },
    title: { 
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontSize: 30,
        marginTop: 20,
        marginStart: 20,
        fontWeight: 'bold',
        color: '#12161b',
    },
    subtitle: { 
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontSize: 15,
        paddingTop: 10,
        marginStart: 20,
        fontWeight: 'bold',
        color: '#12161b',
    },
    text: {
        textAlign: 'left',
        textAlignVertical: 'center',
        alignSelf: 'flex-start',
        fontSize: 15,
        marginStart: 20,
        fontWeight: 'bold',
        color: '#12161b',
    },
    ubication: { 
        fontSize: 15,
        marginLeft: 40,
        //fontWeight: 'bold',
        color: colors.green1,
    },
})

export default StatisticsScreen;