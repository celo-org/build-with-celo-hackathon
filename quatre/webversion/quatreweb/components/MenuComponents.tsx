import React from "react";
import { WrappedCard } from "./WrappedCard";

interface MenuComponentsProps {
  heading?: string;
  content?: string;
  imageUrl?: string;
}
export const MenuComponents = (props: MenuComponentsProps) => {
  const { heading, content, imageUrl } = props;
  return <WrappedCard heading={heading} content={content} imageUrl={imageUrl} />
}
