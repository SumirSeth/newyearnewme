<template>
  <div class="h-screen" :style="svgGridStyleAnimated">
      <button @click="toggleDarkMode" class="p-2 m-2 fixed rounded bg-white/10 backdrop-blur-sm brightness-100 flex flex-col items-center justify-center">
        <span v-if="isDark"><Icon class="text-white" mode="svg" name="line-md:moon-twotone-loop"/></span>
        <span v-else><Icon class="text-white" mode="svg" name="line-md:sun-rising-twotone-loop" /></span>
        <!-- <p class="italic font-thin text-white text-sm">{{ isDarkMode ? 'dark mode' : 'light mode' }}</p> -->
      </button>
  </div>
</template>

<script lang="ts" setup>
const { isDark, toggleDarkMode, isDarkMode } = useDarkMode();
const strokeWidth = computed(() => (isDark.value ? 0.4 : 0.7));
const strokeColor = computed(() => (isDark.value ? 'fff' : '00edff'));
const gradientColors = computed(() => ({
  light: 'linear-gradient(135deg, #004f57 0%, #007e8c 30%, #9ec5c8 70%, #c9d1d4 100%)',
  dark: 'linear-gradient(135deg, #001a1c 0%, #013840 65%, #181f21 100%)'
}));

const svgGridStyleAnimated = computed(() => ({
  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="1.2" fill="%23${strokeColor.value}" opacity="0.3"/></svg>'), ${isDark.value ? gradientColors.value.dark : gradientColors.value.light}`,
  animation: 'moveBackground 60s linear infinite',
}));

const svgGridStyle = computed(() => ({
  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><circle cx="10" cy="10" r="1.2" fill="%23${strokeColor.value}" opacity="0.5"/></svg>'), ${isDark.value ? gradientColors.value.dark : gradientColors.value.light}`,
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