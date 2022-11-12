<script lang="ts">
import { defineComponent } from 'vue';
import 'src/text_parser/parser.js'
import { actions, types } from 'src/text_parser/functions.js'
const parse = (string) => text_parser.parse(string, { actions, types })

//import parse from 'src/text_parser/parser.js'

export default defineComponent({
  data() {
    return {
//      input_data: "2022-06-26 12:00..+1d4h !-30m !-5m [ ] Make report #busy @home" +
//      "\n\t12:00 !-30min !-5min - start" +
//      "\n\t+2h..+10m - take a break" +
//      "\n\tstart+1d4h - finish",
//      input_data: '$name\n@home\nab\nlayer:cd\nef:dd\nlayer:"afsda ffsdd"\nlayer:\'ddddd'
//      input_data: '- 10..20 !30 [x] fdd\nbg:"dd"\n#busy'
      input_data: '- I am #busy @home'
    }
  },
  computed: {
    parsed_data() {
//      try {
        const p = parse(this.input_data)
        console.log('p', p)
        return p
//      } catch (e) {
//        return {
//          error: e.toString()
//        }
//      }
    }
  }
});
</script>

<template>
  <div class="test-wrapper">
    <textarea v-model="input_data"></textarea>

    <json-viewer
      class="json-viewer-custom"
      :value="parsed_data"
      :expand-depth=1000
      expanded
      sort></json-viewer>
  </div>
</template>

<style scoped lang="scss">
.test-wrapper {
  width: 100%;
  padding: 20px;

  display:flex;
  flex-direction: row;

  textarea {
    width: 50%;
  }
  .json-viewer-custom {
    width: 50%;
  }

}

</style>
