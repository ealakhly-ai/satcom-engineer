import { useState } from 'react';
export const useNotifications = () => { const [notifs, setNotifs] = useState<any[]>([]); return { notifs }; };