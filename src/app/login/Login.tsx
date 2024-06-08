'use client'
import Link from "next/link"
import s from "./Login.module.scss"
import { ROUTES } from "../../routes/routes"
import { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from "react";
import useUserStore from "@/modules/userInformation/store";
import useToastStore from "@/modules/toastInformation/store";


interface FormData {
    email: string,
    password: string
}
interface LoginProps {
    
}

export const Login: FC<LoginProps> = () => {
    const fetchLogin = useUserStore(state => state.fetchLogin)
    const messages = useToastStore(state => state.messages)

    const user = useUserStore(state => state.user)

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        console.log("MEssages: ", messages)

        setFormData((prevFormData) => ({
            ...prevFormData,
            [inputName]: inputValue
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchLogin(formData.email, formData.password);
    };

    return (
        <div>
            <p>Login form</p>
            <div className={s.login__form}>
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button onClick={() => {
                    fetchLogin(formData.email, formData.password)
                }} type="button">Submit</button>
                <Link href={ROUTES.home}>To Home</Link>
            </div>
            <h2>User is: <p>{user?.email}</p></h2>
            <Link href={ROUTES.AUTH.registration}>To Registration</Link>
        </div>
    )
}