import { paramCase } from "change-case";
import { useEffect, useState } from "react";
import fetchUser from "src/utils/fetchUser";

const icons = [
  "bi:credit-card",
  "fluent:shopping-bag-20-regular",
  "ic:baseline-loop",
  "bx:box",
  "ci:settings",
];

const useFaq = () => {
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchFaq = async () => {
      const { status, data } = await (await fetchUser("user-faqs")).data;
      if (status) {
        setCategories(
          data.data.map(({ name }, i) => ({
            slug: paramCase(name),
            name,
            icon: icons[i],
          }))
        );
        setFaqs(data.data);
      }
    };
    fetchFaq();
  }, []);

  return { categories, faqs };
};

export default useFaq;
