import { FormEvent } from "react";
import "./App.css";
import { Command } from "@tauri-apps/api/shell";
import useCommand from "./hooks/useCommand";
import OutputAndError from "./components/OutputAndError";

function App() {
  const { inputValue, updateInput, handleClick, output, error } = useCommand();

  const handleClick2 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const command = new Command("update-os", ["apt", "autoclean"]);

    command.on("error", (error) => console.log(`Command err: ${error}`));
    command.stdout.on("data", (line) => console.log(`Command output ${line}`));
    command.stderr.on("data", (line) => console.log(`Command err: ${line}`));

    const child = await command.spawn();
    console.log("🚀 ~ file: App.tsx:16 ~ handleClick ~ child.pid:", child.pid);

    const output = await new Command("run-git-version", [
      "--version",
    ]).execute();
  };

  return (
    <>
      <form onSubmit={handleClick}>
        <input
          type="text"
          placeholder="enter the command"
          value={inputValue}
          onChange={updateInput}
        />
        <input type="submit" value="Process" />
      </form>
      <hr />
      <OutputAndError error={output} title="Output" />
      <OutputAndError error={error} title="Error" />
    </>
  );
}

export default App;
