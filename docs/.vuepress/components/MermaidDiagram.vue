<template>
  <div class="mermaid-diagram">
    <div v-if="error" class="custom-block danger">
      <p class="custom-block-title">Diagram error</p>
      <pre>{{ error }}</pre>
    </div>
    <div v-else-if="svg" v-html="svg" />
    <p v-else>Loading diagram...</p>
  </div>
</template>

<script>
let initialized = false
let loading

const loadMermaid = src => {
  if (window.mermaid) return Promise.resolve(window.mermaid)
  if (loading) return loading

  loading = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve(window.mermaid)
    script.onerror = () => reject(new Error('Could not load Mermaid'))
    document.head.appendChild(script)
  })
  return loading
}

export default {
  name: 'MermaidDiagram',
  props: {
    id: {
      type: String,
      required: true
    },
    graph: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      error: null,
      svg: null
    }
  },
  async mounted() {
    try {
      const mermaid = await loadMermaid(this.$withBase('/vendor/mermaid.min.js'))
      if (!initialized) {
        mermaid.initialize({ securityLevel: 'strict', startOnLoad: false })
        initialized = true
      }
      const { svg } = await mermaid.render(this.id, this.graph)
      this.svg = svg
    } catch (error) {
      this.error = error.message
    }
  }
}
</script>

<style scoped>
.mermaid-diagram {
  overflow-x: auto;
  text-align: center;
}
</style>
