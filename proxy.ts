export { auth as proxy } from "@/lib/auth";

export const config = {
  matcher: ["/pokedex/:path*", "/identify", "/species/:path*"],
};
