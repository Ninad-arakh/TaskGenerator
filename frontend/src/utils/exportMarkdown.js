export function exportMarkdown(spec) {
  if (!spec?.output?.epics) {
    console.error("Invalid spec structure:", spec);
    return;
  }

  const lines = [];

  lines.push(`# ${spec.goal}`);
  lines.push("");

  lines.push(`**Users:** ${spec.users}`);
  lines.push(`**Template:** ${spec.templateType}`);
  lines.push(`**Constraints:** ${spec.constraints}`);
  lines.push("");

  spec.output.epics.forEach((epic) => {
    lines.push(`## ${epic.title}`);
    lines.push("");
    lines.push(epic.description);
    lines.push("");

    epic.userStories?.forEach((story) => {
      lines.push(`### ${story.title}`);
      lines.push("");
      lines.push(story.description);
      lines.push("");

      story.tasks?.forEach((task) => {
        lines.push(
          `- [ ] ${task.title}  \n  - Type: ${task.type}  \n  - Priority: ${task.priority}`
        );
      });

      lines.push("");
    });
  });

  const blob = new Blob([lines.join("\n")], {
    type: "text/markdown",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "specification.md";
  a.click();

  URL.revokeObjectURL(url);
}
