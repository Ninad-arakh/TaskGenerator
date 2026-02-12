export function exportMarkdown(data) {
  const content = `
# Specification

## Summary
${data.summary}

## User Stories
${data.userStories.map(s => `- ${s}`).join("\n")}

## Engineering Tasks
${data.engineeringTasks.map(t => `- ${t}`).join("\n")}

## Risks
${data.risks.map(r => `- ${r}`).join("\n")}
`;

  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "spec.md";
  a.click();
}
