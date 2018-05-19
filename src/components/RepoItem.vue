<template>
  <div class="repo">
    <h3><a v-bind:href="repo.html_url" class="repo-name">{{repo.name}}</a></h3>
    <p v-if="repo.description">{{repo.description}}</p>
    <p class="meta">
      <span v-if="repo.language"><span class="lang" v-bind:class="{css: repo.language === 'CSS', js: repo.language === 'JavaScript'}"></span> {{repo.language}}</span>
      <span v-if="repo.stargazers_count"><i class="fa fa-star" aria-hidden="true"></i> {{repo.stargazers_count}}</span>
      <span v-if="repo.fork"><i class="fa fa-code-fork" aria-hidden="true"></i></span>
      <span v-if="repo.license && repo.license.key !== 'other'" style="text-transform: uppercase"><i class="fa fa-balance-scale" aria-hidden="true"></i> {{repo.license.key}}</span>
      <span>{{repo.pushed_at | date}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'RepoItem',
  props: [ 'repo' ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin-top: 0;
}
.repo {
  padding: 20px 0;
  display: block;
  border-top: 1px solid #eaecef;
}
.repo-name {
  font-size: 20px;
}
.meta {
  display: block;
  font-size: 12px;
  margin-bottom: 0;
}
.meta span + span {
  margin-left: 16px;
}
.lang {
  position: relative;
  top: 1px;
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.css {
  background-color: #563d7c;
}
.js {
  background-color: #f1e05a;
}
</style>
