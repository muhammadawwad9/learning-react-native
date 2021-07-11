import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList, Alert } from "react-native";
import { Card, FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
//functions imports
import fetchFunc from "../utils/fetchFunc";

const Home = ({ navigation }) => {
  // const [employees, setEmployees] = useState([]);
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => {
    return state;
  });
  //functions
  const renderList = (item) => (
    <Card
      style={styles.myCard}
      key={item._id}
      onPress={() => navigation.navigate("Profile", { item })}
    >
      <View style={styles.cardView}>
        <Image
          style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
          source={{
            uri: item.picture,
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.position}</Text>
        </View>
      </View>
    </Card>
  );

  const fetchData = async () => {
    const response = await fetchFunc("");
    dispatch({ type: "ADD_DATA", payload: response.all });
    dispatch({ type: "SET_LOADING", payload: false });

    // setEmployees(response.all);
    // setLoading(false);
  };

  useEffect(async () => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={employees}
        renderItem={({ item }) => {
          return renderList(item);
        }}
        keyExtractor={(item) => `${item._id}`}
        onRefresh={() => fetchData()}
        refreshing={loading}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("Create")}
        theme={{ colors: { accent: "#006aff" } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  myCard: {
    margin: 5,
  },
  cardView: {
    flexDirection: "row",
    padding: 6,
  },
  text: {
    fontSize: 18,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;
