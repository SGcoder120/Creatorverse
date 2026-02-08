import { createClient } from '@supabase/supabase-js';

const URL = 'https://ncteiaqbxmjtnvxanfev.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jdGVpYXFieG1qdG52eGFuZmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MzQ0NzEsImV4cCI6MjA4NjAxMDQ3MX0.0ls8-Wqw7ByO9ie60x8PQdn70eGhoIXi-_th6zJQRZw';
const supabase = createClient(URL, API_KEY);
export default supabase;
