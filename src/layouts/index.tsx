'use client'
import s from "./MainLayout.module.scss"
import Link from "next/link"
import { ROUTES } from "../routes/routes"
import { valueInItems } from "@/types/navbar"
import { Menu } from "@/components/Menu"
import { Navbar } from "@/components/NavBar"
import useUserStore from "@/modules/userInformation/store"


export const MainLayout = () => {
    const items: valueInItems[] = [
        { id: 1, title: "Vadym", subtitle: "Hello, how are u?", image: "https://s3-alpha-sig.figma.com/img/1ee0/fd20/c87f9bbb6c093a60564c3f2303a4980c?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=duv9M9twmJY8GRRJLY4jQjO-19G7gERZlVBqvi-~ovfQR45QtuYRpwo0Q8Mn4wiQwjvlIcJ6JWfp5VLJ~77M~DCgPKnPfgauT-J8xn7f5jC4R9dZG49dw-yXiIgt~lAVnyQHWLHVymJyinlXmjYLKCA1~Pwu6G2HVmwgs5ZBfljsTV6ECqVN2IYozhxHeQSTtIAf8nmZbzk1OxPwup2o4HWEACCumaLMJl6yosz6fAaXjagluphGA2uyx9Z-UTYfAUdNOhWNyBzEZPSM-ET1YYuGa3FP7Rbpv40a5nw6sC-M9rJQmUqEN18CXMA3m31ckh658XGU48I8wrflixDK3Q__" },
        { id: 2, title: "Sebastian", subtitle: "Hi, are u ok?", image: "https://s3-alpha-sig.figma.com/img/b87c/422e/83966deab6433a138e30f9e6d53aa29f?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L1AC~mpp5LA6Dxm7uHgqzTc5dnUXDw1p~HCOvNV1PP79SJ0IYEld4W8wvSloMeXjTUBcqOi8UybatHWcUCndPUZdPcQXEwwP6FrBZg0VWM~bp2kppHiaHdtM-3JFxaAhwQZKxUaLZbzsl2nAwT0-jj4lxclkyXD16KLpiDC~ZX2KuAxntDhd80F-TfTm-ZpNIcJAHCRdvKyj67ayWwAxKlbldlyUtJvm3WylAe4V1UgtrPGw2IbeEtX3B8v0sAzNf8oCHpFg9N~8Tj9v3rbYFgOlQvrrOsoPIdUler0JLF8GVPfeHfhrizQKURkVJUGlw9d-IDsUJoxBWbx1iUhN0Q__" },
        { id: 3, title: "Ivan", subtitle: "Hallo alle die fleißig sind", image: "https://s3-alpha-sig.figma.com/img/277a/dbf8/35a6df1116def2e3dea36dcd8eeb95bc?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cb9I81LJuoqdqFnNwqUCt-lEg1T~PT3mSvnA2IStoIiZMS1o2wO9EJCmZXrxI5Y-3pV3sVzFeJedDiKF-p-YiNOdbVmqOcn3ensMBIdNw8S-bZETpu1eYoibxQCze-XOfZn7PTrhoc3VXwcOCnuvZmiESo5T~OWfUD3vRo1~twniUmAcZCFEsOtxPLL9gav0Uih3ykEfF9XypCndK6SmUZOmlQzQEnqJArofVHqQUv3oNM9Ba7O0-u6ktKmeryhO5FA1bA6oSj1xij~tcJt~ghEzc00s9jbE2pjwowyLL-PYeNeJwgPx0LBZhlAW0iJkCbyj1X5sC4U1MA2rJkgeWA__" },
        { id: 4, title: "John", subtitle: "Hello, what are u doing?", image: "https://s3-alpha-sig.figma.com/img/1bb0/e5c9/72571dce9359201fcaa22e8dca4e6d52?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=q4xUPoTvxEoePb-zRdIzANagqTp1ETP7s~QjPRRgLCq5IZ3epkEnJkQ7N1H1SYmB4wdKWmVR2-rUeygfsxTETWSKq5V5h7SHwamPTq4tVLxvF1mnPD~3JQhoCsZYkw8p1JMxMogXuODca7R1LRQtSnGb40pJ~pjFTJS2yhcUpn1MvpotoNPDbFdPqvOo6pZOefM5lT8BU2P1T~ephrl79v9IXPOxAiEBBpJKZVICBzjNitleQP8H~yBvjCMLBuHeY14lZrNPah2AwtnTC0TKpQoBQR2Gry19JGlNe0fPaRaAM79H1H2UEm6QAzITG-juMBJjNBqp7Y0hTMlVhfdPhw__" },
        { id: 5, title: "Rayan", subtitle: "Hallo, alles gut?", image: "https://s3-alpha-sig.figma.com/img/da57/3ae3/78a5d46916857299f76bdc063457be2f?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mBC0T3fFJK15oHl5tKRXtc2pkPgS9YWvaYNHQvIbxMwhRpjANtBIidA65xg6tLolRomcBsD6WIxt9m4IwnPlK2lP5FrBYNXwzyStOEcSPyEc6aBt0g9~~IWv8OKkLIK6h3d1EqJK~StjKzcYfpeSfDqUPIk-ze0IwVySceqpr0Dfv8Qcom3XqsCHa4zOmn3pqWflW5sj8KCuL8qNQdVqUyisr3ZB9vKpY9P3g~aaWLWqPts5VbBO5d8aR6ojcDDfxA3ua9kOHsbozkXEp5340dqOdlbJAvfTlnbZUlRa7SCxBsET-apNG1rF8e6rzDh3mf2Ny3ZdVhV7zmJCTAs1Aw__" },
        { id: 6, title: "Rostik", subtitle: "Hallo fruend", image: "https://s3-alpha-sig.figma.com/img/3148/cb93/354714c73b67ef7e698027a8c8384f7c?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EOUxt0qaQIsSzFnfcN7~c0~f7~M8s6pud-TElF~mClTl6CR~H8iY0EcH-3xKmhV1N9X0CtLbvXPGq1Lonhtv~4Qd~AQYEhNdjzqC6VIPtgALlz0PtinLZkHBZ2CmQbwKDASRHTW852AZaSMVRSQgC9XNtMqgOmeOg3Yh24e1UOGsBgI3es6aFwEHiGauCUxuFCo7zDJXI8PaKDMxELwCP1erpAABTqWUPajR37tykv4vczJcatQb05uT-hoOH3D5CYwBBKGVMzzX6qNUIc-9WZ-Sy~c2PWh2NRnZfLnT3YMvO6X3qaCw2Ycvm-lbZLi3HEkzx3vPw6LF0DRPJRPMXw__" }
    ]
    const isAuth = useUserStore(state => state.isAuth)

    console.log("This is isAuth: ", isAuth)
    return (
        <div className={s.main}>
            {
                isAuth ?
                (
                <div className={s.menu_and_navbar}>
                    <Menu />
                    <Navbar items={items} />
                </div>)
                : (
                    <div>
                        <p>You must register</p>
                        <Link href={ROUTES.AUTH.login}>To Login</Link>
                        <Link href={ROUTES.AUTH.registration}>To Registration</Link>
                    </div>
                )
            }
        </div>
    )
}