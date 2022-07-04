<template>
  <div class="post">
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
      content: "",
      toolbarOptions: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["clean"], // remove formatting button
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
