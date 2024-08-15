"use client";

import React, { useState } from 'react';
import { IoMdCart } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Link from 'next/link';
import { useCart } from '../context/cartContext';
import './Header.css';

export default function Header({ itemCount }) {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <header className="header">
            <Link href='/'>
                <div className="logo">
                    <FaCartShopping />
                    <h2>Splendo</h2>
                </div>
            </Link>
            <div className="search-bar">
                <input type="text" placeholder="Search for products, brands and more" />
                <button><FaSearch /></button>
            </div>
            <div className="menu">
                <div className={`hamburger-menu ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={`menu-items ${menuActive ? 'active' : ''}`}>
                    <button className="become-seller-button">Become a Seller</button>
                    <button className="more-button">More</button>
                    <Link href="/cart">
                        <div className="cart">
                            <IoMdCart size={20} />
                            <span>Cart</span>
                            {itemCount >= 1 ? <span className="cart-count" data-count={itemCount}></span> : ''}
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}
