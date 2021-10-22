const colorsBackground = (tipoCard, card) => {
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
}

//Recibiendo parametro
let queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
let pokemonId = urlParams.get('idPokemon')
const API = 'https://pokeapi.co/api/v2/'

const detallePokemon = () => {
  axios
    .get(`${API}pokemon/${pokemonId}`)

    .then((response) => {
      if (response.status === 200) {
        let pokemon = response.data

        let img = pokemon.sprites.other.dream_world.front_default
        let name = pokemon.name
        let tipos = pokemon.types
        let xp = pokemon.base_experience
        let height = pokemon.height
        let weight = pokemon.weight
        let tipoCard = tipos[0].type.name
        let section1 = document.getElementById('section1')
        let section2 = document.getElementById('section2p')
        colorsBackground(tipoCard, section1)
        colorsBackground(tipoCard, section2)

        descriptionPokemon(name, tipos, xp, height, weight)
        let stacks = pokemon.stats

        mostrarMain(img, name, tipos)
        mostrarStacks(stacks)
        mostrarAbilities(pokemon.abilities)
      }
    })
    .catch((e) => {
      console.log(e)
    })
}

const descriptionPokemon = (name, tipos, xp, height, weight) => {
  axios
    .get(`${API}pokemon-species/${pokemonId}/`)
    .then((response) => {
      if (response.status === 200) {
        let descriptionPokemon =
          response.data.flavor_text_entries[26].flavor_text
        mostrarDescription(name, tipos, descriptionPokemon, xp, height, weight)
        let probando11 = response.data.evolution_chain.url

        let cadenaCorregida = probando11.substring(0, probando11.length - 1)
        const lastItem = cadenaCorregida.substring(
          cadenaCorregida.lastIndexOf('/') + 1
        )
        cadenaEvolutiva(lastItem)
      }
    })
    .catch((e) => {
      console.log(e)
    })
}

const detalleFirstPokemon = (firstEvolutions) => {
  axios
    .get(`${API}pokemon/${firstEvolutions}`)

    .then((response) => {
      if (response.status === 200) {
        let pokemon = response.data

        // mostrarEvolutionPk(img, name)
        let cadenaEvolucion = document.getElementById('cadenaEvolucion')
        let titleEvolucion = document.createElement('h2')
        titleEvolucion.innerText = 'Cadena Evolutiva'
        cadenaEvolucion.prepend(titleEvolucion)
        let img = pokemon.sprites.other.dream_world.front_default
        let name = pokemon.name
        let codigo = pokemon.codigo
        mostrarEvolutionPk(img, name, codigo)
      }
    })
    .catch((e) => {
      console.log(e)
    })
}
const detalleSecondPokemon = (secondpokemon) => {
  if (secondpokemon) {
    axios
      .get(`${API}pokemon/${secondpokemon}`)

      .then((response) => {
        if (response.status === 200) {
          let pokemon = response.data
          let img = pokemon.sprites.other.dream_world.front_default
          let name = pokemon.name
          let codigo = pokemon.codigo
          mostrarEvolutionPk1(img, name, codigo)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

const detalleThirdPokemon = (thirdPokemon) => {
  axios
    .get(`${API}pokemon/${thirdPokemon}`)

    .then((response) => {
      if (response.status === 200) {
        let pokemon = response.data
        let img = pokemon.sprites.other.dream_world.front_default
        let name = pokemon.name
        let codigo = pokemon.codigo
        mostrarEvolutionPk2(img, name, codigo)
      }
    })
    .catch((e) => {
      console.log(e)
    })
}

const cadenaEvolutiva = (codeId) => {
  axios
    .get(`${API}evolution-chain/${codeId}`)
    .then((response) => {
      if (response.status === 200) {
        firstEvolutions = response.data.chain.species.name
        secondEvolutions =
          response.data.chain.evolves_to[0].species.name || null
        // secondEvolutions
        //   ? (secondEvolutions = response.data.chain.evolves_to[0].species.name)
        //   : (secondEvolutions = 0)
        // console.log('hola ga' + secondEvolutions)
        if (secondEvolutions) {
        }
        thirdEvolutions =
          response.data.chain.evolves_to[0].evolves_to[0].species.name

        detalleFirstPokemon(firstEvolutions)

        if (secondEvolutions) {
          detalleSecondPokemon(secondEvolutions)

          if (thirdEvolutions) {
            detalleThirdPokemon(thirdEvolutions)
          }
        }
      }
    })
    .catch((e) => {
      detalleFirstPokemon(firstEvolutions)
      // detalleSecondPokemon(secondEvolutions)

      if (secondEvolutions) {
        detalleSecondPokemon(secondEvolutions)
      }

      // if (secondEvolutions) {
      //   detalleSecondPokemon(secondEvolutions)
      //   console.log('este es' + secondEvolutions)
      // }
    })
}

//HTML MAIN
const mostrarMain = (imgUrl, name, tipos) => {
  //id
  let main = document.getElementById('main')

  let tipoCard = tipos[0].type.name

  colorsBackground(tipoCard, main)
  //creanndo conteaimer-img
  let container_imgg = document.createElement('div')
  container_imgg.className = 'container-imgg'
  main.appendChild(container_imgg)

  //img
  let img = document.createElement('img')
  img.src = imgUrl
  container_imgg.appendChild(img)
  //name

  let nombrePokemon = document.createElement('p')
  nombrePokemon.className = 'nombrePokemon'
  nombrePokemon.innerText = name

  main.appendChild(nombrePokemon)

  //tipos
  let container_tipo = document.createElement('div')
  container_tipo.className = 'container_tipo'
  main.appendChild(container_tipo)
  tipos.map((type) => {
    let typePokemon = document.createElement('p')
    typePokemon.innerText = type.type.name
    container_tipo.appendChild(typePokemon)
  })
}

const mostrarDescription = (
  name,
  tipos,
  descriptionPokemon,
  xp,
  height,
  weight
) => {
  let nametipo
  const typePoke = tipos.map((type) => {
    return type.type.name
  })

  if (typePoke.length > 1) {
    nametipo = `dual-type ${typePoke[0]}/ ${typePoke[1]}`
  } else {
    nametipo = `tipo ${typePoke[0]}`
  }
  let formatDESCRIPTION = descriptionPokemon.replaceAll('\n', ' ')

  let main = document.getElementById('main')
  let description = document.createElement('p')
  description.className = 'description-pokemon'

  description.innerText = `${name} es un pokemon  ${nametipo}. ${formatDESCRIPTION}`
  main.appendChild(description)

  let flex_caract = document.createElement('div')
  flex_caract.className = 'flex_caract'
  main.appendChild(flex_caract)
  let labelxp = document.createElement('p')
  labelxp.innerText = `XP: ${xp}`
  flex_caract.appendChild(labelxp)
  let labelheight = document.createElement('p')
  labelheight.innerText = `Altura: ${height} cm`
  flex_caract.appendChild(labelheight)
  let labelweight = document.createElement('p')
  labelweight.innerText = `Peso: ${weight} kg`
  flex_caract.appendChild(labelweight)
}

const mostrarStacks = (stacks) => {
  let section1 = document.getElementById('section1')

  let containerStacks = document.createElement('div')
  containerStacks.id = 'containerStacks'
  containerStacks.className = 'containerStacks'

  section1.append(containerStacks)
  let containerStacks1 = document.getElementById('containerStacks')

  let titlestacks = document.createElement('h2')
  titlestacks.innerText = 'Estadisticas'
  section1.prepend(titlestacks)

  stacks.map((stack) => {
    let container_stack = document.createElement('div')

    container_stack.className = 'container-stack'
    containerStacks1.appendChild(container_stack)

    //name
    let atributteName = document.createElement('p')
    atributteName.innerText = stack.stat.name
    atributteName.className = 'atributteName'
    container_stack.appendChild(atributteName)
    //value
    let atributtevalue = document.createElement('p')
    atributtevalue.innerText = stack.base_stat
    atributtevalue.className = 'atributtevalue'

    container_stack.appendChild(atributtevalue)
    //div
    let statsDiv = document.createElement('div')
    statsDiv.className = 'container-bar'
    container_stack.appendChild(statsDiv)

    //divImg
    let stastsGrafi = document.createElement('div')
    stastsGrafi.className = 'stastsGrafi'
    stastsGrafi.style.width = `${stack.base_stat}px`

    statsDiv.appendChild(stastsGrafi)
  })
}
const mostrarAbilities = (abilities) => {
  let section2 = document.getElementById('section2')

  let section2p = document.getElementById('section2p')
  let titleablities = document.createElement('h2')
  titleablities.innerText = 'Habilidades'
  section2p.prepend(titleablities)

  abilities.map((ability) => {
    let abilityname = document.createElement('p')
    abilityname.innerText = ability.ability.name
    abilityname.className = 'abilityname'
    section2.appendChild(abilityname)
  })
}
const mostrarEvolutionPk = (img, name, codigo) => {
  let evol1 = document.getElementById('evol1')
  let imgPo = document.createElement('img')
  imgPo.src = img
  evol1.appendChild(imgPo)
  //name

  let nombrePokemon = document.createElement('p')
  nombrePokemon.innerText = name

  evol1.appendChild(nombrePokemon)
}
const mostrarEvolutionPk1 = (img, name) => {
  let evol2 = document.getElementById('evol2')
  let imgPo = document.createElement('img')
  imgPo.src = img
  evol2.appendChild(imgPo)
  //name

  let nombrePokemon = document.createElement('p')
  nombrePokemon.innerText = name

  evol2.appendChild(nombrePokemon)
}
const mostrarEvolutionPk2 = (img, name) => {
  let evol3 = document.getElementById('evol3')
  let imgPo = document.createElement('img')
  imgPo.src = img
  evol3.appendChild(imgPo)
  //name

  let nombrePokemon = document.createElement('p')
  nombrePokemon.innerText = name

  evol3.appendChild(nombrePokemon)
}

detallePokemon()
