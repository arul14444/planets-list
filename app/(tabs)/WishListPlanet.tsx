import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useWishList } from "@/context/WishListContext";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { SearchBar } from "react-native-screens";

export default function WishListScreen() {
  const { wishlist, removeFromWishlist } = useWishList();
  const navigation = useNavigation();



  

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        // onChangeText={this.updateSearch}
        // value={search}
      />
      <Text style={styles.title}>Wishlist</Text>
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  navigation.navigate("PlanetDetail", { uid: item.uid });
                }}
              >
                <FontAwesome name="eye" size={24} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => removeFromWishlist(item.uid)}
              >
                <FontAwesome name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text>Tidak ada planet di wishlist.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#e0e0e0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 12,
  },
});
