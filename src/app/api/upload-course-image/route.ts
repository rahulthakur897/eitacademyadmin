import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("course_logo") as File;

    if (!file) {
      return NextResponse.json(
        { status: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Get file extension
    const ext = path.extname(file.name);

    // Create unique filename
    const filename = `course_${Date.now()}${ext}`;

    // Save path
    const uploadDir = path.join(
      process.cwd(),
      "public/assets/images/course"
    );

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Write file
    await fs.writeFile(`${uploadDir}/${filename}`, buffer);

    return NextResponse.json({
      status: true,
      filename,
      url: `/assets/images/course/${filename}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: error.message },
      { status: 500 }
    );
  }
}
