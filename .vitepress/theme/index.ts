import DefaultTheme from 'vitepress/theme'
import { h }         from 'vue'
import type { Theme } from 'vitepress'

import "./styles/theme.css"

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faKeyboard, faBook, faMoon, faBookmark, faTag } from '@fortawesome/free-solid-svg-icons'

// Add icons to the library
library.add(faKeyboard, faBook, faMoon, faBookmark, faTag)

import Home      from './layouts/Home.vue'
import Posts     from './layouts/Posts.vue'
import Categories from './layouts/Categories.vue'
import Tags      from './layouts/Tags.vue'
import PostCard  from './components/PostCard.vue'
import PostList  from './components/PostList.vue'
import PostMeta  from './components/PostMeta.vue'
import NowStatus from './components/Status.vue'
import NavBar    from './components/NavBar.vue'

export default {
  extends: DefaultTheme,

  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(PostMeta),
    })
  },

  enhanceApp({ app, router }) {
    app.component('FontAwesome', FontAwesomeIcon)
    app.component('Home',      Home)
    app.component('Posts',     Posts)
    app.component('Categories', Categories)
    app.component('Tags',      Tags)
    app.component('PostCard',  PostCard)
    app.component('PostList',  PostList)
    app.component('PostMeta',  PostMeta)
    app.component('NowStatus', NowStatus)
    app.component('NavBar',    NavBar)
  },
} satisfies Theme
