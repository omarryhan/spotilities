export interface Tokens {
  accessToken: string;
  expiresAt: number;
}

export interface InitialStateInterface {
  tokens: Tokens;
  name: string;
}
