<template>
  <div id="app">
    <RepoTabs/>
    <Info/>
    <div>
      <RepoFilter/>
      <RepoList/>
    </div>
  </div>
</template>

<script>
import RepoTabs from './components/RepoTabs.vue'
import Info from './components/Info.vue'
import RepoFilter from './components/RepoFilter.vue'
import RepoList from './components/RepoList.vue'

export default {
  name: 'app',
  components: {
    RepoTabs,
    Info,
    RepoFilter,
    RepoList
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #24292e;
  font-size: 14px;
  display: grid;
  grid-gap: 16px;
  grid-template-rows: 50px auto;
  max-width: 1024px;
  margin: 0 auto;
}
.container {
  padding: 16px;
}
.block {
  display: block;
}
a {
  text-decoration: none;
  color: #0366d6;
}
a:hover {
  text-decoration: underline;
}
@media screen and (min-width: 768px) {
  #app {
    grid-template-columns: auto 1fr;
    grid-gap: 18px;
    padding: 18px;
  }
}
@media screen and (min-width: 1024px) {
  #app {
    grid-template-columns: auto 1fr;
    grid-column-gap: 32px;
    padding: 32px;
  }
}
</style>
