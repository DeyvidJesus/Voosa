import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from "../services/supabase"

export default function Home() {
    const router = useRouter()

    const handleSignOut = async () => {
        let { error } = await supabase.auth.signOut()

        if(error) {
            toast.error(error.message);
            return;
        }

        router.push("/")
    }

    return (
        <Flex
            flexDir={"column"}
        >
            <h1>Hello World</h1>
            <Button
                onClick={handleSignOut}
                as={"button"}
                size="lg"
                type='submit'
                mt={6}
                colorScheme={'cyan'}
                bg={'cyan.600'}
                color={'#FFF'}
                width={"20"}
            >
                Sair
            </Button>
            <ToastContainer />
        </Flex>
    )
}