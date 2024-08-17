export type revokeTokenReturnType = {
  logoutError: globalThis.Ref<string>;
  logoutStatus: globalThis.Ref<boolean>;
};

export type revokeTokenType = () => Promise<revokeTokenReturnType>;

export interface useRevokeToken {
  revokeToken: revokeTokenType;
}

export type revokeCustomerTokenReturnType = () => useRevokeToken;
