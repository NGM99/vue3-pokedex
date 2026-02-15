<script setup>
import { ref, onMounted } from 'vue'
import { getPokemons } from '../../services/pokemonService'
import BaseSkeleton from '../ui/BaseSkeleton.vue'

const pokemons = ref([])
const isLoading = ref(false)
const error = ref(null)

const fetchPokemons = async () => {
	isLoading.value = true
	error.value = null

	try {
		const data = await getPokemons()
		pokemons.value = data.results
	} catch {
		error.value = 'Error al cargar Pokémon'
	} finally {
		isLoading.value = false
	}
}

onMounted(() => {
	fetchPokemons()
})
</script>

<template>
	<div class="container">
		<div class="title-group">
			<img src="../../assets/images/pokebola_logo_light-mode.png" alt="Pokeball" class="title-icon" />
			<h1 class="title">Pokédex</h1>
		</div>

		<div v-if="isLoading" class="grid" style="margin-top: 1rem;">
      <div class="card" v-for="n in 20" :key="n">
        <BaseSkeleton
					width="100%"
					height="150px"
					borderRadius="12px" 
				/>
        <div style="margin-top: 1rem;">
          <BaseSkeleton
						width="100%"
						height="20px"
					/>
        </div>
      </div>
    </div>

		<div class="grid">
			<div
				v-for="pokemon in pokemons"
				:key="pokemon.id"
				class="card"
			>
				<img :src="pokemon.image" :alt="pokemon.name" class="pokemon-img" />
				<h2 class="pokemon-name">{{ pokemon.name }}</h2>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	padding: 1rem;
	max-width: 1200px;
	margin: auto;
}

.title {
	font-size: 2rem;
	color: #ffcb05;
}

.title-group {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.8rem;
}

.title-icon {
	width: 32px;
	height: 32px;
}

.grid {
	display: grid;
	gap: 1.5rem;
	grid-template-columns: repeat(auto-fit, minmax(220px, 280px));
	justify-content: center;
}

.card {
	width: 80%;
	background: white;
	border-radius: 16px;
	padding: 1.5rem;
	text-align: center;
	box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
	transition: transform 0.2s ease, box-shadow 0.2s ease;
	cursor: pointer;
}

.card:hover {
	transform: translateY(-5px);
	box-shadow: 0 10px 22px rgba(0, 0, 0, 0.15);
}

.pokemon-img {
	width: 120px;
	height: 120px;
	object-fit: contain;
	margin-bottom: 1rem;
}

.pokemon-name {
	font-size: 1.2rem;
	font-weight: 600;
	text-transform: capitalize;
}
</style>
