<template>
  <div class="filter">
    <form action="">
      <input type="text" v-model="query_str" placeholder="Search repositories..." @input="filter" style="grid-area: 1/1/1/3;">
      <select v-model="type" @change="filter">
        <option selected disabled>Type</option>
        <option value="">All</option>
        <option v-for="(item, i) in types" :key="i" :value="item">{{item}}</option>
      </select>
      <select v-model="language" @change="filter">
        <option selected disabled>Language</option>
        <option value="">All</option>
        <option v-for="(language, i) in languages" :key="i" :value="language">{{language}}</option>
      </select>
    </form>
    <div v-show="query_str.trim().length || type || language" class="filter-text">
      <p>
        <span><strong>{{filteredRepos.length}}</strong> results for</span>
        <span v-show="type"><strong>{{type}}</strong></span>
        <span>repositories</span>
        <span v-show="query_str">matching <strong>{{query_str}}</strong></span>
        <span v-show="language">written in <strong>{{language}}</strong></span>
      </p>
      <p>
        <a @click="clearFilter">Clear filter</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepoFilter',
  data () {
    return {
      query_str: '',
      type: '',
      language: '',
      types: ['Sources', 'Forks', 'Archived', 'Mirror'],
      languages: ['CSS', 'JavaScript']
    }
  },
  computed: {
    filteredRepos () {
      return this.$store.getters.filteredRepos
    }
  },
  mounted () {
    this.$bus.$on('repos', () => {
      this.filter()
    })
  },
  methods: {
    filter () {
      this.$store.commit('filter', {
        string: this.query_str,
        type: this.type,
        language: this.language
      })
    },
    clearFilter () {
      this.query_str = ''
      this.type = ''
      this.language = ''
      this.filter()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filter {
  padding: 0 16px;
}
form {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 1fr 1fr;
  padding-bottom: 16px;
}
input, select {
  padding: 8px;
}
.filter-text {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 32px;
  border-top: 1px solid #eaecef;
}
@media screen and (min-width: 425px) {
  form {
    grid-auto-flow: column;
  }
}
@media screen and (min-width: 768px) {
  .filter {
    padding: 0;
  }
}
</style>
