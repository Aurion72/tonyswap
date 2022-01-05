import {
    ref,
    computed,
    inject
} from 'vue'
import {
    useStore
} from "vuex";

export default function useCoinPrices() {

    const store = useStore();
    const contractsList = ref({
        'etherum': [{
                "pair": "ETH/USD",
                "addr": "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
            },
            {
                "pair": "USDT/ETH",
                "addr": "0xee9f2375b4bdf6387aa8265dd4fb8f16512a1d46",
            },
            {
                "pair": "USDC/ETH",
                "addr": "0x986b5e1e1755e3c2440e960477f25201b0a8bbd4",
            },
            {
                "pair": "USDT/USD",
                "addr": "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D",
            },
            {
                "pair": "USDC/USD",
                "addr": "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
            }
        ]
    })

    return {
        contractsList
    }



}