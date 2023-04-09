import parse from 'html-react-parser';

const EmbedBlock = ({ snippet }) => {
  return (
    <>{parse(snippet)}</>
  );
};

export default EmbedBlock;