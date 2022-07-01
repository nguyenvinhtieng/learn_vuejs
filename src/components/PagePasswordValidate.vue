<template>
  <div class="password-validate">
    <h3>PagePasswordValidate</h3>
    <div class="main">
      <input v-model="textInput" type="text" placeholder="Enter your password"/>
      <div class="valid__list">
        <div v-for="req in requirements" :key="req.id" :item="req" :class="['valid__item', req.status === 0 && 'error', req.status === 1 && 'success']">
          <span class="valid__item-text">{{ req.text }}</span>
          <span class="valid__item-icon">
            <ion-icon :name="req.status === 1 ? 'checkmark-done-outline' : 'close-outline'"></ion-icon>
          </span>
        </div>
      </div>
      <button @click="submited" class="active">Check</button>
    </div>
  </div>
</template>

<script>

const CASE_1 = 0;
const CASE_2 = 1;
const CASE_3 = 2;
const CASE_4 = 3;

export default {
  name: "PagePasswordValidate",
  data() {
    return {
      textInput: "",
      req4: "` ! @ # $ % ^ & * ( ) _ + - = [ ] { } ; ' : | , . < > / \\ \" ? ~]".split(" "),
      requirements: [
        {
          id: CASE_1,
          text: "At least 8 characters",
          status: -1,
        },
        {
          id: CASE_2,
          text: "A mixture of both uppercase and lowercase letters",
          status: -1,
        },
        {
          id: CASE_3,
          text: "A mixture of letters and numbers ",
          status: -1,
        },
        {
          id: CASE_4,
          text: "Inclusion of at least one special character",
          status: -1,
        },
      ],
    };
  },
  methods: {
    check: function () {
      let text = this.textInput;
      this.requirements = this.requirements.map((item) => {
        return { ...item, status: 0 };
      });
      // req1
      this.requirements[CASE_1].status = text.length < 8 ? 0 : 1;
      // req2
      this.requirements[CASE_2].status = text.toLowerCase() == text || text.toUpperCase() == text ? 0 : 1;
      //req3
      this.requirements[CASE_3].status = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(text) ? 1 : 0;
      // req4
      let hasSpecialChars = false;
      this.req4.forEach((item) => {
        if (text.indexOf(item) !== -1) hasSpecialChars = true;
      });
      this.requirements[CASE_4].status = hasSpecialChars ? 1 : 0;
    },
    submited: function () {
      this.check();
    },
  },
  beforeMount() {},
};

</script>

<style>
@import "../assets/css/passwordval.scss";
</style>
