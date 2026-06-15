import { NextRequest, NextResponse } from "next/server";

const API_PORT = 3001;

async function proxyRequest(req: NextRequest, method: string) {
  try {
    const url = new URL(req.url);
    const apiPath = url.pathname.replace("/api/", "");
    const searchParams = url.searchParams.toString();
    const targetUrl = `http://localhost:${API_PORT}/api/${apiPath}${searchParams ? `?${searchParams}` : ""}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Forward auth header if present
    const authHeader = req.headers.get("authorization");
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    // Forward body for POST/PUT/PATCH
    if (method === "POST" || method === "PUT" || method === "PATCH") {
      try {
        const body = await req.json();
        options.body = JSON.stringify(body);
      } catch {
        // No body
      }
    }

    const response = await fetch(targetUrl, options);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Proxy error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return proxyRequest(req, "GET");
}

export async function POST(req: NextRequest) {
  return proxyRequest(req, "POST");
}

export async function PUT(req: NextRequest) {
  return proxyRequest(req, "PUT");
}

export async function PATCH(req: NextRequest) {
  return proxyRequest(req, "PATCH");
}

export async function DELETE(req: NextRequest) {
  return proxyRequest(req, "DELETE");
}
