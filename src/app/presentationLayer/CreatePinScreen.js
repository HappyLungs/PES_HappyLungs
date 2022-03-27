import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import COLORS from "../config/stylesheet/colors";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Rating } from "react-native-ratings";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { PresentationCtrl } from "./PresentationCtrl.js";
import Input from "./components/Input";

function CreatePinScreen({ route }) {
  let presentationCtrl = new PresentationCtrl();

  const locationName = "Edifici B6 del Campus Nord, C/ Jordi Girona, 1-3, 08034 Barcelona";

  const { coords } = route.params;
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState(false);

  const [rating, setRating] = useState(3);


  const [media, setMedia] = useState([]);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    const tmpMedia = [...media];

    if (!inputs.title) {
      handleError('Please input title', 'title');
      isValid = false;
    }
    if (!inputs.description) {
      handleError('Please input description', 'description');
      isValid = false;
    }
    if (isValid) {
      presentationCtrl.createPin(inputs.title, coords, inputs.description, tmpMedia, rating, status);
    }
  }

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      console.log(result.uri);
      const tmpMedia = [...media];
      if (tmpMedia.length >= 3) {
        Alert.alert('Max 3 images!');
      } else {
        tmpMedia.push(result.uri);
        setMedia([...media, result.uri]);
        console.log("media size: " + tmpMedia.length + " content: " + tmpMedia[tmpMedia.length - 1]);
        if (!image1) setImage1(result.uri);
        else if (!image2) setImage2(result.uri);
        else if (!image3) setImage3(result.uri);
      }
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
        <TouchableOpacity onPress={pickImage} style={{ flexDirection: 'row' }}>
          <Image
            style={styles.image}
            fadeDuration={250}
            source={require("../../assets/addButton.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row' }}>
          {image1 && (
            <Image source={{ uri: image1 }} style={styles.selectedImages} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row' }}>
          {image2 && (
            <Image source={{ uri: image2 }} style={styles.selectedImages} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row' }}>
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
            color={COLORS.secondary}
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
        <Text style={{ textAlignVertical: "center", fontSize: 15, marginStart: 20, color: COLORS.secondary }}> {getDate()}</Text>
      </View>
    );
  }

  function renderPinModeSelector() {
    return (
      <View style={{ padding: 10 }}>
        <BouncyCheckbox
          fillColor={COLORS.green1}
          size={25}
          unfillColor={COLORS.white}
          iconStyle={{ borderColor: COLORS.secondary }}
          textStyle={{ textDecorationLine: "none", color: COLORS.secondary }}
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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, flexDirection: 'column', paddingHorizontal: 20 }}>
      <View style={{ marginVertical: 20 }}>
        <Text style={styles.subtitle}>Location</Text>
        <Text style={{ fontSize: 15, color: COLORS.green1 }}>{locationName} </Text>
        <Input
          onChangeText={newTitle => handleOnChange(newTitle, 'title')}
          onFocus={() => handleError(null, 'title')}
          iconName="title"
          label="Title"
          placeholder="Enter the pin title"
          error={errors.title}
        />
        <Input
          onChangeText={newTitle => handleOnChange(newTitle, 'description')}
          onFocus={() => handleError(null, 'description')}
          iconName="description"
          label="Description"
          placeholder="Enter the pin event description"
          error={errors.description}
        />
        <Text style={styles.subtitle}> Date</Text>
        {renderDateSelector()}
        <Text style={styles.subtitle}> Images</Text>
        {renderImageSelector()}
        <Text style={styles.subtitle}> Rate</Text>
        <Rating
          type={'custom'}
          imageSize={20}
          fractions={0}
          startingValue={3}
          ratingBackgroundColor={COLORS.secondary}
          ratingColor={COLORS.green1}
          tintColor={COLORS.white}
          style={{ padding: 10, alignSelf: 'flex-start' }}
          onFinishRating={newRating => setRating(newRating)}
        />
        <Text style={styles.subtitle}> Allow others to view this pin?</Text>
        {renderPinModeSelector()}
        <TouchableOpacity style={styles.containerEditBtn} onPress={validate}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 15,
              color: COLORS.white,
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
  containerImage: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  containerEditBtn: {
    width: 110,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 200,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.green1,
  },
  subtitle: {
    textAlign: "left",
    alignSelf: "flex-start",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    color: COLORS.secondary,
  },
  image: {
    alignSelf: "center",
    justifyContent: "flex-start",
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  selectedImages: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    width: 45,
    height: 45,
    resizeMode: "cover",
    marginStart: 25,
  },
});

export default CreatePinScreen;
