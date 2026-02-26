const ADMIN_ACCESS_KEY = 'adminAccessKey';

export function useAuth() {
  const isAdminAuthenticated = (): boolean => {
    const key = sessionStorage.getItem(ADMIN_ACCESS_KEY);
    return !!key && key.length > 0;
  };

  const saveAccessKey = (key: string): void => {
    sessionStorage.setItem(ADMIN_ACCESS_KEY, key);
  };

  const getAccessKey = (): string => {
    return sessionStorage.getItem(ADMIN_ACCESS_KEY) ?? '';
  };

  const logout = (): void => {
    sessionStorage.removeItem(ADMIN_ACCESS_KEY);
  };

  return { isAdminAuthenticated, saveAccessKey, getAccessKey, logout };
}
