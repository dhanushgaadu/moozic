export async function req(name) {
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
    if (!songs.length) {
      songs = null;
    }
    if (!albums.length) {
      albums = null;
    }
    if (!artists.length) {
      artists = null;
    }
    if (!playlists.length) {
      playlists = null;
    }
    return {
      "songs": songs,
      "albums": albums,
      "artists": artists,
      "playlists": playlists
    }
  }
async function moresongs(name) {
    let songs = [];
    const res = await fetch("https://saavn.dev/api/search/songs?query=" + name)
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    data = await res.json()
    for (let i = 0; i < data["data"]["results"].length; i++) {
      songs.push({
        name: data["data"]["results"][i]["name"],
        image: data["data"]["results"][i]["image"][2]["url"],
        url: data["data"]["results"][i]["downloadUrl"][2]["url"],
      })
    }
    return songs
  }
  moresongs("tum hi ho").then((data) => {
    console.log(data)
  }