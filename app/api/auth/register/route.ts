import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";
import UserModel from "@/lib/models/UserModel";

export const POST = async (req: NextRequest) => {
  const { name, email, password } = await req.json();
  await dbConnect();
  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return Response.json(
      {
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (err: any) {
    return Response.json(
      {
        message: err.message,
      },
      { status: 500 }
    );
  }
};
