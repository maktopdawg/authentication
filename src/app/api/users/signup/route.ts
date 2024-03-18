import { connect } from "@/dbConfig/dbconfig";
import Account from "@/models/Account";
import { NextRequest ,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect();

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody)

        const account = await Account.findOne({ email })

        if (account) return NextResponse.json({error: "User Exists"}, {status: 400})

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newAccount = new Account({
            username,
            email, 
            password: hashedPassword
        });

        const savedUser = await newAccount.save();
        console.log(savedUser);
        return NextResponse.json({ "response": "User created" }, { status: 201 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}