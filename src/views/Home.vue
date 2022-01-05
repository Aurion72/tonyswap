<template>
  <div
    class="min-h-full flex flex-col bg-slate-100 justify-start py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-center text-4xl font-extrabold text-gray-900">
        Tonyswap
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <selectDataFeed />

      <div class="bg-white py-8 px-4 mt-5 shadow sm:rounded-lg sm:px-10">
        <div class="space-y-6">
          <div>
            <div v-if="stableCoins.length > 0" class="mt-1">
              <InputCurrency
                v-model.number="amountInput"
                @selectedCoin="currencyFrom = $event"
                :defaultCoin="null"
                :coinsList="stableCoins"
              />
            </div>
          </div>

          <div>
            <div v-if="altCoins.length > 0" class="mt-1">
              <InputCurrency
                v-model.number="amountOutput"
                @selectedCoin="currencyTo = $event"
                :defaultCoin="null"
                :coinsList="altCoins"
              />
            </div>
          </div>

          <div class="flex flex-col">

            <span
              class="text-sm block mt-2"
              v-if="priceCurrencyFromInDollar && currencyFrom"
            >
              1 {{ currencyFrom.symbol }} =
              {{
                $priceFormat(
                  $priceFromDecimals(priceCurrencyFromInDollar.answer, 8),
                  6
                )
              }}
            </span>

             <span
              class="text-sm block mt-0"
              v-if="priceCurrencyFromInDollar && currencyFrom && currencyTo"
            >
              1 {{ currencyFrom.symbol }} =
              {{                
                  $priceFromDecimals(priceCurrencyExchange.answer, 18).toFixed(10)  
              }} {{ currencyTo.symbol }}
            </span>

            <div
              class="text-sm mt-0"
              v-if="priceCurrencyToInDollar && currencyTo"
            >
              1 {{ currencyTo.symbol }} =
              {{
                
                  (1 / $priceFromDecimals(priceCurrencyExchange.answer, 18).toFixed(10) ).toFixed(2)  
              }}
              {{ currencyFrom.symbol }}
              <span class="text-gray-500"
                >
                <!-- ({{
                  $priceFormat(
                    $priceFromDecimals(priceCurrencyToInDollar.answer, 8)
                  )
                }}) -->

                ({{
                  $priceFormat(
                    ($priceFromDecimals(priceCurrencyFromInDollar.answer, 8) * (1 / $priceFromDecimals(priceCurrencyExchange.answer, 18)).toFixed(2))
                  )
                }})
                
                </span
              >

            </div>

            <span v-if="priceCurrencyExchange" class="text-sm mt-2"> Dernière mise à jour des prix le {{ $dateFormat(priceCurrencyExchange.updatedAt,"dd/MM/yyyy à HH:mm:ss") }} </span>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Connecter le portefeuille
            </button>
          </div>
        </div>
      </div>

      <span v-if="memory" class="text-center mt-3 block w-full">
        Mémoire utilisée : {{ $memorySize(memory.usedJSHeapSize) }}
      </span>
    </div>
  </div>
</template>

<script setup>


import useCoinPrices from "../composables/useCoinPrices.js";
import useCoin from "../composables/useCoin.js";
import InputCurrency from "../components/InputCurrency.vue";
import SelectDataFeed from "../components/SelectDataFeed.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { useStore } from "vuex";
import { computed, ref, reactive, watch, inject } from "vue";
import { useMemory } from "@vueuse/core";

const currencyTo = ref(null);
const currencyFrom = ref(null);

const { isSupported, memory } = useMemory();

// CoinPrices
const { priceCurrencyFromInDollar, amountInput, amountOutput, priceCurrencyToInDollar, priceCurrencyExchange } = useCoinPrices(
  currencyFrom,
  currencyTo
);

// Coins
const { altCoins, stableCoins } = useCoin();
</script>
