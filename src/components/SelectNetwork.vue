<template>
    <Listbox v-model="networkSelected">
      <div class="relative mt-1">
        <ListboxButton
          class="relative cursor-pointer w-full py-4 pl-5 pr-10 text-left bg-white rounded-lg shadow  focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
        >
          <span class="flex truncate"> Réseau : <img class="object-scale-down rounded-full ml-auto h-5 w-5 mr-1" :src="$getImageUrl(networkSelected.logo)" /> {{ networkSelected.name }} </span>
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
              v-for="network in networksList"
              :key="network.name"
              :value="network"
              :disabled="network.unavailable"
              as="template"
            >
              <li
                :class="[
                  active ? 'text-amber-900 bg-amber-100' : 'text-gray-900', {'text-gray-400 cursor-not-allowed': network.unavailable},
                  'cursor-pointer select-none relative py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'flex truncate',
                  ]"
                  >
                  <img class="object-scale-down rounded-full h-5 w-5 mr-1" :src="$getImageUrl(network.logo)" />
                  {{ network.name }}
                  
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

const networksList = [
    { name: 'Ethereum', logo:'ethereum_logo.png' },
    { name: 'Polygon (En développement)', logo:'polygon-matic-logo.png', unavailable:true },
    { name: 'Optimism (En développement)', logo:'optimism.png', unavailable:true },
    { name: 'Arbitrum (En développement)', logo:'Arbitrum.svg', unavailable:true },
]

inject['images']

const networkSelected = ref(networksList[0])


</script>
<style lang="">
    
</style>