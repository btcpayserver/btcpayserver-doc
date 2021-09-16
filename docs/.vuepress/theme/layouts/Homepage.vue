
<template>
  <main
    class="homepage"
    aria-labelledby="main-title"
  >
    <header class="hero">
      <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        :alt="data.heroAlt || $title"
      >
      <button type="button" class="btcpay-theme-switch" @click="toggleColorMode($event)">
        <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
          <path class="btcpay-theme-switch-dark" transform="translate(1 1)" d="M2.72 0A3.988 3.988 0 000 3.78c0 2.21 1.79 4 4 4 1.76 0 3.25-1.14 3.78-2.72-.4.13-.83.22-1.28.22-2.21 0-4-1.79-4-4 0-.45.08-.88.22-1.28z"/><path class="btcpay-theme-switch-light" transform="translate(1 1)" d="M4 0c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5S4.28 0 4 0zM1.5 1c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm5 0c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM4 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM.5 3.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm7 0c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM1.5 6c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm5 0c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM4 7c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5S4.28 7 4 7z"/>
        </svg>
      </button>

      <div>
        <h1
          v-if="data.heroText !== null"
          id="main-title"
        >
          {{ data.heroText || $title }}
        </h1>

        <p
          v-if="data.tagline !== null"
          class="description"
        >
          {{ data.tagline || $description }}
        </p>
      </div>
    </header>

    <AlgoliaSearchBox
      v-if="isAlgoliaSearch"
      :options="algolia"
    />
    <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />

    <div
      v-if="data.features && data.features.length"
      class="features"
    >
      <div
        v-for="(feature, index) in data.features"
        :key="index"
        class="feature"
      >
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
        <NavLink
          v-if="feature.actionLink"
          class="action-button"
          :item="{ link: feature.actionLink, text: feature.actionText }"
        />
      </div>
    </div>

    <Content class="theme-default-content custom" />

    <div
      v-if="data.footer"
      class="footer"
    >
      {{ data.footer }}
    </div>
  </main>
</template>

<script>
// forked from https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/theme-default/components/Home.vue
import NavLink from '@theme/components/NavLink.vue'
import AlgoliaSearchBox from '@theme/components/AlgoliaSearchBox.vue'
import SearchBox from '@vuepress/plugin-search/SearchBox.vue'
import { toggleColorMode } from '../../themeSwitch'

export default {
  name: 'Home',

  components: {
    NavLink,
    AlgoliaSearchBox,
    SearchBox
  },

  computed: {
    data () {
      return this.$page.frontmatter
    },
    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    },
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },
    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  },

  methods: {
    toggleColorMode
  }
}
</script>

<style lang="stylus">
.homepage
  max-width $homePageWidth
  margin 0px auto
  display block
  padding  1rem
  .hero
    padding 3rem 1rem
    display flex
    align-items center
    justify-content center
    position relative
    text-align center
    img
      max-width 100%
      max-height 100px
      min-height 60px
      margin-right 2.5rem
    h1
      margin 0 auto
      font-size 2.5rem
    .description
      font-size 1.25rem
      margin .5rem auto 0
      line-height 1.3
      color var(--btcpay-secondary)
    .btcpay-theme-switch
      position absolute
      top 1rem
      right 1rem
  h3
    color var(--btcpay-secondary)
    font-weight var(--btcpay-font-weight-normal)
  .action-button
    display inline-block
    font-size 1.2rem
    color #fff
    background-color var(--btcpay-primary)
    padding 0.8rem 1.6rem
    border-radius 4px
    transition background-color .1s ease
    box-sizing border-box
    border-bottom 1px solid var(--btcpay-body-border-medium)
    &:focus,
    &:hover
      background-color var(--btcpay-primary-accent)
  #search-form
    display block
    width 80%
    max-width 500px
    margin 0 auto
  #search-form.search-box
    width 100%
    margin 0 auto
  #search-form.search-box .algolia-autocomplete
    display block !important
  #search-form.search-box .algolia-autocomplete .ds-dropdown-menu
    position static !important
    margin-top 1rem
    max-width none
  #search-form.search-box input
    position relative
    font-size 1.4rem !important
    display block
    width 100%
    height 3.5rem
    color var(--btcpay-body-text)
    border-color var(--btcpay-body-border-medium)
    background-size 1.4rem
    background-position 1.2rem 50%
    background-color var(--btcpay-header-bg) !important
    padding-left 3.25rem
  .features
    margin-top 2.5rem
    margin-bottom 2.5rem
    display flex
    flex-wrap wrap
    justify-content center
  .feature
    flex 0 0 250px
    text-align center
    padding 2rem 1rem
    h2
      font-size 1.4rem
      font-weight var(--btcpay-font-weight-normal)
      border-bottom none
      margin-top 0
      padding-bottom 0
      color var(--btcpay-secondary)
    .action-button
      display inline-block
      width 250px
  .topics
    text-align center
    margin-bottom 4rem
    ul
      list-style none
      display flex
      flex-wrap wrap
      justify-content center
      padding 0
    li
      flex 0 0 282px
      text-align center
      padding 1rem
    a
      display flex
      align-items center
      justify-content center
      width 100%
      height 5.5em
      border 1px solid var(--btcpay-body-border-medium)
      border-radius var(--btcpay-border-radius)
      padding 1rem
      color var(--btcpay-body-text)
      background-color var(--btcpay-bg-tile)
      &:focus,
      &:hover
        color var(--btcpay-primary)
        border-color var(--btcpay-primary)
  .footer
    padding 2.5rem
    border-top 1px solid var(--btcpay-body-border-medium)
    text-align center
    color var(--btcpay-body-text-muted)
@media (max-width: $MQMobile)
  .homepage
    .hero
      img
        margin-right 1.6rem
      h1
        font-size 1.6rem
      .description
        font-size 1rem
    .features
      flex-direction column
    .feature,
    .topics div a
      flex 1 1 40%
@media (max-width: $MQMobileNarrow)
  .homepage
    .hero
      h1
        font-size 1.6rem
      img
        margin-right 0
      .description
        display none
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
    .topics div a
      flex 1 1 100%
</style>
