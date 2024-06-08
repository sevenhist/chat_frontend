import s from "./Menu.module.scss"
import logo from "../../img/logo.svg"
import Image from "next/image"
import world from "../../img/icons/world.svg"
import message from "../../img/icons/message.svg"
import video from "../../img/icons/video.svg"
import music from "../../img/icons/music.svg"
import settings from "../../img/icons/settings.svg"
import logout from "../../img/icons/logout.svg"
import calendar from "../../img/icons/calendar.svg"
import Link from "next/link"
import { ROUTES } from "../../routes/routes"
import useUserStore from "@/modules/userInformation/store"

export const Menu = () => {
    const logoutFunc = useUserStore(state => state.logout)
    const user = useUserStore(state => state.user)
    return (
        <nav className={s.navbar}>
            <ul className={s.navbar__list}>
                <ul className={s.navbar__underlist}>
                <li className={s.navbar__item}>
                    <Image className={s.navbar__logo} src={logo} alt="logo"/>
                </li>
                <li className={s.navbar__item}>
                    <Link className={s.navbar__profile} href={ROUTES.home}>{user?.email[0].toUpperCase()}</Link>
                </li>
                <span className={s.navbar__underline}></span>
                <li className={s.navbar__choice}>
                    <Image src={world} alt="icon" />
                </li>
                <li className={s.navbar__choice}>
                    <Image src={message} alt="icon" />
                </li>
                <li className={s.navbar__choice}>
                    <Image src={video} alt="icon" />
                </li>
                <li className={s.navbar__choice}>
                    <Image src={music} alt="icon" />
                </li>
                <li className={s.navbar__choice}>
                    <Image src={calendar} alt="icon" />
                </li>
                </ul>
                <ul className={s.navbar__undermenu}>
                    <li className={`${s.navbar__choice} ${s.choice}`}>
                        <Image src={settings} alt="icon" />
                    </li>
                    <button onClick={logoutFunc} className={`${s.navbar__choice} ${s.choice}`}>
                        <Image src={logout} alt="icon" />
                    </button>
                </ul>
            </ul>
        </nav>
    )
}