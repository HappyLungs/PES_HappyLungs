import React, { useState }  from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform, TouchableOpacity, Image, Modal, Button, Pressable} from 'react-native';

import colors from '../config/stylesheet/colors';

import { Rating } from 'react-native-ratings';

function PinOwnerScreen(props) {
    
    const [modalVisible, setModalVisible] = useState(false);
    
    const handleDelete = () => console.log("Delete clicked");
    const handleEdit = () => console.log("Edit clicked");
    const handleSeeOnMap = () => console.log("See On Map clicked");
    const handleShare = () => console.log("Share clicked");
    const handleSeeStatistics = () => console.log("See Statistics clicked");
    
    function renderModal() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, styles.shadow]}>
                        <Text style={[styles.modalText, { fontWeight:'bold' } ]}>Are you sure?</Text>
                        <Text style={styles.modalText}>Do you really want to delete this pin? This process cannot be undone.</Text>
                        <View style={{flexDirection:'row'}}>
                            <Pressable
                                style={[styles.button, styles.buttonCancel, styles.shadow]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonDelete, styles.shadow]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Delete</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <Image style={styles.pinImage} fadeDuration={0} source={require("../../assets/noimage.png")}/>
                <View style={[styles.stroke, styles.shadow]}/>
                <View style={styles.containerTop}>
                    <Text style={styles.title}> Pin Name</Text>
                    <TouchableOpacity style={{marginStart:15}} onPress={() => setModalVisible(true)}>
                        <Image style={[styles.image, { width:25, height:25 }]} fadeDuration={250} source={require("../../assets/bin.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.containerEditBtn, styles.shadow]} onPress={handleEdit}>
                        <Image style={[styles.image, { width:25, height:25 }]} fadeDuration={250} source={require("../../assets/edit.png")}/>
                        <Text style={[styles.textStyle, { marginStart: 10 }]}> Edit</Text>
                    </TouchableOpacity>
                </View>
                {renderModal()}
                <Text style={[styles.body, { alignSelf:'flex-start', marginStart: 30 }]}> Pin Description</Text>
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: colors.lightgrey,
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonCancel: {
        backgroundColor: colors.secondary,
    },
    buttonDelete: {
        backgroundColor: colors.red1,
        marginStart: 15,
    },
    textStyle: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})

export default PinOwnerScreen;