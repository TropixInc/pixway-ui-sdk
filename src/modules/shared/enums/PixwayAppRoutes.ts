export enum PixwayAppRoutes {
  HOME = '/',
  ABOUT = '/about',
  TEAMS = '/teams',
  MARKETPLACE = '/marketplace',
  FAQ = '/faq',
  SIGN_UP = '/auth/signUp',
  SIGN_IN = '/auth/signIn',
  CONNECT_EXTERNAL_WALLET = '/auth/completeSignup/connectExternalWallet',
  REQUEST_PASSWORD_CHANGE = '/auth/changePassword/request',
  SIGN_UP_MAIL_CONFIRMATION = '/auth/verify-sign-up',
  MY_PROFILE = '/profile',
  RESET_PASSWORD = '/auth/changePassword/newPassword',
  TOKEN_DETAILS = '/tokens/{contractAddress}/{chainId}/{tokenId}',
  TOKENS = '/tokens',
  CHECKOUT_CONFIRMATION = '/checkout/confirmation',
  CHECKOUT_PAYMENT = '/checkout/payment',
  CHECKOUT_PROCESSING = '/checkout/processing',
  CHECKOUT_COMPLETED = '/checkout/completed',
  PROFILE = '/profile',
  MY_TOKENS = '/tokens',
  WALLET = '/wallet',
  SETTINGS = '/settings',
  HELP = '/help',
  TOKEN_PUBLIC = '/token/{contractAddress}/{chainId}/{tokenId}',
  TOKEN_PUBLIC_RFID = '/token/rfid/{rfid}',
  CONTACT_US = '/contact-us',
  TERMS_CONDITIONS = '/terms-and-conditions',
  PRIVACY_POLICY = '/privacy-policy',
  CONFIG = '/configurations',
}
