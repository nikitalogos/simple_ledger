import { reactive } from "vue"

const screen_sizes = reactive({
  client_w: 0,
  client_h: 0,
  scroll_h: 0,
  scroll_y: 0,
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function update_screen_sizes() {
  // reason: https://learn.javascript.ru/metrics-window
  screen_sizes.client_w = document.documentElement.clientWidth;
  screen_sizes.client_h = document.documentElement.clientHeight;
  screen_sizes.scroll_h = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
  screen_sizes.scroll_y = window.pageYOffset || document.documentElement.scrollTop;
}
update_screen_sizes();
window.addEventListener("resize", update_screen_sizes);
window.addEventListener("scroll", update_screen_sizes);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function useScreenSizes() {
  return { screen_sizes, update_screen_sizes }
}
