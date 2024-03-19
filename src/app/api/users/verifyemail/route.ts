import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import Account from "@/models/Account";

connect();

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token)

        const account = await Account.findOne({ verifyToken: token, verifyTokenExpiry: {$gt: Date.now()} })

        if (!account) return NextResponse.json({ error: "Invalid token" }, {status: 400})

        console.log(account);

        account.isVerfied = true;
        account.verifyToken = undefined;
        account.verifyTokenExpiry = undefined;
        await account.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}