interface FormatTitleError {
  title: string;
  error: string;
}

const OutputAndError = ({ title, error }: FormatTitleError) => {
  return (
    <>
      <h2>{title}: </h2>
      <code>{error}</code>
    </>
  );
};

export default OutputAndError;
