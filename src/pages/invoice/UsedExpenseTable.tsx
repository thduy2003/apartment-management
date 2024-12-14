import React, { useState } from "react";
import { Table, Form, Select, InputNumber, Modal, Input, notification } from "antd";
import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { ExpenseDataType } from "../expense/Expense";

interface ExpenseItem {
  name: string;
  price: number;
  number: number;
  total: number;
}

interface UsedExpensesTableProps {
  initialExpenses: ExpenseItem[];
  initialExpenseData: ExpenseDataType[]; // Replace 'any' with actual type from the original code
  onExpensesChange: (expenses: ExpenseItem[]) => void;
}

const UsedExpensesTable: React.FC<UsedExpensesTableProps> = ({ initialExpenses, initialExpenseData, onExpensesChange }) => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [addForm] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns = [
    {
      title: "Khoản phí",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => price.toLocaleString("vi-VN"),
    },
    {
      title: "Số lượng",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (total: number) => total.toLocaleString("vi-VN"),
    },
  ];

  const handleAddExpense = () => {
    setIsAddModalVisible(true);
  };

  const handleAddExpenseSubmit = () => {
    addForm
      .validateFields()
      .then((values) => {
        const selectedExpense = initialExpenseData.find((exp) => exp.name === values.expenseName);

        if (selectedExpense) {
          const newExpense: ExpenseItem = {
            name: selectedExpense.name,
            price: parseFloat(selectedExpense.price.replace(/,/g, "")),
            number: values.number,
            total: parseFloat(selectedExpense.price.replace(/,/g, "")) * values.number,
          };

          const updatedExpenses = [...expenses, newExpense];
          setExpenses(updatedExpenses);
          onExpensesChange(updatedExpenses);

          setIsAddModalVisible(false);
          addForm.resetFields();
        }
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  const handleRemoveExpenses = () => {
    if (selectedRowKeys.length === 0) {
      notification.warning({
        message: "Thông báo",
        description: "Vui lòng chọn chi phí để xóa",
      });
      return;
    }
    const remainingExpenses = expenses.filter((_, index) => !selectedRowKeys.includes(index));

    setExpenses(remainingExpenses);
    onExpensesChange(remainingExpenses);
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  const totalPrice = expenses.reduce((total, current) => (total += current.total), 0);

  return (
    <>
      <div className='flex justify-end mb-4 gap-3'>
        <div className='cursor-pointer' onClick={handleRemoveExpenses}>
          <DeleteOutlined />
        </div>
        <div className='cursor-pointer' onClick={handleAddExpense}>
          <PlusSquareOutlined />
        </div>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={expenses.map((expense, index) => ({
          ...expense,
          key: index,
        }))}
        pagination={false}
      />
      <div className='flex items-center justify-end gap-2'>
        <div>Tổng tiền: </div>
        <div>
          <Input disabled={true} className='w-full' value={totalPrice.toLocaleString("vi-VN")} />
        </div>
      </div>

      <Modal
        title='Thêm khoản phí'
        open={isAddModalVisible}
        onOk={handleAddExpenseSubmit}
        onCancel={() => {
          setIsAddModalVisible(false);
          addForm.resetFields();
        }}
      >
        <Form form={addForm} layout='vertical'>
          <Form.Item name='expenseName' label='Khoản phí' rules={[{ required: true, message: "Vui lòng chọn khoản phí" }]}>
            <Select placeholder='Chọn khoản phí'>
              {initialExpenseData.map((expense) => (
                <Select.Option key={expense.expenseId} value={expense.name}>
                  {expense.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='number' label='Số lượng' rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}>
            <InputNumber min={1} className='w-full' placeholder='Nhập số lượng' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UsedExpensesTable;
