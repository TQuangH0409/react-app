import React from "react";
import "./infoTeacher.css";

export default function infoTeacher() {
  var teacher = {
    avatarUrl: "./avatar.jpg",
    name: "Nguyễn Cẩm Tú",
    teacherId: "NVC22091998",
    email: "vietnguyen0305@gmail.com",
    rank: "64",
    school_institute: "CNTT&TT",
    research_area: [
      {
        name: "Xử lý ngôn ngữ tự nhiên",
        experience: 3,
      },
      {
        name: "Xử lý ngôn ngữ tự nhiên",
        experience: 3,
      },
    ],
  };

  return (
    <div className="content__container">
      <div className="content-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Thông tin cá nhân</h6>
      </div>
      <div className="body">
        <div className="body_avatar">
          <img src={teacher.avatarUrl} />
        </div>
        <div className="body_content">
          <div className="body_content_left">
            <div className="body_content_left--inner">
              <p>Họ và tên: </p>
              <p className="body_content_left--inner--name">{teacher.name}</p>
            </div>
            <div className="body_content_left--inner">
              <p>Mã số giảng viên: </p>
              <p>{teacher.teacherId}</p>
            </div>
            <div className="body_content_left--inner">
              <p>Email: </p>
              <p className="body_content_left--inner--name">{teacher.email}</p>
            </div>
          </div>

          <div className="body_content_right">
            <div className="body_content_right--inner">
              <p>Cấp bậc: </p>
              <p>{teacher.rank}</p>
            </div>
            <div className="body_content_right--inner">
              <p>Trường/Viện: </p>
              <p>{teacher.school_institute}</p>
            </div>
            <div className="body_content_right--inner">
              <p>Lĩnh vực nghiên cứu: </p>
              <div>
                {teacher.research_area.map((item) => {
                  return (
                    <div className="research_area">
                      <p>{item.name}</p>
                      <p>{item.experience}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
