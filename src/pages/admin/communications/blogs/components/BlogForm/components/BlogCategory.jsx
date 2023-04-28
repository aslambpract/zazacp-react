import { RHFSelect } from "src/components/hook-form";
import useBlogCategories from "../hooks/useBlogCategories";

const BlogCategory = () => {
  const { categories } = useBlogCategories();

  return (
    <RHFSelect name="category_id" label="Blog Category">
      <option value="" />
      {categories.map((item, i) => (
        <option value={item.id}>{item.name}</option>
      ))}
    </RHFSelect>
  );
};

export default BlogCategory;
