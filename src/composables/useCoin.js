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
    const altCoins = ref([{
        "id": "ethereum",
        "symbol": "ETH",
        "name": "Ethereum",
        "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    }])
    const stableCoins = ref([{
            "name": "USDCoin",
            "address": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
            "symbol": "USDC",
            "decimals": 6,
            "chainId": 137,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
        },
        {
            "name": "Tether USD",
            "address": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
            "symbol": "USDT",
            "decimals": 6,
            "chainId": 137,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
        }
    ])

    const fetchUniswapCoins = async(collection) => {
        await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc').then(({
            data
        }) => {
            altCoins.value = data
        });
    };

    const fetchStableCoins = async(collection) => {
        await axios.get('https://wispy-bird-88a7.uniswap.workers.dev/?url=http://stablecoin.cmc.eth.link').then(({
            data
        }) => {
            stableCoins.value = data.tokens;
        });
    };

    return {
        fetchUniswapCoins,
        fetchStableCoins,
        altCoins,
        stableCoins
    }



}