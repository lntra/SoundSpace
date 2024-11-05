import { jwtVerify } from "jose";

export async function userSessionData(token: string | undefined) {
  if (!token) return null;
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret)
      throw new Error("JWT_SECRET environment variable is not set");

    const key = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token, key);

    return {
      id: payload.userId,
      email: payload.email,
      name: payload.name,
      url_icon: payload.url_icon,
      url_banner: payload.url_banner,
      description: payload.description,
    };
  } catch {
    return null;
  }
}
