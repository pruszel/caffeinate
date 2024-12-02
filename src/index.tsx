import { ActionPanel, List, Action, showToast, Toast } from "@raycast/api";
import { exec } from "child_process";

const DURATION_OPTIONS: CaffeinateDuration[] = [
  { label: "Indefinite", value: 0 },
  { label: "5 mins", value: 5 * 60 },
  { label: "10 mins", value: 10 * 60 },
  { label: "30 mins", value: 30 * 60 },
  { label: "1 hr", value: 60 * 60 },
  { label: "2 hrs", value: 2 * 60 * 60 },
  { label: "4 hrs", value: 4 * 60 * 60 },
  { label: "8 hrs", value: 8 * 60 * 60 },
  { label: "1 day", value: 24 * 60 * 60 },
  { label: "1 week", value: 7 * 24 * 60 * 60 },
];

const TYPE_OPTIONS: CaffeinateType[] = [
  { label: "System", flag: "-i" },
  { label: "Screen", flag: "-d" },
  { label: "Disk", flag: "-m" },
];

interface CaffeinateType {
  label: string;
  flag: string;
}

interface CaffeinateDuration {
  label: string;
  value: number;
}

function runCaffeinate(type: CaffeinateType, duration: number) {
  try {
    const command = duration > 0 ? `caffeinate ${type.flag} -t ${duration}` : `caffeinate ${type.flag}`;
    exec(command);
    showToast(Toast.Style.Success, "Success", `Keeping ${type.label} awake for ${duration} seconds`);
  } catch (error) {
    showToast(Toast.Style.Failure, "Error", "Failed to run caffeinate command");
  }
}
export default function Command() {
  return (
    <List>
      {TYPE_OPTIONS.map((type) => (
        <List.Section key={type.label} title={type.label}>
          {DURATION_OPTIONS.map((duration) => (
            <List.Item
              key={`${type.label}-${duration.label}`}
              title={duration.label}
              actions={
                <ActionPanel>
                  <Action
                    title={`Keep ${type.label} Awake for ${duration.label}`}
                    onAction={() => runCaffeinate(type, duration.value)}
                  />
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      ))}
    </List>
  );
}
