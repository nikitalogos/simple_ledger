
// requires "id" property. Also root component in template should have id of id - :id="id"
// interface: all variables under data()

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
      el_left: null,
      el_top: null,
    }
  },
  methods: {
    _update_el_size() {
      const rect = document.getElementById(this.id)?.getBoundingClientRect()
      this.el_width = rect?.width
      this.el_height = rect?.height
      this.el_left = rect?.left
      this.el_top = rect?.top
    },
  },
  created() {
    setInterval(this._update_el_size, 100)
  },
  mounted(){
    this._update_el_size()
  },
}
