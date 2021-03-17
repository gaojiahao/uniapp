const BsProductDetails = () =>
  import(
    "@/views/bsPage/bsProductSearch/bsProductDetails/BsProductDetails.vue"
  );
export default {
  path: "/bsIndex/bsProductDetails",
  name: "bsProductDetails",
  component: BsProductDetails,
  meta: {
    keepAlive: true
  }
};
