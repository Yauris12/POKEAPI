const API = 'https://pokeapi.co/api/v2/'

//variables
let nombrepokemon

let pokemon
const obtenerPokemon = () => {
  axios
    .get(`${API}pokemon?limit=150`)

    .then((response) => {
      let filtroPokemon = document.getElementById('filtroPokemon')

      let pokeType = document.createElement('button')
      pokeType.innerText = 'All'
      filtroPokemon.appendChild(pokeType)

      pokeType.onclick = () => {}

      if (response.status === 200) {
        let poke = response.data.results
        console.log(poke)
        pokeType.onclick = () => {
          poke.map((nombrepokemon, index) => {
            detallePokemon(nombrepokemon.name)
          })
        }

        response.data.results.map((nombrepokemon, index) => {
          detallePokemon(nombrepokemon.name)
        })
      } else {
        console.log('no se encontro la informacion')
      }
    })
    .catch((e) => {
      console.log(e)
    })
}

const probando = (code) => {
  window.location.href = `DetallePokemon.html?idPokemon=${code.id}`
  // window.location.search(`DetallePokemon/$.html`)
}

const typesPokemon = () => {
  axios
    .get(`${API}type`)
    .then((response) => {
      typeP = response.data
      tipos = typeP.results

      mostrarTipos(tipos)
    })
    .catch((e) => {
      console.log(e)
    })
}
const buscarTypesPokemon = (type) => {
  axios
    .get(`${API}type/${type}`)
    .then((response) => {
      let pokemonesR = response.data.pokemon

      const losprimeros150 = pokemonesR.filter((pokemon) => {
        let url = pokemon.pokemon.url
        let cadenaCorregida = url.substring(0, url.length - 1)
        const lastItem = cadenaCorregida.substring(
          cadenaCorregida.lastIndexOf('/') + 1
        )
        return lastItem < 150
      })

      losprimeros150.map((pokemon) => {
        detallePokemon(pokemon.pokemon.name)
      })
    })

    .catch((e) => {
      console.log(e)
    })
}

const detallePokemon = async (nombre) => {
  let grid_cards = document.getElementById('grid_cards')
  console.log(nombre)
  // let cards = document.getElementById('card-flex')
  grid_cards.innerHTML = ''
  await axios
    .get(`${API}pokemon/${nombre}`)
    .then((response) => {
      if (response.status === 200) {
        let pokemon = response.data

        let grid_cards = document.getElementById('grid_cards')
        // let cards = document.getElementById('card-flex')

        let card = document.createElement('div')
        card.className = 'card-flex'
        card.id = 'card-flex'
        card.onclick = () => probando(pokemon)
        let containerImg = document.createElement('div')
        containerImg.className = 'container-img'
        let img = document.createElement('img')
        img.src = pokemon.sprites.other.dream_world.front_default
        // img.src = pokemon.sprites.front_default

        let id = document.createElement('p')
        id.className = 'codigoPoke'
        id.innerText = `#${pokemon.id.toString().padStart(3, 0)}`

        let nombrePokemon = document.createElement('p')
        nombrePokemon.className = 'nombre_Pokemon'
        nombrePokemon.innerText = pokemon.name

        let divtipo = document.createElement('div')

        divtipo.className = 'flex-tipo'
        let tipoCard = pokemon.types[0].type.name
        switch (tipoCard) {
          case 'normal':
            card.style.backgroundImage =
              'radial-gradient(circle at 22.99% 22.99%, #f9e98b 0, #c9c279 50%, #9d9c67 100%)'

            break
          case 'fighting':
            card.style.backgroundImage =
              'linear-gradient(20deg, #fffffd 0, #b5bfd0 50%, #6880a4 100%)'
            break
          case 'flying':
            card.style.backgroundImage =
              'radial-gradient(circle at 31.86% 99.83%, #e5ae3e 0, #e29f31 16.67%, #db8a1f 33.33%, #cf7100 50%, #c35700 66.67%, #ba3e00 83.33%, #b52600 100%)'
            break
          case 'poison':
            card.style.backgroundImage =
              'radial-gradient(circle at 31.86% 99.83%, #9a569c 0, #7e408e 25%, #5b257d 50%, #330b6c 75%, #000060 100%)'
            break
          case 'ground':
            card.style.backgroundImage =
              'radial-gradient(circle at 37.46% 96.82%, #8a7941 0, #836b32 16.67%, #795a1e 33.33%, #6a4503 50%, #5c3000 66.67%, #521e00 83.33%, #4c0d00 100%)'
            break
          case 'rock':
            card.style.backgroundImage =
              'radial-gradient(circle at 37.46% 96.82%, #bec3d0 0, #a5a6aa 25%, #888780 50%, #6a6a59 75%, #4f5139 100%)'
            break
          case 'bug':
            card.style.backgroundImage =
              'radial-gradient(circle at 37.46% 96.82%, #ffddf0 0, #f4cfe7 16.67%, #e3bcdb 33.33%, #cea6cc 50%, #b891be 66.67%, #a480b4 83.33%, #9375ae 100%)'
            break
          case 'ghost':
            card.style.backgroundImage =
              'radial-gradient(circle at 37.46% 96.82%, #da94f8 0, #b779e7 25%, #8d5cd2 50%, #5e41be 75%, #202dae 100%)'
            break
          case 'steel':
            card.style.backgroundImage =
              'radial-gradient(circle at 37.46% 96.82%, #b6c6b0 0, #adc3ad 12.5%, #a0bca6 25%, #8eb29c 37.5%, #77a48f 50%, #5e9783 62.5%, #498c7d 75%, #36857a 87.5%, #28827b 100%)'
            break
          case 'fire':
            card.style.backgroundImage =
              'radial-gradient(circle at 37.46% 96.82%, #ef9622 0, #ee851d 16.67%, #e86e12 33.33%, #db4f02 50%, #ce2800 66.67%, #c40004 83.33%, #bf000f 100%'
            break
          case 'water':
            card.style.backgroundImage =
              'radial-gradient(circle at 37.46% 96.82%, #baf6f8 0, #93dfe6 25%, #5dc1cf 50%, #00a3ba 75%, #008dac 100%)'
            break
          case 'grass':
            card.style.backgroundImage =
              'radial-gradient(circle at 37.46% 96.82%, #9ec546 0, #8ac347 12.5%, #70bd46 25%, #4db342 37.5%, #00a63c 50%, #009838 62.5%, #008e3a 75%, #008740 87.5%, #00824a 100%)'
            break
          case 'electric':
            card.style.backgroundImage =
              'radial-gradient(circle at 37.46% 96.82%, #ffff7a 0, #fff44f 25%, #fccf00 50%, #e1ab00 75%, #cc8b00 100%'
            break
          case 'psychic':
            card.style.backgroundImage =
              'radial-gradient(circle at 37.46% 96.82%, #fbe465 0, #edc741 25%, #d7a300 50%, #c17f00 75%, #b36200 100%)'
            break
          case 'ice':
            card.style.backgroundImage =
              'radial-gradient(circle at 37.46% 96.82%, #92d5fb 0, #60b7e4 25%, #0097cd 50%, #0078b6 75%, #005da1 100%)'
            break
          case 'dragon':
            card.style.backgroundImage =
              'radial-gradient(circle at 37.46% 96.82%, #7f9ca6 0, #588293 25%, #24667d 50%, #004b68 75%, #003458 100%)'
            break
          case 'fairy':
            card.style.backgroundImage =
              'radial-gradient(circle at 37.46% 96.82%, #ffffff 0, #ffffff 16.67%, #fff2f0 33.33%, #f9dad9 50%, #eac2c4 66.67%, #dfb0b6 83.33%, #d6a4af 100%)'
            break
          default:
            card.style.backgroundImage = ''
        }

        pokemon.types.map((tipo) => {
          // mostrarTipo(tipo.type.name)
          let typoPoke = document.createElement('p')
          typoPoke.innerText = tipo.type.name
          divtipo.appendChild(typoPoke)
        })

        // function mostrarTipo(type) {
        //   typoPoke = document.createElement('p')
        //   typoPoke.innerText = type
        // }

        //agregar  contenido html
        grid_cards.appendChild(card)
        card.appendChild(containerImg)
        containerImg.appendChild(img)

        card.appendChild(id)
        card.appendChild(nombrePokemon)
        card.appendChild(divtipo)
      }
    })
    .catch((e) => {
      console.log(e)
    })
}

const mostrarTipos = (tipos) => {
  let filtroPokemon = document.getElementById('filtroPokemon')
  const tipesPokemos = tipos.map((item) => item.name)

  tipesPokemos.map((tipeP) => {
    let pokeType = document.createElement('button')

    pokeType.onclick = () => buscarTypesPokemon(tipeP)

    pokeType.innerText = tipeP
    filtroPokemon.appendChild(pokeType)

    // filtroPokemon.appendChild(pokeType)
  })
}
//DETALLE POKEMON

//Llamado  de funciones
obtenerPokemon()
typesPokemon()
