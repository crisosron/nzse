import React from 'react';

const Articles = ({ articles }) => {
  return (
    <div>
      Articles:
      <div className='text-blue-500'>
        {articles &&
          articles.map((article, i) => {
            return <div key={`article-${i}`}>{article.title}</div>;
          })}
      </div>
    </div>
  );
};

export default Articles;
