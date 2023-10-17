import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import Image from 'react-native-scalable-image'

type HomeScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

export default function Hometab({navigation}:HomeScreenProps) {
  const [totalPages, setTotalPages] = useState(1);
  const [moviesList, setMoviesList] = useState([] as MovieData[]);
  const [pageToLoad, setPageToLoad] = useState(1);
  const [loadinStatus, setLoadinStatus] = useState({
    isError: false,
    message: "",
    isLoading: false,
  });
  const getDataByPage = async (replace = false) => {
    if (totalPages >= pageToLoad) {
      try {
        setPageToLoad((prev) => prev + 1);
        setLoadinStatus({ isError: false, message: "", isLoading: true });
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=94c01f7ec7fde0e9d839db0827c301d7&language=en-US&page=${pageToLoad}`
        );
        const responseJSON = await response.json();
        setMoviesList(prev => [ ...(replace? []:prev), ...responseJSON.results]);
        setTotalPages(responseJSON.total_pages);
        setLoadinStatus({ isError: false, message: "", isLoading: false });
      } catch {
        setLoadinStatus({
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
        data={moviesList}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={()=>navigation.navigate('Details', {item})}>
            <View key={index} style={styles.movieData}>
              <View>
              <Image
                style={styles.imagePoster}
                source={{
                  uri:
                    "https://www.themoviedb.org/t/p/w188_and_h282_bestv2" +
                    item.poster_path,
                }}
                width={150}
              /></View>
              <View style={styles.movieTextData}>
                <Text style={styles.bold}>{item.title}</Text>
                <Text>{item.overview}</Text>
              </View>
            </View></TouchableOpacity>
          );
        }}
        ListFooterComponent={()=> {
          if(loadinStatus.isLoading) {
            return <View><Text style={styles.listFooter}>Loading ...</Text></View>
          }
          else if (loadinStatus.isError) {
            return <View><Text style={[styles.bold,styles.error, styles.listFooter]}>{loadinStatus.message}</Text></View>
          }
        }}
        onEndReached={() => {getDataByPage()}}
        onScroll={() =>{if(loadinStatus.isError){
          getDataByPage()
        }}}
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
    flexShrink: 1
  },
  bold: {
    fontWeight: "700",
  },
  error: {
    color: 'red',
    marginBottom: 30
  },
  imagePoster: {
    marginRight: 10,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1
  },
  listFooter: {
    textAlign: 'center'
  }
});
