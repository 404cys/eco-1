import React from 'react'
import AdsSlider from './components/swiper/AdsSlider'
import ProductMens from './components/Product/Productscategories'
import SectionOFproduct from './components/Product/SectionOFproduct'
 
  
function page() {
  return (
    <>
    <div className=' dark:bg-gray-950  m-3'>
    <AdsSlider /> 
    <SectionOFproduct />
    <ProductMens /> 
    
    </div>
    </>
  )
}

export default page