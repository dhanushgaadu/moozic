async function test(name) {
    let songs=[];
    let albums=[];
    let artists=[];
    let playlists=[];
    const res=await fetch("https://saavn.dev/api/search?query="+name)
    if (!res.ok) {
        throw new Error("Network response was not ok");
    }
    data=await res.json()
    for (let i = 0; i < data["data"]["songs"]["results"].length; i++) {
        songs.push({
            title: data["data"]["songs"]["results"][i]["title"],
            album: data["data"]["songs"]["results"][i]["album"],
            image: data["data"]["songs"]["results"][i]["image"],
            url: data["data"]["songs"]["results"][i]["url"]
        })
    }
    console.log(songs)
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
    return {"songs":songs,
        "albums":albums,
        "artists":artists,
        "playlists":playlists}
}