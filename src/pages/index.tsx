import { Button, Flex, Heading, Highlight, Image, Link, Stack, Text } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { supabase } from "../services/supabase";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type SignInFormData = {
  email: string,
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function Login() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const router = useRouter()
  const [currentScreen, setCurrentScreen] = useState(0);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async () => {
    event.preventDefault()

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      toast.error(error.message);
      return;
    }

    console.log(data)

    router.push("/home");
  }

  const handleLogin: SubmitHandler<SignInFormData> = async () => {
    event.preventDefault()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      toast.error(error.message);
      return;
    }

    console.log(data)

    router.push("/home");
  }

  return (
    <>
      {currentScreen === 0 && (
        <Flex
          w="100vw"
          h={["100vh", "100vh", "80vh", "90vh"]}
          align="center"
          justify="space-evenly"
        >
          <Flex
            flexDir={"column"}
            align={"center"}
            justify={"space-between"}
            height={["75vh" ,"60vh"]}
            maxWidth={["350px","850px"]}
          >
            <Heading
              fontSize={["xl" ,"3xl"]}
              textAlign={"center"}
            >Seja bem-vindo ao <Highlight query={"Voosa"} styles={{ color: "cyan.400" }}>Voosa</Highlight>
            </Heading>

            <Text
              fontSize={["16px" ,"18px"]}
              textAlign={"center"}
              margin={"4"}
            >Crie sua conta já e aproveite os benefícios!!
            </Text>


            <Flex
              as="form"
              width="100%"
              maxWidth={["300px","400px"]}
              bg="gray.650"
              p={["5", "8"]}
              borderRadius={8}
              flexDir="column"
              onSubmit={handleSubmit(handleSignIn)}
            >
              <Stack spacing={4}>

                <Input
                  type={"email"}
                  name="email"
                  label='E-mail'
                  error={errors.email}
                  {...register('email')}
                  onChange={(event) => {
                    let email = event.target.value;
                    setEmail(email)
                  }}
                />

                <Input
                  type="password"
                  name="password"
                  label="Senha"
                  error={errors.password}
                  {...register('password')}
                  onChange={(event) => {
                    let password = event.target.value;
                    setPassword(password)
                  }}
                />

              </Stack>

              <Button
                as={"button"}
                size={["md", "lg"]}
                type='submit'
                mt={6}
                colorScheme={'cyan'}
                bg={'cyan.400'}
                color={'#FFF'}
                isLoading={formState.isSubmitting}
              >
                Cadastrar
              </Button>
              <Link
                pt={"2"}
                fontSize={["sm","md"]}
                color={"gray.200"}
                onClick={() => {
                  setCurrentScreen(1);
                  setEmail("");
                  setPassword("");
                }}
              >
                Já tem conta? Faça login!
              </Link>
            </Flex>
          </Flex>
          <Image display={["none", "none", "none", "block"]} src="notelist.svg" alt="Imagem de notas" width={450} marginTop={"24"} />
        </Flex>
      )}

      {currentScreen === 1 && (
        <Flex
        w="100vw"
        h={["100vh", "100vh", "80vh", "90vh"]}
        align="center"
        justify="space-evenly"
        >
          <Flex
            flexDir={"column"}
            align={"center"}
            justify={"space-between"}
            height={["75vh" ,"60vh"]}
            maxWidth={["350px","850px"]}
          >
            <Heading
              fontSize={["xl" ,"3xl"]}
              textAlign={"center"}
            >Bem-vindo de volta ao <Highlight query={"Voosa"} styles={{ color: "cyan.400" }}>Voosa!</Highlight>
            </Heading>

            <Text
              fontSize={["16px" ,"18px"]}
              textAlign={"center"}
              margin={"4"}
            >Seu bloco de notas te aguarda!
            </Text>

            <Flex
              as="form"
              width="100%"
              maxWidth={["300px","400px"]}
              bg="gray.650"
              p={["5", "8"]}
              borderRadius={8}
              flexDir="column"
              onSubmit={handleSubmit(handleLogin)}
            >
              <Stack spacing={4}>

                <Input
                  type={"email"}
                  name="email"
                  label='E-mail'
                  error={errors.email}
                  {...register('email')}
                  onChange={(event) => {
                    let email = event.target.value;
                    setEmail(email)
                  }}
                />

                <Input
                  type="password"
                  name="password"
                  label="Senha"
                  error={errors.password}
                  {...register('password')}
                  onChange={(event) => {
                    let password = event.target.value;
                    setPassword(password)
                  }}
                />

              </Stack>

              <Button
                as={"button"}
                size={["md", "lg"]}
                type='submit'
                mt={6}
                colorScheme={'cyan'}
                bg={'cyan.400'}
                color={'#FFF'}
                isLoading={formState.isSubmitting}
              >
                Entrar
              </Button>

              <Link
                pt={"2"}
                fontSize={["sm","md"]}
                color={"gray.200"}
                onClick={() => {
                  setCurrentScreen(0);
                  setEmail("");
                  setPassword("");
                }}
              >
                Não possui conta? Cadastre-se!
              </Link>
            </Flex>
          </Flex>
          <Image display={["none", "none", "none", "block"]} src="notelist.svg" alt="Imagem de notas" width={450} marginTop={"24"} />
        </Flex>
      )}

      <ToastContainer />
    </>
  )
}
