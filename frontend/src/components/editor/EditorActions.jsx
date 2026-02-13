import { toast } from "sonner";
import { IconDownload, IconCopy } from "@tabler/icons-react";
import { exportMarkdown } from "../../utils/exportMarkdown";

export default function EditorActions({ spec }) {
  return (
    <div className="flex flex-wrap gap-4">
      <button
        onClick={() => {
          exportMarkdown(spec);
          toast.success("Markdown exported");
        }}
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-xl transition hover:scale-105"
      >
        <IconDownload size={18} />
        Export Markdown
      </button>

      <button
        onClick={async () => {
          try {
            if (!spec?.output?.epics?.length) {
              toast.error("Nothing to copy");
              return;
            }

            const cleanJson = {
              goal: spec.goal,
              users: spec.users,
              templateType: spec.templateType,
              constraints: spec.constraints,
              epics: spec.output.epics,
            };

            await navigator.clipboard.writeText(
              JSON.stringify(cleanJson, null, 2),
            );

            toast.success("Copied to clipboard ✅");
          } catch (err) {
            toast.error("Clipboard not supported");
          }
        }}
        className="flex items-center gap-2 px-6 py-3 rounded-full border bg-white hover:bg-gray-300 transition"
      >
        <IconCopy size={18} />
        Copy JSON
      </button>
    </div>
  );
}
