import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#1976d2',
                secondary: '#b0bec5',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
        },
    },
    icons: {
        iconfont: 'mdi', // default
        values: {
            product: 'mdi-dropbox',
            support: 'mdi-lifebuoy',
            steam: 'mdi-steam-box',
            pc: 'mdi-desktop-classic',
            xbox: 'mdi-xbox',
            playstation: 'mdi-playstation',
            switch: 'mdi-nintendo-switch',
            content_save: 'mdi-content-save',
            close_circle: 'mdi-close-circle',
            delete: 'mdi-delete'
        },
    },
});
