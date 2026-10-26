"use client";

import { useRef, useState } from "react";
import { PlusIcon, Trash2Icon } from "lucide-react";
import type { PortfolioProject } from "@/lib/portfolio/types";

const MAX_PROJECTS = 10;

type ProjectFormValue = Omit<PortfolioProject, "technologies"> & {
  id: number;
  technologies: string;
};

function createEmptyProject(id: number): ProjectFormValue {
  return {
    id,
    title: "",
    category: "",
    description: "",
    technologies: "",
    href: "",
  };
}

export default function ProjectsFormSection({
  initialProjects,
}: {
  initialProjects: PortfolioProject[] | undefined;
}) {
  const [projects, setProjects] = useState<ProjectFormValue[]>(() =>
    (initialProjects ?? []).map((project, id) => ({
          ...project,
          id,
          technologies: project.technologies.join(", "),
        })),
  );
  const nextId = useRef(projects.length);

  function addProject() {
    if (projects.length >= MAX_PROJECTS) return;

    const id = nextId.current++;
    setProjects((items) => [...items, createEmptyProject(id)]);
  }

  function updateProject(
    id: number,
    field: Exclude<keyof ProjectFormValue, "id">,
    value: string,
  ) {
    setProjects((items) =>
      items.map((project) =>
        project.id === id ? { ...project, [field]: value } : project,
      ),
    );
  }

  function removeProject(id: number) {
    setProjects((items) => items.filter((project) => project.id !== id));
  }

  return (
    <section className="flex flex-col gap-4" aria-labelledby="projects-form-heading">
      <div>
        <h2 id="projects-form-heading" className="text-base font-semibold">
          پروژه‌ها و نمونه‌کارها
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          عنوان، نوع، توضیحات، تکنولوژی‌ها و لینک هر پروژه را وارد کنید.
          تکنولوژی‌ها را با کاما جدا کنید؛ حداکثر ۱۰ مورد.
        </p>
      </div>

      {projects.map((project, index) => (
        <fieldset
          key={project.id}
          className="flex flex-col gap-4 rounded-xl border border-input p-4"
        >
          <legend className="px-2 text-sm font-medium">
            نمونه‌کار {index + 1}
          </legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor={`project-${project.id}-title`}
                className="text-sm font-medium"
              >
                عنوان:
              </label>
              <input
                id={`project-${project.id}-title`}
                name={`projects[${index}].title`}
                type="text"
                required
                value={project.title}
                onChange={(event) =>
                  updateProject(project.id, "title", event.currentTarget.value)
                }
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor={`project-${project.id}-category`}
                className="text-sm font-medium"
              >
                نوع پروژه:
              </label>
              <input
                id={`project-${project.id}-category`}
                name={`projects[${index}].category`}
                type="text"
                required
                value={project.category}
                onChange={(event) =>
                  updateProject(
                    project.id,
                    "category",
                    event.currentTarget.value,
                  )
                }
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor={`project-${project.id}-description`}
              className="text-sm font-medium"
            >
              توضیحات:
            </label>
            <textarea
              id={`project-${project.id}-description`}
              name={`projects[${index}].description`}
              required
              rows={3}
              value={project.description}
              onChange={(event) =>
                updateProject(
                  project.id,
                  "description",
                  event.currentTarget.value,
                )
              }
              className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor={`project-${project.id}-technologies`}
              className="text-sm font-medium"
            >
              تکنولوژی‌ها:
            </label>
            <input
              id={`project-${project.id}-technologies`}
              name={`projects[${index}].technologies`}
              type="text"
              required
              value={project.technologies}
              onChange={(event) =>
                updateProject(
                  project.id,
                  "technologies",
                  event.currentTarget.value,
                )
              }
              placeholder="Next.js, TypeScript, Tailwind CSS"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor={`project-${project.id}-href`}
              className="text-sm font-medium"
            >
              لینک گیت‌هاب یا نسخهٔ آنلاین:
            </label>
            <input
              id={`project-${project.id}-href`}
              name={`projects[${index}].href`}
              type="url"
              required
              value={project.href}
              onChange={(event) =>
                updateProject(project.id, "href", event.currentTarget.value)
              }
              placeholder="https://"
              dir="ltr"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <button
            type="button"
            onClick={() => removeProject(project.id)}
            aria-label={`حذف نمونه‌کار ${index + 1}`}
            className="inline-flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            <Trash2Icon aria-hidden="true" size={16} />
            حذف نمونه‌کار
          </button>
        </fieldset>
      ))}

      <button
        type="button"
        onClick={addProject}
        disabled={projects.length >= MAX_PROJECTS}
        className="inline-flex w-fit items-center gap-2 rounded-lg border border-input px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <PlusIcon aria-hidden="true" size={16} />
        افزودن نمونه‌کار ({projects.length}/{MAX_PROJECTS})
      </button>
    </section>
  );
}
