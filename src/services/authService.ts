export interface AuthUser {
  username: string;
  role: string;
  name: string;
  avatar: string;
  token: string;
  loggedInAt: string;
}

const AUTH_KEY = 'gold_trend_auth_session';

export class AuthService {
  static login(user: string, psswd: string): { success: boolean; error?: string; user?: AuthUser } {
    // Validasi kredensial sesuai instruksi: user: admin | psswd: m@juterusrajaemas
    if (user.trim() === 'admin' && psswd === 'm@juterusrajaemas') {
      const sessionUser: AuthUser = {
        username: 'admin',
        role: 'Administrator',
        name: 'Raja Emas Admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        token: 'token_' + Math.random().toString(36).substring(2),
        loggedInAt: new Date().toISOString()
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(sessionUser));
      return { success: true, user: sessionUser };
    }
    return { success: false, error: 'Username atau Password salah! Gunakan user: admin | psswd: m@juterusrajaemas' };
  }

  static getSession(): AuthUser | null {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (!stored) return null;
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }

  static logout(): void {
    localStorage.removeItem(AUTH_KEY);
  }

  static isAuthenticated(): boolean {
    return this.getSession() !== null;
  }
}
