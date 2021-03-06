import React from "react";
import styles from "./IframePreview.css";

export default function BlogsOverviewPreview(props) {
  const { displayed } = props;
  const url =
    process.env.NODE_ENV === "production"
      ? `../../blog?preview`
      : "http://localhost:3000/blog?preview";
  return (
    <div className={styles.componentWrapper}>
      <div className={styles.iframeContainer}>
        <iframe src={url} frameBorder={"0"} />
      </div>
    </div>
  );
}
