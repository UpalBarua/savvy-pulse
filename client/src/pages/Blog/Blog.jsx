import React from 'react';
import styles from './Blog.module.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import FailedToLoad from '../../components/FailedToLoad/FailedToLoad';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Blog = () => {
  const { data: blogData = [] } = useQuery({
    queryKey: ['blogData'],
    queryFn: async () => {
      const response = await axios.get(
        'https://savvy-pulse-upalbarua.vercel.app/blog'
      );
      return response.data;
    },
  });

  if (!blogData.length) {
    return <LoadingSpinner />;
  }

  return (
    <section className="container flow margin-block">
      <h2 className="title-primary">Blog</h2>
      {blogData.map((data) => (
        <article className={styles.article} key={data._id}>
          <h3 className={styles.question}>{data.question}</h3>
          <p className={styles.answer}>{data.answer}</p>
        </article>
      ))}
    </section>
  );
};

export default Blog;
