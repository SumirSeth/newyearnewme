<template>
  <div :class="[isDark ? 'bg-black' : 'bg-white', 'h-screen']" :style="svgGridStyleAnimated">
      <button @click="toggleDarkMode" class="p-3 rounded bg-white/55 brightness-100">
        <span v-if="isDark"><Icon mode="svg" name="line-md:moon-twotone-loop"/></span>
        <span v-else><Icon mode="svg" name="line-md:sun-rising-twotone-loop" /></span>
      </button>
  </div>
</template>

<script lang="ts" setup>
const { isDark, toggleDarkMode, isDarkMode } = useDarkMode();
const strokeWidth = computed(() => (isDark.value ? 0.4 : 0.7));
const strokeColor = computed(() => (isDark.value ? 'fff' : '000'));

const svgGridStyleAnimated = computed(() => ({
  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><circle cx="10" cy="10" r="2" fill="%23${strokeColor.value}" opacity="0.5"/></svg>')`,
  animation: 'moveBackground 60s linear infinite',
}));
const svgGridStyle = computed(() => ({
  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><path d="M 30 10 L 3 0 10 30" fill="none" stroke="%23${strokeColor.value}" opacity="0.5" stroke-width="${strokeWidth.value}"/></svg>')`,
}));
</script>

<style>
@keyframes moveBackground {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 00% 100%;
  }
}
</style>