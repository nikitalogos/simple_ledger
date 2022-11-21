export default {
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      el_width: null,
      el_height: null,
    }
  },
  methods: {
    update_el_size() {
      const rect = document.getElementById(this.id)?.getBoundingClientRect()
      this.el_width = rect?.width
      this.el_height = rect?.height
    },
  },
  created() {
    setInterval(this.update_el_size, 100)
  },
  mounted(){
    this.update_el_size()
  },
}
