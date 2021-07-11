import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import { UPLOAD_URL } from "../SECRET";
//functions imports
import fetchFunc from "../utils/fetchFunc";
const CreateEmployee = ({ navigation, route }) => {
  const getDetails = (wanted) => {
    if (route.params) {
      const { item } = route.params;
      switch (wanted) {
        case "name":
          return item.name;
        case "phone":
          return item.phone;
        case "email":
          return item.email;
        case "position":
          return item.position;
        case "salary":
          return item.salary;
        case "picture":
          return item.picture;
      }
    }
    return "";
  };
  const [name, setName] = useState(getDetails("name"));
  const [phone, setPhone] = useState(getDetails("phone"));
  const [email, setEmail] = useState(getDetails("email"));
  const [salary, setSalary] = useState(getDetails("salary"));
  const [picture, setPicture] = useState(getDetails("picture"));
  const [position, setPosition] = useState(getDetails("position"));
  const [modal, setModal] = useState(false);
  const [enableShift, setEnableShift] = useState(false);

  const pickFromGallery = async () => {
    try {
      const { granted } = await MediaLibrary.requestPermissionsAsync();
      if (granted) {
        const picked = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
        });
        if (!picked.cancelled) {
          let newFile = {
            uri: picked.uri,
            type: `test/${picked.uri.split(".")[1]}`,
            name: `test.${picked.uri.split(".")[1]}`,
          };
          handleUpload(newFile);
        }
      } else {
        Alert.alert("you need to give us permission to work");
      }
    } catch (err) {
      Alert.alert("something went wrong");
    }
  };

  const pickFromCamera = async () => {
    try {
      const { status } = await Camera.requestPermissionsAsync();
      if (status == "granted") {
        const picked = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
        });
        if (!picked.cancelled) {
          let newFile = {
            uri: picked.uri,
            // type: `test/${picked.uri.split(".")[1]}`,
            // name: `test.${picked.uri.split(".")[1]}`,
          };
          handleUpload(newFile);
        }
      } else {
        Alert.alert("you need to give us permission to work");
      }
    } catch (err) {
      Alert.alert("something went wrong");
    }
  };

  const handleUpload = async (image) => {
    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "employeeApp");
      data.append("cloud_name", "awwad9");
      const response = await fetch(`${UPLOAD_URL}`, {
        method: "post",
        body: data,
      });
      const parsedResponse = await response.json();
      setPicture(parsedResponse.url);
      setModal((prev) => !prev);
    } catch (err) {
      Alert.alert("something went wrong");
    }
  };

  const updateData = async () => {
    await fetchFunc("update", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: route.params.item._id,
        name,
        email,
        phone,
        position,
        picture,
        salary,
      }),
    });
    Alert.alert(`${name} updated`);
    navigation.navigate("Home");
  };
  const submitData = async () => {
    await fetchFunc("send-data", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        position,
        picture,
        salary,
      }),
    });
    Alert.alert(`${name} saved successfully`);
    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={styles.root}
      enabled={enableShift}
    >
      <View>
        <TextInput
          label="Name"
          value={name}
          mode="outlined"
          theme={theme}
          onChangeText={(text) => setName(text)}
          onFocus={() => setEnableShift(false)}
          style={styles.input}
        />
        <TextInput
          label="Email"
          value={email}
          mode="outlined"
          theme={theme}
          onChangeText={(text) => setEmail(text)}
          onFocus={() => setEnableShift(false)}
          style={styles.input}
        />
        <TextInput
          label="Phone"
          value={phone}
          mode="outlined"
          theme={theme}
          keyboardType="number-pad"
          onChangeText={(text) => setPhone(text)}
          onFocus={() => setEnableShift(false)}
          style={styles.input}
        />
        <TextInput
          label="Salary"
          value={salary}
          mode="outlined"
          theme={theme}
          onChangeText={(text) => setSalary(text)}
          onFocus={() => setEnableShift(false)}
          style={styles.input}
        />
        <TextInput
          label="Position"
          value={position}
          mode="outlined"
          theme={theme}
          onChangeText={(text) => setPosition(text)}
          onFocus={() => setEnableShift(true)}
          style={styles.input}
        />
        <Button
          style={styles.input}
          theme={theme}
          icon={picture ? "check" : "upload"}
          mode="contained"
          onPress={() => setModal((prev) => !prev)}
        >
          Upload Image
        </Button>
        <Button
          style={styles.input}
          theme={theme}
          icon="content-save"
          mode="contained"
          onPress={() => {
            if (route.params) updateData();
            else submitData();
          }}
        >
          SAVE
        </Button>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => setModal(false)}
        >
          <View style={styles.modalView}>
            <View style={styles.modalButtonView}>
              <Button
                theme={theme}
                icon="camera"
                mode="contained"
                onPress={() => pickFromCamera()}
              >
                Camera
              </Button>

              <Button
                theme={theme}
                icon="image-area"
                mode="contained"
                onPress={() => pickFromGallery()}
              >
                Gallery
              </Button>
            </View>
            <Button theme={theme} onPress={() => setModal((prev) => !prev)}>
              Cancel
            </Button>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

const theme = {
  colors: {
    primary: "#006aff",
  },
};
let styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  input: {
    margin: 5,
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default CreateEmployee;
