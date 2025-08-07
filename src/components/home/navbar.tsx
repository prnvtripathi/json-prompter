"use client"

import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Logo from "../logo"
import { Hamburger } from "lucide-react"
import { usePathname } from "next/navigation"
import { ThemeToggleButton } from "../ui/theme-toggle-button"

const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/text-to-json", label: "Text to JSON" },
    { href: "/enhance", label: "Enhance" },
    { href: "/about", label: "About" },
]

export default function Navbar() {
    const pathname = usePathname()

    return (
        <header className="px-4 md:px-12 bg-transparent md:max-w-5xl xl:max-w-7xl mx-auto w-full fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
            <div className="flex py-2 items-center justify-between gap-4">
                {/* Left side - Logo */}
                <div className="flex items-center">
                    <Logo />
                </div>

                <div className="flex items-center gap-4 bg-transparent">
                    {/* Desktop Navigation menu */}
                    <NavigationMenu className="max-md:hidden">
                        <NavigationMenuList className="gap-2">
                            {navigationLinks.map((link, index) => {
                                const isActive = pathname === link.href
                                return (
                                    <NavigationMenuItem key={index}>
                                        <NavigationMenuLink
                                            href={link.href}
                                            className={`py-1.5 font-medium transition-colors ${isActive
                                                ? "text-primary"
                                                : "text-muted-foreground hover:text-primary"
                                                }`}
                                        >
                                            {link.label}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                )
                            })}
                            <NavigationMenuItem>
                                <ThemeToggleButton />
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Mobile menu trigger */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 md:hidden"
                                variant="ghost"
                                size="icon"
                                aria-label="Toggle navigation menu"
                            >
                                <Hamburger className="size-6 transition-transform group-data-[state=open]:rotate-360 duration-200" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-36 p-1 md:hidden">
                            <NavigationMenu className="max-w-none *:w-full bg-transparent">
                                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                                    {navigationLinks.map((link, index) => {
                                        const isActive = pathname === link.href
                                        return (
                                            <NavigationMenuItem key={index} className="w-full">
                                                <NavigationMenuLink
                                                    href={link.href}
                                                    className={`py-1.5 px-2 rounded-sm transition-colors w-full block ${isActive
                                                        ? "bg-accent text-primary"
                                                        : "hover:bg-accent"
                                                        }`}
                                                >
                                                    {link.label}
                                                </NavigationMenuLink>
                                            </NavigationMenuItem>
                                        )
                                    })}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </header>
    )
}