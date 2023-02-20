import { Link, useNavigation } from "@remix-run/react";
import { useLocation } from 'react-router-dom';
import EasierLifeLogo from './EasierLifeLogo'

interface link {
  href: string,
  label: string,
  show: boolean,
  showIfLoggedIn: boolean,
}

const links: link[] = [
  {
    href: '/',
    label: 'Home',
    show: true,
    showIfLoggedIn: true,
  },
  {
    href: '/about',
    label: 'About',
    show: true,
    showIfLoggedIn: true,
  },
  {
    href: '/login',
    label: 'Login',
    show: true,
    showIfLoggedIn: false,

  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    show: false,
    showIfLoggedIn: true,
  },
  {
    href: 'logout',
    label: 'Logout',
    show: false,
    showIfLoggedIn: true,
  },

]

export default function Nav(): JSX.Element {


  const pathname = useLocation().pathname;
  let path = pathname?.split('#')[0].split('?')[0] || '/';

  

  return (

    <nav className="bg-skin-fill drop-shadow-sm px-2 sm:px-4 py-4 ">

      <div className="container flex flex-wrap items-center justify-between mx-auto">

        <a href="/" className="flex items-center">
          <EasierLifeLogo
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
            document.getElementById('navbar-default')?.classList.toggle('hidden')
          }}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
        </button>
        <div id="navbar-default" className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-col p-4 mt-4 
                          shadow-md rounded-lg bg-skin-fill 
                          md:flex-row md:space-x-8 md:mt-0 
                          md:text-sm md:font-medium md:border-0
                          md:shadow-none md:bg-transparent md:p-0">

            {links.map((link) => {


                // if (link.show) {

                //   if (!link.showIfLoggedIn && userLoggedIn) {
                //     return null;
                //   }
                //   return <LinkComponent key={link.label} link={link} path={path} />;

                // } else if (link.showIfLoggedIn && !userLoggedIn) {
                //   return null;
                // } else if (link.showIfLoggedIn && userLoggedIn) {
                //   return <LinkComponent key={link.label} link={link} path={path} />
                // } else {
                //   return null;
                // }

              return <LinkComponent key={link.label} link={link} path={path} />
            })}

          </ul>


        </div>
      </div>
    </nav>

  )
}

function LinkComponent(props: { link: link, path: string }) {

  return (
    <li key={props.link.href}>
      <Link
        to={props.link.href}
        className={`block py-2 pl-3 pr-4 
          text-skin-base rounded-lg
          md:hover:bg-transparent 
          md:border-0 md:rounded-none
          md:p-0 text-lg
          ${props.path.toLowerCase() === props.link.href.toLowerCase() ? 
            'bg-skin-fill-inverted text-skin-white md:text-skin-inverted md:bg-transparent' :
             'hover:bg-skin-fill-muted md:hover:text-skin-muted'}
          `}>
        {props.link.label}

      </Link>
    </li>
  )

}
