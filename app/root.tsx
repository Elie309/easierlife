import type { MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./styles/app.css";



import Nav from "~/components/Nav";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "EasierLife",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

//export scripts
// export function scripts() {
//   return [
//     {
//       src: "./scripts/nav.ts",
//     },
//   ];

export default function App() {
  return (
    <Document>
      <Nav />
      <Outlet />
    </Document>
  );
}

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="theme-dark bg-skin-fill">
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>

  );
}

function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <h1>Something went wrong</h1>
      <pre>{error.message}</pre>
    </Document>
  );
}

export function CatchBoundary() {

  // const caught = useCatch();

  return (
    <Document>
      <div className="bg-indigo-900 relative overflow-hidden h-full">
        <img
          src="https://external-preview.redd.it/4MddL-315mp40uH18BgGL2-5b6NIPHcDMBSWuN11ynM.jpg?width=960&crop=smart&auto=webp&s=b98d54a43b3dac555df398588a2c791e0f3076d9"
          className="absolute h-full w-full overflow-hidden object-cover"
        />
        <div className="relative block z-10">
          <div className="w-full h-full flex flex-col items-center relative z-10">
            <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
              You are all alone here
            </h1>
            <p className="font-extrabold text-8xl my-36 text-white animate-bounce">
              404
            </p>

            <Link to="/" className="p-4 bg-skin-fill-inverted text-white">Go Home</Link>
          </div>
        </div>
      </div>
    </Document>
  );
}

