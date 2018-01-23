
export class AuthConfig {
  
  public secretKey: string;
  public expiresIn: number;

  constructor(expiresIn: number, secretKey: string) 
  {
    this.secretKey = secretKey;
    this.expiresIn = expiresIn;
  }
}
