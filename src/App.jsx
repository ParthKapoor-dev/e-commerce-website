import {Route , Routes} from "react-router-dom"
import dataCenter from '../data.json'

import NavBar from "./NavBar/NavBar"
import ProductListingPage from "./Pages/Product Listing Page/Product listing page"
import ProductPage from "./Pages/Product Page/Product Page"
import CartPage from "./Pages/Cart/Cart Page"



// some example themes :- https://themes.shopify.com/themes/impact/styles/sound/preview?catalog-size%5B%5D=10-to-199-products&surface_inter_position=1&surface_intra_position=4&surface_type=all

// another:- https://themes.shopify.com/themes/be-yours/styles/dark/preview?surface_detail=electronics&surface_inter_position=1&surface_intra_position=6&surface_type=industry

// STEPS :- 
/* 

  Making filters on the side : categories , price , brand , customer rating etc
  Review percentage
  Search System
  Styling
  Wishlist
  Landing Page



  TO WORK ON THESE
  UPWORK freelancing work 
  making my portfolio and profile
  adding projects in github repo and profile of upwork
  HABIT making 
  e commerce website making 
  react hooks 
  redux
  backend development
  

*/
export default function App(){
  return (
    <>
    <NavBar/>
    <Routes>
      {/* <Route path="/" element={<LandingPage/>}/>  */}
      <Route path="/" element={<ProductListingPage dataCenter={dataCenter}/>}/>
      <Route path="/product/:ProductId" element={<ProductPage dataCenter={dataCenter}/>}/>
      <Route path="/User/cart" element={<CartPage />} />
    </Routes>
    </>
  )
}

