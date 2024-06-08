'use client'
import React, { useState, ChangeEvent, FormEvent, FC } from "react";
import Link from "next/link";
import s from "./Registration.module.scss";
import { ROUTES } from "../../routes/routes";
import useUserStore from "@/modules/userInformation/store";

// Define a type for the form data
interface FormData {
    name: string;
    last_name: string;
    email: string;
    password: string;
}

export const Registration: FC = () => {
    const fetchRegister = useUserStore(state => state.fetchRegistration)
    const user = useUserStore(state => state.user)

    const [formData, setFormData] = useState<FormData>({
        name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [inputName]: inputValue
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchRegister(formData.name, formData.last_name, formData.email, formData.password)
    };

    return (
        <div>
            <p>Registration form</p>
            <form onSubmit={handleSubmit} className={s.registration__form}>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                />
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
                <button type="submit">Submit</button>
            </form>
            <h1>User is: <p>{user?.email}</p></h1>
            <Link href={ROUTES.AUTH.login}>to Login</Link>
        </div>
    );
};
