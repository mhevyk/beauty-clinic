import Markdown from "react-markdown";
import { Link, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

const md = `
  ![Javatpoint](https://media-exp1.licdn.com/dms/image/C4D0BAQEwg5FK93uumQ/company-logo_200_200/0/1519923012279?e=2147483647&v=beta&t=63CNoS8OTR4lHjPhHSO7eFFqwLGwYunWfyDBV3tdc0c)  

  Welcome to your blog post. Use this space to connect with your readers and potential customers in a way that’s current and interesting. Think of it as an ongoing conversation where you can share updates about business, trends, news, and more. 

  #### Create Relevant Content

  > Do you have a design in mind for your blog? Whether you prefer a trendy postcard look or you’re going for a more editorial style blog - there’s a stunning layout for everyone.

  You’ll be posting loads of engaging content, so be sure to keep your blog organized with Categories that also allow visitors to explore more of what interests them.

  Writing a blog is a great way to position yourself as an authority in your field and captivate your readers’ attention. Do you want to improve your site’s SEO ranking? Consider topics that focus on relevant keywords and relate back to your website or business. You can also add hashtags [(#vacation #dream #summer)](https://en.wikipedia.org/wiki/Albert_Einstein) throughout your posts to reach more people, and help visitors search for relevant content. 

  Blogging gives your site a voice, so let your business’ personality shine through. Choose a great image to feature in your post or add a video for extra engagement. Are you ready to get started? Simply create a new post now. 
  `;

type Params = {
  postId: string;
};

// TODO: complete with real UI
export default function PostPage() {
  // TODO: use param to fetch post from backend
  const params = useParams<Params>();

  console.log(params)

  return (
    <>
      <Markdown
        children={md}
        components={{
          blockquote: props => {
            return (
              <blockquote style={{ color: "red" }}>{props.children}</blockquote>
            );
          },
          h1: props => {
            return <Typography>{props.children}</Typography>;
          },
          a: props => {
            if (!props.href) {
              return;
            }

            return <Link to={props.href}>{props.children}</Link>;
          },
        }}
      />
    </>
  );
}
