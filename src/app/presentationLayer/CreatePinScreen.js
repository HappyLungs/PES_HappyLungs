import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

import colors from "../config/stylesheet/colors";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Rating } from "react-native-ratings";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import { PresentationCtrl } from "./PresentationCtrl.js";

function CreatePinScreen({ route }) {
  let presentationCtrl = new PresentationCtrl();

  const locationName = "Edifici B6 del Campus Nord, C/ Jordi Girona, 1-3, 08034 Barcelona";

  const [title, setTitle] = useState('');
  const { coords } = route.params;
  console.log(coords);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [rating, setRating] = useState('');
  const [status, setStatus] = useState(false);

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleCreatePin = () => {
    //Todo: media 
    if (title != '' && description != '') presentationCtrl.createPin(title, coords, description, image1, rating, status);
    else console.log("fail");
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      if (!image1) setImage1(result.uri);
      else if (!image2) setImage2(result.uri);
      else if (!image3) setImage3(result.uri);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const getDate = () => {
    let tempDate = date.toString().split(" ");
    return date !== ""
      ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
      : "";
  };

  function renderImageSelector() {
    return (
      <View style={styles.containerImage}>
        <TouchableOpacity onPress={pickImage} style={styles.containerAddImage}>
          <Image
            style={styles.image}
            fadeDuration={250}
            source={require("../../assets/addButton.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerAddImage}>
          {image1 && (
            <Image source={{ uri: image1 }} style={styles.selectedImages} />
          )}
          {image2 && (
            <Image source={{ uri: image2 }} style={styles.selectedImages} />
          )}
          {image3 && (
            <Image source={{ uri: image3 }} style={styles.selectedImages} />
          )}
        </TouchableOpacity>
      </View>
    );
  }

  function renderDateSelector() {
    return (
      <View style={styles.containerImage}>
        <TouchableOpacity onPress={showDatePicker}>
          <Ionicons
            name="md-calendar"
            style={{ alignSelf: "center" }}
            color={colors.secondary}
            size={25}
          />
          <DateTimePickerModal
            //style={styles.datePickerStyle}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            isVisible={isDatePickerVisible}
          />
        </TouchableOpacity>
        <Text style={styles.body}> {getDate()}</Text>
      </View>
    );
  }

  function renderPinModeSelector() {
    return (
      <View style={{ marginLeft: 40, marginTop: 15 }}>
        <BouncyCheckbox
          fillColor="dodgerblue"
          size={25}
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: "#767577" }}
          textStyle={{ textDecorationLine: "none" }}
          onPress={() => setStatus(!status)}
          text={
            status
              ? "This pin will be visible to other people."
              : "This pin will only be visible to you."
          }
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.subtitle}> Location</Text>
        <Text style={styles.location}>{locationName} </Text>
        <Text style={styles.subtitle}>
          Title
          <Text style={styles.highlight}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          multiline={false}
          maxLength={30}
          onChangeText={newTitle => setTitle(newTitle)}
        />
        <Text style={styles.subtitle}>
          Description
          <Text style={styles.highlight}> *</Text>
        </Text>
        <TextInput
          style={styles.inputDescription}
          multiline
          numberOfLines={3}
          maxLength={90}
          onChangeText={newDescription => setDescription(newDescription)}
        />
        <Text style={styles.subtitle}> Date</Text>
        {renderDateSelector()}
        <Text style={styles.subtitle}> Images</Text>
        {renderImageSelector()}

        <Text style={styles.subtitle}> Rate</Text>
        <Rating
          imageSize={20}
          fractions={0}
          style={{ padding: 10, marginLeft: 40 }}
          onFinishRating={newRating => setRating(newRating)}
        />
        <Text style={styles.subtitle}> Allow others to view this pin?</Text>
        {renderPinModeSelector()}
        <TouchableOpacity style={styles.containerEditBtn} onPress={handleCreatePin}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 15,
              color: colors.white,
            }}
          >
            Save Pin
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "android" ? 30 : 0,
    alignItems: "center",
  },
  container: {
    width: "100%",
    position: "absolute",
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start", //main
    alignItems: "flex-start", //secondary
  },
  containerImage: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 40,
    padding: 10,
  },
  containerAddImage: {
    //flex: 1,
    flexDirection: "row",
  },
  containerEditBtn: {
    width: 110,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 200,
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.green1,
  },
  subtitle: {
    textAlign: "left",
    alignSelf: "flex-start",
    fontSize: 15,
    paddingTop: 10,
    paddingStart: 25,
    fontWeight: "bold",
    color: "#12161b",
  },
  body: {
    textAlignVertical: "center",
    fontSize: 15,
    marginStart: 20,
    color: "#12161b",
  },
  location: {
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
    textAlign: "left",
    justifyContent: "center",
    width: "75%",
    height: 35,
    marginLeft: 40,
    padding: 10,
    borderBottomWidth: 1,
  },
  inputDescription: {
    textAlign: "left",
    justifyContent: "center",
    width: "75%",
    height: 75,
    marginLeft: 40,
    padding: 10,
    borderBottomWidth: 1,
    textAlignVertical: "top",
  },
  image: {
    alignSelf: "center",
    justifyContent: "flex-start",
    //padding: 10,
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  selectedImages: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginStart: 30,
  },
});

export default CreatePinScreen;
