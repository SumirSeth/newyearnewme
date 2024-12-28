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
  
    <div class="flex flex-col gap-4 h-screen items-center justify-center">
      
      <div class="flex flex-col items-center p-2 bg-white/5 rounded-xl backdrop-blur-sm brightness-110 shadow-xl m-4" v-if="userDetails.name != ''">
        <p class="text-white font-thin m-3 text-xl italic">summary</p>
        <p class="text-white font-thin m-3 text-md opacity-65">name: {{ userDetails.name }}</p>
        <p v-if="userDetails.twitter != ''" class="text-white font-thin m-3 text-md opacity-65">twitter: {{ userDetails.twitter }}</p>
        <p v-if="userDetails.github != ''" class="text-white font-thin m-3 text-md opacity-65">github: {{ userDetails.github }}</p>
        <p v-if="achievements.length != 0" class="text-white font-thin m-3 text-xl italic">achievements</p>
        <p v-for="achievement in achievements" class="text-white font-thin m-3 text-md opacity-65">• {{ achievement }}</p>
      </div>


      <div class="flex flex-row items-center p-4 bg-white/5 rounded-xl backdrop-blur-sm brightness-110 shadow-xl" v-if="!showInput">
        <p class="text-white font-thin m-3 text-lg">{{ steps[index] }}</p>
        <input v-model="response" v-if="index != 0" placeholder="add text..." class="text-white focus-visible:outline-none p-1 placeholder:text-white/20 placeholder:font-thin placeholder:italic rounded-lg backdrop-blur-sm bg-white/10 autofill:bg-white/10" type="text"  @keyup.enter="index == 3  ? (showInput = true, insertDetail(response)) : insertDetail(response)"/>
        <Icon class="text-white size-7 mx-1 hover:cursor-pointer" mode="svg" name="ic:twotone-arrow-circle-right" @click="index == 3  ? (showInput = true, insertDetail(response)) : insertDetail(response)"/>
      </div>

      <div class="flex flex-row items-center p-4 bg-white/5 rounded-xl backdrop-blur-sm brightness-110 shadow-xl" v-if="showInput">
        <p class="text-white font-thin m-3 text-lg">{{ steps[4] }}</p>
        <input v-model="response" placeholder="got an internship..." class="text-white focus-visible:outline-none p-1 placeholder:text-white/20 placeholder:font-thin placeholder:italic rounded-lg backdrop-blur-sm bg-white/10" type="text" @keyup.enter="insertAchievement(response)"/>
        <Icon class="text-white size-7 m-2 hover:cursor-pointer" mode="svg" name="ic:twotone-add-box" @click="insertAchievement(response)"/>
      </div>




    </div>
  
  
  </div>
</template>

<script lang="ts" setup>
const { isDark, toggleDarkMode, isDarkMode } = useDarkMode();

// user details logic
const userDetails = ref({
  name: "",
  twitter: "",
  github: "",
})

const achievements = ref<string[]>([])

const insertAchievement = (achievement: string) => {
  if (achievement == "") {
    return
  }
  if (achievements.value.length > 10){
    return
  }
  achievements.value.push(achievement)
  response.value = ""
}

//onboarding logic
const showInput = ref(false)
const index = ref(0)
const steps = ref<{ [key: number]: string }>({
  0: "Welcome to the previous year! :)",
  1: "name",
  2: "x/twitter username",
  3: "github username",
  4: "add new"
})
const response = ref("")

const insertDetail = (detail: string) => {
  
  if (index.value == 0) {
    
  } else if (index.value == 1) {
    if (detail == "") {
      return
    }
    userDetails.value.name = detail
  } else if (index.value == 2) {
    if (detail == "") {
      return
    }
    userDetails.value.twitter = detail
  } else if (index.value == 3) {
    if (detail == "") {
      return
    }
    userDetails.value.github = detail
  }
  response.value = ""
  index.value++
}

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