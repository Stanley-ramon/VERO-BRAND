"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().email("Email inválido."),
  password: z.string().min(8, "Senha inválida!"),
});

type FormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    await signIn.email({
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => router.push("/"),
        onError: (ctx) => {
          if (ctx.error.code === "USER_NOT_FOUND") {
            toast.error("E-mail não encontrado.");
            return form.setError("email", {
              message: "E-mail não encontrado.",
            });
          }
          if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            toast.error("E-mail ou senha inválidos.");
            form.setError("password", {
              message: "E-mail ou senha inválidos.",
            });
            return form.setError("email", {
              message: "E-mail ou senha inválidos.",
            });
          }
          toast.error(ctx.error.message);
        },
      },
    });
  }

  return (
    <Card className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="grid w-full gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <p>Esqueceu sua senha?</p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-x-2">
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <p>
              Primeira vez na VERØ?{" "}
              <a
                href="/authentication?tab=sign-up"
                className="text-blue-500 hover:underline"
              >
                Criar conta
              </a>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default SignInForm;
