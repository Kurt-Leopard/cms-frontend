import { NextResponse } from "next/server";

export function middleware(request) {
  const user = request.cookies.get("accessToken") ? true : false;
  console.log(user);
  const url = new URL(request.url);
  if (user && (url.pathname === "/" || url.pathname === "")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!user && url.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/user/blueprint"],
};
