<script setup lang="ts">
import HomeView from './view/HomeView.vue'
</script>

<template>
  <div id="app">
    <header>
      <md-toolbar class="md-large wm-toolbar" md-elevation="0">
        <div class="md-toolbar-row">
          <h1><md-icon class="md-size-2x">movie</md-icon> WEISS MOVIES</h1>
        </div>
      </md-toolbar>
    </header>

    <main>
      <HomeView></HomeView>
    </main>
  </div>
</template>

<style>
body {
  background-color: #424242;
}

.md-toolbar-row {
  align-self: center;
}
</style>
