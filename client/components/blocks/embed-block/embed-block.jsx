import parse from 'html-react-parser';

const EmbedBlock = ({ snippet }) => {
  return (
    <div className="[&>iframe]:max-w-full">{parse(snippet)}</div>
  );
};

export default EmbedBlock;