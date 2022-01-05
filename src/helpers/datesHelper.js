import { format, fromUnixTime, compareAsc } from 'date-fns'

export default {
    install: (app, options) => {
        app.config.globalProperties.$format = (date) => {
            return true;
        }
        app.config.globalProperties.$dateFormat = (date, outputFormat) => {
            return format(fromUnixTime(date), outputFormat);
        }
    }
}