<template>
  <main>
    <form @submit.prevent="createNewTask">
      <input type="text" v-model="state.description" placeholder="To Do Task..."/>
      <button :disabled="!isButtonDisabled">Add</button>
    </form>
    <div id="to-do-item__container">
      <div class="to-do-item" v-for="(task, index) in state.tasks" :key="index">
        <!--<input v-if="isSelected(task)" v-model="editedDescription" />-->
        <p>
          <span>{{ index + 1}}.</span>
          {{ task }}
        </p>
        <!--<div>
          <span @click="isSelected(task) ?  unselect() : select(task)">
            <i>{{isSelected(task) ? 'close': 'edit'}}</i>
          </span>

          <span @click="isSelected(task) ? updateTask(task, index) : removeTask(task, index)">
            <i>{{ isSelected(task) ? 'save': 'delete' }}</i>
          </span>
        </div>-->
      </div>
    </div>
  </main>
  <router-link to="/" class="bottom-link">
    <a id="log-out">Log out</a>
  </router-link>
</template>

<script>
import axios from "axios";
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: "App",
  setup() {
    const storeData = useStore();

    const state = reactive({
      tasks: [],
      description: "",
      editedDescription: "",
      selected: {}
    });

    state.tasks = computed(() => storeData.state.User.user.tasks);

    const isButtonDisabled = computed(() => { return state.description.length > 0 });

    async function createNewTask() {
      const response = await axios.put("/api/home", {
        auth: storeData.state.User.user.auth,
        description: state.description
      });
      state.tasks.push(response.data);
      state.description = "";
    }

    /*async function removeTask(task, index) {
      await axios.delete("/api/home" + index);
      state.tasks.splice(index, 1);
    }

    function select(task) {
      state.selected = task;
      state.editedDescription = task.description;
    }

    function isSelected(task) {
      return item._id === state.selected._id;
    },
    unselect() {
      this.selected = {};
      this.editedDescription = "";
    },
    async updateItem(item, i) {
      const response = await axios.put("api/bucketListItems/" + item._id, {
        description: this.editedDescription
      });
      this.tasks[i] = response.data;
      this.unselect();
    }*/

    return {
      state,
      isButtonDisabled,
      createNewTask
    }
  }
};
</script>

<style lang="sass" scoped>
main
  position: absolute
  width: 50vw
  height: 80vh
  top: 110px
  left: 50%
  transform: translateX(-50%)
  background-color: white
  border-radius: 10px

  form
    position: relative
    width: 92.5%
    left: 50%
    transform: translateX(-50%)
    display: flex
    height: 85px

    input
      position: absolute
      width: 80%
      height: 40px
      top: 50%
      left: 0px
      transform: translateY(-50%)
      font-family: Lato
      font-size: 1em
      border-radius: 5px
      border: 2px solid #1892FF
      color: black
      padding-left: 12.5px

      &::placeholder
        color: rgba(16, 16, 16, 0.5)

      &:focus
        outline: none

    button
      position: absolute
      width: 16%
      height: 45px
      right: 0px
      top: 50%
      -webkit-transform: translateY(-50%)
      transform: translateY(-50%)
      text-align: center
      font-family: Lato
      font-size: 1.25em
      background: none
      border: 2px solid #1892FF
      border-radius: 5px

      &:hover
        cursor: pointer
        -webkit-animation-name: formButton
        animation-name: formButton
        -webkit-animation-duration: .5s
        animation-duration: .5s
        background: #1892FF
        color: white

      &:focus
        outline: none

      @-webkit-keyframes formButton
        0%
          background: none
        100%
          background: #1892FF

      @keyframes formButton
        0%
          background: none
        100%
          background: #1892FF

  #to-do-item__container
    position: relative
    width: 92.5%
    left: 50%
    transform: translateX(-50%)
    display: flex
    flex-direction: column
    height: 85%
    overflow-y: scroll

    &::-webkit-scrollbar
      display: none

    .to-do-item
      position: relative
      height: 50px
      background-color: #F3F5FA
      margin-bottom: 10px
      border-radius: 5px

      p
        margin-left: 15px

.bottom-link
  a
    position: fixed
    bottom: 30px
    color: #333333
    font-size: 1.1em
    width: auto

  #log-out
    right: 35px
</style>