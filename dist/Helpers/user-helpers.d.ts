declare function hash(password: string): Promise<unknown>;
declare function verify(password: string, hash: string): Promise<unknown>;
export { hash, verify };
