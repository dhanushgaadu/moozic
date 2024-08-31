import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Searchbar, Card, Button } from 'react-native-paper';
export default function App() {
  const [Query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('believer');
  const [data, setData] = useState([]);
  useEffect(() => {
    req(searchQuery).then((data) => {
      setData(data);
      console.log(data["songs"][0]["image"][2]["url"])
    })
  }, [searchQuery]);
  return (
    <View style={styles.container} >
      <Searchbar
        placeholder="Search"
        onChangeText={setQuery}
        onSubmitEditing={() => setSearchQuery(Query)}
        value={Query}
        style={styles.input}
      />
    
      <StatusBar style="auto" />
    </View>
  );
}
function Songs({ data }, { index }) {
  return (
    <Text stlye={styles.songfont}>{data["songs"][{index}]["title"]}</Text>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    margin: 10,
  },
  songfont:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',

    
  }
});

async function req(name) {
  let songs = [];
  let albums = [];
  let artists = [];
  let playlists = [];
  const res = await fetch("https://saavn.dev/api/search?query=" + name)
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  data = await res.json()
  for (let i = 0; i < data["data"]["songs"]["results"].length; i++) {
    songs.push({
      title: data["data"]["songs"]["results"][i]["title"],
      album: data["data"]["songs"]["results"][i]["album"],
      image: data["data"]["songs"]["results"][i]["image"],
      url: data["data"]["songs"]["results"][i]["url"]
    })
  }
  for (let i = 0; i < data["data"]["albums"]["results"].length; i++) {
    albums.push({
      title: data["data"]["albums"]["results"][i]["title"],
      image: data["data"]["albums"]["results"][i]["image"],
      url: data["data"]["albums"]["results"][i]["url"]

    })
  }
  for (let i = 0; i < data["data"]["artists"]["results"].length; i++) {
    artists.push({
      title: data["data"]["artists"]["results"][i]["title"],
      image: data["data"]["artists"]["results"][i]["image"],
    })
  }
  for (let i = 0; i < data["data"]["playlists"]["results"].length; i++) {
    playlists.push({
      title: data["data"]["playlists"]["results"][i]["title"],
      image: data["data"]["playlists"]["results"][i]["image"],
      url: data["data"]["playlists"]["results"][i]["url"]
    })
  }
  return {
    "songs": songs,
    "albums": albums,
    "artists": artists,
    "playlists": playlists
  }
}