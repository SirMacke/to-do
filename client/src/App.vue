<template>
  <nav>
    <router-link to="/">
      <div class="navigation__logo">
        To Do
      </div>
    </router-link>
    <div class="navigation__user" v-if="user">
      {{ user.username }}
    </div>
  </nav>
  <router-view/>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'App',
  setup() {
    const store = useStore();
    const user = computed(() => store.state.User.user);

    return {
      user
    }
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

#app
  font-family: Lato
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  min-height: 100vh
  background-color: #F3F5FA

  nav
    display: flex
    align-items: center
    justify-content: space-between
    padding: 15px 5%
    background-color: #1892FF
    color: white

    .navigation__logo
      font-weight: bold
      font-size: 24px

    .navigation__user
      font-weight: bold
</style>
