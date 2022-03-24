import React, { useState } from "react";

import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";

import colors from "../config/stylesheet/colors";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
import MapView, { PROVIDER_GOOGLE, ProviderPropType } from "react-native-maps";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import MultiSlider from '@ptomasroos/react-native-multi-slider';


function MapScreen({ navigation }) {
  const [modalPinVisible, setModalPinVisible] = useState(false);
  const [modalFilterVisible, setModalFilterVisible] = useState(false);
  const location = "Edifici B6 del Campus Nord, C/ Jordi Girona, 1-3, 08034 Barcelona";

  const [trafficSelected, setTraffic] = useState(false);
  const [industrySelected, setIndustry] = useState(false);
  const [urbanSelected, setUrban] = useState(false);
  const [pinsShown, setPins] = useState(true);
  const [byCertificate, setByCertificate] = useState(false);

  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE = 41.366531;
  const LONGITUDE = 2.019336;
  const LATITUDE_DELTA = 0.3;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO; //1,5
  let id = 0;

  function renderModalPin() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalPinVisible}
        onRequestClose={() => {
          setModalPinVisible(!modalPinVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, styles.shadow]}>
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              onPress={() => setModalPinVisible(!modalPinVisible)}
            >
              <Ionicons name="close" color={colors.secondary} size={25} />
            </TouchableOpacity>
            <Text style={[styles.modalText, { fontWeight: "bold" }]}>
              Selected location
            </Text>
            <Text style={styles.greenHighlight}> {location}</Text>
            <View style={{ flexDirection: "column", marginTop: 10 }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  margin: 5,
                  alignItems: "center",
                }}
                onPress={() => {
                  setModalPinVisible(!modalPinVisible),
                    navigation.navigate("CreatePin");
                }}
              >
                <AntDesign name="pushpino" size={35} color={colors.secondary} />
                <Text style={[styles.subtitle, { marginStart: 5 }]}>
                  CREATE PIN
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  margin: 5,
                  alignItems: "center",
                }}
                onPress={() => {
                  setModalPinVisible(!modalPinVisible),
                    navigation.navigate("Statistics");
                }}
              >
                <MaterialIcons
                  name="scatter-plot"
                  color={colors.secondary}
                  size={35}
                />
                <Text style={[styles.subtitle, { marginStart: 5 }]}>
                  SEE STATISTICS
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  margin: 5,
                  alignItems: "center",
                }}
                onPress={() => setModalPinVisible(!modalPinVisible)}
              >
                <Ionicons
                  name="share-social-sharp"
                  style={{ alignSelf: "center" }}
                  color={colors.secondary}
                  size={35}
                />
                <Text style={[styles.subtitle, { marginStart: 5 }]}>SHARE</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  color: colors.secondary,
                }}
              >
                Recommended
              </Text>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <LinearGradient
                  flex={1}
                  colors={[
                    "green",
                    "yellow",
                    "orange",
                    "red",
                    "purple",
                    "brown",
                  ]}
                  /*
                  colors={[
                    "#8ff08c",
                    "#b1f46b",
                    "#d2f94e",
                    "#f8fe40",
                    "#ffe73a",
                    "#f1db37",
                    "#ffc633",
                    "#ffaf2f",
                    "#ff8b29",
                    "#ff6324",
                    "#ff4421",
                    "#d8031d",
                    "#960213",
                    "#870211",
                    "#7e0211",
                  ]}
                  */

                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 1 }}
                  style={{ borderRadius: 5 }}
                >
                  <View style={[styles.stroke]} />
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  function renderCheckList() {
    return (
      <View style={styles.checkList}>
        <BouncyCheckbox
          style={styles.checkBox}
          fillColor={colors.secondary}
          size={20}
          unfillColor={colors.white}
          iconStyle={{ borderColor: !trafficSelected ? colors.lightGrey : colors.secondary, borderRadius: 7, borderWidth: 1.5}}
          textStyle={{ textDecorationLine: "none", fontWeight: 'bold', color: !trafficSelected ? colors.lightGrey : colors.secondary}}
          onPress={() => setTraffic(!trafficSelected)}
          text="Traffic"
        />
        <BouncyCheckbox
          style={styles.checkBox}
          fillColor={colors.secondary}
          size={20}
          unfillColor={colors.white}
          iconStyle={{ borderColor: !industrySelected ? colors.lightGrey : colors.secondary, borderRadius: 7, borderWidth: 1.5}}
          textStyle={{ textDecorationLine: "none", fontWeight: 'bold', color: !industrySelected ? colors.lightGrey : colors.secondary}}
          onPress={() => setIndustry(!industrySelected)}
          text="Industry"
        />
        <BouncyCheckbox
          style={styles.checkBox}
          fillColor={colors.secondary}
          size={20}
          unfillColor={colors.white}
          iconStyle={{ borderColor: !urbanSelected ? colors.lightGrey : colors.secondary, borderRadius: 7, borderWidth: 1.5}}
          textStyle={{ textDecorationLine: "none", fontWeight: 'bold', color: !urbanSelected ? colors.lightGrey : colors.secondary}}
          onPress={() => setUrban(!urbanSelected)}
          text="Urban"
        />
      </View>
    );
  }

  function renderModalFilter() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalFilterVisible}
        onRequestClose={() => {
          setModalFilterVisible(!modalFilterVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              styles.shadow,
              { alignItems: "flex-start" },
            ]}
          >
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              onPress={() => setModalFilterVisible(!modalFilterVisible)}
            >
              <Ionicons name="close" color={colors.secondary} size={25} />
            </TouchableOpacity>
            <Text
              style={[
                styles.modalText,
                { fontWeight: "bold", alignSelf: "center" },
              ]}
            >
              Filter
            </Text>
            <Text
              style={[
                styles.modalText,
                { fontWeight: "bold", color: colors.green1 },
              ]}
            >
              Type of contamination
            </Text>
            {renderCheckList()}
            <Text
              style={[
                styles.modalText,
                { fontWeight: "bold", color: colors.green1, marginTop: 10},
              ]}
            >
              Show pins
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: colors.secondary,
                borderRadius: 90,
                padding: 7,
                margin: 5,
                marginStart: 15,
                alignItems: "center",
              }}
              onPress={() => setPins(!pinsShown)}
            >
              <AntDesign name={pinsShown ? "pushpino" : "pushpin"} size={25} color={colors.white} />
            </TouchableOpacity>
            <Text
              style={[
                styles.modalText,
                { fontWeight: "bold", color: colors.green1, marginTop: 10 },
              ]}
            >
              Filter buildings by energy certificate
            </Text>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: colors.secondary,
                  borderRadius: 90,
                  padding: 7,
                  margin: 5,
                  marginStart: 15,
                  alignItems: "center",
                }}
                onPress={() => setByCertificate(!byCertificate)}
                >
                <Ionicons name={byCertificate ? "home" : "home-outline"}  size={25} color={colors.white} />
              </TouchableOpacity>
                <MultiSlider
                  sliderLength={100}
                  //onValuesChange={multiSliderValuesChange}
                  min={0}
                  max={7}
                  step={1}
                  snapped
                  showSteps
                  values={[0,1]}
                  //enableLabel
                  //customLabel={CustomLabel}
                  stepLabelStyle={{
                    color:'blue'
                  }}
                  markerStyle={{
                    backgroundColor: colors.green1,
                    height: 10,
                    width: 10,
                    bottom:-3,
                  }}
                  stepLabel={{
                    backgroundColor:'red',
                    height:20,
                    width:20,
                    fontSize:10,
                  }}
                  pressedMarkerStyle={{
                    height: 10,
                    width: 10,
                  }}
                  selectedStyle={{
                    backgroundColor: colors.green1,
                  }}
                  unselectedStyle={{
                    backgroundColor: colors.secondary,
                  }}
                  containerStyle={{
                    height: 40,
                    marginStart: 10,
                  }}
                  trackStyle={{
                    height: 5,
                    borderRadius: 2
                  }}
                />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={styles.background}>
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
        ></MapView>
      </View>
      <View style={styles.rowContainer}>
        <View style={[styles.containerSearch, styles.shadow]}>
          <MaterialIcons
            name="search"
            style={{ alignSelf: "center", marginStart: 10 }}
            color={colors.secondary}
            size={35}
          />
          <TextInput
            multiline={false}
            maxLength={30}
            style={styles.body}
            defaultValue={"Search a location"}
          />
        </View>

        <View style={[styles.containerSphere, styles.shadow]}>
          <TouchableOpacity onPress={() => setModalFilterVisible(true)}>
            <MaterialCommunityIcons
              name="filter-menu"
              style={{ alignSelf: "center" }}
              color={colors.secondary}
              size={35}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => setModalPinVisible(true)}
      >
        <Text style={styles.btnText}>Pin Example</Text>
      </TouchableOpacity>
      {renderModalPin()}
      {renderModalFilter()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stroke: {
    backgroundColor: colors.secondary,
    alignSelf: "center",
    height: 20,
    width: 5,
    right: 45,
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  containerSearch: {
    backgroundColor: colors.white,
    width: "80%",
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
  },
  containerSphere: {
    backgroundColor: colors.white,
    width: 50,
    height: 50,
    marginStart: 20,
    borderRadius: 12,
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
    margin: 10,
  },
  body: {
    textAlignVertical: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 17,
    marginStart: 10,
    color: colors.darkGrey,
  },
  greenHighlight: {
    marginTop: 5,
    fontSize: 13,
    color: colors.green1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 22,
    width: "80%",
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
  },
  textStyle: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  subtitle: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
  modalText: {
    textAlign: "center",
    fontSize: 16,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btn: {
    marginTop: 25,
    justifyContent: "center",
    borderRadius: 5,
    borderBottomWidth: 5,
    width: 100,
    height: 50,
    borderBottomColor: colors.darkGrey,
    backgroundColor: colors.secondary,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    //position:'absolute',
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  checkList: {
    flexDirection: 'column',
    marginStart: 20,
  },
  checkBox: {
    marginTop: 10,
  }
});

export default MapScreen;


import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import MapView, { Marker, ProviderPropType } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

class DefaultMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
    };
  }

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor(),
        },
      ],
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={e => this.onMapPress(e)}
        >
          {this.state.markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ markers: [] })}
            style={styles.bubble}
          >
            <Text>Tap map to create a marker of random color</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

DefaultMarkers.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default DefaultMarkers;