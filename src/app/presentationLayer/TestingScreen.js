import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Platform} from 'react-native';

import colors from '../config/stylesheet/colors';

function TestingScreen({ navigation }, props) {
    return (
        <SafeAreaView
            style={styles.container}
        >
            <Text onPress={() => navigation.navigate("Statistics")} style={styles.title}> Testing Screen</Text>
            <View style={styles.stroke}/>
            <Text style={styles.subtitle}> Navigation Test</Text>
            <View style={styles.containerBtn}>
                <TouchableOpacity style={styles.btn}
                    onPress={() => navigation.navigate("Create Pin")}
                >
                    <Text style={styles.btnText}>Create Pin</Text>
                </TouchableOpacity>             
                <TouchableOpacity style={styles.btn}
                    onPress={() => navigation.navigate("Statistics")}
                >
                    <Text style={styles.btnText}>Statistics</Text>
                </TouchableOpacity>             
                <TouchableOpacity style={styles.btn}
                    onPress={() => navigation.navigate("Pin")}
                >
                    <Text style={styles.btnText}> Pin</Text>
                </TouchableOpacity>             
            </View>
        </SafeAreaView>        
    );      
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        position: 'absolute',
        flex: 1,     
        flexDirection: "column",
        justifyContent: "flex-start", //main
        alignItems: "flex-start", //secondary
        alignItems: "center"
    },
    btnText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    CircleShape: {
        width: 50,
        height: 50,
        margin: 15,
        borderRadius: 150 / 2,
        backgroundColor: colors.secondary,
    },
    btn: {
        marginTop: 25,
        justifyContent: 'center',
        borderRadius: 5,
        borderBottomWidth: 5,
        borderRadius: 5,
        width: 80,
        height: 35,
        borderBottomColor: colors.darkgrey,
        backgroundColor: colors.secondary,
    },
    containerBtn: {
        //backgroundColor: colors.green1,
        alignSelf: "center",
        marginTop: 25,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        //padding: 10,
    },
    stroke: {
        backgroundColor: "black",
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10,
        width: "80%",
        height: "1%",
    },
    title: { 
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 30,
        paddingTop: 35,
        fontWeight: 'bold',
        color: '#12161b',
    },
    subtitle: { 
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 15,
        paddingTop: 10,
        fontWeight: 'bold',
        color: '#12161b',
    },
    body: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontSize: 10,
        //paddingTop: 10,
        //paddingStart: 25,
        fontWeight: 'bold',
        color: '#12161b',
    }
})

export default TestingScreen;
