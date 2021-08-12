<template>
	<img alt="Vue logo" src="./assets/logo.png" />
	<button @click="viewMuseum">view museum</button>
	<Art v-if="views.museum" />
</template>

<script>
import { provide, reactive } from "@vue/runtime-core";
import Art from "./components/Art/Art.vue";
import store from "./store/store.js";

export default {
	name: "App",
	components: {
		Art,
	},
	setup() {
		provide("store", store);
		const views = reactive({
			museum: false,
		});

		const viewMuseum = () => {
			views.museum = !views.museum;
		};
		return { views, viewMuseum };
	},
};
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
