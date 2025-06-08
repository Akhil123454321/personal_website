import Input from "./Input";
import Output from "./Output";

export default function Command({ command, output, onSubmit, inputValue, onInputChange, onKeyDown }) {
  return (
    <div>
      <Input
        command={command}
        onSubmit={(command) => onSubmit(command)}
        inputValue={inputValue}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
      />
      {output && <Output output={output} />}
    </div>
  );
}