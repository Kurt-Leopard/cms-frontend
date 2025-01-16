import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("running");
  const user = false;

  if (!user) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "") {
      return NextResponse.rewrite(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard"],
};
