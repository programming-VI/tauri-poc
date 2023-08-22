import { Command } from "@tauri-apps/api/shell";
import { FormEvent, useState } from "react";

const GIT = {
  word: "git",
  command: "run-git-version",
};
const SUDO = {
  word: "sudo",
  command: "os-command",
};

const useForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const words = inputValue.split(" ");

    if (words.length < 1) return;
    if (words[0] == GIT.word) {
      createAndExecuteCommand(GIT.command, words.slice(1));
      setInputValue("");
    }
    if (words.length < 3) return;
    if (words[0] == SUDO.word) {
      createAndExecuteCommand(SUDO.command, words.slice(1));
      setInputValue("");
    }
  };

  const createAndExecuteCommand = async (cmd: string, options: string[]) => {
    try {
      const child = await new Command(cmd, options).execute();
      setOutput(child.stdout);
      setError(child.stderr);
    } catch (error) {
      setOutput("");
      setError(error + "");
    }
  };

  return { inputValue, updateInput, handleClick, output, error };
};

export default useForm;
