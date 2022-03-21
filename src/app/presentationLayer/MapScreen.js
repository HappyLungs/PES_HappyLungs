import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const styles = StyleSheet.create({
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
});

function MapScreen(props) {
    return (
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
    );
}

export default MapScreen;