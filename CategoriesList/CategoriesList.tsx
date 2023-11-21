import React, { FC } from "react";

import { Link } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";

import Icon from "@components/ui/Icon";
import Button from "@components/ui/Button";
import ContentBox from "@components/ui/ContentBox";
import PageLayout from "@components/layout/PageLayout";
import CustomTable from "@components/layout/Table";
import ConfirmationModal, {
  ConfirmStatusEnum,
} from "@components/modals/ConfirmationModal";

import {
  useDeleteCategoryMutation,
  useGetPaginatedCategoriesQuery,
} from "@store/api/categoryApi";

import { CATEGORIES_TABLE_COLUMNS } from "./data/categories-table-columns";

import "./CategoriesList.scss";

const CategoriesList: FC = () => {
  const { data: categories } = useGetPaginatedCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  function deleteCategoryHandler(id: number) {
    NiceModal.show(ConfirmationModal, {
      message: "Чи бажаєте ви видалити дану категорію?",
    }).then((resolve) => {
      if (resolve === ConfirmStatusEnum.YES) {
        deleteCategory(id);
      }
    });
  }

  return (
    <PageLayout className="categories-list-page">
      <PageLayout.Header className="aife">
        <PageLayout.Title badgeContent={categories.total}>
          Список категорий
        </PageLayout.Title>
        <Button
          to="create"
          color="success"
          variant="contained"
          component={Link}
          startIcon={<Icon name="plus" />}>
          Створити категорію
        </Button>
      </PageLayout.Header>
      <PageLayout.Content className="categories-list-page__content">
        <ContentBox>
          <CustomTable
            enableDelete
            data={categories.data}
            count={categories.total}
            page={categories.page}
            columns={CATEGORIES_TABLE_COLUMNS}
            rowsPerPage={categories.limit}
            onDeleteAction={deleteCategoryHandler}
          />
        </ContentBox>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default CategoriesList;
