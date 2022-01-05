import {
    ref,
    inject,
    watch,
    getCurrentInstance
} from 'vue'
import {
    useStore
} from "vuex";

import useContract from "./useContract.js";

export default function useCoinPrices(currencyFrom, currencyTo) {

    const Web3 = inject("Web3");
    const store = useStore();
    const addr = ref('0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419');
    const aggregatorV3InterfaceABI = ref(store.state.aggregatorV3InterfaceABI);
    const priceCurrencyFromInDollar = ref(0.0);
    const priceCurrencyToInDollar = ref(0.0);
    const priceCurrencyExchange = ref(0.0);
    const amountInput = ref(null);
    const amountOutput = ref(null);
    const globalProperties = getCurrentInstance().appContext.config.globalProperties;

    const {
        contractsList
    } = useContract();

    const priceFeed = ref(null);

    const getPriceFeed = async(network, pair) => {

        let price = 0

        addr.value = contractsList.value[network].find(item => item.pair == pair).addr;

        priceFeed.value = new Web3.eth.Contract(
            aggregatorV3InterfaceABI.value,
            addr.value
        );
        await priceFeed.value.methods
            .latestRoundData()
            .call()
            .then((roundData) => {
                price = roundData;
            });

        return price
    }

    watch(
        [amountInput, currencyFrom], (newValues, oldValues) => {

            if (currencyFrom.value) {
                getPriceFeed(
                    "etherum",
                    `${currencyFrom.value.symbol}/USD`
                ).then((data) => {
                    priceCurrencyFromInDollar.value = data;
                });
            }

            if (currencyFrom.value && currencyTo.value) {
                getPriceFeed(
                    "etherum",
                    `${currencyFrom.value.symbol}/${currencyTo.value.symbol}`
                ).then((data) => {
                    priceCurrencyExchange.value = data;
                    const changeValues = () => {
                        if (amountInput.value) amountOutput.value = globalProperties.$roundNumberFromLength(amountInput.value * globalProperties.$priceFromDecimals(data.answer, 18));
                    }
                    changeValues();
                });
            }


        })

    watch(
        [amountOutput, currencyTo], (newValues, oldValues) => {

            if (currencyTo.value) {
                getPriceFeed(
                    "etherum",
                    `${currencyTo.value.symbol}/USD`
                ).then((data) => {
                    priceCurrencyToInDollar.value = data;
                });
            }

            if (currencyFrom.value && currencyTo.value) {
                getPriceFeed(
                    "etherum",
                    `${currencyFrom.value.symbol}/${currencyTo.value.symbol}`
                ).then((data) => {
                    priceCurrencyExchange.value = data;
                    const changeValues = () => {
                        if (amountOutput.value) amountInput.value = globalProperties.$roundNumberFromLength(amountOutput.value / globalProperties.$priceFromDecimals(data.answer, 18));
                    }
                    changeValues();
                });
            }


        })

    return {
        amountInput,
        amountOutput,
        priceCurrencyFromInDollar,
        priceCurrencyToInDollar,
        priceCurrencyExchange
    }

}