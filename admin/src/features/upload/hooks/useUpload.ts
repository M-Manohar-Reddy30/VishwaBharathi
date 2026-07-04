"use client";

import { useMutation } from "@tanstack/react-query";

import { uploadImage } from "../api/upload.api";

export function useUpload() {
  return useMutation({
    mutationFn: uploadImage,
  });
}