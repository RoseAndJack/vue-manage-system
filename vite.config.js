import vue from '@vitejs/plugin-vue'
import {module} from "vue-schart/example/webpack.config";
export default {
    base: './',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js']
    }
}