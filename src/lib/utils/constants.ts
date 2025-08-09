interface NavbarListItemProps {
  label: string;
  href: string;
}

export const NavbarListItem: NavbarListItemProps[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Shop", href: "/shop" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact us", href: "/contact-us" },
];
