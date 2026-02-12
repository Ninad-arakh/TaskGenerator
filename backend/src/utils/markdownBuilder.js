export function buildMarkdown(spec) {
  if (!spec || !spec.epics) {
    throw new Error("Invalid spec format");
  }

  let md = `# Feature Specification\n\n`;

  spec.epics.forEach((epic, epicIndex) => {
    md += `## Epic ${epicIndex + 1}: ${epic.title}\n\n`;
    md += `${epic.description}\n\n`;

    epic.userStories.forEach((story, storyIndex) => {
      md += `### User Story ${epicIndex + 1}.${storyIndex + 1}: ${story.title}\n\n`;
      md += `${story.description}\n\n`;

      md += `#### Tasks\n\n`;

      story.tasks.forEach((task, taskIndex) => {
        md += `- [ ] ${task.title}  
  - Type: ${task.type}  
  - Priority: ${task.priority}\n`;
      });

      md += `\n`;
    });
  });

  return md;
}
