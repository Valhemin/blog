import React from "react";
import { Tag, Divider } from "antd";
// const ListTags = ["Báo chí", "CNTT", "Đời sống"];

export default function Tags(props) {
  const { tags, children } = props;
  const randomColorTags = () => {
    var color = "#" + Math.floor(Math.random() * 16777215).toString(16);

    return color;
  };
  return (
    <Divider orientation="left">
      {/* {ListTags.map((tag) => ( */}
      <Tag color={randomColorTags()}>{tags}</Tag>
      {/* ))} */}
      {children}
    </Divider>
  );
}
