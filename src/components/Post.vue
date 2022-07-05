<template>
  <div class="post">
    <Datepicker v-model="date"></Datepicker>
    <quill-editor
      :toolbar="toolbarOptions"
      @textChange="textChange"
      theme="snow"
      placeholder="Enter your thinking..."
    />
    <div class="ql-editor" v-html="content"></div>
  </div>
</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      date: null,
      content: "",
      toolbarOptions: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["clean"],
        ["image"],
      ],
    };
  },
  methods: {
    textChange: function () {
      this.content = document.querySelector(".ql-editor").innerHTML;
    },
  },
};
</script>

<style>
@import "../assets/css/post.scss";
</style>
