import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform, TouchableOpacity, Image} from 'react-native';

import colors from '../config/stylesheet/colors';

import { Rating } from 'react-native-ratings';

const handleSeeOnMap = () => console.log("See On Map clicked");
const handleShare = () => console.log("Share clicked");
const handleSeeStatistics = () => console.log("See Statistics clicked");
const handleBookmark = () => console.log("Bookmark clicked");

function PinDefaultScreen(props) {

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <Image style={styles.pinImage} fadeDuration={0} source={require("../../assets/noimage.png")}/>
                <View style={styles.stroke}/>
                <View style={styles.containerTop}>
                    <Text style={styles.title}> Pin Name</Text>
                    <TouchableOpacity style={{marginStart:175}} onPress={handleBookmark}>
                        <Image style={[styles.image, {width:25, height:25}]} fadeDuration={250} source={require("../../assets/bookmark.png")}/>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.body, {alignSelf:'flex-start', marginStart: 30}]}> Pin Description</Text>
                <View style={styles.containerTop}>
                    <Image style={styles.image} fadeDuration={250} source={require("../../assets/ubication.png")}/>
                    <Text style={styles.body}> Pin Ubication</Text>
                    <TouchableOpacity style={styles.containerImage} onPress={handleSeeOnMap}>
                        <Text style={styles.greenhighlight}> See On Map</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerTop}>
                    <Image style={styles.image} fadeDuration={250} source={require("../../assets/calendar.png")}/>
                    <Text style={styles.body}> dd/mm/yyyy</Text>
                </View>
                <View style={styles.containerTop}>
                    <Rating imageSize={20} fractions={0}/>
                </View>
                <View style={styles.containerTop}>
                    <TouchableOpacity style={{marginStart:15}} onPress={handleShare}>
                        <Image style={styles.image} fadeDuration={250} source={require("../../assets/share.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginStart:200, flexDirection: 'column'}} onPress={handleSeeStatistics}>
                        <Image style={[styles.image, {width:35, height:35}]} fadeDuration={250} source={require("../../assets/statistics_selected.png")}/>
                        <Text style={styles.greenhighlight}> See Statistics</Text>
                    </TouchableOpacity>
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
    containerBtn: {
        backgroundColor: colors.green1,
        alignSelf: "flex-start",
        marginTop: 25,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        //padding: 10,
    },
    containerImage: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf:'center',
        justifyContent: 'center',
        padding: 10,
    },
    containerTop: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        marginBottom: 10,
        marginLeft: 15,
    },
    containerEditBtn: {
        flexDirection: 'row',
        alignSelf: "center",
        justifyContent: "flex-start",
        width: 90,
        marginLeft: 75,
        borderRadius: 7,
        padding: 5,
        backgroundColor: colors.green1,
    },
    pinImage: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    image: {
        alignSelf: "center",
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
        alignSelf: 'center',
        fontSize: 22,
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
    body: {
        textAlignVertical: 'center',
        alignSelf: 'center',
        justifyContent: "center",
        fontSize: 15,
        marginStart: 10,
        color: '#12161b',
    },
    greenhighlight: { 
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.green1,
    },
})

export default PinDefaultScreen;