<template>
  <form @submit.prevent="createNewTask">
    <input type="text" v-model="state.description" placeholder="To Do Task..."/>
    <button>Add</button>
  </form>
  <div>
    <div v-for="(task, index) in state.tasks" :key="index">
      <!--<input v-if="isSelected(task)" v-model="editedDescription" />-->
      <p>
        <span>{{ index + 1}}</span>
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

    //const isButtonDisabled = computed(() => { return state.description.length > 0 });

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
      //isButtonDisabled,
      createNewTask
    }
  }
};
</script>

<style lang="sass" scoped>
.bottom-link
  a
    position: absolute
    bottom: 30px
    color: #333333
    font-size: 1.1em
    width: auto

  #log-out
    right: 35px
</style>