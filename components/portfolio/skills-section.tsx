"use client";

import { useRef, useState } from "react";
import { PlusIcon, Trash2Icon } from "lucide-react";
import type {
  PortfolioSkill,
  SkillLevel,
} from "@/lib/portfolio/types";

const MAX_SKILLS = 20;

type Skill = Omit<PortfolioSkill, "level"> & {
  id: number;
  level: SkillLevel | "";
};

export default function SkillsSection({
  initialSkills,
}: {
  initialSkills: PortfolioSkill[] | undefined;
}) {
  const [skills, setSkills] = useState<Skill[]>(() => {
    return (initialSkills ?? []).map((skill, id) => ({ id, ...skill }));
  });
  const nextId = useRef(skills.length);

  function addSkill() {
    if (skills.length >= MAX_SKILLS) return;

    const id = nextId.current++;
    setSkills((items) => [...items, { id, name: "", level: "" }]);
  }

  function removeSkill(id: number) {
    setSkills((items) => items.filter((skill) => skill.id !== id));
  }

  function updateSkill(id: number, updates: Partial<Omit<Skill, "id">>) {
    setSkills((items) =>
      items.map((skill) =>
        skill.id === id ? { ...skill, ...updates } : skill,
      ),
    );
  }

  return (
    <section className="flex flex-col gap-4" aria-labelledby="skills-heading">
      <div>
        <h2 id="skills-heading" className="text-base font-semibold">
          مهارت‌ها و تخصص‌ها
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          نام مهارت و سطح تسلط خود را مشخص کنید؛ حداکثر ۲۰ مهارت.
        </p>
      </div>

      {skills.map((skill, index) => (
        <fieldset
          key={skill.id}
          className="flex flex-col gap-4 rounded-xl border border-input p-4"
        >
          <legend className="px-2 text-sm font-medium">
            مهارت {index + 1}
          </legend>
          <div className="flex flex-col gap-2">
            <label
              htmlFor={`skill-${skill.id}-name`}
              className="text-sm font-medium"
            >
              نام مهارت:
            </label>
            <input
              id={`skill-${skill.id}-name`}
              name={`skills[${index}].name`}
              type="text"
              required
              value={skill.name}
              onChange={(event) =>
                updateSkill(skill.id, { name: event.currentTarget.value })
              }
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor={`skill-${skill.id}-level`}
              className="text-sm font-medium"
            >
              سطح مهارت:
            </label>
            <select
              id={`skill-${skill.id}-level`}
              name={`skills[${index}].level`}
              required
              value={skill.level}
              onChange={(event) => {
                const { value } = event.currentTarget;
                if (
                  value === "" ||
                  value === "beginner" ||
                  value === "intermediate" ||
                  value === "advanced"
                ) {
                  updateSkill(skill.id, { level: value });
                }
              }}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="" disabled>
                انتخاب سطح مهارت
              </option>
              <option value="beginner">مبتدی</option>
              <option value="intermediate">متوسط</option>
              <option value="advanced">پیشرفته</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => removeSkill(skill.id)}
            aria-label={`حذف مهارت ${index + 1}`}
            className="inline-flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            <Trash2Icon aria-hidden="true" size={16} />
            حذف مهارت
          </button>
        </fieldset>
      ))}

      <button
        type="button"
        onClick={addSkill}
        disabled={skills.length >= MAX_SKILLS}
        className="inline-flex w-fit items-center gap-2 rounded-lg border border-input px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <PlusIcon aria-hidden="true" size={16} />
        افزودن مهارت ({skills.length}/{MAX_SKILLS})
      </button>
    </section>
  );
}
