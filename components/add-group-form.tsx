"use client";

import { useActionState } from "react";
import { addGroup, type AddGroupState } from "@/app/actions";

const initialState: AddGroupState = {};

export function AddGroupForm() {
  const [state, formAction, pending] = useActionState(
    addGroup,
    initialState
  );

  return (
    <form action={formAction} className="flex items-center gap-2">
      <input
        type="text"
        name="name"
        placeholder="New group name"
        required
        className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-transparent px-2.5 py-1.5 text-xs text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-600"
      />
      <button
        type="submit"
        disabled={pending}
        className="shrink-0 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
      >
        {pending ? "Adding…" : "Add group"}
      </button>
      {state.error ? (
        <p className="text-xs text-red-600 dark:text-red-400">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
