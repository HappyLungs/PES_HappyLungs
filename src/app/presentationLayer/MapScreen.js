import React, { useState }  from 'react';

import { Text, StyleSheet, View, SafeAreaView, TextInput, TouchableOpacity, Modal, Image } from 'react-native';

import colors from '../config/stylesheet/colors';
import Icon from 'react-native-vector-icons/MaterialIcons'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';



function MapScreen(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const ubication = "Edifici B6 del Campus Nord, C/ Jordi Girona, 1-3, 08034 Barcelona";


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
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.modalText, { fontWeight:'bold', alignSelf:'center' }]}>Selected location:</Text>
                            <TouchableOpacity>
                                <Icon name="close" style={{alignSelf:'center'}} color={colors.secondary} size={15}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.greenhighlight}> {ubication}</Text>

                        <View style={{flexDirection:'column'}}>
                            <TouchableOpacity 
                                style={{flexDirection:'row', margin: 5, alignItems:'center'}}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={require("../../assets/pin.png")}
                                    resizeMode={'cover'}
                                />
                                <Text style={styles.subtitle}>CREATE PIN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={{flexDirection:'row', margin: 5, alignItems:'center'}}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={require("../../assets/pin.png")}
                                    resizeMode={'cover'}
                                />
                                <Text style={styles.subtitle}>SEE STATISTICS</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={{flexDirection:'row', margin: 5, alignItems:'center'}}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={require("../../assets/pin.png")}
                                    resizeMode={'cover'}
                                />
                                <Text style={styles.subtitle}>SHARE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        /*
    );*/


        <SafeAreaView style={styles.background}>
            <View style={styles.rowContainer}>
                <View style={[styles.containerSearch, styles.shadow]}>
                    <Icon name="search" style={{alignSelf:'center', marginStart: 10}} color={colors.secondary} size={35}/>
                    <TextInput multiline={false} maxLength={30} style={styles.body} defaultValue={"Search a location"}/>
                </View>
                <View style={[styles.containerSphere, styles.shadow]}>
                    <TouchableOpacity  onPress={() => setModalVisible(true)}>
                        <Icon name="filter-alt" style={{alignSelf:'center'}} color={colors.secondary} size={35}/>        
                    </TouchableOpacity>
                </View>
            </View>
            {renderModal()}
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: 41.366531,  
                            longitude: 2.019336,
                            latitudeDelta: 0.3,
                            longitudeDelta: 1.5,
                        }}
                    >
                    </MapView>
                </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.blue1,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    containerSearch: {
        backgroundColor: colors.white,
        width: "80%",
        height: 50,
        marginTop: 50,
        borderRadius: 12,
        flexDirection: 'row',
    },
    containerSphere: {
        backgroundColor: colors.white,
        width: 50,
        height: 50,
        marginTop: 50,
        marginStart: 20,
        borderRadius: 12,
        justifyContent: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start',
        margin: 10,
    },
    body: {
        textAlignVertical: 'center',
        alignSelf: 'center',
        justifyContent: "center",
        fontSize: 17,
        marginStart: 10,
        color: colors.darkgrey,
    },
    greenhighlight: { 
        fontSize: 13,
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
        backgroundColor: colors.white,
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
    },
    textStyle: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
    subtitle: {
        color: colors.secondary,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 15,
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
    container: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    
})

export default MapScreen;