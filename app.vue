<template>
  <Link rel="icon" type="image/x-icon" href="icon.png"/>
  <Title>New Year, New You!</Title>
  <div class="min-h-screen" :style="animationPreference ? svgGridStyleAnimated : svgGridStyle">
    <button @click="toggleDarkMode" class="p-2 m-2 fixed rounded bg-white/10 backdrop-blur-sm brightness-100 flex flex-col items-center justify-center">
      <span v-if="isDark"><Icon class="text-white" mode="svg" name="line-md:moon-twotone-loop"/></span>
      <span v-else><Icon class="text-white" mode="svg" name="line-md:sun-rising-twotone-loop" /></span>
      <!-- <p class="italic font-thin text-white text-sm">{{ isDarkMode ? 'dark mode' : 'light mode' }}</p> -->
    </button>
    <p @click="animationPreference = animationPreference ? false : true" class="dark:text-white text-black fixed bottom-0 right-0 lg:p-4 p-2 lg:text-base sm:text-xs text-xs dark:opacity-20 opacity-55 cursor-cell hover:opacity-90 dark:hover:opacity-90">Turn {{ animationPreference ? "off" : "on" }} animation</p>
  
    <div class="flex h-screen items-center justify-center">
      <p class="text-white font-thin m-3 text-lg">add new:</p>
      <div class="flex flex-row">
        <input placeholder="add text..." class="text-white focus-visible:outline-none p-1 placeholder:text-white/20 rounded-lg backdrop-blur-sm bg-white/10" type="text">
        <Icon class="text-white size-7 m-2 hover:cursor-pointer" mode="svg" name="ic:twotone-add-box" />
      </div>
    </div>
    
  
  
  
  </div>
</template>

<script lang="ts" setup>
const { isDark, toggleDarkMode, isDarkMode } = useDarkMode();

//background svg logic
const strokeColor = computed(() => (isDark.value ? 'fff' : '00edff'));
const gradientColors = computed(() => ({
  light: 'linear-gradient(135deg, #004f57 0%, #007e8c 30%, #9ec5c8 70%, #c9d1d4 100%)',
  dark: 'linear-gradient(135deg, #001a1c 0%, #013840 65%, #181f21 100%)'
}));

const svgGridStyleAnimated = computed(() => ({
  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"><circle cx="10" cy="10" r="1.2" fill="%23${strokeColor.value}" opacity="0.3"/></svg>'), ${isDark.value ? gradientColors.value.dark : gradientColors.value.light}`,
  animation: 'moveBackground 60s linear infinite',
}));
const svgGridStyle = computed(() => ({
  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"><circle cx="10" cy="10" r="1.2" fill="%23${strokeColor.value}" opacity="0.4"/></svg>'), ${isDark.value ? gradientColors.value.dark : gradientColors.value.light}`,
}));

//animation logic
const animationPreference = ref(true);



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