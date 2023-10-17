import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";

type DetailsScreenParams = {
  params: { item: MovieData };
};

type DetailsScreenProps = {
  navigation: NavigationProp<ParamListBase, "Details">;
  route: RouteProp<DetailsScreenParams, "params">;
};

export default function DetailsTab({ navigation, route }: DetailsScreenProps) {
  const { item } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container} alwaysBounceVertical={false}>
        <Text style={styles.title}>{item.title}</Text>
        <Image
          height={Dimensions.get('screen').height /2 }
          resizeMode="contain"
          source={{
            uri:
              "https://www.themoviedb.org/t/p/w188_and_h282_bestv2" +
              item.poster_path,
          }}
        />
        <Text><Text style={styles.bold}>Overview: </Text>{item.overview}</Text>
        <Text><Text style={styles.bold}>Language: </Text>{item.original_language}</Text>
        <Text><Text style={styles.bold}>Popularity: </Text>{item.popularity}</Text>
        <Text><Text style={styles.bold}>Rating: </Text>{item.vote_average}/10 - {item.vote_count} Votes</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: '100%'
  },
  bold: {
    fontWeight: "700",
  },
  title: {
    fontWeight: "700",
    fontSize: 30,
    textAlign: 'center'
  }
});
