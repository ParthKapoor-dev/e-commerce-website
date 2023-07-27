import { useEffect, useState } from "react";
import thelogo from '../images/thekapoorstore.png'
import './navbar.css'
import { useNavigate } from "react-router-dom"
export default function NavBar() {
    const navigate = useNavigate();
    // const [searchinput, setsearchinput] = useState('');

    // function handleSearchButton(e) {
    //     e.preventDefault();
    //     // if(searchinput){
    //     // navigate('productlistingpage',{state:{searchinput}});
    //     // setsearchinput('');

    //     // }
    // }
    function handlehomepagebtn() {
        navigate('/')
    }
    function handlecartpagebtn() {
        navigate('user/cart')
    }

    useEffect(()=>{
        const homepage = document.querySelector('.homepage-p');
        const searchbar = document.querySelector('.searchBar-p');
        const cartpage = document.querySelector('.cartpage-p');
        const login = document.querySelector('.login-p')
        function handleHover(event){
            const OriginalText = event.target.dataset.value;
            const OriginalLength = OriginalText.length;
            const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const alphabetsArray =  alphabets.split('')
            


            for(let index = 0 ; index <= OriginalLength ; index++){
                        let arr = [];
                        arr.push(OriginalText.slice(0,index))
                        for(let i = 0 ; i < OriginalLength - index;i++)
                        arr.push(alphabetsArray[Math.floor(Math.random()*25)])
                        setTimeout(()=>{
                            event.target.innerHTML = arr.join('')
                        }, 80*index)
            }


        }
        homepage.addEventListener('mouseenter',handleHover)
        cartpage.addEventListener('mouseenter',handleHover)
        login.addEventListener('mouseenter',handleHover)
        searchbar.addEventListener('mouseenter',handleHover)

        return()=>{
            homepage.removeEventListener('mouseenter',handleHover)
            cartpage.removeEventListener('mouseenter',handleHover)
            login.removeEventListener('mouseenter',handleHover)
            searchbar.removeEventListener('mouseenter',handleHover)

        }
    })
    return (
        <nav>
            {/* <input type="text" autoComplete="off" id="search-input" className="search-input" value={searchinput} onChange={(e)=>setsearchinput(e.target.value)} />

            <button className="search-btn" onClick={(e)=>handleSearchButton(e)}>Search</button> */}


            <div className="logo">
                <img src={thelogo} alt="The Kapoor Store" onClick={handlehomepagebtn} />
            </div>
            <div className="navbar-items">
                <p className="homepage-p" onClick={handlehomepagebtn} data-value='HOME🏠'>HOME🏠</p>
                <p className="searchBar-p" data-value="SEARCH🔍">SEARCH🔍</p>
                <p className="cartpage-p" onClick={handlecartpagebtn} data-value="CART🛒">CART🛒</p>
                <p className="login-p" data-value="LOGIN👤">LOGIN👤</p>
            </div>

        </nav>
    )
}