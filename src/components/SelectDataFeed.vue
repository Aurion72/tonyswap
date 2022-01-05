<template>
    <Listbox v-model="feedSelected">
      <div class="relative mt-1">
        <ListboxButton
          class="relative cursor-pointer w-full py-4 pl-5 pr-10 text-left bg-white rounded-lg shadow  focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
        >
          <span class="flex truncate"> Technologie : <img class="object-scale-down rounded-full ml-3 h-5 w-5 mr-1" :src="$getImageUrl(feedSelected.logo)" /> {{ feedSelected.name }} </span>
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute w-full py-1 mt-1 z-20 overflow-auto text-base bg-white rounded shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="feed in feedsList"
              :key="feed.name"
              :value="feed"
              as="template"
            >
              <li
                :class="[
                  active ? 'text-amber-900 bg-amber-100' : 'text-gray-900',
                  'cursor-pointer select-none relative py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'flex truncate',
                  ]"
                  >
                  <img class="object-scale-down rounded-full h-5 w-5 mr-1" :src="$getImageUrl(feed.logo)" />
                  {{ feed.name }}
                  
                  </span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="w-5 h-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
</template>

<script setup>

import { ref, inject } from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

const feedsList = [
    { name: 'ChainLink Data Feeds', logo:'chainlink_blue.png' },
    { name: 'The Graph (en développement)', logo:'the-graph-logo.png'  },
    { name: 'UniSwap SDK (en développement)', logo:'uniswap_logo.png'  },
]

inject['images']

const feedSelected = ref(feedsList[0])


</script>
<style lang="">
    
</style>