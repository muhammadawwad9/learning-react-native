import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
//functions imports
import fetchFunc from "../utils/fetchFunc";

const Profile = (props) => {
  const { item } = props.route.params;

  const openDial = (phone) => {
    if (Platform.OS == "android") {
      Linking.openURL(`tel:${phone}`);
    } else {
      Linking.openURL(`telprompt:${[phone]}`);
    }
  };

  const fireEmployee = async () => {
    const response = await fetchFunc("delete", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: props.route.params.item._id }),
    });
    Alert.alert(`${props.route.params.item.name} deleted`);
    props.navigation.navigate("Home");
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#0033ff", "#6bc1ff"]}
        style={{ height: "20%" }}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: 140, height: 140, borderRadius: 70, marginTop: -70 }}
          source={{
            uri: item.picture,
          }}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          margin: 15,
        }}
      >
        <Title>{item.name}</Title>
        <Text style={{ fontSize: 18 }}>{item.position}</Text>
      </View>
      <Card
        style={styles.myCard}
        onPress={() => Linking.openURL(`mailto:${item.email}`)}
      >
        <View style={styles.cardContent}>
          <MaterialIcons name="email" size={32} color="#006aff" />
          <Text style={styles.myText}>{item.email}</Text>
        </View>
      </Card>

      <Card style={styles.myCard} onPress={() => openDial(item.phone)}>
        <View style={styles.cardContent}>
          <Entypo name="phone" size={32} color="#006aff" />
          <Text style={styles.myText}>{item.phone}</Text>
        </View>
      </Card>

      <Card style={styles.myCard}>
        <View style={styles.cardContent}>
          <MaterialIcons name="attach-money" size={32} color="#006aff" />
          <Text style={styles.myText}>{item.salary}</Text>
        </View>
      </Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        <Button
          icon="account-edit"
          theme={theme}
          mode="contained"
          onPress={() => {
            props.navigation.navigate("Create", { item });
          }}
        >
          {" "}
          Edit
        </Button>
        <Button
          icon="delete"
          theme={{ colors: { primary: "red" } }}
          mode="contained"
          onPress={() => fireEmployee()}
        >
          {" "}
          FIRE EMPLOYEE
        </Button>
      </View>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#006aff",
  },
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  myCard: {
    margin: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  myText: {
    fontSize: 18,
    marginLeft: 5,
  },
});
export default Profile;
