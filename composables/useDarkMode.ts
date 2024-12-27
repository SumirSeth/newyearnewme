export const useDarkMode = () => {
    const isDark = ref(false)

    const loadDarkMode = () => {
        const storedPreference = localStorage.getItem('darkMode')
        if (storedPreference) {
            isDark.value = storedPreference === 'true'
        }
        else {
            isDark.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        
    }

    const applyDarkMode = () => {
        if (isDark.value) {
            document.documentElement.classList.add('dark')
        }
        else {
            document.documentElement.classList.remove('dark')
        }
    }

    const toggleDarkMode = () => {
        isDark.value = !isDark.value
        localStorage.setItem('darkMode', isDark.value.toString())
        applyDarkMode()
    }

    onMounted(() => {
        loadDarkMode()
        applyDarkMode()
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            isDark.value = e.matches
            applyDarkMode();})
        })


    const isDarkMode = computed(() => isDark.value)
    
    return {
        isDark,
        toggleDarkMode,
        isDarkMode
    }
}
