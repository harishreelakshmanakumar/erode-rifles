import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { createHmac, createHash, randomUUID } from "node:crypto";

const API_PORT = 3001;
const JWT_SECRET = "erode-rifles-jwt-secret-2025";
const FALLBACK_USERS_PATH = path.join(process.cwd(), "db", "fallback-auth-users.json");

export const runtime = "nodejs";

type FallbackUser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "USER" | "ADMIN";
  passwordHash?: string;
  googleId?: string;
};

const seededUsers: Array<FallbackUser & { password: string }> = [
  {
    id: "admin-fallback",
    name: "Admin",
    email: "admin@eroderifles.com",
    phone: "+91 9994893337",
    role: "ADMIN",
    password: "admin123",
  },
  {
    id: "user-fallback",
    name: "Demo User",
    email: "user@example.com",
    phone: "+91 9876543210",
    role: "USER",
    password: "user123",
  },
];

function hashPassword(password: string) {
  return createHash("sha256").update(`${JWT_SECRET}:${password}`).digest("hex");
}

function base64Url(value: string) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function createToken(user: FallbackUser) {
  const header = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64Url(
    JSON.stringify({
      userId: user.id,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    })
  );
  const signature = createHmac("sha256", JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${header}.${payload}.${signature}`;
}

function authPayload(user: FallbackUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    token: createToken(user),
  };
}

async function readFallbackUsers(): Promise<FallbackUser[]> {
  try {
    const raw = await fs.readFile(FALLBACK_USERS_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeFallbackUsers(users: FallbackUser[]) {
  await fs.mkdir(path.dirname(FALLBACK_USERS_PATH), { recursive: true });
  await fs.writeFile(FALLBACK_USERS_PATH, JSON.stringify(users, null, 2));
}

async function handleAuthFallback(apiPath: string, body: any) {
  const normalizedEmail = String(body?.email || "").trim().toLowerCase();

  if (apiPath === "auth/login") {
    const password = String(body?.password || "");
    if (!normalizedEmail || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const seeded = seededUsers.find(
      (user) => user.email.toLowerCase() === normalizedEmail && user.password === password
    );
    if (seeded) {
      const { password: _password, ...user } = seeded;
      return NextResponse.json({ success: true, data: authPayload(user) });
    }

    const savedUsers = await readFallbackUsers();
    const saved = savedUsers.find(
      (user) => user.email.toLowerCase() === normalizedEmail && user.passwordHash === hashPassword(password)
    );
    if (saved) {
      return NextResponse.json({ success: true, data: authPayload(saved) });
    }

    return NextResponse.json(
      { success: false, error: "Invalid email or password." },
      { status: 401 }
    );
  }

  if (apiPath === "auth/register") {
    const name = String(body?.name || "").trim();
    const phone = body?.phone ? String(body.phone).trim() : null;
    const password = String(body?.password || "");

    if (!name || !normalizedEmail || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const savedUsers = await readFallbackUsers();
    const exists =
      seededUsers.some((user) => user.email.toLowerCase() === normalizedEmail) ||
      savedUsers.some((user) => user.email.toLowerCase() === normalizedEmail);

    if (exists) {
      return NextResponse.json(
        { success: false, error: "Email already registered." },
        { status: 409 }
      );
    }

    const user: FallbackUser = {
      id: randomUUID(),
      name,
      email: normalizedEmail,
      phone,
      role: "USER",
      passwordHash: hashPassword(password),
    };
    await writeFallbackUsers([...savedUsers, user]);

    return NextResponse.json({ success: true, data: authPayload(user) }, { status: 201 });
  }

  if (apiPath === "auth/google") {
    if (!normalizedEmail) {
      return NextResponse.json(
        { success: false, error: "Email is required for Google sign-in." },
        { status: 400 }
      );
    }

    const name = String(body?.name || normalizedEmail.split("@")[0]).trim();
    const googleId = body?.googleId ? String(body.googleId) : undefined;
    const savedUsers = await readFallbackUsers();
    const existing =
      savedUsers.find((user) => user.email.toLowerCase() === normalizedEmail) ||
      seededUsers.find((user) => user.email.toLowerCase() === normalizedEmail);

    if (existing) {
      const { password: _password, ...user } = existing as FallbackUser & { password?: string };
      return NextResponse.json({ success: true, data: authPayload(user) });
    }

    const user: FallbackUser = {
      id: randomUUID(),
      name,
      email: normalizedEmail,
      phone: null,
      role: "USER",
      googleId,
    };
    await writeFallbackUsers([...savedUsers, user]);

    return NextResponse.json({ success: true, data: authPayload(user) });
  }

  return null;
}

async function proxyRequest(req: NextRequest, method: string) {
  let body: any = undefined;

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
        body = await req.json();
        options.body = JSON.stringify(body);
      } catch {
        // No body
      }
    }

    const response = await fetch(targetUrl, options);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    const url = new URL(req.url);
    const apiPath = url.pathname.replace("/api/", "");
    const fallback = await handleAuthFallback(apiPath, body);
    if (fallback) return fallback;

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
