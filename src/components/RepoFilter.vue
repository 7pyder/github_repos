<template>
  <div class="filter">
    <form action="">
      <input type="text" v-model="query_str" placeholder="Search repositories..." @input="filter" style="grid-area: 1/1/1/3;">
      <div class="filter-section">
        <button type="button" class="btn select-menu-btn" @click.stop="toggleType">Type: <strong>{{type}}</strong></button>
        <div @click="selectType" class="select-menu-modal type" v-show="typeOpt">
          <span @click.stop="1" class="select-menu-header"><strong>Select type:</strong> <i @click.stop="toggleType" class="fa fa-times close-select-menu"></i></span>
          <span v-bind:class="{selected: type === item}" v-for="(item, i) in types" :key="i" :data-type="item" class="select-menu-item">{{item}}</span>
        </div>
      </div>
      <div class="filter-section">
        <button type="button" class="btn select-menu-btn" @click.stop="toggleLang">Language: <strong>{{language}}</strong></button>
        <div @click="selectLanguage" class="select-menu-modal" v-show="langOpt">
          <span @click.stop="1" class="select-menu-header"><strong>Select language:</strong> <i @click.stop="toggleLang" class="fa fa-times close-select-menu"></i></span>
          <span v-bind:class="{selected: language === item}" v-for="(item, i) in languages" :key="i" :data-language="item" class="select-menu-item">{{item}}</span>
        </div>
      </div>
    </form>
    <div v-show="query_str.trim().length || type != 'All' || language != 'All'" class="filter-text">
      <p>
        <span><strong>{{filteredRepos.length}}</strong> results for</span>
        <span v-show="type != 'All'"><strong>{{type}}</strong></span>
        <span>repositories</span>
        <span v-show="query_str">matching <strong>{{query_str}}</strong></span>
        <span v-show="language != 'All'">written in <strong>{{language}}</strong></span>
      </p>
      <p>
        <a @click="clearFilter" class="clear-filter"><i class="fa fa-window-close" aria-hidden="true"></i>Clear filter</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepoFilter',
  data () {
    return {
      typeOpt: false,
      langOpt: false,
      query_str: '',
      type: 'All',
      language: 'All',
      types: ['All', 'Sources', 'Forks', 'Archived', 'Mirror'],
      languages: ['All', 'CSS', 'JavaScript']
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
    document.addEventListener('click', () => {
      this.typeOpt = this.langOpt = false
    })

  },
  watch: {
    type: 'filter',
    language: 'filter',
  },
  methods: {
    toggleType () {
      this.langOpt = false
      this.typeOpt = !this.typeOpt
    },
    toggleLang () {
      this.typeOpt = false
      this.langOpt = !this.langOpt
    },
    selectType (event) {
      this.type = event.target.dataset.type
    },
    selectLanguage (event) {
      this.language = event.target.dataset.language
    },
    filter () {
      this.$store.commit('filter', {
        string: this.query_str,
        type: this.type,
        language: this.language
      })
    },
    clearFilter () {
      this.query_str = ''
      this.type = 'All'
      this.language = 'All'
    }
  }
}
</script>

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
input {
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid rgba(27,31,35,0.2);
  padding: 8px;
  height: 34px;
}
.select-menu-btn {
  width: 100%;
}
.select-menu-modal {
  margin-top: 4px;
  position: absolute;
  right: 0;
  z-index: 1;
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid rgba(27,31,35,0.15);
  box-shadow: 0 3px 12px rgba(27,31,35,0.15);
}
.select-menu-header {
  padding: 8px;
  background: #f6f8fa;
  display: block;
}
.select-menu-btn::after {
  display: inline-block;
  width: 0;
  height: 0;
  vertical-align: -2px;
  content: "";
  margin-left: 4px;
  border: 4px solid;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
}
.select-menu-item.selected::before {
  content: '✔️';
  position: absolute;
  left: 8px;
  bottom: 8px;
}
.select-menu-item:hover {
  color: #fff;
  background-color: #0366d6;
}
.select-menu-item {
  display: block;
  padding:  9px 9px 9px 30px;
  min-width: 228px;
  border-top: 1px solid #eaecef;
  position: relative;
}
.filter-section {
  position: relative;
}
.close-select-menu {
  float: right;
  color: #c6cbd1;
  cursor: pointer;
}
.close-select-menu:hover {
  color: #444d56;
}
.filter-text {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 32px;
  border-top: 1px solid #eaecef;
}
.clear-filter {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}
.clear-filter i {
  font-size: 20px;
  margin-right: 8px;
  vertical-align: middle;
}
.clear-filter:hover {
  color: #0366d6;
}
@media (min-width: 425px) {
  form {
    grid-auto-flow: column;
  }
}
@media (min-width: 768px) {
  .filter {
    padding: 0;
  }
}
@media (max-width: 424px) {
  .select-menu-modal.type {
    left: 0;
    right: auto;
  }
}
</style>
