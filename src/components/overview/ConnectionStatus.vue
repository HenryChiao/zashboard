<template>
  <div class="bg-base-200/50 relative h-28 rounded-lg p-2 text-sm">
    <div class="flex flex-col">
      <div>
        <span class="inline-block w-28">Baidu </span>
        :
        <span :class="getColorForLatency(Number(baiduLatency))">{{ baiduLatency }}ms </span>
      </div>
      <div>
        <span class="inline-block w-28">Cloudflare </span>
        :
        <span :class="getColorForLatency(Number(cloudflareLatency))"
          >{{ cloudflareLatency }}ms
        </span>
      </div>
      <div>
        <span class="inline-block w-28">OpenAI CDN</span>
        :
        <span :class="getColorForLatency(Number(openAILatency))">{{ openAILatency }}ms </span>
      </div>
      <div>
        <span class="inline-block w-28">Github </span>
        :
        <span :class="getColorForLatency(Number(githubLatency))">{{ githubLatency }}ms </span>
      </div>
      <div>
        <span class="inline-block w-28">YouTube </span>
        :
        <span :class="getColorForLatency(Number(youtubeLatency))">{{ youtubeLatency }}ms </span>
      </div>
    </div>
    <button
      class="btn btn-circle btn-sm absolute right-2 bottom-2"
      @click="getLatency"
    >
      <BoltIcon class="h-4 w-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  getBaiduLatencyAPI,
  getCloudflareLatencyAPI,
  getGithubLatencyAPI,
  getOpenAILatencyAPI,
  getYouTubeLatencyAPI,
} from '@/api'
import {
  baiduLatency,
  cloudflareLatency,
  githubLatency,
  openAILatency,
  youtubeLatency,
} from '@/composables/overview'
import { getColorForLatency } from '@/helper'
import { autoConnectionCheck } from '@/store/settings'
import { BoltIcon } from '@heroicons/vue/24/outline'
import { onMounted } from 'vue'

const getLatency = async () => {
  getBaiduLatencyAPI().then((res) => {
    baiduLatency.value = res.toFixed(0)
  })

  getCloudflareLatencyAPI().then((res) => {
    cloudflareLatency.value = res.toFixed(0)
  })

  getOpenAILatencyAPI().then((res) => {
    openAILatency.value = res.toFixed(0)
  })

  getGithubLatencyAPI().then((res) => {
    githubLatency.value = res.toFixed(0)
  })

  getYouTubeLatencyAPI().then((res) => {
    youtubeLatency.value = res.toFixed(0)
  })
}

onMounted(() => {
  if (
    autoConnectionCheck.value &&
    [baiduLatency, cloudflareLatency, openAILatency, githubLatency, youtubeLatency].some(
      (item) => item.value === '',
    )
  ) {
    getLatency()
  }
})
</script>
