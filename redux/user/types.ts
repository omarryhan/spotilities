export interface Token {
  accessToken: string;
  expiresAt: number;
}

export interface TokenStatus {
  errorMessage: string;
}

export interface InitialStateInterface {
  name: string;
  token: Token;
  tokenStatus: TokenStatus;
}
