const BsProductSearchIndex = () =>
  import(
    "@/views/bsPage/bsProductSearch/bsProductSearchIndex/BsProductSearchIndex.vue"
  );
const BsProductDetails = () =>
  import(
    "@/views/bsPage/bsProductSearch/bsProductDetails/BsProductDetails.vue"
  );
export default [
  {
    path: "/bsIndex/bsProductSearchIndex",
    name: "bsProductSearchIndex",
    component: BsProductSearchIndex
  },
  {
    path: "/bsIndex/bsProductDetails",
    name: "bsProductDetails",
    component: BsProductDetails
  }
];
