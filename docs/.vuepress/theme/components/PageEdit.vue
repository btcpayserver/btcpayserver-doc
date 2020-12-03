<template>
  <footer class="page-edit">
    <div
      v-if="editLink"
      class="edit-link"
    >
      <a
        :href="editLink"
        target="_blank"
        rel="noopener noreferrer"
      >{{ editLinkText }}</a>
      <OutboundLink />
    </div>

    <div
      v-if="notSatisfiedLink"
      class="edit-link"
    >
      <a
        :href="notSatisfiedLink"
        target="_blank"
        rel="noopener noreferrer"
      >{{ notSatisfiedLinkText }}</a>
      <OutboundLink />
    </div>

    <div
      v-if="lastUpdated"
      class="last-updated"
    >
      <span class="prefix">{{ lastUpdatedText }}:</span>
      <span class="time">{{ lastUpdated }}</span>
    </div>
  </footer>
</template>

<script>
import isNil from 'lodash/isNil'
import { endingSlashRE, outboundRE } from '@vuepress/theme-default/util'

export default {
  name: 'PageEdit',

  computed: {
    lastUpdated () {
      return this.$page.lastUpdated
    },

    lastUpdatedText () {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    },

    editLink () {
      const showEditLink = isNil(this.$page.frontmatter.editLink)
        ? this.$site.themeConfig.editLinks
        : this.$page.frontmatter.editLink

      const {
        repo,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      if (showEditLink) {
        if (typeof this.$page.frontmatter.editLink === 'string') {
          return this.$page.frontmatter.editLink
        } else if (docsRepo && this.$page.relativePath) {
          return this.createEditLink(
            repo,
            docsRepo,
            docsDir,
            docsBranch,
            this.$page.relativePath
          )
        }
      }
      return null
    },

    editLinkText () {
      return (
        this.$themeLocaleConfig.editLinkText
        || this.$site.themeConfig.editLinkText
        || `Edit this page`
      )
    },

    notSatisfiedLink () {
      const showNotSatisfiedLink = isNil(this.$page.frontmatter.notSatisfiedLink)
        ? this.$site.themeConfig.notSatisfiedLinks
        : this.$page.frontmatter.notSatisfiedLink

      const {
        repo,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      if (showNotSatisfiedLink && docsRepo && this.$page.relativePath) {
        return this.createNotSatisfiedLink(
          repo,
          docsRepo,
          docsDir,
          docsBranch,
          this.$page.relativePath
        )
      }
      return null
    },

    notSatisfiedLinkText () {
      return (
        this.$themeLocaleConfig.notSatisfiedLinkText
        || this.$site.themeConfig.notSatisfiedLinkText
        || `Didn't find an answer?`
      )
    }
  },

  methods: {
    createEditLink (repo, docsRepo, docsDir, docsBranch, path) {
      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`
      return (
        base.replace(endingSlashRE, '')
        + `/edit`
        + `/${docsBranch}/`
        + (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '')
        + path
      )
    },

    createNotSatisfiedLink (repo, docsRepo, docsDir, docsBranch, path) {
      const title = encodeURIComponent(`Improve ${this.$page.title}`)
      const body = encodeURIComponent(`I could not find the information I was looking for on the "${this.$page.title}" page (\`${this.$page.path}\`).\n\n[PLEASE DESCRIBE HOW THE PAGE CAN BE IMPROVED]`)
      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`
      return (
        base.replace(endingSlashRE, '')
        + `/issues/new?title=${title}&body=${body}&labels=question`
      )
    }
  }
}
</script>

<style lang="stylus">
@require '~@vuepress/theme-default/styles/wrapper.styl'

.page-edit
  @extend $wrapper
  padding-top 1rem
  padding-bottom 1rem
  overflow auto

  .edit-link
    display inline-block
    margin-right 1rem
    a
      color lighten($textColor, 25%)
      margin-right 0.05rem
  .last-updated
    float right
    font-size 0.9em
    .prefix
      font-weight 500
      color lighten($textColor, 25%)
    .time
      font-weight 400
      color #aaa

@media (max-width: $MQMobile)
  .page-edit
    .edit-link
      margin-bottom 0.5rem
    .last-updated
      font-size 0.8em
      float none
      text-align left
</style>
