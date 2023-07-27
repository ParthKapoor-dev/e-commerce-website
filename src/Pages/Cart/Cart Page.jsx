    import { useLocation } from "react-router-dom"


    // What is State Management in React
    // All the hooks in React js , also make notes about them 
    // How to create custom react hooks

    import "./cartpage.css"
    import { useEffect, useState } from "react";
    export default function CartPage() {

        const [cart, setcart] = useState([])
        const [quantityList, setquantityList] = useState({})
        const location = useLocation();
        const data = location?.state?.data;
        const quantity = location?.state?.quantity;
        useEffect(() => {

            const oldData = JSON.parse(localStorage.getItem('DataToCart'));
            const oldQuantityList = JSON.parse(localStorage.getItem('quantity list'));
            if (oldData) {

                if (data && !(oldData.some(item => (item.product_id == data.product_id)))) {

                    const newData = [...oldData, data];
                    const newQuantityList = { ...oldQuantityList, [data.product_id]: quantity }
                    localStorage.setItem('DataToCart', JSON.stringify(newData));
                    localStorage.setItem('quantity list', JSON.stringify(newQuantityList))
                    setcart(newData)
                    setquantityList(newQuantityList)
                }
                else if(data) {
                    const newData = oldData;
                    const newQuantityList = { ...oldQuantityList, [data.product_id]: quantity }
                    localStorage.setItem('quantity list', JSON.stringify(newQuantityList))
                    localStorage.setItem('quantity list', JSON.stringify(newQuantityList))
                    setcart(newData);
                    setquantityList(newQuantityList)
                }
                else {
                    const newData = oldData;
                    const newQuantityList = oldQuantityList;
                    localStorage.setItem('DataToCart', JSON.stringify(newData));
                    localStorage.setItem('quantity list', JSON.stringify(newQuantityList))
                    setcart(newData);
                    setquantityList(newQuantityList)
                }
            } else {
                const newData = [data];
                const newQuantityList = { [data.product_id]: quantity }
                localStorage.setItem('DataToCart', JSON.stringify(newData));
                localStorage.setItem('quantity list', JSON.stringify(newQuantityList))
                setcart(newData)
                setquantityList(newQuantityList)

            }
        }, [])


        return (
            <>
                <div className="cartPage">
                    <div className="cartPage-productsContainer">

                        {cart.map((data) => (
                            <Product data={data} key={data.product_id} cart={cart} setcart={setcart} quantityList={quantityList} setquantityList={setquantityList} />
                        ))}

                    </div>

                    <BillingSection cart={cart} quantityList={quantityList} />
                </div>
            </>

        )
    }

    function BillingSection({ cart, quantityList }) {

        const [totalPrice, settotalPrice] = useState(0);

        useEffect(() => {
            if (cart.length != 0 && Object.keys(quantityList).length != 0) {

                const newPrice = cart.reduce((accumulator, item) => {
                    const singleItemPrice = +(item.product_price);
                    const quantity = quantityList[item.product_id];
                    const price = singleItemPrice * quantity;
                    return (accumulator + price);
                }, 0)
                console.log(newPrice)
                settotalPrice(newPrice)

            }else{
                settotalPrice(0);
            }

        }, [quantityList,cart])


        return (
            <div className="cartPage-billingSection">
                Subtotal ({cart.length}) items
                <div className="cartPage-billingSection-totalPrice">
                    Total : {totalPrice}
                </div>
            </div>
        )
    }
    function Product({ data, cart, setcart, quantityList, setquantityList }) {

        return (
            <div className="cartPage-Product">

                <CartImage image={data.product_images[0]} />

                <CartProductDescription name={data.product_name} price={data.product_price} />

                <CartQuantityAndPricing data={data} cart={cart} setcart={setcart} quantityList={quantityList} setquantityList={setquantityList} />

            </div>
        )
    }

    function CartImage({ image }) {
        return (
            <div className="cartPage-Product-image">
                <img src={image} alt="" />
            </div>
        )
    }

    function CartProductDescription({ name, price }) {
        return (
            <div className="cartPage-Product-description">
                <p className="cartPage-Product-name">
                    {name}
                </p>
                <p className="cartPage-Product-price">
                    {price}
                </p>
            </div>
        )
    }

    function CartQuantityAndPricing({ cart, setcart, data, quantityList, setquantityList }) {

        const quantity = quantityList[data.product_id];

        useEffect(() => {
            localStorage.setItem('quantity list', JSON.stringify(quantityList))

        }, [quantityList])


        function handleProductRemove() {
            const updatedCart = cart.filter(item => (item.product_id !== data.product_id));
            localStorage.setItem('DataToCart', JSON.stringify(updatedCart))
            setcart(updatedCart);
        }

        function handleplus() {
            const newQuantity = quantity + 1;
            setquantityList(prev => {
                return { ...prev, [data.product_id]: newQuantity }
            })
        }
        console.log(quantityList)
        function handleminus() {
            if (quantity != 1) {
                const newQuantity = quantity - 1;
                setquantityList(prev => {
                    return { ...prev, [data.product_id]: newQuantity }
                })
            }
            else {
                handleProductRemove();
            }
        }
        return (
            <>
                <div className="cartPage-Product-Buttons">
                    <div className="cartPage-Product-quantity-div">
                        <button className="quantityPlus" onClick={handleplus}>+</button>
                        <p className="cartPage-Product-quantity">{quantity}</p>
                        <button className="quantityMinus" onClick={handleminus}>-</button>
                    </div>
                    <button className="cartPage-Product-remove" onClick={handleProductRemove}>Remove</button>
                </div>

                <div className="cartPage-Product-totalPrice">
                    <p className="cartPage-Product-totalPrice-p">
                     ₹{quantity * data.product_price}
                    </p>
                </div>
            </>


        )
    }