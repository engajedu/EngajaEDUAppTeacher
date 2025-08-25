import axios from 'axios';

// Detecta ambiente e variáveis de ambiente
const getBaseURL = () => {
    // Se houver variável de ambiente específica (Vercel)
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    
    // Se estiver em desenvolvimento local
    if (import.meta.env.DEV) {
        return 'http://192.168.1.173:5001';
    }
    
    // Fallback para produção
    return 'http://52.67.229.114:5001';
};

const baseURL = getBaseURL();
console.log('🔗 API configurada para:', baseURL, '(Development:', import.meta.env.DEV, ')');

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000
});

// Log das requisições apenas em desenvolvimento
if (import.meta.env.DEV) {
    api.interceptors.request.use(request => {
        console.log('📤 API Request:', request.method?.toUpperCase(), request.url);
        return request;
    });

    api.interceptors.response.use(
        response => {
            console.log('📥 API Response:', response.status, response.config.url);
            return response;
        },
        error => {
            console.error('❌ API Error:', error.message, error.config?.url);
            return Promise.reject(error);
        }
    );
}

export default api;