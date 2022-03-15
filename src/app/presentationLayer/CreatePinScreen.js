import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform, TextInput, Image, TouchableOpacity } from 'react-native';

import colors from '../config/stylesheet/colors';

//npm i react-native-bouncy-checkbox
//npm install react-native-datepicker --save
//npm install --save react-native-ratings
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DatePicker from 'react-native-datepicker';
import { Rating } from 'react-native-ratings';


const handlePress = () => console.log("clicked");

function CreatePinScreen(props) {
    const [checkboxState, setCheckboxState] = useState(false);
    const [date, setDate] = useState(new Date);
    const ubication = "Edifici B6 del Campus Nord, C/ Jordi Girona, 1-3, 08034 Barcelona";

    return (
        <SafeAreaView
            style={styles.background}
        >
            <View
                style={styles.container}
            >
                <Text style={styles.title}> Create Pin</Text>
                <Text style={styles.subtitle}> Location</Text>
                <Text style={styles.ubication}>{ubication} </Text>
                <Text style={styles.subtitle}> Title
                    <Text style={styles.highlight}> *</Text>
                </Text>
                <TextInput multiline={false} maxLength={30} style={styles.input}/>
                <Text style={styles.subtitle}> Description
                    <Text style={styles.highlight}> *</Text>
                </Text>
                <TextInput multiline numberOfLines={3} maxLength={90} style={styles.inputDescription}/>
                <Text style={styles.subtitle}> Date</Text>
                <DatePicker
                    style={styles.datePickerStyle}
                    date={date} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    customStyles={{
                        dateIcon: {
                        //display: 'none',
                            position: 'absolute',
                            left: 0,
                            marginLeft: 0,
                        },
                        dateInput: {
                            borderWidth:0,
                            marginLeft: -120,
                        },
                    }}
                    onDateChange={(date) => {
                        setDate(date);
                    }}
                />
                <Text style={styles.subtitle}> Images</Text>
                <TouchableOpacity style={styles.containerImage} onPress={handlePress}>
                    <Image style={styles.image} fadeDuration={250} source={require("../../assets/addButton.png")}/>
                </TouchableOpacity>
                <Text style={styles.subtitle}> Rate</Text>
                <Rating imageSize={20} fractions={0} style={{padding: 10, marginLeft: 40,}}/>
                <Text style={styles.subtitle}> Allow others to view this pin?</Text>
                <View style={{ marginLeft: 40, marginTop: 15 }}>
                    <BouncyCheckbox
                        fillColor="dodgerblue"
                        size= {25}
                        unfillColor="#FFFFFF"
                        iconStyle={{ borderColor: "#767577" }}
                        textStyle={{textDecorationLine: "none"}}
                        onPress={() => setCheckboxState(!checkboxState)}
                        text= {checkboxState? "This pin will be visible to other people." : "This pin will only be visible to you."}
                    />
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
        paddingTop: 35,
        fontWeight: 'bold',
        color: '#12161b',
    },
    subtitle: { 
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontSize: 15,
        paddingTop: 10,
        paddingStart: 25,
        fontWeight: 'bold',
        color: '#12161b',
    },
    ubication: { 
        fontSize: 15,
        paddingTop: 25,
        marginLeft: 40,
        //fontWeight: 'bold',
        color: colors.green1,
    },
    highlight: {
        color: "red",
    },
    input: {
        textAlign: 'left',
        justifyContent: "center",
        width: "75%",
        height: 35,
        marginLeft: 40,
        padding: 10,
        borderBottomWidth: 1,
    },
    inputDescription: {
        textAlign: 'left',
        justifyContent: "center",
        width: "75%",
        height: 75,
        marginLeft: 40,
        padding: 10,
        borderBottomWidth: 1,
        textAlignVertical: 'top',
    },
    containerImage: {
        marginLeft: 40,
        padding: 10,
    },
    image: {
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        padding: 10,
        width: 30,
        height: 30,
    },
    datePickerStyle: {
        width: "75%",
        marginLeft: 40,
        padding: 10,
        borderBottomWidth: 1,
    },
})

export default CreatePinScreen;
