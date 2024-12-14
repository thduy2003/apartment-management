import React, { useState } from "react";
import { Button, DatePicker, Flex, Form, Input, Modal, notification, Select, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Expense.css";
type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"];

export interface ExpenseDataType {
  expenseId: React.Key;
  name: string;
  price: string;
  unit: string;
  status: string;
  appliedDate?: string;
  stopDate?: string;
}

const columns: TableColumnsType<ExpenseDataType> = [
  { title: "ID Khoản phí", dataIndex: "expenseId" },
  { title: "Tên khoản phí", dataIndex: "name" },
  { title: "Đơn giá", dataIndex: "price" },
  { title: "Đơn vị tính", dataIndex: "unit" },
  { title: "Trạng thái", dataIndex: "status" },
];
// eslint-disable-next-line react-refresh/only-export-components
export const initialExpenseData: ExpenseDataType[] = [
  {
    expenseId: "KP001",
    name: "Phí quản lý",
    price: "240,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
  {
    expenseId: "KP002",
    name: "Phí vệ sinh",
    price: "160,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
  {
    expenseId: "KP003",
    name: "Phí bảo vệ",
    price: "180,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
  {
    expenseId: "KP004",
    name: "Phí gửi xe máy",
    price: "20,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
  {
    expenseId: "KP005",
    name: "Phí gửi xe ô tô",
    price: "100,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
  {
    expenseId: "KP006",
    name: "Phí gửi xe ô tô",
    price: "100,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
  {
    expenseId: "KP007",
    name: "Phí gửi xe ô tô",
    price: "100,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
  {
    expenseId: "KP008",
    name: "Phí gửi xe ô tô",
    price: "100,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
  {
    expenseId: "KP009",
    name: "Phí gửi xe ô tô",
    price: "100,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
  {
    expenseId: "KP010",
    name: "Phí gửi xe ô tô",
    price: "100,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
  {
    expenseId: "KP011",
    name: "Phí gửi xe ô tô",
    price: "100,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
  {
    expenseId: "KP012",
    name: "Phí gửi xe ô tô",
    price: "100,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
  {
    expenseId: "KP013",
    name: "Phí gửi xe ô tô",
    price: "100,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
  {
    expenseId: "KP014",
    name: "Phí gửi xe ô tô",
    price: "100,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
  {
    expenseId: "KP015",
    name: "Phí gửi xe ô tô",
    price: "100,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
  {
    expenseId: "KP016",
    name: "Phí gửi xe ô tô",
    price: "100,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
  {
    expenseId: "KP017",
    name: "Phí gửi xe ô tô",
    price: "100,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
  {
    expenseId: "KP018",
    name: "Phí gửi xe ô tô",
    price: "100,000",
    unit: "Hàng tháng",
    status: "Đang áp dụng",
  },
];

const Expense: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [expenseData, setExpenseData] = useState<ExpenseDataType[]>(initialExpenseData);
  const [currentExpense, setCurrentExpense] = useState<ExpenseDataType | null>(null);

  const handleSubmit = async (values: ExpenseDataType) => {
    if (currentExpense) {
      // Cập nhật thông tin chi phí
      const updatedData = expenseData.map((item) => (item.expenseId === currentExpense.expenseId ? { ...item, ...values } : item));
      setExpenseData(updatedData);
      notification.success({
        message: "Thông báo",
        description: "Cập nhật chi phí thành công",
      });
      setCurrentExpense(null);
      setSelectedRowKeys([]);
    } else {
      // Thêm mới chi phí
      console.log("values", values);
      const newExpense = { ...values, expenseId: `KP${(expenseData.length + 1).toString().padStart(3, "0")}` };
      setExpenseData([...expenseData, newExpense]);
      notification.success({
        message: "Thông báo",
        description: "Thêm mới chi phí thành công",
      });
    }
    setIsModalOpen(false);
    form.resetFields();
  };
  const showModal = (isEdit: boolean) => {
    if (!isEdit) {
      form.setFieldValue("expenseId", `KP${(expenseData.length + 1).toString().padStart(3, "0")}`);
      setIsModalOpen(true);
    }
    if (isEdit && selectedRowKeys.length === 1) {
      const selectedExpense = expenseData.find((item) => item.expenseId === selectedRowKeys[0]);
      setCurrentExpense(selectedExpense || null);
      form.setFieldsValue(selectedExpense || {});
      setIsModalOpen(true);
    } else if (isEdit && selectedRowKeys.length > 1) {
      notification.warning({
        message: "Thông báo",
        description: "Chỉ được chọn 1 chi phí để chỉnh sửa",
      });
    } else if (isEdit && selectedRowKeys.length === 0) {
      notification.warning({
        message: "Thông báo",
        description: "Vui lòng chọn chi phí để chỉnh sửa",
      });
    }
  };
  const showDeleteModal = () => {
    if (selectedRowKeys.length > 0) {
      Modal.confirm({
        title: "Bạn có chắc chắn muốn xóa?",
        content: "Dữ liệu đã chọn sẽ bị xóa vĩnh viễn.",
        onOk: () => handleDelete(),
      });
    }
    if (selectedRowKeys.length === 0) {
      notification.warning({
        message: "Thông báo",
        description: "Vui lòng chọn chi phí để xóa",
      });
    }
  };
  const handleDelete = () => {
    const remainingData = expenseData.filter((item) => !selectedRowKeys.includes(item.expenseId));
    setExpenseData(remainingData);
    setSelectedRowKeys([]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setCurrentExpense(null);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<ExpenseDataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Flex gap='middle' vertical>
      <Modal
        width={700}
        title={
          <div className='flex items-center justify-center text-[#1745E8] text-[22px]'>
            {currentExpense ? "Chỉnh sửa khoản chi phí" : "Thêm khoản chi phí"}
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout='vertical' onFinish={handleSubmit} className='space-y-4'>
          <div className='flex gap-x-3'>
            <div className='flex-1'>
              <Form.Item
                className='font-bold'
                label='ID Khoản chi phí'
                name='expenseId'
                initialValue={`KP${(expenseData.length + 1).toString().padStart(3, "0")}`}
              >
                <Input disabled={true} className='p-2 border rounded' />
              </Form.Item>
              <Form.Item className='font-bold' label='Đơn giá' name='price' rules={[{ required: true, message: "Vui lòng nhập đơn giá!" }]}>
                <Input className='p-2 border rounded' />
              </Form.Item>

              <Form.Item className='font-bold status-selector' label='Trạng thái' name='status'>
                <Select placeholder='Trạng thái' defaultValue={form.getFieldValue("status")}>
                  {["Đang áp dụng", "Hết áp dụng"].map((status) => (
                    <Select.Option key={status} value={status}>
                      {status}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item className='font-bold' label='Ngày ngừng áp dụng' name='stopDate'>
                <DatePicker format='DD-MM-YYYY' className='w-full p-2 border rounded' />
              </Form.Item>
            </div>
            <div className='flex-1'>
              <Form.Item
                className='font-bold'
                label='Tên Khoản chi phí'
                name='name'
                rules={[{ required: true, message: "Vui lòng nhập tên khoản chi phí!" }]}
              >
                <Input className='p-2 border rounded' />
              </Form.Item>
              <Form.Item
                className='font-bold status-selector'
                label='Đơn vị tính'
                name='unit'
                rules={[{ required: true, message: "Vui lòng nhập đơn vị tính!" }]}
              >
                <Select placeholder='Đơn vị tính' defaultValue={form.getFieldValue("unit")}>
                  {["Hàng tháng", "Hàng năm", "Hàng quý"].map((status) => (
                    <Select.Option key={status} value={status}>
                      {status}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item className='font-bold' label='Ngày áp dụng' name='appliedDate'>
                <DatePicker format='DD-MM-YYYY' className='w-full p-2 border rounded' />
              </Form.Item>
            </div>
          </div>
          <div className='flex items-center justify-center gap-x-3'>
            <Button type='default' onClick={handleCancel} className='flex-1 py-2'>
              Hủy
            </Button>
            <Button type='primary' htmlType='submit' className='flex-1 py-2'>
              {currentExpense ? "Lưu" : "Thêm"}
            </Button>
          </div>
        </Form>
      </Modal>
      <div className='bg-white p-3 rounded-xl flex items-center justify-between gap-3'>
        <Input placeholder='Tìm kiếm' />
        <div className='flex items-center gap-2'>
          <div
            onClick={showDeleteModal}
            className='bg-[#F4F7FC] rounded-xl  w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-[#1745E8]'
          >
            <DeleteOutlined />
          </div>
          <div
            onClick={() => showModal(true)}
            className='bg-[#F4F7FC] rounded-xl w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-[#1745E8]'
          >
            <EditOutlined />
          </div>
          <Button className='bg-[#1745E8] rounded-xl' onClick={() => showModal(false)}>
            <div className='flex items-center justify-between gap-2 text-white'>
              <PlusOutlined />
              <span>THÊM</span>
            </div>
          </Button>
        </div>
      </div>
      <Table<ExpenseDataType> rowKey='expenseId' rowSelection={rowSelection} columns={columns} dataSource={expenseData} />
    </Flex>
  );
};

export default Expense;
