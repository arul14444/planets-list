import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useWishList } from "@/context/WishListContext";
import { FontAwesome } from "@expo/vector-icons";

export default function WishListScreen() {
  const { wishlist, removeFromWishlist } = useWishList();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromWishlist(item.uid)}
            >
              <FontAwesome name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>Tidak ada planet di wishlist.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  card: {
    backgroundColor: "#e0e0e0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { fontSize: 18 },
  removeButton: {
    padding: 8,
  },
});
