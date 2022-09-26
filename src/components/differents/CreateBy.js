import React from "react";

export default function CreateBy(props) {
  const { name, date } = props;
  return (
    <div
      className="createBy"
      style={{
        marginLeft: "auto",
        marginRight: "20px",
        textAlign: "right",
        fontSize: "12px",
        color: "rgba(0,0,0,0.4)",
      }}
    >
      <div className="createBy__date">{date}</div>
      <div className="createBy__name">Tạo bởi: {name}</div>
    </div>
  );
}
