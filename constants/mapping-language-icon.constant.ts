import { BashIcon } from "@/assets/icons/BashIcon";
import { JavaScriptIcon } from "@/assets/icons/JavaScriptIcon";
import { TypescriptIcon } from "@/assets/icons/TypescriptIcon";
import type { CodeLanguage } from "@/types/notion.type";
import type { FunctionComponent } from "react";

export const CODE_LANGUAGE_ICON: Partial<Record<CodeLanguage, FunctionComponent>> = {
  typescript: TypescriptIcon,
  bash: BashIcon,
  javascript: JavaScriptIcon,
};
