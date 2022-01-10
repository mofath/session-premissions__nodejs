
export class Session {
  constructor(
    public id: string,
    public userId: string,
    public scope: string,
    public tokenHash: string,
    public validUntil: Date,
    public revoked: boolean,
    public userAgent: string,
  ) {}
}
