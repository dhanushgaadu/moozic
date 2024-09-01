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