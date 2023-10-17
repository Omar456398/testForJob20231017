import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { MovieData } from "./types";

type DetailsScreenParams = {
  params: { item: MovieData };
};

type DetailsScreenProps = {
  navigation: NavigationProp<ParamListBase, "Details">;
  route: RouteProp<DetailsScreenParams, "params">;
};

export default function DetailsTab({ navigation, route }: DetailsScreenProps) {
  const { item } = route.params;
  const [clacketOpacity, setClacketOpacity] = useState(new Animated.Value(1));
  const [isShowClacket, setIsShowClacket] = useState(true);
  useEffect(() => {
    Animated.timing(clacketOpacity, {
      toValue: 0,
      duration: 1000,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start(() => setIsShowClacket(false));
  }, []);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container} alwaysBounceVertical={false}>
          <Text style={styles.title}>{item.title}</Text>
          <Image
            height={Dimensions.get("screen").height / 2}
            resizeMode="contain"
            source={{
              uri:
                "https://www.themoviedb.org/t/p/w188_and_h282_bestv2" +
                item.poster_path,
            }}
          />
          <Text style={[styles.marginTop10, styles.nonbold]}>
            <Text style={styles.bold}>Overview: </Text>
            {item.overview}
          </Text>
          <Text style={[styles.marginTop10, styles.nonbold]}>
            <Text style={styles.bold}>Language: </Text>
            {item.original_language}
          </Text>
          <Text style={[styles.marginTop10, styles.nonbold]}>
            <Text style={styles.bold}>Popularity: </Text>
            {item.popularity}
          </Text>
          <Text style={[styles.marginTop10, styles.nonbold]}>
            <Text style={styles.bold}>Rating: </Text>
            {item.vote_average}/10 - {item.vote_count} Votes
          </Text>
        </ScrollView>
      </SafeAreaView>
      {isShowClacket ? (
        <Animated.View style={[styles.clacket, { opacity: clacketOpacity }]}>
          <Image source={require("../assets/clacket.gif")} />
        </Animated.View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  bold: {
    fontFamily: "KalamB",
  },
  nonbold: {
    fontFamily: "KalamR",
  },
  marginTop10: {
    marginTop: 10,
  },
  title: {
    fontFamily: "KalamB",
    fontSize: 30,
    textAlign: "center",
  },
  clacket: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
