"use client";

import { useMutation } from "@tanstack/react-query";

import { uploadFile } from "../api/upload.api";

export function useFileUpload() {
  return useMutation({
    mutationFn: uploadFile,
  });
}