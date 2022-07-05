<template>
  <div class="todoapp">
    <div class="container">
      <h3>TodoApp</h3>
      <div class="head">
        <input type="text"  v-on:keyup.enter="saveTodo" v-model="textInput" placeholder="Add new todo. Ex: do homework..." />
        <button :class="textInput ? '' : 'disabled'" :disabled="!textInput" @click="saveTodo()" >
          {{ type }}
        </button>
      </div>
      <Transition name="ballmove">
        <div name="todos"  class="todolist" >
          <div v-for="(todo, index) in todos" :key="index" :v-items="todo" :class="todo.status == 'done' ? 'todo done' : 'todo'" >
            <div class="content">{{ todo.text }}</div>
            <button :disabled="todo.status == 'done'" class="btn-edit" @click="editTodo(todo.id)"> Edit </button>
            <button :disabled="todo.status == 'done'" class="btn-delete" @click="deleteTodo(todo.id)"> Delete </button>
            <button class="btn-done" @click="doneTodo(todo.id)"> {{ todo.status !== "done" ? "Done" : "Undo" }} </button>
            <div class="move">
              <button :disabled="index == 0" class="up" @click="move(todo.id, -1)">
                <ion-icon name="caret-up-outline"></ion-icon>
              </button>
              <button :disabled="index == todos.length - 1" class="down" @click="move(todo.id, 1)">
                <ion-icon name="caret-down-outline"></ion-icon>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
const LOCALSTORAGE_NAME = "abjasdasd";
const ADD_TYPE = "add";
const EDIT_TYPE = "save";
export default {
  name: "TodoApp",
  data() {
    return {
      textInput: "",
      todos: [],
      type: ADD_TYPE,
      idEdit: "",
    };
  },
  methods: {
    saveToLocalStorage: function () {
      window.localStorage.setItem(
        LOCALSTORAGE_NAME,
        JSON.stringify(this.todos)
      );
    },
    saveTodo: function () {
      if(!this.textInput) return;

      if (this.type === ADD_TYPE) {
        this.todos.push({
          id: Math.random(),
          text: this.textInput.trim(),
          order: this.todos.length,
          status: "in progress",
        });
      }
      if (this.type === EDIT_TYPE) {
        this.todos = this.todos.map((todo) => {
          return {
            ...todo,
            text: todo.id == this.idEdit ? this.textInput : todo.text,
          };
        });
      }
      this.type = ADD_TYPE;
      this.textInput = "";
      this.saveToLocalStorage();
    },
    deleteTodo: function (id) {
      this.todos = this.todos
        .filter((todo) => todo.id != id)
        .map((t, index) => {
          return { ...t, order: index };
        });
      this.saveToLocalStorage();
    },
    doneTodo: function (id) {
      this.todos = this.todos.map((todo) => {
        return {
          ...todo,
          status: todo.id === id ? todo.status == "done" ? "" : "done" : todo.status,
        };
      });
      this.saveToLocalStorage();
    },
    editTodo: function (id) {
      this.type = EDIT_TYPE;
      this.textInput =
        this.todos.filter((todo) => todo.id === id)[0].text || "";
      this.idEdit = id;
      this.saveToLocalStorage();
    },
    move: function (id, type = 1) {
      let cloneTodos = [...this.todos];
      let todo = this.todos.filter((todo) => todo.id == id)[0];
      let order = todo.order;
      cloneTodos[order].order = order + type;
      cloneTodos[order + type].order = order;
      cloneTodos.sort((a, b) => a.order - b.order);
      this.todos = cloneTodos;
      this.saveToLocalStorage();
    }
  },
  beforeMount() {
    try {
      this.todos = JSON.parse(
        window.localStorage.getItem(LOCALSTORAGE_NAME) || []
      );
    } catch (error) {
      this.todos = [];
    }
  },
};
</script>

<style>
@import "../assets/css/todoapp.scss";
</style>
