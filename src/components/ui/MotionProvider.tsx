"use client";

import { MotionConfig } from "framer-motion";

/** Every scroll reveal on the page answers to the user's motion preference. */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
