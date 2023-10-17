import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Image from "react-native-scalable-image";
import { useSelector, useDispatch } from "react-redux";
import { StateGlobal } from "../redux/reducers";
import { ADD_DATA, REPLACE_DATA } from "../redux/actionNames";
import { useFonts } from "expo-font";

type HomeScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

export default function Hometab({ navigation }: HomeScreenProps) {
  const [isFontLoaded] = useFonts({
    KalamR: require('../fonts/Kalam-Regular.ttf'),
    KalamB: require('../fonts/Kalam-Bold.ttf')
  })
  const dispatch = useDispatch();
  const moviesList = useSelector((state: StateGlobal) => state.data.data);
  const totalPages = useSelector((state: StateGlobal) => state.data.totalPages);
  const [pageToLoad, setPageToLoad] = useState(1);
  const [loadingStatus, setLoadingStatus] = useState({
    isError: false,
    message: "",
    isLoading: false,
  });
  const getDataByPage = async (replace = false) => {
    if (totalPages >= pageToLoad) {
      try {
        setPageToLoad((prev) => prev + 1);
        setLoadingStatus({ isError: false, message: "", isLoading: true });
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=94c01f7ec7fde0e9d839db0827c301d7&language=en-US&page=${pageToLoad}`
        );
        const responseJSON = await response.json();
        dispatch({
          type: replace ? REPLACE_DATA : ADD_DATA,
          payload: {
            data: responseJSON.results,
            totalPages: responseJSON.total_pages,
          },
        });
        setLoadingStatus({ isError: false, message: "", isLoading: false });
      } catch {
        setLoadingStatus({
          isError: true,
          message: "Error, please swipe to reload!",
          isLoading: false,
        });
        setPageToLoad((prev) => prev - 1);
      }
    }
  };
  useEffect(() => {
    getDataByPage(true);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={moviesList}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Details", { item })}
            >
              <View key={index} style={styles.movieData}>
                <View><View style={styles.imagePosterContainerOuter}><View style={styles.imagePosterContainer}>
                  <Image
                    style={styles.imagePoster}
                    source={{
                      uri:
                        "https://www.themoviedb.org/t/p/w188_and_h282_bestv2" +
                        item.poster_path,
                    }}
                    width={150}
                  />
                </View></View>
                </View>
                <View style={styles.movieTextData}>
                  <Text style={styles.bold}>{item.title}</Text>
                  <Text style={styles.nonbold}>{item.overview}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={() => {
          if (loadingStatus.isLoading) {
            return (
              <View>
                <ActivityIndicator size="large" />
              </View>
            );
          } else if (loadingStatus.isError) {
            return (
              <View>
                <Text style={[styles.bold, styles.error, styles.listFooter]}>
                  {loadingStatus.message}
                </Text>
              </View>
            );
          }
        }}
        onEndReached={() => {
          getDataByPage();
        }}
        onScroll={() => {
          if (loadingStatus.isError) {
            getDataByPage();
          }
        }}
        onEndReachedThreshold={0}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  movieData: {
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  movieTextData: {
    flexShrink: 1,
  },
  bold: {
    fontFamily: "KalamB",
    fontSize: 16,
  },
  nonbold: {
    fontFamily: "KalamR",
  },
  error: {
    color: "red",
    marginBottom: 30,
  },
  imagePosterContainer: {
    borderRadius: 15,
    borderColor: "grey",
    borderWidth: 5,
    borderStyle: "dashed",
  },
  imagePosterContainerOuter: {
    marginRight: 10,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "grey",
  },
  imagePoster: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
  },
  text: {
    fontFamily: "",
  },
  listFooter: {
    textAlign: "center",
  },
});
