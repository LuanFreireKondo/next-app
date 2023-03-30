const isDev = process.env.NODE_ENV === 'development'

export const API_ENDPOINT = isDev ? 'http://localhost:3000' : 'https://your-domain.com'