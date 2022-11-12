import { boot } from 'quasar/wrappers'

// github: https://github.com/chenfengjw163/vue-json-viewer
import JsonViewer from 'vue-json-viewer'

export default boot(async ({app}) => {
  app.use(JsonViewer)
})
