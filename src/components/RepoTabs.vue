<template>
  <nav class="repo-tabs">
    <a>Overview</a>
    <a>Repositories <span class="count">{{user.public_repos}}</span></a>
    <a>Stars</a>
    <a>Followers <span class="count">{{user.followers}}</span></a>
    <a>Following <span class="count">{{user.following}}</span></a>
  </nav>
</template>

<script>

export default {
  name: 'RepoTabs',
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  margin: 0;
  padding: 0;
}
nav {
  display: flex;
  background-color: #24292e;
  max-width: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 0 8px;
}
nav a {
  font-size: 14px;
  display: inline;
  list-style: none;
  padding: 16px 8px;
  cursor: pointer;
  color: rgba(255,255,255,0.75);
  white-space: nowrap;
}
.count {
  background-color: rgba(255,255,255,0.15);
  padding: 2px 5px;
  border-radius: 20px;
}
@media screen and (min-width: 768px) {
  nav {
    background-color: transparent;
    grid-area: 1/2/2/3;
    border-bottom: 1px solid #eaecef;
    padding: 0;
  }
  nav a {
    color: #24292e;
  }
  nav a + a {
    margin-left: 11px;
  }
  .count {
    color: #586069;
    background-color: rgba(27,31,35,0.08);
  }
}
</style>
