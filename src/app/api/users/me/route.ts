import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Account from "@/models/Account";
import { connect } from "@/dbConfig/dbconfig";

connect();

export const GET = async (request: NextRequest) => {
    try {
        const userId = await getDataFromToken(request);

        const account = await Account.findOne({ _id: userId }).select("-password") // We don't want to get the password and the isAdmin data

        return NextResponse.json({ 
            message: "Account found",
            data: account
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}