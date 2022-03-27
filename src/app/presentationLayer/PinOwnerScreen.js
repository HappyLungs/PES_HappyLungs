import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";

import COLORS from "../config/stylesheet/colors";

import { Rating } from "react-native-ratings";
import { ImageSlider } from "react-native-image-slider-banner";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { PresentationCtrl } from "./PresentationCtrl.js";


function PinOwnerScreen({ navigation }) {
  let presentationCtrl = new PresentationCtrl();

  const [modalVisible, setModalVisible] = useState(false);
  const lat = 37.421749;
  const lng = -122.0841477
  const handleDelete = () => console.log("Delete clicked");
  const handleEdit = () => console.log("Edit clicked");
  const handleSeeOnMap = () => {
    navigation.navigate('MapScreen', { tmpLat: lat, tmpLng: lng });
  }
  const handleShare = () => console.log("Share clicked");

  function renderModal() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, styles.shadow]}>
            <Text style={[styles.modalText, { fontWeight: "bold" }]}>
              Are you sure?
            </Text>
            <Text style={styles.modalText}>
              Do you really want to delete this pin? This process cannot be
              undone.
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.buttonCancel, styles.shadow]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonDelete, styles.shadow]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  function renderImageCarousel() {
    return (
      <ImageSlider
        data={[
          {
            img: "https://fisica.upc.edu/ca/graus/centres-i-estudis/imatges-escoles/fib.jpeg/@@images/image.jpeg",
          },
          { img: "https://pbs.twimg.com/media/Eh3E26xXYAITese.jpg" },
        ]}
        backgroundColor={COLORS.green1}
        showHeader
        showIndicator
        headerRightComponent={
          <Feather
            name="trash-2"
            color={COLORS.white}
            size={30}
            onPress={() => handleDelete()}
          />
        }
        headerStyle={{ padding: 5 }}
        onItemChanged={(item) => console.log("item", item)}
        caroselImageStyle={{ height: 250 }}
        inActiveIndicatorStyle={{ backgroundColor: COLORS.lightgrey }}
        activeIndicatorStyle={{ backgroundColor: COLORS.white }}
        indicatorContainerStyle={{ top: 15 }}
      ></ImageSlider>
    );
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View style={{ height: 250 }}>{renderImageCarousel()}</View>
        <View style={[styles.stroke, styles.shadow]} />
        <View style={styles.containerTop}>
          <Text style={styles.title}> Pin Name</Text>
          <TouchableOpacity
            style={{ marginStart: 15 }}
            onPress={() => setModalVisible(true)}
          >
            <Feather
              name="trash-2"
              style={{ alignSelf: "center" }}
              color={COLORS.red1}
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.containerEditBtn, styles.shadow]}
            onPress={handleEdit}
          >
            <Feather
              name="edit"
              size={24}
              style={{ marginStart: 5 }}
              color={COLORS.white}
            />
            <Text style={[styles.textStyle, { marginStart: 10 }]}> Edit</Text>
          </TouchableOpacity>
        </View>
        {renderModal()}
        <Text
          style={[styles.body, { alignSelf: "flex-start", marginStart: 30 }]}
        >
          {" "}
          Pin Description
        </Text>
        <View style={styles.containerTop}>
          <Ionicons
            name="location-sharp"
            size={30}
            style={{ alignSelf: "center" }}
            color={COLORS.secondary}
          />
          <Text style={styles.body}> Pin Location</Text>
          <TouchableOpacity
            style={styles.containerImage}
            onPress={handleSeeOnMap}
          >
            <Text style={styles.greenHighlight}> See On Map</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerTop}>
          <Ionicons
            name="md-calendar"
            style={{ alignSelf: "center" }}
            color={COLORS.secondary}
            size={25}
          />
          <Text style={styles.body}> dd/mm/yyyy</Text>
        </View>
        <View style={styles.containerTop}>
          <Rating
            type={'custom'}
            imageSize={20}
            fractions={0}
            startingValue={3}
            ratingBackgroundColor={COLORS.secondary}
            ratingColor={COLORS.green1}
            tintColor={COLORS.white}
            readonly={true}
          />
        </View>
        <View style={styles.containerTop}>
          <TouchableOpacity style={{ marginStart: 15 }} onPress={handleShare}>
            <Ionicons
              name="share-social-sharp"
              style={{ alignSelf: "center" }}
              color={COLORS.secondary}
              size={35}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginStart: 180, flexDirection: "column" }}
            onPress={async () => {
              let data = await presentationCtrl.getPollutionLastDay();
              navigation.navigate("Statistics", { data: data });
            }}
          >
            <Ionicons
              name="bar-chart"
              style={{ alignSelf: "center" }}
              color={COLORS.green1}
              size={35}
            />
            <Text style={styles.greenHighlight}> See Statistics</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "android" ? 30 : 0,
    alignItems: "flex-start",
  },
  container: {
    width: "100%",
    position: "absolute",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start", //main
    alignItems: "flex-start", //secondary
    alignItems: "center",
  },
  containerBtn: {
    backgroundColor: COLORS.green1,
    alignSelf: "flex-start",
    marginTop: 25,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  containerImage: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
  },
  containerTop: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
    padding: 10,
    marginBottom: 10,
    marginLeft: 15,
  },
  containerEditBtn: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "flex-start",
    width: 90,
    marginLeft: 75,
    borderRadius: 7,
    padding: 5,
    backgroundColor: COLORS.green1,
  },
  pinImage: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  image: {
    alignSelf: "center",
    justifyContent: "flex-start",
    padding: 10,
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  stroke: {
    backgroundColor: COLORS.secondary,
    alignSelf: "center",
    marginBottom: 10,
    width: "100%",
    height: "0.5%",
  },
  title: {
    textAlign: "left",
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  subtitle: {
    textAlign: "left",
    alignSelf: "flex-start",
    fontSize: 15,
    paddingTop: 10,
    marginStart: 20,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  body: {
    textAlignVertical: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 15,
    marginStart: 10,
    color: COLORS.secondary,
  },
  greenHighlight: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.green1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonCancel: {
    backgroundColor: COLORS.secondary,
  },
  buttonDelete: {
    backgroundColor: COLORS.red1,
    marginStart: 15,
  },
  textStyle: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default PinOwnerScreen;
