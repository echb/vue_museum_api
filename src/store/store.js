import { reactive } from "@vue/reactivity";

const data = reactive({
  searchUrlByNameOrCulture: 'https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=',
  searchResultById: 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'
})

export default {
  data
}