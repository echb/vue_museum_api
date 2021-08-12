<template>
	<div ref="scrollMuseum">
		<form action="">
			<input type="text" v-model="retriveData.searchTextBox" />
			<button @click.prevent="makeSearch" type="submit">search</button>
		</form>
		<div>
			<ul>
				<li
					v-for="result in retriveData.slicedResultsToShow"
					:key="result"
				>
					<img :src="result.primaryImageSmall" alt="" />
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import {
	inject,
	onMounted,
	onUnmounted,
	reactive,
	ref,
} from "@vue/runtime-core";

export default {
	setup() {
		const retriveData = reactive({
			store: inject("store"),
			searchedResults: undefined,
			searchTextBox: "",
			loadMoreFrom: 0,
			loadMoreTo: 5,
			loadMoreValue: 5,
			slicedResultsSlicedToAddToShow: [],
			slicedResultsToShow: [],
		});

		const makeSearch = () => {
			fetch(
				retriveData.store.data.searchUrlByNameOrCulture +
					retriveData.searchTextBox
			)
				.then((response) => response.json())
				.then((data) => {
					retriveData.searchedResults = data;
				})
				.then(() => {
					restartSearchValues();
					sliceResults();
				});
		};

		const results = () => {
			retriveData.slicedResultsSlicedToAddToShow.map((item) => {
				fetch(retriveData.store.data.searchResultById + item)
					.then((response) => response.json())
					.then((data) => {
						retriveData.slicedResultsToShow.push(data);
					});
			});
		};

		const sliceResults = () => {
			retriveData.slicedResultsSlicedToAddToShow =
				retriveData.searchedResults.objectIDs.slice(
					retriveData.loadMoreFrom,
					retriveData.loadMoreTo
				);
			results();
		};

		const loadMore = () => {
			(retriveData.loadMoreFrom += retriveData.loadMoreValue),
				(retriveData.loadMoreTo += retriveData.loadMoreValue);
			sliceResults();
		};

		const restartSearchValues = () => {
			retriveData.searchTextBox = "";
			retriveData.loadMoreFrom = 0;
			retriveData.loadMoreTo = 5;
			retriveData.loadMoreValue = 5;
			retriveData.slicedResultsSlicedToAddToShow = [];
			retriveData.slicedResultsToShow = [];
		};

		const scrollMuseum = ref(null);
		onMounted(() => {
			window.addEventListener("scroll", loadMoreArts);
		});
		onUnmounted(() => {
			window.removeEventListener("scroll", loadMoreArts);
		});
		const loadMoreArts = () => {
			let element = scrollMuseum.value;
			if (element.getBoundingClientRect().bottom <= window.innerHeight) {
				return loadMore();
			}
		};

		return { makeSearch, retriveData, scrollMuseum };
	},
};
</script>

<style>
li {
	list-style: numbers;
}
</style>