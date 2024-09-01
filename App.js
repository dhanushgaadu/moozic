import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, FlatList, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
export default function App() {
  const [Query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  useEffect(() => {
    if (searchQuery) {
      req(searchQuery).then((data) => {
        setData(data);
        if (data) {
          console.log(data)
        }
      })
    }
    return () => {
      setData([]);
    }
  }, [searchQuery]);
  return (
    <View style={styles.container} >
      <Text style={styles.mainhead}>Search</Text>
      <Searchbar
        color="black"
        placeholder="Search"
        onChangeText={setQuery}
        onSubmitEditing={() => setSearchQuery(Query)}
        value={Query}
        style={styles.input}
      /><ScrollView style={{width:"100%",height:"60&"}}>
      {data["songs"] ? <View><Text style={styles.headtext}>songs :</Text><SongCards data={data} /></View> : null}
      {data["albums"] ? <View><Text style={styles.headtext}>albums:</Text><AlbumCards data={data} /></View> : null}
      {data["artists"] ? <View>
        <Text style={styles.headtext}>artists:</Text>
        <ArtistCards data={data} />
      </View> : null}
      {data["playlists"] ? <View>
        <Text style={styles.headtext}>playlists:</Text>
        <PlaylistCards data={data} />
      </View>: null}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
function SongCards({ data }) {
  {
    return data["songs"].map((song, index) => {
      return (
        <View key={index} style={styles.card}>
          <Image style={styles.image} source={{ uri: song.image }} />
          <Text style={styles.text}>{song.title}</Text>
        </View>
      )
    }
    )
  }
}
function AlbumCards({ data }) {
  {
    return data["albums"].map((album, index) => {
      return (
        <View key={index} style={styles.card}>
          <Image style={styles.image} source={{ uri: album.image }} />
          <Text style={styles.text}>{album.title}</Text>
        </View>
      )
    }
    )
  }
}
function ArtistCards({ data }) {
  {
    return data["artists"].map((artist, index) => {
      return (
        <View key={index} style={styles.card}>
          <Image style={styles.image} source={{ uri: artist.image }} />
          <Text style={styles.text}>{artist.title}</Text>
        </View>
      )
    }
    )
  }
}
function PlaylistCards({ data }) {
  {
    return data["playlists"].map((playlist, index) => {
      return (
        <View key={index} style={styles.card}>
          <Image style={styles.image} source={{ uri: playlist.image }} />
          <Text style={styles.text}>{playlist.title}</Text>
        </View>
      )
    }
    )
  }
}

const styles = StyleSheet.create({
  headtext: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    margin: 10,
    backgroundColor: 'grey',
    borderRadius: 50,
    padding: 10,

  },
  container: {
    flex: 1,
    backgroundColor: '#272727',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 20,
    width: '90%',
    margin: 10,
    backgroundColor: 'grey',
    borderRadius: 50,
  },
  card: {
    backgroundColor: 'grey',
    margin: 10,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    width: '90%',
    overflow: 'hidden',
    display: 'flex',
     
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginLeft: 20,},
  button: {
    margin: 10,
    borderRadius: 50,
  },
  image: {
    width: 100,
    height: 100,
  },
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
      image: data["data"]["songs"]["results"][i]["image"][2]["url"],
      url: data["data"]["songs"]["results"][i]["url"]
    })
  }
  for (let i = 0; i < data["data"]["albums"]["results"].length; i++) {
    albums.push({
      title: data["data"]["albums"]["results"][i]["title"],
      image: data["data"]["albums"]["results"][i]["image"][2]["url"],
      url: data["data"]["albums"]["results"][i]["url"]

    })
  }
  for (let i = 0; i < data["data"]["artists"]["results"].length; i++) {
    artists.push({
      title: data["data"]["artists"]["results"][i]["title"],
      image: data["data"]["artists"]["results"][i]["image"][2]["url"],
    })
  }
  for (let i = 0; i < data["data"]["playlists"]["results"].length; i++) {
    playlists.push({
      title: data["data"]["playlists"]["results"][i]["title"],
      image: data["data"]["playlists"]["results"][i]["image"][2]["url"],
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