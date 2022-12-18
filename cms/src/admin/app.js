import logoNoText from './extensions/nzse-logo-no-text.svg'
import logo from './extensions/nzse-logo.svg';

// Docs for configuring admin:
// https://docs.strapi.io/developer-docs/latest/development/admin-customization.html#configuration-options
export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
    auth: {
      logo: logo
    },
    head: {
      favicon: logoNoText
    },
    menu: {
      logo: logoNoText
    },
    theme: {
      colors: {
        primary100: '#edf8fb',
        primary200: '#dbf2f8',
        primary300: '#c9ebf4',
        primary400: '#82d1e6',
        primary500: '#70cbe2',
        primary600: '#5ec4df',
        primary700: '#4cbedb',
        
        buttonPrimary500: '#82d1e6',
        buttonPrimary600: '#54cceb',

        neutral100: '#f9fcfd', // Admin background color
        neutral200: '#e5e6e7',
        neutral300: '#d9dadb',
        neutral400: '#cccecf',
        neutral500: '#bfc2c3', // Logo colors
        neutral600: '#363333', // Sub text color
        neutral700: '#363333', // Menu item hover color?
        neutral800: '#121212', // Text color
        neutral900: '#000000',
      }
    },
    translations: {
      en: {
        'app.components.LeftMenu.navbrand.title': 'NZSE Admin',
        'app.components.LeftMenu.navbrand.workplace': 'New Zealand Society of Endodontics'

      }
    },
    notifications: { release: false }
  },
  bootstrap(app) {
    console.log(app);
  },
};
