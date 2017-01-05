export class Login {
	constructor(public userId: number, public username: string, public password: string, public publicKeyX: string, public publicKeyY: string, public salt: string) {}
}