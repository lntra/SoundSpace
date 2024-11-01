import { jwtVerify } from 'jose';

export async function verifyToken(token: string) {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET environment variable is not set');
  } 
  
  try {
    const key = new TextEncoder().encode(jwtSecret);

    const { payload } = await jwtVerify(token, key);

    return payload;
    
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid token');
  }
}