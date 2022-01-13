import { Cookie, Session } from 'express-session';
export interface ERequest extends Request {
    session: {
        email: string;
        id: string;
        cookie: Cookie;
        regenerate: (callback: (err: any) => void) => Session;
        destroy: (callback: (err: any) => void) => Session;
        reload: (callback: (err: any) => void) => Session;
        resetMaxAge: () => Session;
        save: (callback?: ((err: any) => void) | undefined) => Session;
        touch: () => Session;
    };
}
