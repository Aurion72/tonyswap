import Web3 from 'web3/dist/web3.min.js'
import BigNumber from "bignumber.js";

export default {
    install: (app, options) => {
        app.config.globalProperties.$priceFormat = (number, minimumFractionDigits = 2, currency = 'USD', format = 'en-US') => {
            return new Intl.NumberFormat(format, {
                style: 'currency',
                currency: currency,
                currencyDisplay: 'narrowSymbol',
                minimumFractionDigits: minimumFractionDigits
            }).format(number)
        }
        app.config.globalProperties.$priceFromDecimals = (number, decimals) => {
            const bn = new BigNumber(number)
            return number ? bn.shiftedBy(-decimals) : 0;
            //return number / 10 ** decimals
        }
        app.config.globalProperties.$memorySize = (v) => {
            const kb = v / 1024 / 1024
            return `${kb.toFixed(2)} MB`
        }
        app.config.globalProperties.$roundNumberFromLength = (number, fixedValue = 2) => {

            number < 1 ? fixedValue = 7 : fixedValue = 2

            number = number.toFixed(fixedValue)

            return new BigNumber(number).toNumber()
        }

    }
}