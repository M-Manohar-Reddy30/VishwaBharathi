"use client";

import { useRouter } from "next/navigation";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Button, Card, Input } from "@/components/ui";

import {
  loginSchema,
  LoginFormValues,
} from "../schemas/login.schema";

import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../hooks/useAuth";

import { setToken } from "../utils/token";

export default function LoginForm() {
  const router = useRouter();

  const { refresh } = useAuth();

  const loginMutation = useLogin();

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(
    values: LoginFormValues
  ) {
    try {
      const result =
        await loginMutation.mutateAsync(values);

      setToken(result.accessToken);

      await refresh();

      toast.success("Welcome back!");

      router.replace("/dashboard");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Invalid email or password."
      );
    }
  }

  return (
    <Card className="w-full max-w-md">

      <h1 className="mb-6 text-center text-2xl font-bold">
        Admin Login
      </h1>

      <FormProvider {...methods}>

        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <Input
              type="email"
              placeholder="admin@example.com"
              {...methods.register("email")}
            />

            <p className="mt-1 text-sm text-red-500">
              {methods.formState.errors.email?.message}
            </p>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <Input
              type="password"
              placeholder="********"
              {...methods.register("password")}
            />

            <p className="mt-1 text-sm text-red-500">
              {methods.formState.errors.password?.message}
            </p>

          </div>

          <Button
            type="submit"
            loading={loginMutation.isPending}
            className="w-full"
          >
            Login
          </Button>

        </form>

      </FormProvider>

    </Card>
  );
}