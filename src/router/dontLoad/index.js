const DontLoadDerivedSampleList = () => import('@/components/dontLoad/dontLoadDerivedSampleList/dontLoadDerivedSampleList.vue')
const DontLoadShareFactory = () => import('@/components/dontLoad/dontLoadShareFactory/dontLoadShareFactory.vue')
const DontLoadAllProducts = () => import('@/components/dontLoad/dontLoadAllProducts/dontLoadAllProducts.vue')
const DontLoadProductDetails = () => import('@/components/dontLoad/dontLoadProductDetails/dontLoadProductDetails.vue')

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
  },
  {
    path: '/dontLoadAllProducts',
    name: 'dontLoadAllProducts',
    component: DontLoadAllProducts
  },
  {
    path: '/dontLoadProductDetails',
    name: 'dontLoadProductDetails',
    component: DontLoadProductDetails
  }
]
