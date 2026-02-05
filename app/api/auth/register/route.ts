import { createUser, findUserByEmail } from "@/lib/db";
import { registerApiSchema } from "@/lib/validations/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerApiSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { message: first?.message ?? "Dữ liệu không hợp lệ" },
        { status: 400 }
      );
    }
    const { email, password, name } = parsed.data;
    if (await findUserByEmail(email)) {
      return NextResponse.json(
        { message: "Email này đã được đăng ký." },
        { status: 400 }
      );
    }
    await createUser({ email, password, name });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lỗi server.";
    console.error("[POST /api/auth/register]", err);
    if (
      message.includes("MONGODB") ||
      message.includes("Thiếu") ||
      message.includes("env")
    ) {
      return NextResponse.json(
        {
          message:
            "Chưa cấu hình database. Kiểm tra MONGODB_URI trong .env.local.",
        },
        { status: 503 }
      );
    }
    return NextResponse.json(
      {
        message:
          process.env.NODE_ENV === "development" ? message : "Lỗi server.",
      },
      { status: 500 }
    );
  }
}
