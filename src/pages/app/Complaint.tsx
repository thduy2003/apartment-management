import { useState } from "react";
import type { MenuProps } from "antd";
import { Button, Form, Input, Menu, notification, Pagination, Table } from "antd";
import "./Complaint.css";
import TextArea from "antd/es/input/TextArea";
import { StarOutlined, StarFilled, LeftOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    label: "Danh sách khiếu nại",
    key: "complaint-list",
  },
  {
    label: "Đánh giá phản hồi",
    key: "feedback-rating",
  },
];

const Complaint = () => {
  const [current, setCurrent] = useState("complaint-list");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdd, setIsAdd] = useState(false);
  const [complaintContent, setComplaintContent] = useState("");
  const [form] = Form.useForm();
  const [rating, setRating] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const initialData = Array.from({ length: 50 }, (_, i) => ({
    id: `KN${(i + 1).toString().padStart(3, "0")}`,
    date: `2024-12-${(i % 30) + 1}`,
    status: i % 2 === 0 ? "Đã xử lý" : "Chưa xử lý",
  }));
  const [data, setData] = useState(initialData);
  const navigate = useNavigate();
  const pageSize = 8;
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const columns = [
    {
      title: "ID Khiếu Nại",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ngày Gửi",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleAddComplaint = () => {
    if (complaintContent.trim().length === 0) {
      notification.warning({
        message: "Thông báo",
        description: "Vui lòng nhập nội dung khiếu nại",
      });
    }
    if (complaintContent.trim()) {
      const lastComplaint = initialData[initialData.length - 1];

      const lastIdNumber = parseInt(lastComplaint.id.toString().replace("KN", ""), 10);
      const newComplaint = {
        id: `KN${(lastIdNumber + 1).toString().padStart(3, "0")}`,
        date: new Date().toISOString().split("T")[0], // Lấy ngày hiện tại
        status: "Chưa xử lý",
      };
      initialData.push(newComplaint);
      setData([newComplaint, ...data]); // Thêm vào đầu danh sách
      setComplaintContent(""); // Xóa nội dung TextArea
      setIsAdd(false); // Đóng form thêm mới
    }
  };
  const handleRatingSubmit = () => {
    notification.success({
      message: "Đánh giá phản hồi",
      description: "Đánh giá phản hồi thành công",
    });
    setRating(0);
    form.resetFields();
  };
  const handleStarClick = (starValue: number) => {
    setRating(starValue);
    form.setFieldsValue({ feedbackRating: starValue }); // Gắn giá trị đánh giá vào form
  };

  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const filteredData = initialData.filter((complaint) => complaint.id.toLowerCase().includes(value.toLowerCase()));
    setData(filteredData);
  };

  return (
    <div className='sm:max-w-[390px] max-sm:w-full flex justify-center mx-auto h-screen '>
      {/* Phone frame */}
      <div className='w-full h-full bg-white rounded-[30px] shadow-lg  border-x-[5px] border-black-500'>
        <div className='w-full h-[90px] bg-white rounded-t-[30px] flex p-5 items-center'>
          <div onClick={() => navigate("/app")} className='font-bold cursor-pointer'>
            <LeftOutlined />
          </div>
          <div className='font-bold flex-1 flex items-center justify-center'>KHIẾU NẠI</div>
        </div>
        <div className='bg-[#f6f6f6] h-[calc(100%-90px)] pt-4 px-3 flex flex-col rounded-b-[30px]'>
          {isAdd ? (
            <div className='bg-white py-5 px-4 '>
              <div className='mb-2'>Nội dung</div>
              <div>
                <TextArea
                  className='custom-textarea'
                  rows={10}
                  value={complaintContent}
                  onChange={(e) => setComplaintContent(e.target.value)}
                />
              </div>
              <div className='flex items-center justify-end mt-4 gap-2'>
                <Button className='bg-white text-red-500 border-none' onClick={() => setIsAdd(false)}>
                  Hủy
                </Button>
                <Button type='primary' onClick={handleAddComplaint}>
                  Gửi khiếu nại
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className='menu-complaint bg-white'>
                <Menu onClick={onClick} selectedKeys={[current]} mode='horizontal' items={items} />
              </div>
              {current === "complaint-list" ? (
                <>
                  <div className='bg-white py-5 px-4 mt-4'>
                    <div className='flex items-center justify-between mb-4'>
                      <div>Danh sách khiếu nại</div>
                      <div className='flex items-center gap-2'>
                        <div className='cursor-pointer' onClick={() => setIsAdd(true)}>
                          <PlusOutlined />
                        </div>
                        <div className='cursor-pointer' onClick={() => setIsSearch(true)}>
                          <SearchOutlined />
                        </div>
                      </div>
                    </div>
                    <div>
                      {isSearch && (
                        <div className='mb-4'>
                          <Input placeholder='Tìm kiếm khiếu nại' onChange={handleSearchChange} />
                        </div>
                      )}
                    </div>
                    <div className='overflow-auto rounded-lg' style={{ border: "1px solid #EFEFEF" }}>
                      {/* Table */}
                      <Table columns={columns} dataSource={paginatedData} pagination={false} rowKey='id' size='small' />
                      {/* Pagination */}
                    </div>
                  </div>
                  <Pagination
                    className='mt-auto text-center mb-10'
                    current={currentPage}
                    pageSize={pageSize}
                    showSizeChanger={false}
                    total={data.length}
                    onChange={handlePageChange}
                  />
                </>
              ) : (
                <>
                  <div className='bg-white py-5 px-4 mt-4'>
                    <Form form={form} layout='vertical' onFinish={handleRatingSubmit} className='space-y-2'>
                      <div className=' gap-x-3'>
                        <div className='flex-1'>
                          <Form.Item className='mb-4' label='Chọn khiếu nại' name='complaintId'>
                            <Input className='p-2 border rounded' />
                          </Form.Item>
                        </div>
                        <div className='flex-1'>
                          <Form.Item className='mb-4' label='Nội dung khiếu nại' name='complaintContent'>
                            <Input className='p-2 border rounded' />
                          </Form.Item>
                        </div>
                        <div className='flex-1'>
                          <Form.Item className='mb-4' label='Nội dung phản hồi' name='feedbackContent'>
                            <Input className='p-2 border rounded' />
                          </Form.Item>
                        </div>
                        <div className='flex-1'>
                          <Form.Item className='mb-4' label='Đánh giá phản hồi' name='feedbackRating'>
                            <div className='flex items-center justify-center gap-2'>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <div key={star} className='cursor-pointer' onClick={() => handleStarClick(star)}>
                                  {star <= rating ? (
                                    <StarFilled style={{ color: "#FFD700", fontSize: "24px" }} />
                                  ) : (
                                    <StarOutlined style={{ color: "#ccc", fontSize: "24px" }} />
                                  )}
                                </div>
                              ))}
                            </div>
                          </Form.Item>
                        </div>
                        <div className='flex-1'>
                          <Form.Item className='mb-4' label='Khung nhận xét' name='comment'>
                            <Input className='p-2 border rounded' />
                          </Form.Item>
                        </div>
                      </div>
                      <div className='flex items-center justify-end gap-x-3'>
                        <Button type='primary' htmlType='submit' className='flex-1 py-2'>
                          Gửi đánh giá
                        </Button>
                      </div>
                    </Form>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Complaint;
