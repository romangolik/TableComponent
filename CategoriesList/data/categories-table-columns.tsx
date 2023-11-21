import Link from "@components/ui/Link";
import CategoryType from "../components/CategoryType";
import BulletedText from "@components/ui/BulletedText";

import { Column } from "@components/layout/Table";
import { CategoryDto } from "@store/api/categoryApi/types/category.dto";

export const CATEGORIES_TABLE_COLUMNS: Column<CategoryDto>[] = [
  {
    id: "image",
    label: "Зображ.",
    type: "image",
    format: (category) => <img src={category.image} alt={category.name} />,
  },
  {
    id: "name",
    label: "Назва",
    format: (category) => (
      <Link
        to={category.id.toString()}
        variant="dashed"
        className="link link-dashed">
        {category.name}
      </Link>
    ),
  },
  {
    id: "type",
    label: "Тип",
    format: (category) => <CategoryType type={category.type} />,
  },
  {
    id: "status",
    label: "Статус",
    format: (category) => (
      <BulletedText
        color={category.published ? "success" : "primary"}
        text={category.published ? "Опублікована" : "Не опублікована"}
      />
    ),
  },
];
