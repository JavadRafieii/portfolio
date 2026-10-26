"use client";

import { useRef, useState } from "react";
import { PlusIcon, Trash2Icon } from "lucide-react";
import type { PortfolioWorkItem } from "@/lib/portfolio/types";

type WorkItem = PortfolioWorkItem & {
  id: number;
};

export default function WorkItemsSection({
  initialItems,
}: {
  initialItems: PortfolioWorkItem[] | undefined;
}) {
  const [items, setItems] = useState<WorkItem[]>(() =>
    (initialItems ?? []).map((item, id) => ({ id, ...item })),
  );
  const nextId = useRef(items.length);

  function addItem() {
    if (items.length >= 10) return;

    const id = nextId.current++;
    setItems((currentItems) => [
      ...currentItems,
      { id, title: "", description: "" },
    ]);
  }

  function updateItem(id: number, field: "title" | "description", value: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  }

  function removeItem(id: number) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  }

  return (
    <section className="flex flex-col gap-4" aria-labelledby="work-items-heading">
      <div>
        <h2 id="work-items-heading" className="text-base font-semibold">
          خدمات و کارهایی که انجام می‌دهم
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          خدمات یا حوزه‌هایی را که در آن‌ها به مشتریان کمک می‌کنید ثبت کنید؛
          حداکثر ۱۰ مورد.
        </p>
      </div>

      {items.map((item, index) => (
        <fieldset
          key={item.id}
          className="flex flex-col gap-4 rounded-xl border border-input p-4"
        >
          <legend className="px-2 text-sm font-medium">مورد {index + 1}</legend>
          <div className="flex flex-col gap-2">
            <label
              htmlFor={`work-item-${item.id}-title`}
              className="text-sm font-medium"
            >
              عنوان:
            </label>
            <input
              id={`work-item-${item.id}-title`}
              name={`workItems[${index}].title`}
              type="text"
              required
              value={item.title}
              onChange={(event) =>
                updateItem(item.id, "title", event.currentTarget.value)
              }
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor={`work-item-${item.id}-description`}
              className="text-sm font-medium"
            >
              توضیحات:
            </label>
            <textarea
              id={`work-item-${item.id}-description`}
              name={`workItems[${index}].description`}
              required
              rows={3}
              value={item.description}
              onChange={(event) =>
                updateItem(item.id, "description", event.currentTarget.value)
              }
              className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label={`حذف مورد ${index + 1}`}
            className="inline-flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            <Trash2Icon aria-hidden="true" size={16} />
            حذف مورد
          </button>
        </fieldset>
      ))}

      <button
        type="button"
        onClick={addItem}
        disabled={items.length >= 10}
        className="inline-flex w-fit items-center gap-2 rounded-lg border border-input px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <PlusIcon aria-hidden="true" size={16} />
        افزودن مورد ({items.length}/10)
      </button>
    </section>
  );
}
