// import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import "@/containers/post-editor/PostEditor.content.css";
import BlogTabLayout from "@/layouts/blog-tab-layout/BlogTabLayout";

// import { PostPageParams } from "@/types/helpers";

// TODO: replace with real data from backend
const title = "Why are Facials a Must for the Modern Woman";

const content = `<p>Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading.</p>
<p><strong><img style="display: block; margin-left: auto; margin-right: auto;" src="https://static.wixstatic.com/media/84770f_170242c7269d4ba2ba8ad50591e1a1e8~mv2_d_4500_2992_s_4_2.jpg/v1/fill/w_925,h_615,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/84770f_170242c7269d4ba2ba8ad50591e1a1e8~mv2_d_4500_2992_s_4_2.jpg" width="668" height="444"></strong></p>
<p>Welcome to your blog post. Use this space to connect with your readers and potential customers in a way that&rsquo;s current and interesting. Think of it as an ongoing conversation where you can share updates about business, trends, news, and more.</p>
<blockquote>
<p><em>Do you have a design in mind for your blog? Whether you prefer a trendy postcard look or you&rsquo;re going for a more editorial style blog - there&rsquo;s a stunning layout for everyone.</em></p>
</blockquote>
<p>You&rsquo;ll be posting loads of engaging content, so be sure to keep your blog organized with Categories that also allow visitors to explore more of what interests them.</p>
<p><strong>Create Relevant Content</strong></p>
<p>&nbsp;</p>
<p>Writing a blog is a great way to position yourself as an authority in your field and captivate your readers&rsquo; attention. Do you want to improve your site&rsquo;s SEO ranking? Consider topics that focus on relevant keywords and relate back to your website or business. You can also add hashtags (<a class="QzAlv iqUF1" href="https://social-blog.wix.com/search/posts%3Fquery=%23vacation" target="_top" rel="noopener" data-hook="WebLink"><u>#vacation</u></a><u> </u><a class="QzAlv iqUF1" href="https://social-blog.wix.com/search/posts%3Fquery=%23dream" target="_top" rel="noopener" data-hook="WebLink"><u>#dream</u></a><u> </u><a class="QzAlv iqUF1" href="https://social-blog.wix.com/search/posts%3Fquery=%23summer" target="_top" rel="noopener" data-hook="WebLink"><u>#summer</u></a>) throughout your posts to reach more people, and help visitors search for relevant content. Blogging gives your site a voice, so let your business&rsquo; personality shine through. Choose a great image to feature in your post or add a video for extra engagement. Are you ready to get started? Simply create a new post now.</p>`;

// TODO: complete with real UI
export default function PostPage() {
  // TODO: use param to fetch post from backend
  // const params = useParams<PostPageParams>();

  return (
    <Box>
      <BlogTabLayout />
      {/* TODO: change ui */}
      <Typography>{title}</Typography>
      {/* TODO: consider sanitizing */}
      <Box dangerouslySetInnerHTML={{ __html: content }} />
    </Box>
  );
}
