import Vue from 'vue'
import Router from 'vue-router'
import Music from '@/components/music/music'
import Search from '@/components/search/search'
import Album from '@/components/album/album'
import Diss from '@/components/diss/diss'
import Singer from '@/components/singer/singer'

Vue.use(Router)

export default new Router({
  routes: [
   {
      path: '/',
      name: 'Index',
      component: Music
    },
    {
      path: '/music',
      name: 'Music',
      component: Music
    },
    {
      path: '/album',
      name: 'Album',
      component: Album
    },
    {
      path: '/diss',
      name: 'Diss',
      component: Diss
    },
     {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
