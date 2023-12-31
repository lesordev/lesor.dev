import type { StrictDayJsConfigType } from "@/types/app.type";
import type { NoteTag } from "@/types/note.type";
import { formatShortDate } from "@/utils/dayjs.util";
import { Tag } from "@/components/Tag";
import Link from "next/link";
import { cn } from "@/utils/cn.util";

type WritingCardProps = {
  title: string;
  description: string;
  tags: Array<NoteTag>;
  publishDate: StrictDayJsConfigType;
  slug: string;
};

export const WritingCard = ({ title, description, tags, publishDate, slug }: WritingCardProps) => {
  return (
    <Link href={`/writings/${slug}`} className="flex">
      <div className={cn("hidden shrink-0 py-4 pl-8 text-right text-sm font-semibold text-gray-500", "md:block")}>
        {formatShortDate(publishDate)}
      </div>

      <div className="mx-4 flex flex-col items-center">
        <div className="h-5 w-px bg-gray-300" />
        <div className="h-3 w-3 rounded-full border border-solid border-gray-300" />
        <div className="w-px grow bg-gray-300" />
      </div>

      <div>
        <div className={cn("shrink-0 pb-2 pt-4 text-sm font-semibold text-gray-500", "md:hidden")}>
          {formatShortDate(publishDate)}
        </div>
        <div className={cn("mb-6 w-full rounded-md bg-blue-50 p-4 transition-colors", "hover:bg-blue-100/70")}>
          <h1 className="mb-1 text-base font-semibold text-gray-700">{title}</h1>
          <h2 className="mb-3 text-gray-500">{description}</h2>
          <div className="flex gap-1">
            {tags.map(({ name, color }) => (
              <Tag key={name} color={color}>
                {name}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
