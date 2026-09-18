import { useState } from 'react';
export const useAuth = () => { const [user, setUser] = useState<any>(null); return { user, login: () => {}, logout: () => {} }; };