<template>
  <input
    id="email"
    @input='debounceEmitValue($event.target.value)'
    :value="modelValue"
    type="number"
    required="true"
    autocomplete="off"
    placeholder="0.0"
    class="
      appearance-none
      block
      w-full
      px-3
      py-3
      border border-gray-300
      rounded-md
      font-bold
      shadow-sm
      placeholder-gray-400
      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
      sm:text-xl
    "
  />

  <Menu
    as="div"
    class="relative float-right -mt-11 mr-2 inline-block text-left"
  >
    <MenuButton
      class="
        inline-flex
        justify-center
        w-full
        px-4
        py-2
        text-sm
        font-medium
        text-black
        bg-gray-200
        shadow-md shadow-gray-300/10
        rounded-md
        focus:outline-none
        focus-visible:ring-2 focus-visible:ring-white
      "
    >

    <template v-if="selectedCoin">
      <img
        class="object-scale-down rounded-full h-5 w-5 mr-1"
        :src="selectedCoin.logoURI"
      />
      {{ selectedCoin.symbol }}
      </template>
      <template v-else>
          Séléctionnez un jeton
      </template>
      <ChevronDownIcon
        class="w-5 h-5 ml-2 -mr-1 text-dark hover:text-indigo-600"
        aria-hidden="true"
      />
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="
          absolute
          right-0
          w-56
          mt-2
          max-h-96
          overflow-y-scroll
          origin-top-right
          bg-white
          divide-y divide-gray-100
          rounded-md
          z-10
          shadow-lg
          ring-1 ring-black ring-opacity-5
          focus:outline-none
        "
      >
        <div class="px-1 py-1">
          <MenuItem
            v-slot="{ active }"
            @click="selectedCoin = coin;"
            v-for="coin in coinsList"
            :key="coin.id"
          >
            <button
              :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                'group flex rounded-md items-center w-full px-2 py-2 text-sm',
              ]"
            >
              <img
                class="object-scale-down rounded-full h-8 w-8"
                :src="coin.logoURI"
              />
              <div class="flex pl-2 flex-col items-start">
                <span>{{ coin.symbol }}</span>
                <span class="text-xs">{{ coin.name }}</span>
              </div>
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>


<script setup>

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { computed, ref, reactive, watch, inject, onMounted } from 'vue';
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { debounce } from "debounce";

const selectedCoin = ref(null);

const props = defineProps({
  coinsList: Array,
  modelValue: Number,
  modelModifiers: Object,
  defaultCoin:{
      type: String,
      default:'USDT'
  }
})

const emit = defineEmits(['update:modelValue','selectedCoin'])

const debounceEmitValue = debounce(function (val, e) {
     emit("update:modelValue", val)
}, 500)

onMounted(() => {
   selectedCoin.value =  props.defaultCoin ? {...props.coinsList.find(item => item.symbol == props.defaultCoin) } : null
})

watch(selectedCoin, (newValue, oldValue) => {
  emit('selectedCoin', newValue)
})




</script>
