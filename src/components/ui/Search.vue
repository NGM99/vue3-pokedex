<script setup>
import { ref } from 'vue'

const props = defineProps({
	placeholder: {
		type: String,
		required: false
	},
})

const emit = defineEmits(['search'])

const query = ref('')
let timeout = null

// Delays search to avoid emitting on every keystroke
const handleInput = () => {
	clearTimeout(timeout)

	timeout = setTimeout(() => {
		emit('search', query.value.trim().toLowerCase())
	}, 500)
}

// Clears input and resets search results
const cleanInput = () => {
	clearTimeout(timeout)
	query.value = ''
	emit('search', '')
}
</script>

<template>
	<div class="search-container">
		<div class="search-group">
			<input
				v-model="query"
				:placeholder="props.placeholder" 
				class="search-input" 
				@input="handleInput" 
			/>
			<button
				v-show="query.length"
				@click="cleanInput"
			>
				X
			</button>
		</div>
	</div>
</template>

<style scoped>
.search-container {
	display: flex;
	justify-content: center;
}

.search-group {
	position: relative;
	display: flex;
	border-radius: 0.5rem;
	border: 1px solid gray;
	width: 100%;
	max-width: 500px;
}

.search-input {
	width: 100%;
	max-width: 600px;
	padding: 0.5rem 2rem 0.5rem 1rem;
	border-radius: 0.5rem;
	font-size: 1rem;
	border: none;
}

.search-input:focus {
	outline: none;
}

button {
	position: absolute;
	right: 8px;
	top: 50%;
	transform: translateY(-50%);
	border: none;
	background: transparent;
	cursor: pointer;
}
</style>
