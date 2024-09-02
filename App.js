import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { req, more} from './api.js';
export default function App() {
  const [Query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const[clicked,setmore]=useState([false,""]);
  useEffect(() => {
    if (searchQuery) {
      req(searchQuery).then((data) => {
        setData(data);
      })
    }
    return () => {
      setData([]);
    }
  }, [searchQuery]);
  const handlemore = (wt,txt,data) => {
    more(wt,txt).then((dat) => {
      data[wt]=dat;
      setData(data);
    })
  }
  useEffect(() => {
    if(clicked[0]){
      handlemore(clicked[1],searchQuery,data);
    }
  }, [clicked]);
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
      />
      {data ? (<ScrollView style={{ width: "100%", height: "60&" }}>
        {data["songs"] ? <View style={styles.element}><View style={{
          flexDirection: "row",
          alignitems: 'center',
          justifyContent: 'space-between',
        }}>
          <Text style={styles.headtext}>songs</Text>
          <TouchableOpacity style={styles.more} onPress={()=>setmore([true,"songs"])}><Text style={{ fontSize: 20, color: "white" }}>more</Text></TouchableOpacity>
        </View><SongCards data={data["songs"]} txt={"songs"} /></View> : null}
        {data["albums"] ? <View style={styles.element}><View style={{
          flexDirection: "row",
          alignitems: 'center',
          justifyContent: 'space-between',
        }}>
          <Text style={styles.headtext}>Albums</Text>
          <TouchableOpacity style={styles.more} onPress={()=>setmore([true,"albums"])}><Text style={{ fontSize: 20, color: "white" }}>more</Text></TouchableOpacity>
        </View><AlbumCards data={data["albums"]} /></View> : null}
        {data["artists"] ? <View style={styles.element}>
        <View style={{
          flexDirection: "row",
          alignitems: 'center',
          justifyContent: 'space-between',
        }}>
          <Text style={styles.headtext}>Artists</Text>
          <TouchableOpacity style={styles.more} onPress={()=>setmore([true,"artists"])}><Text style={{ fontSize: 20, color: "white" }}>more</Text></TouchableOpacity>
        </View>
          <ArtistCards data={data} />
        </View> : null}
        {data["playlists"] ? <View style={styles.element}>
        <View style={{
          flexDirection: "row",
          alignitems: 'center',
          justifyContent: 'space-between',
        }}>
          <Text style={styles.headtext}>playlists</Text>
          <TouchableOpacity style={styles.more} onPress={()=>setmore([true,"playlists"])}><Text style={{ fontSize: 20, color: "white" }}>more</Text></TouchableOpacity>
        </View>
          <PlaylistCards data={data} />
        </View> : null}
      </ScrollView>) : null}
      <StatusBar style="auto" />
    </View>
  );
}
function SongCards({ data }) {
  {
    return data.map((song, index) => {
      return (
        <TouchableOpacity key={index} style={styles.card}>
          <Image style={styles.image} source={{ uri: song.image }} />
          <Text style={styles.text}>{song.title}</Text>
        </TouchableOpacity>
      )
    }
    )
  }
}

function AlbumCards({ data }) {
  {
    return data.map((album, index) => {
      return (
        <TouchableOpacity key={index} style={styles.card}>
          <Image style={styles.image} source={{ uri: album.image }} />
          <Text style={styles.text}>{album.title}</Text>
        </TouchableOpacity>
      )
    }
    )
  }
}
function ArtistCards({ data }) {
  {
    return data["artists"].map((artist, index) => {
      return (
        <TouchableOpacity key={index} style={styles.card}>
          <Image style={styles.image} source={{ uri: artist.image }} />
          <Text style={styles.text}>{artist.title}</Text>
        </TouchableOpacity>
      )
    }
    )
  }
}
function PlaylistCards({ data }) {
  {
    return data["playlists"].map((playlist, index) => {
      return (
        <TouchableOpacity key={index} style={styles.card}>
          <Image style={styles.image} source={{ uri: playlist.image }} />
          <Text style={styles.text}>{playlist.title}</Text>
        </TouchableOpacity>
      )
    }
    )
  }
}

const styles = StyleSheet.create({
  more:
  {
    backgroundColor: 'grey',
    padding: 5,
    borderRadius: 50,
    width: 80,
    alignContent: 'center',
    margin: 10,
    alignItems: 'center',
  },
  element: {
    margin: 10,
    backgroundColor: '#464646',
    padding: 10,
    borderRadius: 60,
    justifyContent: 'space-between',
  },
  headtext: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    margin: 10,
    justifyContent: 'center',
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
    marginLeft: 20,
    alignSelf: 'center',
  },
  button: {
    margin: 10,
    borderRadius: 50,
  },
  image: {
    width: 100,
    height: 100,
  },
});