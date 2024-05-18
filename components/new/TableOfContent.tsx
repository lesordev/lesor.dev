"use client";
import { filter, range, uniq } from "lodash-es";
import Link from "next/link";
import { useEffect, useState } from "react";

import IconFolderOpen from "@/assets/svgs/folder-open.svg";
import IconMarkdown from "@/assets/svgs/markdown.svg";
import IconTOC from "@/assets/svgs/toc.svg";
import { cn } from "@/utils/cn.util";

type TOCItem = {
  id: string;
  title: string;
  level: number;
};

type TableOfContentProps = {
  autoHighlight?: boolean;
};

export function TableOfContent({ autoHighlight = true }: TableOfContentProps) {
  const [sections, setSections] = useState<Array<TOCItem>>();
  const [activeIds, setActiveIds] = useState<Array<string>>([]);

  useEffect(() => {
    // INFO:  get all sections
    const sectionElements = Array.from(document.querySelectorAll("section[id]"));
    const sections = sectionElements.map((el) => {
      const id = el.getAttribute("id") ?? "";
      const heading = el.querySelector("h2, h3, h4");
      const title = heading?.textContent?.toLowerCase().replaceAll(" ", "-") ?? "";
      const level = Number(heading?.nodeName[1]);

      return { id, title, level };
    });
    setSections(sections);

    // INFO: observer for auto highlight
    const config = {
      root: document.getElementById("article") ?? document.body,
      threshold: range(0, 0.1, 0.05),
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ intersectionRatio, target }) => {
        const id = target.getAttribute("id") ?? "";

        setActiveIds((ids) =>
          intersectionRatio ? uniq([...ids, id]) : filter(ids, (v) => v !== id)
        );
      });
    }, config);

    if (autoHighlight) {
      sectionElements.forEach((section) => {
        observer.observe(section);
      });
    }
  }, [autoHighlight]);

  return (
    <nav>
      <div className="flex items-center gap-2 border-b border-stroke px-4 py-2 text-secondary-5">
        <IconTOC className="text-lg" /> table-of-content
      </div>
      <ul className="py-4">
        {sections?.map((section) => (
          <li key={section.id}>
            <Link
              className={cn("flex items-center gap-2 py-1 pl-4", {
                "bg-stroke/50 text-secondary-5": activeIds.includes(section.id),
                "pl-6": section.level === 3,
              })}
              href={`#${section.id}`}
            >
              {section.level === 2 && <IconFolderOpen className="text-lg" />}
              {section.level === 3 && <IconMarkdown className="text-lg" />}
              {section.title}
              {section.level === 3 && ".md"}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}