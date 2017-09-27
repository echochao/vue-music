import Vue from 'vue'
import Router from 'vue-router'
import Music from '@/components/music/music'
import Search from '@/components/search/search'
import Singer from '@/components/singer/singer'
import Rank from '@/components/rank/rank'
import AlbumList from '@/components/albumlist/albumlist'
import DissList from '@/components/disslist/disslist'
import SingerList from '@/components/singerlist/singerlist'
import RankList from '@/components/ranklist/ranklist'

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
      path: '/albumlist',
      name: 'AlbumList',
      component: AlbumList
    },
    {
      path: '/disslist',
      name: 'DissList',
      component: DissList
    },
     {
      path: '/singerlist',
      name: 'SingerList',
      component: SingerList
    },
    {
      path: '/ranklist',
      name: 'RankList',
      component: RankList
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    }
  ]
})
