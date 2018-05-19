<template>
  <div class="repos">
    <RepoItem v-for="(repo, i) in filteredRepos" :key="i" :repo="repo"/>
  </div>
</template>

<script>
import RepoItem from './RepoItem.vue'

export default {
  name: 'RepoList',
  components: { RepoItem },
  computed: {
    filteredRepos () {
      return this.$store.getters.filteredRepos
    }
  },
  mounted () {
    this.fetchRepos()
  },
  methods: {
    fetchRepos () {
      fetch('https://api.github.com/users/supreetsingh247/repos')
        .then(res => res.json())
        .then(repos => {
          this.$store.commit('setRepos', repos)
          this.$bus.$emit('repos')
        })
        .catch(err => {
          console.error(err)
          alert('Could not fetch user repositories ')
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.repos {
  padding: 0 16px;
}
@media screen and (min-width: 768px) {
  .repos {
    padding: 0;
  }
}
</style>
