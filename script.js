const handleSearch = ()=>{
    const artistName = document.getElementById('keyword').value
    if(artistName== ''){
        return;
    }
    const url =`https://theaudiodb.com/api/v1/json/2/search.php?s=${artistName}`
    fetch(url)
    .then(res => res.json())
    .then(data => showArtistData(data.artists))
    document.getElementById('keyword').value = ''
}

function showArtistData(datas){

    const artistDiv = document.getElementById('artists')
    artistDiv.innerText = ''
    for(const data in datas){
        const div = document.createElement('div')
        div.classList.add('artist-card')
        div.innerHTML = ` 
        <div class="image-container">
            <div class="image-container-inner">
            <img
                src="${datas[data].strArtistThumb}"
                alt=""
            />
            </div>
        </div>
        <div class="info-container">
            <h1>${datas[data].strArtist}</h1>
            <p>Country: ${datas[data].strCountry}</p>
            <p>Style: ${datas[data].strGenre}</p>
        </div>
        <button class="album-button">
            <i class="fa-solid fa-compact-disc"></i>
            <p onclick="fetchAlbums('${datas[data].idArtist}')" class="button-title">Albums</p>
        </button>
        `
        artistDiv.appendChild(div)

    }
}

const fetchAlbums =data=>{
    const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${data}`
    fetch(url)
    .then(res => res.json())
    .then(data => showAlbum(data.album))
}

const showAlbum = datas =>{
    const albumdiv = document.getElementById('albums')
    albumdiv.innerText = ''
    for(const data in datas){
        // console.log(data.strAlbum)
        const div = document.createElement('div')
        div.classList.add('album')
        div.innerHTML = `
        <div class="album-image-container">
        <img
          src="${datas[data].strAlbumThumb}"
          alt=""
        />
      </div>
      <div class="album-name">
        <h3>${datas[data].strAlbum}</h3>
      </div>
        `
        albumdiv.appendChild(div)

    }
}



