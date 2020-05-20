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

      <p
        v-if="data.actionText && data.actionLink"
        class="action"
      >
        <NavLink
          class="action-button"
          :item="actionLink"
        />
      </p>
    </header>

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

export default {
  name: 'Home',

  components: { NavLink },

  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>

<style lang="stylus">
.homepage
  padding $navbarHeight 2rem 0
  max-width $homePageWidth
  margin 0px auto
  display block
  .hero
    text-align center
    img
      max-width: 100%
      max-height 140px
      display block
      margin 3rem auto 1.5rem
    h1
      font-size 3rem
    h1, .description, .action
      margin 1.8rem auto
    .description
      max-width 35rem
      font-size 1.6rem
      line-height 1.3
      color var(--btcpay-color-secondary)
  .action-button
    display inline-block
    font-size 1.2rem
    color #fff
    background-color var(--btcpay-color-primary)
    padding 0.8rem 1.6rem
    border-radius 4px
    transition background-color .1s ease
    box-sizing border-box
    border-bottom 1px solid var(--btcpay-border-color-medium)
    &:focus,
    &:hover
      background-color var(--btcpay-color-primary-accent)
  .features
    border-top 1px solid var(--btcpay-border-color-medium)
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    justify-content center
  .feature
    flex 1 1 50%
    text-align center
    padding 2rem 1rem
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      margin-top 0
      padding-bottom 0
      color var(--btcpay-color-secondary)
  .footer
    padding 2.5rem
    border-top 1px solid var(--btcpay-border-color-medium)
    text-align center
    color var(--btcpay-footer-color)

@media (max-width: $MQMobile)
  .homepage
    .features
      flex-direction column
    .feature
      flex 1 1 100%

@media (max-width: $MQMobileNarrow)
  .homepage
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
</style>
