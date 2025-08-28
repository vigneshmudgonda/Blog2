Wrap your blog pages with Helmet:

import { Helmet } from "react-helmet";

export default function BlogDetail({ title, content }) {
  return (
    <div>
      <Helmet>
        <title>{title} | Unique Tech</title>
        <meta name="description" content={content.slice(0, 150)} />
      </Helmet>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}