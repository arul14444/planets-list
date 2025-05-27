import { BASE_URL } from "@/env";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";

type PlanetDetails = {
  name: string;
  climate: string;
  surface_water: string;
  diameter: string;
  rotation_period: string;
  terrain: string;
  gravity: string;
  orbital_period: string;
  population: string;
};

type RouteParams = {
  uid: string;
};

export default function PlanetsDetailScreen() {
  const [planet, setPlanet] = useState<PlanetDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const { uid } = route.params as RouteParams;

  console.log("Planet UID from route params:", uid);

  const fetchPlanet = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${uid}`);
      console.log("Fetching planet detail from:", `${BASE_URL}/${uid}`);
      const data = await response.json();

      if (data && data.result && data.result.properties) {
        console.log("Planet data:", data.result.properties);
        setPlanet(data.result.properties);
      } else {
        console.warn("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching planet detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanet();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  if (!planet) {
    return (
      <View style={styles.center}>
        <Text>Planet data not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{planet.name}</Text>
        <Text>Climate: {planet.climate}</Text>
        <Text>Surface Water: {planet.surface_water}</Text>
        <Text>Diameter: {planet.diameter}</Text>
        <Text>Rotation Period: {planet.rotation_period}</Text>
        <Text>Terrain: {planet.terrain}</Text>
        <Text>Gravity: {planet.gravity}</Text>
        <Text>Orbital Period: {planet.orbital_period}</Text>
        <Text>Population: {planet.population}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
