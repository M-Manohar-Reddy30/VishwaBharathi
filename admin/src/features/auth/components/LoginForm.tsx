"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Button,
  Card,
  FormField,
  Input,
  PasswordInput,
} from "@/components/ui";

import useAuth from "../hooks/useAuth";
import {
  loginSchema,
  type LoginFormValues,
} from "../schemas/login.schema";

export default function LoginForm() {
  const router = useRouter();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      await login(values);

      toast.success("Login Successful");

      router.push("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
            "Invalid email or password."
        );
      } else {
        toast.error("Something went wrong.");
      }
    }
  }

  return (
    <Card className="w-full max-w-md space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="text-slate-500">
          Sign in to continue.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormField
          label="Email"
          htmlFor="email"
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            placeholder="admin@vbk.org"
            autoComplete="email"
            {...register("email")}
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="password"
          error={errors.password?.message}
        >
          <PasswordInput
            id="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            {...register("password")}
          />
        </FormField>

        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full"
        >
          {isSubmitting
            ? "Signing In..."
            : "Sign In"}
        </Button>
      </form>
    </Card>
  );
}