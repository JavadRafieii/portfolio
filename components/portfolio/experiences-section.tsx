"use client";

import { useRef, useState } from "react";
import { PlusIcon, Trash2Icon } from "lucide-react";
import type { PortfolioExperience } from "@/lib/portfolio/types";

type Experience = PortfolioExperience & {
  id: number;
};

const emptyExperience = (id: number): Experience => ({
  id,
  startDate: "",
  endDate: "",
  company: "",
  jobTitle: "",
  location: "",
  description: "",
});

export default function ExperiencesSection({
  initialExperiences,
}: {
  initialExperiences: PortfolioExperience[] | undefined;
}) {
  const [experiences, setExperiences] = useState<Experience[]>(() =>
    (initialExperiences ?? []).map((experience, id) => ({ id, ...experience })),
  );
  const nextId = useRef(experiences.length);

  function addExperience() {
    if (experiences.length >= 10) return;

    const id = nextId.current++;
    setExperiences((items) => [...items, emptyExperience(id)]);
  }

  function updateExperience(
    id: number,
    field: keyof Omit<Experience, "id">,
    value: string,
  ) {
    setExperiences((items) =>
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  }

  function removeExperience(id: number) {
    setExperiences((items) => items.filter((item) => item.id !== id));
  }

  return (
    <section className="flex flex-col gap-4" aria-labelledby="experiences-heading">
      <div>
        <h2 id="experiences-heading" className="text-base font-semibold">
          سوابق کاری
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          سابقه‌های شغلی را با تاریخ شروع و پایان وارد کنید؛ حداکثر ۱۰ مورد.
          انتخاب تاریخ‌های گذشته مجاز است.
        </p>
      </div>

      {experiences.map((experience, index) => (
        <fieldset
          key={experience.id}
          className="flex flex-col gap-4 rounded-xl border border-input p-4"
        >
          <legend className="px-2 text-sm font-medium">
            تجربهٔ {index + 1}
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor={`experience-${experience.id}-start-date`}
                className="text-sm font-medium"
              >
                تاریخ شروع:
              </label>
              <input
                id={`experience-${experience.id}-start-date`}
                name={`experiences[${index}].startDate`}
                type="date"
                dir="ltr"
                required
                value={experience.startDate}
                onChange={(event) =>
                  updateExperience(
                    experience.id,
                    "startDate",
                    event.currentTarget.value,
                  )
                }
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor={`experience-${experience.id}-end-date`}
                className="text-sm font-medium"
              >
                تاریخ پایان:
              </label>
              <input
                id={`experience-${experience.id}-end-date`}
                name={`experiences[${index}].endDate`}
                type="date"
                dir="ltr"
                required
                value={experience.endDate}
                onChange={(event) =>
                  updateExperience(
                    experience.id,
                    "endDate",
                    event.currentTarget.value,
                  )
                }
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              تاریخ پایان باید هم‌زمان با تاریخ شروع یا بعد از آن باشد.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor={`experience-${experience.id}-company`}
              className="text-sm font-medium"
            >
              نام شرکت:
            </label>
            <input
              id={`experience-${experience.id}-company`}
              name={`experiences[${index}].company`}
              type="text"
              required
              value={experience.company}
              onChange={(event) =>
                updateExperience(
                  experience.id,
                  "company",
                  event.currentTarget.value,
                )
              }
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor={`experience-${experience.id}-job-title`}
              className="text-sm font-medium"
            >
              عنوان شغلی:
            </label>
            <input
              id={`experience-${experience.id}-job-title`}
              name={`experiences[${index}].jobTitle`}
              type="text"
              required
              value={experience.jobTitle}
              onChange={(event) =>
                updateExperience(
                  experience.id,
                  "jobTitle",
                  event.currentTarget.value,
                )
              }
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor={`experience-${experience.id}-location`}
              className="text-sm font-medium"
            >
              لوکیشن:
            </label>
            <input
              id={`experience-${experience.id}-location`}
              name={`experiences[${index}].location`}
              type="text"
              required
              value={experience.location}
              onChange={(event) =>
                updateExperience(
                  experience.id,
                  "location",
                  event.currentTarget.value,
                )
              }
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor={`experience-${experience.id}-description`}
              className="text-sm font-medium"
            >
              توضیحات:
            </label>
            <textarea
              id={`experience-${experience.id}-description`}
              name={`experiences[${index}].description`}
              required
              rows={3}
              value={experience.description}
              onChange={(event) =>
                updateExperience(
                  experience.id,
                  "description",
                  event.currentTarget.value,
                )
              }
              className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <button
            type="button"
            onClick={() => removeExperience(experience.id)}
            aria-label={`حذف تجربهٔ ${index + 1}`}
            className="inline-flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            <Trash2Icon aria-hidden="true" size={16} />
            حذف تجربه
          </button>
        </fieldset>
      ))}

      <button
        type="button"
        onClick={addExperience}
        disabled={experiences.length >= 10}
        className="inline-flex w-fit items-center gap-2 rounded-lg border border-input px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <PlusIcon aria-hidden="true" size={16} />
        افزودن تجربه ({experiences.length}/10)
      </button>
    </section>
  );
}
