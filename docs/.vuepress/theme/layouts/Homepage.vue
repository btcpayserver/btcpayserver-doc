
<template>
  <div
    class="theme-container"
    :class="pageClasses"
  >
    <Navbar @toggle-sidebar="toggleSidebar" />

    <Sidebar
      :items="[]"
      @toggle-sidebar="toggleSidebar"
    />

  <main
    class="homepage"
    aria-labelledby="main-title"
  >
    <header class="hero">
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
        <div class="feature-icon">
          <!-- User Guide: open book -->
          <svg v-if="index === 0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            <line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/>
          </svg>
          <!-- Deployment: server -->
          <svg v-else-if="index === 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
            <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
          </svg>
          <!-- Development: code brackets -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
        </div>
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
  </div>
</template>

<script>
// forked from https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/theme-default/components/Home.vue
import Navbar from '@theme/components/Navbar.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import NavLink from '@theme/components/NavLink.vue'
import AlgoliaSearchBox from '@theme/components/AlgoliaSearchBox.vue'
import SearchBox from '@vuepress/plugin-search/SearchBox.vue'

export default {
  name: 'Home',

  components: {
    Navbar,
    Sidebar,
    NavLink,
    AlgoliaSearchBox,
    SearchBox
  },

  data () {
    return {
      isSidebarOpen: false
    }
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
    },
    pageClasses () {
      return [
        {
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': true
        }
      ]
    }
  },

  methods: {
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    }
  }
}
</script>

<style lang="stylus">
.homepage
  max-width $homePageWidth
  margin 0px auto
  display block
  padding $navbarHeight 1rem 1rem
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
  h3
    color var(--btcpay-body-text)
    font-weight var(--btcpay-font-weight-normal)
  .action-button
    display inline-block
    font-size 1rem
    color #fff
    background-color var(--btcpay-primary)
    padding 0.7rem 1.4rem
    border-radius 4px
    transition background-color .1s ease
    box-sizing border-box
    border-bottom 1px solid var(--btcpay-body-border-medium)
    white-space nowrap
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
    margin-top 1rem
    border 1px solid var(--btcpay-body-border-medium)
    border-radius .5rem !important
    max-width 500px !important
    min-width auto !important
    top auto !important
    left auto !important
    right auto !important
    bottom auto !important
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
    gap 1.5rem
  .feature
    flex 0 0 250px
    display flex
    flex-direction column
    align-items center
    text-align center
    padding 2rem 1.5rem
    background-color var(--btcpay-bg-tile)
    border 1px solid var(--btcpay-body-border-medium)
    border-top 3px solid var(--btcpay-primary)
    border-radius var(--btcpay-border-radius)
    transition transform .15s ease, box-shadow .15s ease
    &:hover
      transform translateY(-2px)
      box-shadow 0 4px 16px rgba(0,0,0,.07)
    .feature-icon
      width 40px
      height 40px
      color var(--btcpay-primary)
      margin-bottom 1rem
      svg
        width 100%
        height 100%
    h2
      font-size 1.2rem
      font-weight 600
      border-bottom none
      margin-top 0
      padding-bottom 0
      color var(--btcpay-body-text)
    p
      flex 1
      font-size .95rem
      color var(--btcpay-body-text)
      opacity .7
      margin-bottom 1.25rem
    .action-button
      display inline-block
      width auto
      min-width 160px
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
