import { useState, useEffect } from 'react';
export const useJobs = () => { const [jobs, setJobs] = useState<any[]>([]); return { jobs, loading: false }; };