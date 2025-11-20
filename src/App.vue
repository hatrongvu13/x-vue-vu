<template>
  <Navbar />
  <router-view />
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: Arial, sans-serif;
  background: #f4f6f9;
}
</style>
