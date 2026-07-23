import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import urTranslation from './locales/ur.json';

// Static fallback dictionary for instant readable English text if a key is missing
const fallbackDictionary = {
  'nav.home': 'Home',
  'nav.men': "Men's Collection",
  'nav.women': "Women's Couture",
  'nav.kids': "Kids' Line",
  'nav.new_arrivals': 'New Arrivals',
  'nav.sale': 'Sale',
  'nav.about': 'About Sagarm',
  'nav.contact': 'Contact Us',
  'nav.faq': 'FAQ',
  'nav.search_placeholder': 'Search luxury attire, dresses, suits...',
  'nav.wishlist': 'Wishlist',
  'nav.cart': 'Cart',
  'nav.login': 'Login',
  'nav.signup': 'Sign Up',
  'nav.account': 'My Account',
  'nav.admin': 'Admin Dashboard',
  'nav.logout': 'Logout',

  'hero.tagline': 'Exclusive Luxury Collection 2026',
  'hero.title': 'Timeless Elegance & Handcrafted Luxury',
  'hero.subtitle': "Discover Sagarm's bespoke haute couture and opulent Eastern wear.",
  'hero.shop_now': 'Explore Collection',
  'hero.view_sale': 'View Sale Items',

  'button.shop_now': 'Explore Collection',
  'button.view_sale': 'View Sale Items',
  'button.buy_now': 'Buy Now',
  'button.add_to_cart': 'Add To Cart',
  'button.apply': 'Apply',
  'button.checkout': 'Proceed to Checkout',
  'button.place_order': 'Place Order Now',

  'categories.title': 'Featured Collections',
  'categories.subtitle': 'Curated perfection for every royal wardrobe',

  'products.add_to_cart': 'Add To Cart',
  'products.buy_now': 'Buy Now',
  'products.in_stock': 'In Stock',
  'products.out_of_stock': 'Out of Stock',

  'cart.title': 'Your Shopping Cart',
  'cart.empty_title': 'Your Cart is Empty',
  'cart.empty_msg': "Explore Sagarm's exclusive collections and elevate your style.",
  'cart.start_shopping': 'Start Shopping',
  'cart.subtotal': 'Subtotal',
  'cart.order_total': 'Total Amount',

  'footer.about': 'About Sagarm',
  'footer.about_brand': 'Sagarm is an exclusive fashion house dedicated to pure luxury and contemporary elegance.',
  'footer.quick_links': 'Quick Links',
  'footer.customer_care': 'Customer Care',
  'footer.newsletter_title': 'Join the Sagarm Club',
  'footer.newsletter_desc': 'Subscribe to receive private collection previews and discounts.',
  'footer.rights': 'All Rights Reserved. Sagarm Fashion Store.'
};

function formatKeyToReadableText(key) {
  if (!key || typeof key !== 'string') return '';
  if (fallbackDictionary[key]) {
    return fallbackDictionary[key];
  }
  const parts = key.split('.');
  const lastPart = parts[parts.length - 1];
  return lastPart
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ur: { translation: urTranslation }
    },
    lng: 'en',
    fallbackLng: 'en',
    returnNull: false,
    returnEmptyString: false,
    parseMissingKeyHandler: (key) => formatKeyToReadableText(key),
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
