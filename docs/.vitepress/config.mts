import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:"/appweb-exer16/",
  title: "Atelier 16",
  description: "Atelier sur l'installation et l'utilisation de Vitepress",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: 'Travails pratiques 01',
        items: [
          { text: 'Xavier Fortin', link: '/xavier_fortin' },
          { text: 'James Savoie', link: '/james_savoie' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Alias-Cynestal/appweb-exer16' }
    ]
  }
})
