const DontLoadDerivedSampleList = () => import('@/components/dontLoad/dontLoadDerivedSampleList.vue')
const DontLoadShareFactory = () => import('@/components/dontLoad/dontLoadShareFactory.vue')

export default [
  {
    path: '/dontLoadDerivedSampleList',
    name: 'dontLoadDerivedSampleList',
    component: DontLoadDerivedSampleList
  },
  {
    path: '/dontLoadShareFactory',
    name: 'dontLoadShareFactory',
    component: DontLoadShareFactory
  }
]
