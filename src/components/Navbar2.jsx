'use client';

import { Button, Navbar } from 'flowbite-react';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuthService from "../services/authService"
import CustomBlue from './buttons/CustomBlue'
import CustomPurple from './buttons/CustomPurple'

export default function Component() {

    const [currentUser, setCurrentUser] = useState("");
    const user = AuthService.getCurrentUser();

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
        } else {
            setCurrentUser(null);
        }
    }, []);

    const logOut = () => {
        AuthService.Logout();
        setCurrentUser(null);
    };

    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="/">
                <span className="h-6" alt="Flowbite Logo">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 16.5c0-1-8-2.7-9-2V1.8c1-1 9 .707 9 1.706M10 16.5V3.506M10 16.5c0-1 8-2.7 9-2V1.8c-1-1-9 .707-9 1.706" />
                    </svg>
                </span>
                <span className="ml-2 self-center text-2xl font-semibold whitespace-nowrap dark:text-white hover:text-blue-700">Biblioteca Imaginação</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {currentUser ? (

                    <div className="navbar-nav ms-auto">

                        <Link to={`/profile`}>
                            <CustomBlue title={currentUser.user.username} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" />
                        </Link>

                        <Link to={'/'}>
                            <CustomPurple func={logOut} title={'logout'} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" />
                        </Link>

                    </div>

                ) : (
                    <div className="navbar-nav ms-auto">
                        <Link to={'/login'}>
                            <CustomBlue title={'Login'} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" />
                        </Link>
                    </div>
                )}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/authors">Autores</Navbar.Link>
                <Navbar.Link href="/books">Livros</Navbar.Link>
                <Navbar.Link href="/bookshelves">Estantes</Navbar.Link>
                {currentUser && currentUser.user.is_admin == 1 && (
                    <Navbar.Link href="/customers">Clientes</Navbar.Link>
                )}
                {currentUser && currentUser.user.is_admin == 1 && (
                    <Navbar.Link href="/rents">Aluguéis</Navbar.Link>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}
