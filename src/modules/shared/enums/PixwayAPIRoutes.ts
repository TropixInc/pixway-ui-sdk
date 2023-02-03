export enum PixwayAPIRoutes {
  COMPANY_BY_ID = 'companies/hosts/{companyId}',
  SIGN_IN = 'auth/signin',
  REQUEST_PASSWORD_CHANGE = 'auth/request-password-reset',
  RESET_PASSWORD = 'auth/reset-password',
  REFRESH_TOKEN = 'auth/refresh-token',
  GET_PROFILE = 'users/profile',
  GET_FAQ = 'companies/{companyId}/faq',
  NFTS_BY_WALLET = 'metadata/nfts/{address}/{chainId}',
  TOKEN_EDITIONS = '{companyId}/token-editions',
  ESTIMATE_TRANSFER_GAS = '{companyId}/token-editions/{id}/estimate-gas/transfer',
  TRANSFER_MULTIPLE_TOKENS = '{companyId}/token-editions/transfer-token',
  GET_LAST_TRASNFER = '{companyId}/token-editions/{id}/get-last/transfer',
  TRANSFER_TOKEN = '{companyId}/token-editions/{id}/transfer-token',
  TOKEN_COLLECTION_BY_ID = '{companyId}/token-collections/{id}',
  COMPANIES = 'companies/{id}',
  BALANCE = 'blockchain/balance/{address}/{chainId}',
  ORDER_PREVIEW = '/companies/{companyId}/orders/preview',
  CREATE_ORDER = '/companies/{companyId}/orders',
  METADATA_BY_RFID = 'metadata/rfid/{rfid}',
  METADATA_BY_CHAINADDRESS_AND_TOKENID = 'metadata/address/{contractAddress}/{chainId}/{tokenId}',
  TOKEN_COLLECTIONS = '{companyId}/token-collections',
  CATEGORIES = 'categories',
  USERS = 'users/',
  VERIFY_SIGN_UP = '/auth/verify-sign-up',
  REQUEST_CONFIRMATION_MAIL = '/auth/request-confirmation-email',
  PATCH_PROFILE = '/users/{companyId}/profile',
  GET_POLL_BY_ID = '/polls/{companyId}/{pollId}',
  GET_POLL_BY_SLUG = '/polls/{companyId}/slug-details/{slug}',
  POST_POLL_ANSWER = '/answers/{companyId}/post-answer-with-user',
  INVITE_USER_AFTER_POLL = '/users/{companyId}/invite-transfer',
  METADATA_PROCESSING = '/metadata/processing/address/{address}/{chainId}',
  PASS_BENEFIT_OPERATORS = '/token-pass-benefit-operators/tenants/{tenantId}',
  PASS_BENEFIT_OPERATORS_DELETE = '/token-pass-benefit-operators/tenants/{tenantId}/{id}',
  PASS_BENEFIT_BY_ID = '/token-pass-benefits/tenants/{tenantId}/{benefitId}',
  PASS_BENEFIT = '/token-pass-benefits/tenants/{tenantId}',
  PASS_BY_ID = '/token-passes/tenants/{tenantId}/{id}',
  PASS_BY_USER = '/token-passes/tenants/{tenantId}/users/{userId}',
  PASS_BENEFIT_OPERATORS_BY_BENEFITID = '/token-pass-benefit-operators/tenants/{tenantId}/benefits/{benefitId}',
  PASS_BENEFIT_BY_EDITION_NUMBER = '/token-pass-benefits/tenants/{tenantId}/{collectionId}/{editionNumber}',
  PASS_BENEFIT_REGISTER_USE = '/token-pass-benefits/tenants/{tenantId}/{id}/register-use',
  PASS_BENEFIT_USE = '/token-pass-benefits/tenant/{tenantId}/{id}/use',
  TOKEN_PASS = '/token-passes/tenants/{tenantId}',
  WALLET_CONNECT = '/blockchain/request-session-wallet-connect',
  PASS_SECRET = '/token-pass-benefits/tenants/{tenantId}/{id}/{editionNumber}/secret',
  DISCONNECT_WALLET_CONNECT = '/blockchain/disconnect-session-wallet-connect',
  WALLET_INTEGRATIONS = '/integrations',
  GET_THEME = '/projects/get-theme',
  GET_PAGE = '/projects/get-page',
}
