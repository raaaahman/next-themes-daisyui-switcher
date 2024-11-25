EDIT: There is a way simpler solution in Tailwind CSS 3.4 and higher, based upon the [selector strategy](https://tailwindcss.com/docs/dark-mode#customizing-the-selector), as described in [this comment.](https://github.com/saadeghi/daisyui/discussions/441#discussioncomment-9123782).

This is a sample project to showcase how to use [next-themes](https://github.com/pacocoursey/next-themes) along with [Daisy UI](https://daisyui.com/).

My issue was to use one of Daisy UI premade themes for both light and dark mode, using the browser preferences as default value, allowing to be overriden by using Daisy UI's theme controller, and having the ability to use Tailwind's `dark` modifier for occasional elements.

It is built upon a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

If you use this repository as an inspiration, please verify that your Next.Js, next-themes, Tailwind CSS and Daisy UI packages versions correspond to the one used here.

## Tailwind's configuration

The important part is to set the `darkMode` property to `'class'` of Tailwind's configuration, otherwise Tailwind will use the vendor settings to choose between light and dark theme.

`/tailwind.config.js`

```typescript
const config: Config = {

  // ...

  daisyui: {
    // Optional. We can tell Daisyui to load only the themes we need to reduce the bundle size.
    themes: ['fantasy', 'night'],
  },
  // This is necessary.
  darkMode: 'class'
}
```

## The ThemeProvider

next-themes uses a `ThemeProvider` component to assigns the theme to the root `<html>` element (even if it's a level below that element). This is a **client component**.

Unlike Tailwind that watch for a class name (because of the configuration we wrote earlier), Daisy UI watches for the `data-theme` attribute instead. Fortunately, that's the default attribute that next-themes' ThemeProvider will uses.

`/app/providers.tsx`

```typescript
'use client'

export default function Providers({ children }: PropsWithChildren){
  /* Mapping our preferred Daisyui themes to the light and dark values will not only allow us to use next-themes detection of vendor settings,
  it will also allow us to change those themes only in this component, and keep the 'light' and 'dark' keywords everywhere in the application */
  return <ThemeProvider value={{ light: 'fantasy', dark: 'night' }}>{children}</ThemeProvider>
}
```

We could keep the default `'light'` and `'dark'` themes from Daisy UI, which matches the keywords from both the `color-scheme` CSS property and Tailwind's expected classes. 

But we may also prefers to use other Daisy UI themes, in this casse, it is easier to map theme names in the `value` prop of the `ThemeProvider` component and to refers to them only using the `'light'` and `'dark'` keywords in other parts of the application.

## The ThemeController

Such other parts of the application may very well be a `ThemeController` component built using [the helpful Daisy UI styles](https://daisyui.com/components/theme-controller/). This MUST BE a client component as well:

`/app/_components/ThemeController.tsx`

```typescript
'use client'

import { useTheme } from "next-themes";

export function ThemeController() {
  const { theme, setTheme } = useTheme()
  
  const toggleTheme = () => {
    // This will change the Daisyui theme through next-theme
    setTheme(theme === 'light' ? 'dark' : 'light')
    // Then we still need to tell Tailwind if we're using a light or dark theme to use Tailwind's 'dark:' modifier 
    document.documentElement.classList.remove(theme === 'light' ? 'light' : 'dark')
    document.documentElement.classList.add(theme === 'light' ? 'dark' : 'light')
  }

  return <label className='swap swap-rotate' title={theme === 'fantasy' ? 'Switch to Dark' : 'Switch to Light'}>
    {/* Daisy UI already assigns an click event listener to the component, we MUST listen for the change event in the input to not duplicated calls while both event runs. */}
    <input type='checkbox' className='theme-controller' value="night" onChange={toggleTheme}/>

    {/* See Daisy UI's documentation for the full component. */}

  </label>;
}
```

We need to update _both_ the `data-theme` attribute of the root `<html>` element for Daisy UI to consider the correct theme (which is done under the hood by next-themes), we can use the `'light'` and `'dark'` keywords when we communicate to next-themes because we mapped them to the desired Daisy UI themes previously.

But we also need to update the `class` attribute for Tailwind to correctly interpret the `dark` modifier when we use it for specific elements (most colors are given by the theme, but we may need some adjustments, for examples for shadows and borders). We use the `'light'`and `'dark'`keywords again, because it's what Tailwind is looking for.

## The layout

The layout is where we wrap everything in place so it is consistent throughout our whole application. It imports the client components while still being a **server-side component**. As long as we [pass server components as props to client components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#supported-pattern-passing-server-components-to-client-components-as-props) all of the rendering is going to be optimized by Next.js.

`/app/layout.js`

```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    /* Both next-themes and our own script will modify the root element in the client,
    we should then deactivate hydration mismatch warnings. */
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* next-themes uses the color-scheme CSS property to differentiate light and dark themes,
        but Tailwind is watching for a CSS class. */}
        <Script id="theme-detector">{`
          const theme = document.documentElement.style.colorScheme
          document.documentElement.classList.add(theme)
        `}</Script>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

We still have a last task, which is to set the correct value for the root element's `class` attribute upon first render of the page. next-themes takes care of the `data-theme` for us, so Daisy UI pciks the correct theme, and it also sets the `color-scheme` property for that same root element. 

Tailwind doesn't make use of that property, so we MUSt copy its value and set it as a class name instead, and Tailwind now correctly interprets the `dark` modifier whenever we use it.
