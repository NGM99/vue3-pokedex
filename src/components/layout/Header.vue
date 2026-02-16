<script setup>
import pokemonLogo from '../../assets/images/International_Pokémon_logo.svg'
</script>

<template>
  <header class="header">
    <div class="title-group">
      <img
        :src="pokemonLogo"
        alt="Pokémon"
        class="title-logo"
      />
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E53935;
  border-bottom: solid 3px #2C2C2C;
  height: 70px;
}

.title-logo {
  height: 55px;
  object-fit: contain;
}
</style>
