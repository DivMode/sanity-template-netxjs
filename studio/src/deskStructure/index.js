import S from "@sanity/desk-tool/structure-builder";
import { MdWeb, MdSettings, MdWhatshot, MdLooks } from "react-icons/md";
import siteSettings from "./siteSettings";

import BlogPagePreview from "../components/previews/blog/BlogPagePreview";
import BlogsOverviewPreview from "../components/previews/blog/BlogsOverviewPreview";

const hiddenDocTypes = (listItem) =>
  !["siteSettings", "page", "blog", "route", "siteConfig"].includes(
    listItem.getId()
  );

export default () =>
  S.list()
    .title("Team.")
    .items([
      S.documentTypeListItem("blog").title("Blogs"),
      S.listItem()
        .title("Website")
        .icon(MdWeb)
        .child(
          S.list()
            .title("Website")
            .items([
              S.listItem()
                .title("Site configuration")
                .icon(MdSettings)
                .child(
                  S.document()
                    .title("Site configuration")
                    .schemaType("siteConfig")
                    .documentId("siteConfig")
                ),
              S.documentTypeListItem("route").title("Routes"),
              S.documentTypeListItem("page").title("Pages"),
            ])
        ),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);

export const getDefaultDocumentNode = (props) => {
  /**
   * Here you can define fallback views for document types without
   * a structure definition for the document node. If you want different
   * fallbacks for different types, or document values (e.g. if there is a slug present)
   * you can set up that logic in here too.
   * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
   */
  const { schemaType } = props;
  if (schemaType === "blog") {
    return S.document().views([
      S.view.form(),
      S.view.component(BlogsOverviewPreview).title("Blogs Overview"),
      S.view.component(BlogPagePreview).title("Post Preview"),
    ]);
  }

  return S.document().views([S.view.form()]);
};
