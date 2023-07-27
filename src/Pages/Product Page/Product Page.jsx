import { useAsyncError, useLocation, useNavigate, useParams } from "react-router-dom"
import './productpage.css'
import { useEffect, useState } from "react";


export default function ProductPage() {
    
    const location = useLocation();
    const data = location.state.data.data;

    return (
        <div className="productPage-background-div">
            <div className="productPage-div">
            <ProductImageSection images={data.product_images} />

            <ProductContentSection data={data} />

        </div>
        </div>
        
    )
}
function ProductImageSection({ images }) {
    useEffect(()=>{
        const imagelist = document.querySelectorAll('.productPage-ImageSelect');
        const titleImagecontainer = document.querySelector('.productPage-imagesContainer')
        function handleHover(event ){
            const index = event.target.dataset.index;
            titleImagecontainer.style.transform = `translateX(-${20*index}%)`
        }
        imagelist.forEach(image=>image.addEventListener('mouseenter',handleHover));
        return ()=>{
            imagelist.forEach(image=>image.removeEventListener('mouseenter',handleHover));
    }},[])
    return (
        <div className="productPage-ImageSection">
            <div className="productPage-ImageSelectSection">
                {images.map((image, index) =>
                    (<ImageSelect image={image} key={index} index={index} />)
                )}

            </div>
            
            <div className="productPage-TitleImage">
                <div className="productPage-imagesContainer" style={{display: "flex"}}>
                    {images.map((image, index)=>(
                        <img src={image} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function ImageSelect({ image , index }) {
    return (
        <div className="productPage-ImageSelect" data-index={index} >
            <img src={image} alt="" />
        </div>
    )
}

function ProductContentSection({ data }) {
    return (
        <>
            <div className="productPage-ContentSection">
                <ProductContents data={data} />
                <ProductBuyingSection data={data} />
                <ProductDeliveryDetails delivery={data.product_delivery}/>

            </div>

        </>
    )

}

function ProductContents({ data }) {
    return (
        <div className="productPage-contents">
            <div className="productPage-content-attributes">
                {data.product_adjectives.map((each,index)=>(
                    <p key={index} className="productPage-content-attributes-each">
                        {each}
                    </p>
                ))}
            </div>
            <div className="productPage-content-heading-div">
                <p className="productPage-content-heading-p">
                    {data.product_name}
                </p>
            </div>
            <div className="productPage-content-price-rating-div">
                <p className="productPage-content-price-p">
                ₹ {data.product_price}
                </p>
                <p className="productPage-content-reviews-p">
                {
                    [1,2,3,4,5].map(item=>( (item <= data.product_rating) ? "★" : "☆"))
                }
                </p>
            </div>
            <div className="divider"></div>
            <div className="productPage-content-description-div">
                <p className="productPage-content-description-p">
                    {data.product_description}
                </p>
            </div>
        </div>
    )
}

function ProductBuyingSection({data}) {
    const  [quantity, setquantity] = useState(1)
    const navigate = useNavigate();
    function handlequantityplus(){
        setquantity(quantity+1)
    }
    function handlequnatityminus(){
        if(quantity!=1) 
        setquantity(quantity-1)
    }
    function handleCartButton(){
        navigate('/user/cart' , {state:{data,quantity}})
    }

    return (
        <div className="productPage-purchasing">
            <div className="productPage-content-quantity-div">
                <p className="productPage-content-quantity-p">
                    Quantity : 
                </p>
                <div className="productPage-content-quality-buttons">
                <div className="productPageQuantityBox-minus" onClick={handlequnatityminus}>
                    -
                </div>
                <div className="productPageQuantity">
                    {quantity}
                </div>
                <div className="productPageQunatityBox-plus" onClick={handlequantityplus}>
                    +
                </div>
                
                </div>
                
            </div>

            <div className="productPage-content-cart-buyNow-buttons">
                <button onClick={handleCartButton}>Add to Cart</button>
            </div>
        </div>
    )
}

function ProductDeliveryDetails({delivery}){
    return (
        <div className="productPage-deliveryDetails">
            {delivery}
        </div>
    )   
}