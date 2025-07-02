import { useWishList } from "@/context/WishListContext";
import { BASE_URL } from "@/env";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Planet = {
  uid: string;
  name: string;
  url: string;
};

export default function PlanetsScreen() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState(`${BASE_URL}?page=1&limit=15`);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation();
  const { addToWishlist } = useWishList();

  const fetchPlanets = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await fetch(nextPageUrl);
      const data = await response.json();

      setPlanets((prev) => [...prev, ...data.results]);

      setNextPageUrl(data.next);
      setHasMore(data.next !== null);
    } catch (error) {
      console.error("Error fetching planets:", error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchPlanets();
  }, []);
  
 const planetFiltered = planets.filter((planet) =>
    planet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: Planet }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <TouchableOpacity
        style={styles.eyeButton}
        onPress={() => navigation.navigate("PlanetDetail", { uid: item.uid })}
      >
        <FontAwesome name="eye" size={24} color="#007AFF" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          addToWishlist(item);
          navigation.navigate("WishListPlanet");
        }}
      >
        <FontAwesome name="plus" size={24} color="#000000" />
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <TextInput
        style ={styles.searchBar}
        placeholder="Search by name "
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={planetFiltered}
        keyExtractor={(item) => item.uid}
        renderItem={renderItem}
        onEndReached={fetchPlanets}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#666" /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  searchBar: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
  },
  name: { fontSize: 18, fontWeight: "bold" },
  eyeButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
