<template>
  <div class="info">
    <img :src="user.avatar_url" alt="avatar" class="avatar">
    <h1 class="title">
      <span class="block">{{user.name}}</span>
      <span class="block login-name">{{user.login}}</span>
    </h1>
    <div class="bio">
      <p style="font-size: 14px;">{{user.bio}}</p>
      <button class="btn"><strong>Edit bio</strong></button>
    </div>
    <ul class="contact">
      <span class="block"><i class="fa fa-users" aria-hidden="true"></i>{{user.company}}</span>
      <span class="block"><i class="fa fa-map-marker" aria-hidden="true"></i>{{user.location}}</span>
      <span class="block" v-if="user.email"><i class="fa fa-envelope-o" aria-hidden="true"></i>{{user.email}}</span>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Info',
  mounted () {
    this.fetchUser()
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    fetchUser () {
      fetch('https://api.github.com/users/supreetsingh247')
        .then(res => res.json())
        .then(user => {
          this.$store.commit('setUser', user)
        })
        .catch(() => alert('Could not fetch user data'))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info {
  display: grid;
  grid-template-columns: 110px 1fr;
  grid-column-gap: 16px;
  align-content: start;
  padding: 0 16px;
}
.avatar {
  border-radius: 6px;
  grid-area: 1/1/3/2;
  width: 110px;
  height: 110px;
  margin-bottom: 16px;
}
.title {
  grid-area: 1/2/2/3;;
  margin: 0;
  font-size: 20px;
}
.contact {
  grid-area: 2/2/3/3;
  padding-left: 24px;
  margin: 16px 0 0 0;
}
.bio {
  grid-area: 4/1/5/3;
  padding-bottom: 16px;
  border-bottom: 1px #e1e4e8 solid;
}
.login-name {
  font-weight: 300;
  font-size: 0.8em;
}
.contact > span {
  position: relative;
  padding: 4px 0;
}
.contact .fa {
  width: 16px;
  text-align: center;
  position: absolute;
  left: -24px;
}
.btn {
  width: 100%;
  height: 34px;
  background-color: #eff3f6;
  border: 1px solid rgba(27,31,35,0.2);
  border-radius: 4px;
}
@media screen and (min-width: 768px) {
  .info {
    display: grid;
    grid-template-columns: 230px;
    grid-area: 1/1/3/2;
    padding: 0;
  }
  .avatar {
    grid-area: 1/1/2/2;
    width: 230px;
    height: 230px;
  }
  .title {
    grid-area: 2/1/3/2;
    font-size: 24px;
  }
  .contact {
    grid-area: 4/1/5/2;
  }
  .bio {
    grid-area: 3/1/4/2;
  }
}
</style>
