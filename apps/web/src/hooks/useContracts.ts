import { useState } from 'react';
export const useContracts = () => { const [contracts, setContracts] = useState<any[]>([]); return { contracts }; };