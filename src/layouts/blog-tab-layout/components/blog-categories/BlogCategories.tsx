import { useGetPostCategoriesSuspenseQuery } from "@/api/generated";
import BlogTab from "@/layouts/blog-tab-layout/components/blog-tab/BlogTab";

export default function BlogCategories() {
  const { data } = useGetPostCategoriesSuspenseQuery();

  const categories = data?.categories ?? [];

  return categories.map(category => (
    <BlogTab
      key={category.id}
      categoryLabel={category.name}
      categorySlug={category.slug}
    />
  ));
}
