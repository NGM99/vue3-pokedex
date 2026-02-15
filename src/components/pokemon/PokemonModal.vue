<script setup>
import BaseSkeleton from '../ui/BaseSkeleton.vue'

const props = defineProps({
	selectedPokemon: {
		type: Object,
		default: {}
	},
	detailLoading: {
		type: Boolean,
		default: false
	},
	showModal: {
		type: Boolean,
		default: false
	},
})

const emit = defineEmits(['closeModal'])

const handleCloseModal = () => {
	emit('closeModal')
}
</script>

<template>
	<div v-if="props.showModal" class="modal-overlay" @click.self="handleCloseModal">
		<div class="modal">
			<button class="close-btn" @click="handleCloseModal">✕</button>

			<div v-if="props.detailLoading">
				<BaseSkeleton width="100%" height="220px" />
				<div v-for="n in 3" style="margin-top: 1rem;">
					<BaseSkeleton width="100%" />
				</div>
			</div>

			<div v-if="props.selectedPokemon">
				<img :src="props.selectedPokemon.image" class="modal-img" />
				<h2 class="modal-name">{{ props.selectedPokemon.name }}</h2>

				<div class="types">
					<span
						v-for="type in props.selectedPokemon.types" 
						:key="type" 
					>
						{{ type }}
					</span>
				</div>

				<div class="stats">
					<p>Altura:{{ props.selectedPokemon.height }}</p>
					<p>Peso: {{ props.selectedPokemon.weight }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.modal-overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	z-index: 1000;
}

.modal {
	background: white;
	width: 100%;
	max-width: 400px;
	border-radius: 20px;
	padding: 2rem;
	text-align: center;
	position: relative;
	animation: fadeIn 0.2s ease;
}

.modal-img {
	width: 160px;
	height: 160px;
	object-fit: contain;
}

.modal-name {
	text-transform: capitalize;
	margin: 1rem 0;
	font-size: 1.5rem;
}

.types {
	margin-bottom: 1rem;
}

.stats p {
	margin: 0.3rem 0;
}

.close-btn {
	position: absolute;
	top: 10px;
	right: 15px;
	border: none;
	background: transparent;
	font-size: 1.2rem;
	cursor: pointer;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: scale(0.95);
	}

	to {
		opacity: 1;
		transform: scale(1);
	}
}
</style>
