<template>
  <div class="news">
    <h3>News</h3>
    <div class="search">
      <input
        type="text"
        class="search__input"
        v-model="textInput"
        placeholder="Enter news title"
        v-on:keyup.enter="search"
      />
      <button
        :class="['search__btn', textInput ? 'active' : '']"
        :disabled="!textInput"
        @click="search"
      >
        Search
      </button>
    </div>
    <div v-if="error" class="search__error">{{ error }}</div>
    <div class="pagination js-pagination" v-html="pagination_content"></div>
    <div v-if="search_text" class="text__results">
      Results for: <b> {{ search_text }}</b> <br />
      page : <b> {{ page }} </b>
    </div>
    <div v-if="loading" class="loading">
      <div class="loading-main spinner"></div>
    </div>
    <div v-if="!loading" class="article__list">
      <div v-for="a in articles" :key="a" class="article__item">
        <div class="article__img">
          <img
            :src="a.media || 'https://source.unsplash.com/random'"
            @error="imageError(this)"
            alt=""
          />
        </div>
        <div class="article__content">
          <div class="article__title">
            {{ a.title }}
          </div>
          <div class="article__author">{{ a.author || a.twitter_account }}</div>
          <div class="article__time">{{ a.published_date }}</div>
          <a target="_blank" :href="a.link" class="article__view">Views...</a>
          <div class="article__copy" @click="copy(a.link)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const API_KEY = "K_QzyX7LTDtTiKZ0b0CGC7sHRVPJ0yiAG2JU5sV-eF0";
const URL = `https://api.newscatcherapi.com/v2/search?q=`;
export default {
  name: "PageNews",
  data() {
    return {
      textInput: "",
      articles: [],
      loading: false,
      page: 1,
      total_pages: 0,
      pagination_content: "",
      search_text: "",
      first_search: false,
      error: "",
    };
  },
  methods: {
    imageError: function (image) {
      image.onerror = "";
      image.src = "https://source.unsplash.com/random";
      return true;
    },
    search: async function () {
      this.page = 1;
      if (!this.first_search) {
        this.eventClickPage();
      }
      this.first_search = true;
      this.fetch(URL + this.textInput);
      this.search_text = this.textInput;
    },
    fetch: async function (url) {
      this.loading = true;
      try {
        let response = await axios.get(url, {
          headers: {
            ["x-api-key"]: API_KEY,
          },
        });
        this.articles = response.data.articles;
        this.page = response.data.page;
        this.total_pages = response.data.total_pages;
        this.pagination();
        this.error = "";
      } catch (e) {
        this.error = e.response.data.error_code;
      }
      this.loading = false;
    },
    changePage: function (page) {
      let pageSearch = 0;
      if (page === -1) {
        pageSearch = this.page === 1 ? 1 : this.page - 1;
      } else if (page === -2) {
        pageSearch =
          this.page === this.total_pages ? this.total_pages : this.page + 1;
      } else {
        pageSearch = page;
      }
      this.fetch(URL + this.search_text + "&page=" + pageSearch);
    },
    eventClickPage: function () {
      let main = document.querySelector(".js-pagination");
      main.addEventListener(
        "click",
        function (e) {
          if (e.target.classList.contains("pagination__item")) {
            let page = e.target.getAttribute("data");
            this.changePage(+page);
          }
        }.bind(this)
      );
    },
    pagination: function () {
      let content = "";
      content += `<div class="pagination__item pagination__prev" data="-1">Prev</div>`;
      if (this.total_pages < 10) {
        for (let i = 1; i < this.total_pages; i++) {
          content += `<div class="pagination__item pagination__page" data="${i}">${i}</div>`;
        }
        content += `<div class="pagination__item pagination__next" data="${-2}">Next</div>`;
        this.pagination_content = content;
        return;
      }

      for (let i = 1; i <= 3; i++) {
        content += `<div data="${i}" class="pagination__item pagination__page ${
          i === this.page && "active"
        }">${i}</div>`;
      }

      if (this.page < 3 || this.page > this.total_pages - 3) {
        content += `<div> . . . . </div>`;
      } else {
        if (this.page < 6) {
          for (let i = 4; i <= 6; i++) {
            content += `<div data="${i}" class="pagination__item pagination__page ${
              i === this.page && "active"
            }">${i}</div>`;
          }
          content += `<div> . . . . </div>`;
        } else if (this.page > this.total_pages - 6) {
          content += `<div> . . . . </div>`;
          for (let i = this.total_pages - 6; i <= this.total_pages - 4; i++) {
            content += `<div data="${i}" class="pagination__item pagination__page ${
              i === this.page && "active"
            }">${i}</div>`;
          }
        } else {
          content += `<div> . . . . </div>`;
          for (let i = this.page - 1; i <= this.page + 1; i++) {
            content += `<div data="${i}" class="pagination__item pagination__page ${
              i === this.page && "active"
            }">${i}</div>`;
          }
          content += `<div> . . . . </div>`;
        }
      }

      for (let i = this.total_pages - 3; i <= this.total_pages; i++) {
        content += `<div data="${i}" class="pagination__item pagination__page ${
          i === this.page && "active"
        }">${i}</div>`;
      }
      content += `<div class="pagination__item pagination__next" data="${-2}">Next</div>`;
      this.pagination_content = content;
    },
    copy: function (link) {
      navigator.clipboard.writeText(link);
      this.$moshaToast(
        {
          title: "Copied",
          description: "Article link was copied to clipboard",
        },
        { type: "info", timeout: 2000 }
      );
    },
  },
};
</script>

<style>
@import "../assets/css/news.scss";
</style>
