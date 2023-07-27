import { useState,useEffect , useMemo, useRef } from "react";
import './listingpage.css'
import { useNavigate, useLocation } from "react-router-dom"

export default function ProductListingPage({dataCenter}){
    const [displayDataCenter , setdisplayDataCenter] = useState(dataCenter)

    return (
        <div className="listingPage-div">
            <FilterSection displayDataCenter={displayDataCenter} setdisplayDataCenter={setdisplayDataCenter} originalDataCenter={dataCenter} />

            <div className="listingPage-products">
                {displayDataCenter.map(data=>(<Product key={data.product_id} data={data}/>))}
            </div>
        </div>
    )
}

function FilterSection({displayDataCenter, setdisplayDataCenter , originalDataCenter}){
    const originalReviewArray = ["☆","☆","☆","☆","☆"]
    const [reviews , setreviews] = useState(originalReviewArray);
    const [sortbyvalue , setsortbyvalue] = useState('relevance');

    const newDataCenter = useMemo(()=>{
        console.log('newDataCenter is changed')
        if(sortbyvalue == 'relevance') return originalDataCenter;
        const temporaryDataCenter = [...displayDataCenter];
        temporaryDataCenter.sort((item1,item2)=>{
            const firstPrice = +(item1.product_price);
            const secondPrice = +(item2.product_price);
            if(sortbyvalue == 'hightolow') return (secondPrice - firstPrice)
            else if(sortbyvalue == 'lowtohigh') return (firstPrice - secondPrice)
        })
        return temporaryDataCenter;
    },[sortbyvalue])

    const currentReview = reviews.reduce((accumulator , item)=>{
        if(item == "★") return accumulator + 1;
        else if(item == "☆") return accumulator + 0;
    },0)

    useEffect(()=>{
        setdisplayDataCenter(newDataCenter.filter(data=> 
            (data.product_rating >= currentReview)));
    },[currentReview , newDataCenter])

    function handleReview(itemIndex){
        setreviews(prev=>prev.map(( item , index)=>
        (index+1 <= itemIndex) ? "★" : "☆" ))
    }
    
    
    return(
        <div className="listingPage-filterSection">
            <p className="filerSection-heading">
            ⚙️ Filters
            </p>
            <div className="listingPage-filterSection-options">
                <form action="">
                    <div className="listingPage-filterSection-sortby">
                        <p className="listingPage-filterSection-SortBy-title">Sort By</p>
                        <input type="radio" name="sortBy" id="low-to-high" value='lowtohigh' onClick={(e)=> setsortbyvalue(e.target.value)} />
                        <label htmlFor="low-to-high">Low To High</label> <br /> 
                    
                        <input type="radio" name="sortBy" id="high-to-low" value='hightolow' onClick={(e)=> setsortbyvalue(e.target.value)} />
                        <label htmlFor="high-to-low">High To Low</label> <br /> 

                        <input type="radio" name="sortBy" id="relevance" value='relevance' onClick={(e)=> setsortbyvalue(e.target.value)} />
                        <label htmlFor="relevance" >Relevance</label>

                    </div>

                    <div className="listingPage-filterSection-reviewsection">
                        <p className="listingPage-filterSection-review-title">
                        Reveiws 

                        </p>
                        <div className="listingPage-filterSection-reviews">
                            {reviews.map((item,index)=>
                                <div key={index} className="listingPage-filterSection-review" onClick={()=>handleReview(index+1)} >
                                    {item}
                                </div>
                            )}
                        </div>
                        
                        
                            
                    </div>
                </form>
            </div>
        </div>

    )
}


function Product({data}){
    const Id = data.product_id;
    const title = data.product_name;
    const navigate = useNavigate();


    function handleProductClick(){
        if(Id){
            navigate('/product/' + title + '-' + Id, {state:{data:{data}}})
        }

    }
    return (
        <div className="listingPage-product" onClick={()=>handleProductClick()}>
            <ProductImage images={data.product_images} Id={data.product_id}/>

            <ProductDescription title={data.product_name} attributes={data.product_adjectives} price={data.product_price} delivery={data.product_delivery} reviews={data.product_rating} />
            
        </div>
    )
}

function ProductImage({images,Id}){
    const [image , setimage] = useState(0);
    const imageRef = useRef(null);

    useEffect(()=>{
        const theImage = imageRef.current;
        theImage.addEventListener('mouseenter',()=>{setimage(1)})
        theImage.addEventListener('mouseleave',()=>{setimage(0)})
        return ()=>{
            theImage.removeEventListener('mouseenter',()=>{setimage(1)})
            theImage.removeEventListener('mouseleave',()=>{setimage(0)})
        }

    },[])
    return(
        <div className="listingPage-product-image-div">
            <img src={images[image]} alt="" ref={imageRef}  className="listingPage-product-image" />
        </div>
    )
}

function ProductDescription({title,attributes,price  , delivery, reviews}){
    return (
        <div className="listingPage-product-descriptionContent">
            <div className="titleandprice">
                <p className="listingPage-product-Title">
                    {title} 
                </p>

                <p className="listingPage-product-price">
                ₹ {+price}
                </p>
            </div>
            

            <p className="listingPage-product-deliveryDetails">
                {delivery}
            </p>

            <p className="listingPage-product-reviews">
                Ratings : {
                    [1,2,3,4,5].map(item=>( (item <= reviews) ? "★" : "☆"))
                }
            </p>

            {/* <p className="listingPage-product-Attributes">
                {attributes.map((each,index)=>(
                    <div key={index} className="listingPage-product-attributes">
                        * {each}
                    </div>
                ))}
            </p> */}

        </div>
    )
}