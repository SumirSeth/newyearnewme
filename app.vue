<template>
  <Link rel="icon" type="image/x-icon" href="icon.png"/>
  <Title>New Year, New You!</Title>
  <div class="min-h-screen" :style="animationPreference ? svgGridStyleAnimated : svgGridStyle">
    <button @click="toggleDarkMode" class="p-2 m-2 fixed rounded bg-white/10 backdrop-blur-sm brightness-100 flex flex-col items-center justify-center">
      <span v-if="isDark"><Icon class="text-white" mode="svg" name="line-md:moon-twotone-loop"/></span>
      <span v-else><Icon class="text-white" mode="svg" name="line-md:sun-rising-twotone-loop" /></span>
      <!-- <p class="italic font-thin text-white text-sm">{{ isDarkMode ? 'dark mode' : 'light mode' }}</p> -->
    </button>
    <p @click="animationPreference = animationPreference ? false : true" class="dark:text-white text-gray-700 fixed bottom-0 right-0 lg:p-4 p-2 lg:text-base sm:text-xs text-xs dark:opacity-30 opacity-55 cursor-cell hover:opacity-90 dark:hover:opacity-90">Turn {{ animationPreference ? "off" : "on" }} animation</p>
  
    <div class="flex flex-col gap-4 h-screen items-center justify-center">

      <p v-if="finalPage" class="text-white font-white font-thin text-3xl p-2 m-2">your 2024</p>
      

      <div ref="captureArea" class="capture-container">
        <div :style="capturing ? svgGridStyle: false" class="summary flex flex-col items-center p-2 bg-white/5 rounded-xl backdrop-blur-sm brightness-110 shadow-xl m-3 min-w-60 max-h-96 overflow-auto" v-if="userDetails.name != ''">
          <p class="text-white font-thin m-2 text-xl italic">summary</p>
          <NuxtImg v-if="finalPage" :src="profilePic" class="rounded-full w-24 h-24 m-2 bg-white/5 brightness-110 shadow-xl" alt="profile picture"/>
          <p class="text-white font-thin m-2 text-md opacity-65">name: {{ userDetails.name }}</p>
          <p v-if="userDetails.twitter != ''" class="text-white font-thin m-2 text-md opacity-65">twitter: {{ userDetails.twitter }}</p>
          <p v-if="userDetails.github != ''" class="text-white font-thin m-2 text-md opacity-65">github: {{ userDetails.github }}</p>
          <p v-if="achievements.length != 0" class="text-white font-thin m-2 text-xl italic">achievements</p>
          <p v-for="achievement in achievements" class="text-white font-thin m-2 text-md opacity-65">• {{ achievement }}</p>
        </div>
      </div>
        
      <button v-if="finalPage" @click="captureImage" class="text-white font-thin backdrop-blur-sm py-3 px-4 rounded-xl min-w-60 shadow-lg brightness-110 bg-white/5">get image</button>
      <div class="flex flex-row items-center p-4 bg-white/5 rounded-xl backdrop-blur-sm brightness-110 shadow-xl" v-if="!showInput">
        <p class="text-white font-thin m-3 text-lg">{{ steps[index] }}</p>
        <input v-model="response" v-if="index != 0" placeholder="add text..." class="text-white focus-visible:outline-none p-1 placeholder:text-white/20 placeholder:font-thin placeholder:italic rounded-lg backdrop-blur-sm bg-white/10 autofill:bg-white/10" type="text"  @keyup.enter="index == 3  ? (showInput = true, insertDetail(response)) : insertDetail(response)"/>
        <Icon class="text-white size-7 mx-1 hover:cursor-pointer" mode="svg" name="ic:twotone-arrow-circle-right" @click="(index == 3  ? (showInput = true, insertDetail(response)) : insertDetail(response))"/>
      </div>

      <div class="flex flex-col items-center p-4 bg-white/5 rounded-xl backdrop-blur-sm brightness-110 shadow-xl" v-if="showInput && !finalPage">
        <div class="flex flex-row items-center">
          <p class="text-white font-thin m-3 text-lg">{{ steps[4] }}</p>
          <input v-model="response" placeholder="got an internship..." class="text-white focus-visible:outline-none p-1 placeholder:text-white/20 placeholder:font-thin placeholder:italic rounded-lg backdrop-blur-sm bg-white/10" type="text" @keyup.enter="insertAchievement(response)"/>
          <Icon class="text-white size-7 m-2 hover:cursor-pointer shadow-lg" mode="svg" name="ic:twotone-add-box" @click="insertAchievement(response)"/>
        </div>
        <button v-if="achievements.length != 0" class="text-white backdrop-blur-sm py-2 px-4 rounded-xl min-w-full shadow-lg font-thin" @click="finalPage = !finalPage, fetchProfilePicture()">done</button>
      </div>




    </div>
  
  
  </div>
</template>

<script lang="ts" setup>
// import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image'
const { isDark, toggleDarkMode, isDarkMode } = useDarkMode();


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


//github profile logic
const username = computed(() => userDetails.value.github)
const profilePic = ref("")
const imageLoaded = ref(false);
const profileImage = ref<HTMLImageElement | null>(null);

const fetchProfilePicture = async () => {
  if (!username.value) {
    alert('Please enter a username');
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username.value}`);
    const data = await response.json();

    if (response.ok) {
      // Convert image to base64 first
      const imgResponse = await fetch(data.avatar_url);
      const blob = await imgResponse.blob();
      profilePic.value = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } else {
      alert('User not found');
    }
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    alert('An error occurred');
  }
};

//capture logic
const capturing=ref(false)
const captureArea = ref<HTMLElement | null>(null);

const captureImage = async () => {
  

  capturing.value = true;
  try {
    const dataUrl = await domtoimage.toPng(captureArea.value, {
      quality: 2.0,
      bgcolor: '#002d33',
      style: {
        'transform': 'scale(1)',
      },
      filter: (node) => {
        return node.tagName !== 'BUTTON';
      }
    });

    // Create download link
    const link = document.createElement('a');
    link.download = 'my-achievements.png';
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Failed to capture image:', error);
    alert('Failed to capture image. Please try again.');
  } finally {
    capturing.value = false;
  }
};


//final page logic
const finalPage = ref(false)





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

.summary::-webkit-scrollbar {
  display: none;
}

</style>