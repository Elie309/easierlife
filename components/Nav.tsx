'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

import TodoSVGComponent from './svg/TodoSVGComponent'


const links = [
    {
        href: '/',
        label: 'Home'
    },
    {
        href: '/about',
        label: 'About'
    },
    {
        href: '/login',
        label: 'Login'
    },
]

function Nav() {

    let [isOpen, setIsOpen] = React.useState(false)

    const pathname = usePathname();
    let path = pathname?.split('#')[0].split('?')[0];

    return (

        <nav className="bg-skin-fill drop-shadow-sm px-2 sm:px-4 py-4 ">

        <div className="container flex flex-wrap items-center justify-between mx-auto">

          <a href="/" className="flex items-center">
            <TodoSVGComponent
              className="w-8 h-8 mr-2"
              fillPrimary='fill-skin-primary'
              fillSecondary='fill-skin-secondary'
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-skin-base">EasierLife</span>
          </a>
          <button
            type="button"
            className="inline-flex items-center 
                      p-2 ml-3 text-sm 
                      text-skin-muted
                      rounded-lg md:hidden
                      focus:outline-none focus:ring-2 focus:ring-inset focus:ring-skin-secondary"
            aria-expanded="false"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
          <div className={`${isOpen ? "" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 
                          shadow-md rounded-lg bg-skin-fill 
                          md:flex-row md:space-x-8 md:mt-0 
                          md:text-sm md:font-medium md:border-0
                          md:shadow-none md:bg-transparent md:p-0">

              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`block py-2 pl-3 pr-4 
                          text-skin-base rounded-lg
                          md:hover:bg-transparent 
                          md:border-0 md:rounded-none
                          md:p-0 text-lg
                          ${link.href === path ? 
                            "bg-skin-fill-inverted text-skin-white md:text-skin-inverted md:bg-transparent" : 
                            "hover:bg-skin-fill-muted md:hover:text-skin-muted "}
                          `}>
                    {link.label}
                  </a>
                </li>

              ))}


            </ul>
          </div>
        </div>
      </nav>

    )
}

export default Nav;
