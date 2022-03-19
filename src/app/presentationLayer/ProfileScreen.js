import React from 'react';

import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import colors from '../config/stylesheet/colors';

function ProfileScreen({navigation}, props) {
    return (
        <View style={styles.background}>
            <Text style={{marginTop:300}}> Profile Screen</Text>
            <TouchableOpacity style={styles.btn}
                onPress={() => navigation.navigate("Statistics")}
            >
                <Text style={styles.btnText}>Statistics Page</Text>
            </TouchableOpacity>   
        </View>
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
    btn: {
        marginTop: 25,
        justifyContent: 'center',
        borderRadius: 5,
        borderBottomWidth: 5,
        borderRadius: 5,
        width: 100,
        height: 50,
        borderBottomColor: colors.lightgrey,
        backgroundColor: colors.secondary,
    },
    btnText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
})

export default ProfileScreen;