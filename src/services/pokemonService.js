import axios from 'axios'

const api = axios.create({
	baseURL: 'https://pokeapi.co/api/v2',
	timeout: 5000
})

const getPokemons = async (offset = 0, limit = 20) => {
	const response = await api.get(`/pokemon?offset=${offset}&limit=${limit}`)

	const { count, next, previous, results } = response.data

	const formattedResults = results.map(pokemon => {
		const id = pokemon.url.split('/').at(-2)

		return {
			id,
			name: pokemon.name,
			image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
		}
	})

	return {
		count,
		next,
		previous,
		results: formattedResults
	}
}

const mapPokemon = (pokemon) => {
	return {
		id: pokemon.id,
		name: pokemon.name,
		image: pokemon.sprites.other['official-artwork'].front_default,
		types: pokemon.types.map(e => e.type.name),
		height: pokemon.height,
		weight: pokemon.weight
	}
}

const getPokemonDetail = async (name) => {
	const response = await api.get(`/pokemon/${name}`)
	return mapPokemon(response.data)
}

export {
	getPokemons,
	getPokemonDetail,
}