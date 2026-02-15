<script setup>
import { computed } from 'vue'

const props = defineProps({
	currentPage: {
		type: Number,
		required: true
	},
	totalPages: {
		type: Number,
		required: true
	}
})

const emit = defineEmits(['changePage'])

// Prevents navigation outside the valid page range
const changePage = (page) => {
	if (page < 1 || page > props.totalPages) return
	emit('changePage', page)
}

// Generates visible pages around the current page
const pages = computed(() => {
	const visiblePages = []
	const start = Math.max(1, props.currentPage - 2)
	const end = Math.min(props.totalPages, props.currentPage + 2)

	for (let i = start; i <= end; i++) {
		visiblePages.push(i)
	}

	return visiblePages
})
</script>

<template>
	<div
		v-if="totalPages > 1"
		class="pagination"
	>
		<button
			class="page-btn"
			:disabled="currentPage === 1" 
			@click="changePage(currentPage - 1)"
		>
			‹
		</button>

		<button
			v-for="page in pages" 
			:key="page" 
			class="page-btn" 
			:class="{ active: page === currentPage }"
			@click="changePage(page)"
		>
			{{ page }}
		</button>

		<button
			class="page-btn"
			:disabled="currentPage === totalPages" 
			@click="changePage(currentPage + 1)"
		>
			›
		</button>
	</div>
</template>

<style scoped>
.pagination {
	margin: 1rem 0 1rem 0;
	display: flex;
	justify-content: center;
	gap: 0.5rem;
	flex-wrap: wrap;
}

.page-btn {
	width: 32px;
	height: 32px;
	border-radius: 50%;
	border: none;
	cursor: pointer;
	font-weight: 500;
	transition: all 0.2s ease;
	background: #f0f0f0;
}

.page-btn:hover:not(:disabled) {
	background: #ffcb05;
	color: #2a75bb;
}

.page-btn.active {
	background: #2a75bb;
	color: white;
}

.page-btn:disabled {
	cursor: not-allowed;
}
</style>
