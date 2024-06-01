<script setup>
import { ref, onMounted, reactive, computed } from 'vue'

let users = reactive([])
let isLoading = ref(true)
const searchQuery = ref('')

async function fetchData() {
  try {
    isLoading.value = true

    const response = await fetch('https://api.github.com/users', {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    users = data
    console.log(users)
    isLoading.value = false
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}
onMounted(async () => {
  await fetchData()
  isLoading.value = false
})

const filteredUsers = computed(() => {
  return users.filter((user) => user.login.toLowerCase().includes(searchQuery.value.toLowerCase()))
})
</script>

<template>
  <div>
    <nav class="topnav" style="margin-bottom: 20px">
      <a class="active" href="/">Home</a>
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search.." name="search" />
        <img src="@/assets/search.svg" alt="search icon" class="search-icon" />
      </div>
    </nav>
    <div v-if="isLoading">Loading.....</div>
    <div v-else>
      <div class="card-container">
        <div class="card" v-for="user in filteredUsers" :key="user.login">
          <a :href="user.html_url"
            ><img class="card-image" :src="user.avatar_url" :alt="user.login"
          /></a>
          <div class="card-content">
            <a :href="user.html_url" style="text-decoration: none"
              ><h2 class="card-title">{{ user.login }}</h2></a
            >
            <p class="card-description">followers: {{ user.followers_url }}</p>
            <p class="card-description">following: {{ user.following_url }}</p>
            <p class="card-description">gists: {{ user.gists_url }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

