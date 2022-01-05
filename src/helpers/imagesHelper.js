export default {
    install: (app, options) => {
        app.config.globalProperties.$getImageUrl = (name) => {
            return new URL(`/src/assets/images/${name}`,
                import.meta.url).href
        }
    }
}