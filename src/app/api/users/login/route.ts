import { connect } from "@/dbConfig/dbconfig";
import Account from "@/models/Account";
import { NextRequest ,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect();

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const account = await Account.findOne({ email });

        if (!account) return NextResponse.json({error: "User does not exist"}, {status: 400})

        const validPassword = await bcryptjs.compare(password, account.password)

        if (!validPassword) return NextResponse.json({error: "invalid password"}, {status: 400})

        // Create token data
        const tokenData = {
            id: account._id,
            username: account.username,
            email: account.email
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "login successful",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}