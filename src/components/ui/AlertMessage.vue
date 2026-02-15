<script setup>
defineProps({
	type: {
		type: String,
		default: "success",
	}
})
</script>

<template>
	<div class="alert" :class="type" role="alert">
		<slot />
	</div>
</template>

<style scoped>
.alert {
	padding: 1rem 1.5rem;
	border-radius: 10px;
	font-weight: 500;
	margin-bottom: 1rem;
	transition: 0.2s ease;
	margin-top: 1rem;
}

.alert.success {
	background-color: #e6f4ea;
	color: #1e7e34;
}

.alert.danger {
	background-color: #f8d7da;
	color: #842029;
}
</style>
