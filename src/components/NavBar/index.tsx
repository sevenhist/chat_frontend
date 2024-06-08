'use client'
import { FC, useState } from "react"
import React from "react"
import s from "./Navbar.module.scss"
import { NavbarProps, valueInItems } from "@/types/navbar"

export const Navbar: FC<NavbarProps<valueInItems>> = ({ items }) => {
    
    const [searchValue, setSearchValue] = useState('');

    return (
        <nav className={s.menu}>
            <div className={s.menu__title_and_input}>
                <h1 className={s.menu__title}>Messages</h1>
                <div className={s.menu__search}>
                    <span className={s.menu__icon}></span>
                    <input value={searchValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)} type="text" placeholder="Search" className={s.menu__input} />
                </div>
            </div> 
            <ul className={s.menu__list}>
                {
                    items.filter((item) => item.title.toLowerCase().startsWith(searchValue.toLowerCase())).map((item, index) => (
                        <li key={index} className={s.menu__item}>
                            <img className={s.menu__user__photo} src={item.image} />
                            <div className={s.menu__information}>
                                <h3 className={s.menu__user__title}>{item.title}</h3>
                                <p className={s.menu__user__text}>{item.subtitle}</p>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}