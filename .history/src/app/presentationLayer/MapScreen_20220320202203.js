import React from 'react';

import { Text, StyleSheet, View } from 'react-native';

import colors from '../config/stylesheet/colors';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';


const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: '100%',
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
                provider={PROVIDER_GOOGLE} 
                region={{
                latitude: 41.366531,  
                longitude: 2.019336,
                latitudeDelta: 0.1,
                longitudeDelta: 1.4,
                }}
            >
            </MapView>
        </View>
    );
}

export default MapScreen;