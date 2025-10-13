"use client";
import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityInit() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Clarity.init(process.env.CLARITY_PROJECT_ID!);
    }
  }, []);
  return null;
}
