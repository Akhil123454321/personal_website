import Input from "./Input";
import Output from "./Output";

export default function Command({
  command,
  output,
  onSubmit,
  inputValue,
  onInputChange,
  onKeyDown,
  isInterrupt,
}) {
  return (
    <div>
      {isInterrupt ? (
        <Input command={command} disabled={true} />
      ) : (
        <Input
          command={command}
          onSubmit={(command) => onSubmit(command)}
          inputValue={inputValue}
          onInputChange={onInputChange}
          onKeyDown={onKeyDown}
        />
      )}
      {output && <Output output={output} />}
    </div>
  );
}