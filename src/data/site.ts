import brandLogo from "@/assets/images/Brand-Logo.png";
import brandLogoWhite from "@/assets/images/Brand-Logo-White.png";
import logo1 from "@/assets/images/Logo-Marquee-Image-1.svg";
import logo2 from "@/assets/images/Logo-Marquee-Image-2.svg";
import logo3 from "@/assets/images/Logo-Marquee-Image-3.svg";
import logo4 from "@/assets/images/Logo-Marquee-Image-4.svg";
import logo5 from "@/assets/images/Logo-Marquee-Image-5.svg";
import favicon from "@/assets/images/favicon.png";
import ogImage from "@/assets/images/open-graph-image.jpg";

export const siteMeta = {
  title: "Influvo | Influencer Marketing Astro Theme",
  description:
    "Production-ready Astro marketplace theme for influencer marketing websites, rebuilt from the Influvo Webflow design.",
  favicon,
  ogImage,
  /** YouTube video ID used in the hero and about page video modals. Replace with your own. */
  videoId: "pLgPFfFdpDs",
  /** Google Maps embed URL used on the contact page. Replace with your own embed URL. */
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211072.16594427724!2d-118.6919200853515!3d34.02073494890972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fef1de0f0b2d7!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1713200000000!5m2!1sen!2s"
};

export const homeLinks = [
  { href: "/", label: "Home One" },
  { href: "/home-2/", label: "Home Two" }
];

export const navLinks = [
  { href: "/about/", label: "About" },
  { href: "/services/", label: "Services" },
  { href: "/blog/", label: "Blog" }
];

export const pageLinks = [
  { href: "/influencers/", label: "Influencers" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/team/", label: "Team" },
  { href: "/blog/influencer-engagement-everything-you-need-to-know/", label: "Blog Details" },
  { href: "/services/media-analytic/", label: "Service Details" },
  { href: "/sign-up/", label: "Sign Up" },
  { href: "/sign-in/", label: "Sign In" },
  { href: "/password-protected/", label: "Password Protected" },
  { href: "/404/", label: "Page Not Found" },
  { href: "/style-guide/", label: "Style Guide" },
  { href: "/changelog/", label: "Changelog" },
  { href: "/licenses/", label: "Licenses" },
  { href: "/contact/", label: "Contact Us" },
];

export const footerMenus = {
  menu: [
    { href: "/", label: "Home" },
    { href: "/about/", label: "About" },
    { href: "/services/", label: "Services" },
    { href: "/pricing/", label: "Pricing" },
    { href: "/blog/", label: "Blog" }
  ],
  utility: [
    { href: "/password-protected/", label: "Password Protected" },
    { href: "/404/", label: "Not Found" },
    { href: "/style-guide/", label: "Style Guide" },
    { href: "/changelog/", label: "Changelog" },
    { href: "/licenses/", label: "Licenses" }
  ],
  social: [
    { href: "#", label: "Facebook" },
    { href: "#", label: "Instagram" },
    { href: "#", label: "Linkedin" },
    { href: "#", label: "Twitter (X)" }
  ]
};

export const logo = {
  dark: brandLogo,
  light: brandLogoWhite
};

export const marqueeLogos = [
  { src: logo1, alt: "Company logo one" },
  { src: logo2, alt: "Company logo two" },
  { src: logo3, alt: "Company logo three" },
  { src: logo4, alt: "Company logo four" },
  { src: logo5, alt: "Company logo five" }
];
