import { NavLink } from 'react-router'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface Navlink {
  id: number
  path: string
  text: string
}
const navLinks = [
  { id: 1, path: '/', text: 'home' },
  { id: 2, path: '/products', text: 'products' },
  { id: 3, path: '/categories', text: 'categories' }
]

export default function Navbar() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {navLinks.map((navLink: Navlink) => (
          <NavigationMenuItem key={navLink.id}>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <NavLink to={navLink.path} className='capitalize'>{navLink.text}</NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
