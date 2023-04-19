import { LinearProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import React from 'react'

const Protected = () => {
    const { status, data } = useSession();
    console.log(data, "ProtectedData");
    console.log(status, "status");
    const router = useRouter()
    const { pathname } = router
    console.log(pathname, "pathname");
    React.useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
        }
    }, [status])

    return (
        <div>
            {
                status === "loading" && (<LinearProgress color="success" />)
            }
        </div>
    );

};

export default Protected;