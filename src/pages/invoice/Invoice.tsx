import React, { useState } from "react";
import { Button, Col, Flex, Form, Input, Modal, notification, Pagination, Row, Select, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { Calendar, theme } from "antd";
import type { Dayjs } from "dayjs";
import { ExpenseDataType, initialExpenseData } from "../expense/Expense";
import moment from "moment";
import { EditOutlined } from "@ant-design/icons";
import UsedExpensesTable from "./UsedExpenseTable";
type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"];

interface InvoiceDataType {
  invoiceId: React.Key;
  apartment: string;
  name: string;
  type: string;
  totalPrice: string;
  status: string;
}
interface UsedExpenseDataType {
  usedExpeseId: React.Key;
  apartment: string;
  expenseId: string;
  number: number;
  status: string;
}
interface ExpenseItem {
  name: string;
  price: number;
  number: number;
  total: number;
}

interface InvoiceDetailDataType {
  invoiceId: React.Key;
  apartment: string;
  totalPrice: string;
  createdDate: string;
  usedExpenses: ExpenseItem[];
}

const initialInvoiceData: InvoiceDataType[] = [
  {
    invoiceId: "HD001",
    apartment: "CH002",
    name: "CH002-Hóa đơn Tháng 11/2024",
    type: "Hóa đơn hàng tháng",
    totalPrice: "580,000",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD002",
    apartment: "CH003",
    name: "CH003-Hóa đơn Tháng 11/2024",
    type: "Hóa đơn phát sinh",
    totalPrice: "580,000",
    status: "Chưa thanh toán",
  },
  {
    invoiceId: "HD003",
    apartment: "CH005",
    name: "CH005-Hóa đơn Tháng 11/2024",
    type: "Hóa đơn hàng tháng",
    totalPrice: "580,000",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD004",
    apartment: "CH006",
    name: "CH006-Hóa đơn Tháng 11/2024",
    type: "Hóa đơn hàng tháng",
    totalPrice: "580,000",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD005",
    apartment: "CH008",
    name: "CH008-Hóa đơn Tháng 11/2024",
    type: "Hóa đơn hàng tháng",
    totalPrice: "580,000",
    status: "Chưa thanh toán",
  },
  {
    invoiceId: "HD006",
    apartment: "CH008",
    name: "CH008-Hóa đơn phát sinh-Tháng 11/2024",
    type: "Hóa đơn phát sinh",
    totalPrice: "580,000",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD007",
    apartment: "CH009",
    name: "CH009-Hóa đơn Tháng 11/2024",
    type: "Hóa đơn hàng tháng",
    totalPrice: "580,000",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD008",
    apartment: "CH009",
    name: "CH009-Hóa đơn phát sinh-Tháng 11/2024",
    type: "Hóa đơn phát sinh",
    totalPrice: "580,000",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD009",
    apartment: "CH011",
    name: "CH009-Hóa đơn Tháng 11/2024",
    type: "Hóa đơn hàng tháng",
    totalPrice: "580,000",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD010",
    apartment: "CH013",
    name: "CH013-Hóa đơn Tháng 11/2024",
    type: "Hóa đơn hàng tháng",
    totalPrice: "580,000",
    status: "Chưa thanh toán",
  },
  {
    invoiceId: "HD011",
    apartment: "CH015",
    name: "CH015-Hóa đơn Tháng 11/2024",
    type: "Hóa đơn hàng tháng",
    totalPrice: "580,000",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD012",
    apartment: "CH016",
    name: "CH016-Hóa đơn Tháng 11/2024",
    type: "Hóa đơn hàng tháng",
    totalPrice: "580,000",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD013",
    apartment: "CH016",
    name: "CH016-Hóa đơn phát sinh-Tháng 11/2024",
    type: "Hóa đơn phát sinh",
    totalPrice: "580,000",
    status: "Đã thanh toán",
  },
];
const usedExpeses = [
  {
    usedExpeseId: "KPSD001",
    apartment: "CH002",
    expenseId: "KP001",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpeseId: "KPSD002",
    apartment: "CH002",
    expenseId: "KP002",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpeseId: "KPSD003",
    apartment: "CH002",
    expenseId: "KP003",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpeseId: "KPSD004",
    apartment: "CH003",
    expenseId: "KP004",
    number: 4,
    status: "Đang áp dụng",
  },
  {
    usedExpeseId: "KPSD005",
    apartment: "CH003",
    expenseId: "KP001",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpeseId: "KPSD006",
    apartment: "CH003",
    expenseId: "KP002",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpeseId: "KPSD007",
    apartment: "CH003",
    expenseId: "KP003",
    number: 1,
    status: "Hết áp dụng",
  },
  {
    usedExpeseId: "KPSD008",
    apartment: "CH003",
    expenseId: "KP004",
    number: 2,
    status: "Đang áp dụng",
  },
  {
    usedExpeseId: "KPSD009",
    apartment: "CH004",
    expenseId: "KP001",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpeseId: "KPSD010",
    apartment: "CH004",
    expenseId: "KP002",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpeseId: "KPSD011",
    apartment: "CH004",
    expenseId: "KP003",
    number: 1,
    status: "Hết áp dụng",
  },
  {
    usedExpeseId: "KPSD012",
    apartment: "CH004",
    expenseId: "KP004",
    number: 3,
    status: "Đang áp dụng",
  },
  {
    usedExpeseId: "KPSD013",
    apartment: "CH005",
    expenseId: "KP001",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpeseId: "KPSD014",
    apartment: "CH005",
    expenseId: "KP002",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpeseId: "KPSD015",
    apartment: "CH005",
    expenseId: "KP003",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpeseId: "KPSD016",
    apartment: "CH005",
    expenseId: "KP004",
    number: 6,
    status: "Đang áp dụng",
  },
  {
    usedExpeseId: "KPSD017",
    apartment: "CH006",
    expenseId: "KP001",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpeseId: "KPSD018",
    apartment: "CH006",
    expenseId: "KP002",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpeseId: "KPSD019",
    apartment: "CH006",
    expenseId: "KP003",
    number: 1,
    status: "Hết áp dụng",
  },
  {
    usedExpeseId: "KPSD020",
    apartment: "CH006",
    expenseId: "KP004",
    number: 5,
    status: "Đang áp dụng",
  },
];
const initialInvoiceDetails: InvoiceDetailDataType[] = [
  {
    invoiceId: "HD001",
    apartment: "CH002",
    totalPrice: "580,000",
    usedExpenses: [
      {
        name: "Phí quản lý",
        price: 240000,
        number: 1,
        total: 240000,
      },
      {
        name: "Phí vệ sinh",
        price: 160000,
        number: 1,
        total: 160000,
      },
      {
        name: "Phí bảo vệ",
        price: 180000,
        number: 1,
        total: 180000,
      },
    ],
    createdDate: "2024-12-14T09:56:00.551Z",
  },
  {
    invoiceId: "HD002",
    apartment: "CH003",
    totalPrice: "580,000",
    usedExpenses: [
      {
        name: "Phí quản lý",
        price: 240000,
        number: 1,
        total: 240000,
      },
      {
        name: "Phí vệ sinh",
        price: 160000,
        number: 1,
        total: 160000,
      },
      {
        name: "Phí bảo vệ",
        price: 180000,
        number: 1,
        total: 180000,
      },
    ],
    createdDate: "2024-12-14T09:56:00.551Z",
  },
  {
    invoiceId: "HD003",
    apartment: "CH005",
    totalPrice: "580,000",
    usedExpenses: [
      {
        name: "Phí quản lý",
        price: 240000,
        number: 1,
        total: 240000,
      },
      {
        name: "Phí vệ sinh",
        price: 160000,
        number: 1,
        total: 160000,
      },
      {
        name: "Phí bảo vệ",
        price: 180000,
        number: 1,
        total: 180000,
      },
    ],
    createdDate: "2024-12-14T09:56:00.551Z",
  },
  {
    invoiceId: "HD004",
    apartment: "CH006",
    totalPrice: "580,000",
    usedExpenses: [
      {
        name: "Phí quản lý",
        price: 240000,
        number: 1,
        total: 240000,
      },
      {
        name: "Phí vệ sinh",
        price: 160000,
        number: 1,
        total: 160000,
      },
      {
        name: "Phí bảo vệ",
        price: 180000,
        number: 1,
        total: 180000,
      },
    ],
    createdDate: "2024-12-14T09:56:00.551Z",
  },
  {
    invoiceId: "HD005",
    apartment: "CH008",
    totalPrice: "580,000",
    usedExpenses: [
      {
        name: "Phí quản lý",
        price: 240000,
        number: 1,
        total: 240000,
      },
      {
        name: "Phí vệ sinh",
        price: 160000,
        number: 1,
        total: 160000,
      },
      {
        name: "Phí bảo vệ",
        price: 180000,
        number: 1,
        total: 180000,
      },
    ],
    createdDate: "2024-12-14T09:56:00.551Z",
  },
  {
    invoiceId: "HD006",
    apartment: "CH008",
    totalPrice: "580,000",
    usedExpenses: [
      {
        name: "Phí quản lý",
        price: 240000,
        number: 1,
        total: 240000,
      },
      {
        name: "Phí vệ sinh",
        price: 160000,
        number: 1,
        total: 160000,
      },
      {
        name: "Phí bảo vệ",
        price: 180000,
        number: 1,
        total: 180000,
      },
    ],
    createdDate: "2024-12-14T09:56:00.551Z",
  },
  {
    invoiceId: "HD007",
    apartment: "CH009",
    totalPrice: "580,000",
    usedExpenses: [
      {
        name: "Phí quản lý",
        price: 240000,
        number: 1,
        total: 240000,
      },
      {
        name: "Phí vệ sinh",
        price: 160000,
        number: 1,
        total: 160000,
      },
      {
        name: "Phí bảo vệ",
        price: 180000,
        number: 1,
        total: 180000,
      },
    ],
    createdDate: "2024-12-14T09:56:00.551Z",
  },
  {
    invoiceId: "HD008",
    apartment: "CH009",
    totalPrice: "580,000",
    usedExpenses: [
      {
        name: "Phí quản lý",
        price: 240000,
        number: 1,
        total: 240000,
      },
      {
        name: "Phí vệ sinh",
        price: 160000,
        number: 1,
        total: 160000,
      },
      {
        name: "Phí bảo vệ",
        price: 180000,
        number: 1,
        total: 180000,
      },
    ],
    createdDate: "2024-12-14T09:56:00.551Z",
  },
  {
    invoiceId: "HD009",
    apartment: "CH011",
    totalPrice: "580,000",
    usedExpenses: [
      {
        name: "Phí quản lý",
        price: 240000,
        number: 1,
        total: 240000,
      },
      {
        name: "Phí vệ sinh",
        price: 160000,
        number: 1,
        total: 160000,
      },
      {
        name: "Phí bảo vệ",
        price: 180000,
        number: 1,
        total: 180000,
      },
    ],
    createdDate: "2024-12-14T09:56:00.551Z",
  },
  {
    invoiceId: "HD010",
    apartment: "CH013",
    totalPrice: "580,000",
    usedExpenses: [
      {
        name: "Phí quản lý",
        price: 240000,
        number: 1,
        total: 240000,
      },
      {
        name: "Phí vệ sinh",
        price: 160000,
        number: 1,
        total: 160000,
      },
      {
        name: "Phí bảo vệ",
        price: 180000,
        number: 1,
        total: 180000,
      },
    ],
    createdDate: "2024-12-14T09:56:00.551Z",
  },
  {
    invoiceId: "HD011",
    apartment: "CH015",
    totalPrice: "580,000",
    usedExpenses: [
      {
        name: "Phí quản lý",
        price: 240000,
        number: 1,
        total: 240000,
      },
      {
        name: "Phí vệ sinh",
        price: 160000,
        number: 1,
        total: 160000,
      },
      {
        name: "Phí bảo vệ",
        price: 180000,
        number: 1,
        total: 180000,
      },
    ],
    createdDate: "2024-12-14T09:56:00.551Z",
  },
  {
    invoiceId: "HD012",
    apartment: "CH016",
    totalPrice: "580,000",
    usedExpenses: [
      {
        name: "Phí quản lý",
        price: 240000,
        number: 1,
        total: 240000,
      },
      {
        name: "Phí vệ sinh",
        price: 160000,
        number: 1,
        total: 160000,
      },
      {
        name: "Phí bảo vệ",
        price: 180000,
        number: 1,
        total: 180000,
      },
    ],
    createdDate: "2024-12-14T09:56:00.551Z",
  },
  {
    invoiceId: "HD013",
    apartment: "CH016",
    totalPrice: "580,000",
    usedExpenses: [
      {
        name: "Phí quản lý",
        price: 240000,
        number: 1,
        total: 240000,
      },
      {
        name: "Phí vệ sinh",
        price: 160000,
        number: 1,
        total: 160000,
      },
      {
        name: "Phí bảo vệ",
        price: 180000,
        number: 1,
        total: 180000,
      },
    ],
    createdDate: "2024-12-14T09:56:00.551Z",
  },
];

const Invoice: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [invoiceData, setInvoiceData] = useState<InvoiceDataType[]>(initialInvoiceData);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDetailDataType | null>(null);
  const [selectedApartments, setSelectedApartments] = useState<string>("all");
  const [isInvoiceDetailModalOpen, setIsInvoiceDetailModalOpen] = useState(false);
  const [newInvoices, setNewInvoices] = useState<InvoiceDataType[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedCalendar, setSelectedCalendar] = useState<any>({
    year: "2024",
    month: "12",
  });
  const [isInvoiceDetailsModalOpen, setIsInvoiceDetailsModalOpen] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetailDataType[]>(initialInvoiceDetails);
  const [newInvoiceDetails, setNewInvoicesDetails] = useState<InvoiceDetailDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  // Generate a new invoiceId
  function generateInvoiceId(initialInvoiceData: InvoiceDataType[]): string {
    const lastInvoice = initialInvoiceData[initialInvoiceData.length - 1];
    const lastIdNumber = parseInt(lastInvoice.invoiceId.toString().replace("HD", ""), 10);
    return `HD${(lastIdNumber + 1).toString().padStart(3, "0")}`;
  }
  const handleApartmentSelect = (value: string) => {
    setSelectedApartments(value);
  };
  // Map usedExpenses to their corresponding expense data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function mapUsedExpenses(apartment: string, usedExpeses: UsedExpenseDataType[], initialExpenseData: ExpenseDataType[]): any[] {
    return usedExpeses
      .filter((used) => used.apartment === apartment && used.status === "Đang áp dụng")
      .map((used) => {
        const expense = initialExpenseData.find((exp) => exp.expenseId === used.expenseId);
        if (expense) {
          return {
            name: expense.name,
            price: parseFloat(expense.price.replace(/,/g, "")),
            number: used.number,
            total: parseFloat(expense.price.replace(/,/g, "")) * used.number,
          };
        }
        return null;
      })
      .filter(Boolean); // Remove null values
  }

  // Generate invoiceDetail for each apartment
  function generateInvoiceDetails(
    initialInvoiceData: InvoiceDataType[],
    usedExpeses: UsedExpenseDataType[],
    initialExpenseData: ExpenseDataType[]
  ) {
    const details: InvoiceDetailDataType[] = [];
    const uniqueApartments = selectedApartments === "all" ? [...new Set(usedExpeses.map((used) => used.apartment))] : [selectedApartments];
    const invoices: InvoiceDataType[] = [];
    uniqueApartments.forEach((apartment) => {
      const newInvoiceId = generateInvoiceId([...initialInvoiceData, ...invoices]);
      const usedExpenses = mapUsedExpenses(apartment, usedExpeses, initialExpenseData);

      const totalPrice = usedExpenses.reduce((sum, exp) => sum + (exp?.total || 0), 0);
      details.push({
        invoiceId: newInvoiceId,
        apartment,
        totalPrice: totalPrice.toLocaleString("en-US"),
        usedExpenses,
        createdDate: new Date().toISOString(),
      });
      invoices.push({
        invoiceId: newInvoiceId,
        apartment,
        name: `${apartment}-Hóa đơn Tháng ${selectedCalendar.month}/${selectedCalendar.year}`,
        type: "Hóa đơn hàng tháng",
        totalPrice: totalPrice.toLocaleString("en-US"),
        status: "Chưa thanh toán",
      });
    });
    console.log("details", details);
    setNewInvoices((prev) => [...prev, ...invoices]);
    return details;
  }

  // Execute

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    console.log("values", values);
    console.log("selected", selectedCalendar);
    const invoiceDetailsResponse = generateInvoiceDetails(initialInvoiceData, usedExpeses, initialExpenseData);
    setNewInvoicesDetails(invoiceDetailsResponse);
    setIsModalOpen(false);
    setIsInvoiceDetailsModalOpen(true);
    console.log("invoiceData", invoiceData);
    form.resetFields();
  };
  const handleSendInvoice = () => {
    setInvoiceData((prev) => [...prev, ...newInvoices]);
    setInvoiceDetails((prev) => [...prev, ...newInvoiceDetails]);
    setIsInvoiceDetailsModalOpen(false);
    const btn = (
      <Space>
        <Button type='default' className='w-[72px]' onClick={() => notification.destroy()}>
          Không
        </Button>
        <Button
          className='bg-[#01DF68] text-white w-[72px]'
          onClick={() => {
            notification.destroy();
            notification.success({
              message: "",
              description: "Tải hóa đơn thành công",
              style: {
                background: "#EDFFF8",
              },
            });
          }}
        >
          Có
        </Button>
      </Space>
    );
    notification.success({
      message: "",
      description: (
        <div>
          <p>Hóa đơn đã được tạo và gửi đến cư dân thành công!</p>
          <p>Bạn có muốn tải hóa đơn về máy?</p>
        </div>
      ),
      btn,
      duration: 10000,
      icon: null,
      style: {
        width: 410,
        padding: "33px 24px 10px",
        background: "#EDFFF8",
      },
    });
  };
  const handleCancelSendInvoice = () => {
    setIsInvoiceDetailsModalOpen(false);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = async (values: any) => {
    // Update the invoice details
    const updatedInvoiceDetails = invoiceDetails.map((detail) => {
      if (detail.invoiceId === values.invoiceId) {
        return {
          ...detail,
          name: values.name,
          // You can add more fields to update here
        };
      }
      return detail;
    });

    // Update the invoice data
    const updatedInvoiceData = invoiceData.map((invoice) => {
      if (invoice.invoiceId === values.invoiceId) {
        return {
          ...invoice,
          name: values.name,
          status: values.status,
        };
      }
      return invoice;
    });

    setInvoiceDetails(updatedInvoiceDetails);
    setInvoiceData(updatedInvoiceData);
    setIsInvoiceDetailModalOpen(false);
    notification.success({
      message: "Cập nhật thành công",
      description: "Hóa đơn đã được cập nhật",
    });
  };

  const handleExpensesChange = (updatedExpenses: ExpenseItem[]) => {
    // Update the total price and other details when expenses change
    const updatedInvoiceDetails = invoiceDetails.map((detail) => {
      if (detail.invoiceId === selectedInvoice?.invoiceId) {
        const totalPrice = updatedExpenses.reduce((sum, exp) => sum + exp.total, 0);
        return {
          ...detail,
          usedExpenses: updatedExpenses,
          totalPrice: totalPrice.toLocaleString("en-US"),
        };
      }
      return detail;
    });

    // Also update the corresponding invoice data
    const updatedInvoiceData = invoiceData.map((invoice) => {
      if (invoice.invoiceId === selectedInvoice?.invoiceId) {
        const totalPrice = updatedExpenses.reduce((sum, exp) => sum + exp.total, 0);
        return {
          ...invoice,
          totalPrice: totalPrice.toLocaleString("en-US"),
        };
      }
      return invoice;
    });

    setInvoiceDetails(updatedInvoiceDetails);
    setInvoiceData(updatedInvoiceData);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    const filteredData = initialInvoiceData.filter(
      (invoice) =>
        invoice.name.toLowerCase().includes(value.toLowerCase()) ||
        invoice.status.toLowerCase().includes(value.toLowerCase()) ||
        invoice.apartment.toLowerCase().includes(value.toLowerCase())
    );
    setInvoiceData(filteredData);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const invoiceDetailsPaginatedData = newInvoiceDetails.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const uniqueApartments = ["all", ...Array.from(new Set(initialInvoiceData.map((data) => data.apartment)))];

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showInvoiceDetailModal = (expenseId?: string) => {
    if (expenseId) {
      const invoice = invoiceData.find((invoice) => invoice.invoiceId === expenseId);
      const selectedInvoice = invoiceDetails.find((item) => item.invoiceId === expenseId);
      console.log("selectedExpense", selectedInvoice);
      setSelectedInvoice(selectedInvoice || null);
      form.setFieldsValue(selectedInvoice ? { ...selectedInvoice, name: invoice?.name, status: invoice?.status } : {});
      setIsInvoiceDetailModalOpen(true);
      return;
    }
    if (selectedRowKeys.length === 1) {
      const invoice = invoiceData.find((invoice) => invoice.invoiceId === selectedRowKeys[0]);
      const selectedInvoice = invoiceDetails.find((item) => item.invoiceId === selectedRowKeys[0]);
      console.log("selectedExpense", selectedInvoice);
      setSelectedInvoice(selectedInvoice || null);
      form.setFieldsValue(selectedInvoice ? { ...selectedInvoice, name: invoice?.name, status: invoice?.status } : {});
      setIsInvoiceDetailModalOpen(true);
      return;
    } else if (selectedRowKeys.length > 1) {
      notification.warning({
        message: "Thông báo",
        description: "Chỉ được chọn 1 hóa đơn để chỉnh sửa",
      });
      return;
    } else if (selectedRowKeys.length === 0) {
      notification.warning({
        message: "Thông báo",
        description: "Vui lòng chọn hóa đơn để chỉnh sửa",
      });
      return;
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedCalendar({
      year: "2024",
      month: "12",
    });
    form.resetFields();
  };
  const handleInvoiceDetailModalCancel = () => {
    setIsInvoiceDetailModalOpen(false);
    form.resetFields();
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const handleSelectCalendar = (value: Dayjs) => {
    setSelectedCalendar({
      year: value.format("YYYY"),
      month: value.format("MM"),
    });
  };

  const rowSelection: TableRowSelection<InvoiceDataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const columns: TableColumnsType<InvoiceDataType> = [
    { title: "ID Hóa đơn", dataIndex: "invoiceId" },
    { title: "Căn hộ", dataIndex: "apartment" },
    { title: "Tên hóa đơn", dataIndex: "name" },
    { title: "Loại hóa đơn", dataIndex: "type" },
    { title: "Tổng tiền", dataIndex: "totalPrice" },
    { title: "Trạng thái", dataIndex: "status" },
    {
      title: "",
      render: (_, record) => (
        <div className='text-[#1745E8] cursor-pointer' onClick={() => showInvoiceDetailModal(record.invoiceId.toString())}>
          Chi tiết
        </div>
      ),
    },
  ];

  return (
    <Flex gap='middle' vertical>
      <Modal width={700} title={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form form={form} layout='vertical' onFinish={handleSubmit} className='space-y-4'>
          <div className='flex gap-x-3'>
            <div className='flex-1'>
              <Form.Item className='font-bold' label='Hóa đơn tháng năm' name='year'>
                <div style={wrapperStyle}>
                  <Calendar fullscreen={false} mode='year' onSelect={handleSelectCalendar} />
                </div>
              </Form.Item>
            </div>
            <div className='flex-1'>
              <Form.Item className='font-bold' label='Căn hộ' name='apartment'>
                <Select placeholder='Chọn căn hộ' defaultValue={"all"} onChange={handleApartmentSelect}>
                  {uniqueApartments.map((apartment) => (
                    <Select.Option key={apartment} value={apartment}>
                      {apartment === "all" ? "Tất cả" : apartment}
                    </Select.Option>
                  ))}
                </Select>{" "}
              </Form.Item>
            </div>
          </div>
          <div className='flex items-center justify-center gap-x-3'>
            <Button type='default' onClick={handleCancel} className='flex-1 py-2'>
              Hủy
            </Button>
            <Button type='primary' htmlType='submit' className='flex-1 py-2'>
              THÊM
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal
        width={700}
        title={<div className='flex items-center justify-center text-[#1745E8] text-[22px]'>Chỉnh sửa hóa đơn</div>}
        open={isInvoiceDetailModalOpen}
        onCancel={handleInvoiceDetailModalCancel}
        footer={null}
      >
        <Form form={form} layout='vertical' onFinish={handleSave} className='space-y-4'>
          <div className='flex gap-x-3'>
            <div className='flex-1'>
              <Form.Item className='font-bold' label='ID Hóa đơn' name='invoiceId'>
                <Input disabled={true} className='p-2 border rounded' />
              </Form.Item>
              <Form.Item className='font-bold' label='Căn hộ' name='apartment'>
                <Input disabled={true} className='p-2 border rounded' />
              </Form.Item>
              {/* <Form.Item className='font-bold' label='Ngày lập' name='createdDate'>
                <DatePicker format='DD-MM-YYYY' className='w-full p-2 border rounded' />
              </Form.Item> */}
              <Form.Item className='font-bold' label='Phương thức thanh toán' name='paymentMethod'>
                <Select placeholder='Phương thức thanh toán'>
                  {["Chuyển khoản", "Tiền mặt"].map((paymentMethod) => (
                    <Select.Option key={paymentMethod} value={paymentMethod}>
                      {paymentMethod}
                    </Select.Option>
                  ))}
                </Select>{" "}
              </Form.Item>
            </div>
            <div className='flex-1'>
              <Form.Item className='font-bold' label='Tên hóa đơn' name='name'>
                <Input className='p-2 border rounded' />
              </Form.Item>
              {/* <Form.Item className='font-bold' label='Ngày đến hạn' name='dueDate'>
                <DatePicker format='DD-MM-YYYY' className='w-full p-2 border rounded' />
              </Form.Item> */}
              <Form.Item className='font-bold' label='Trạng thái thanh toán' name='status'>
                <Select placeholder='Trạng thái thanh toán' defaultValue={form.getFieldValue("status")}>
                  {["Chưa thanh toán", "Đã thanh toán"].map((status) => (
                    <Select.Option key={status} value={status}>
                      {status}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className='font-bold text-[16px] mb-4'>Chi tiết khoản phí</div>
          {selectedInvoice && (
            <UsedExpensesTable
              initialExpenses={selectedInvoice.usedExpenses}
              initialExpenseData={initialExpenseData}
              onExpensesChange={handleExpensesChange}
            />
          )}
          <div className='flex items-center justify-center gap-x-3'>
            <Button type='default' onClick={handleInvoiceDetailModalCancel} className='flex-1 py-2'>
              Hủy
            </Button>
            <Button type='primary' htmlType='submit' className='flex-1 py-2'>
              Lưu
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal
        width={861}
        title={<div className='flex items-center justify-center text-[#1745E8] text-[22px]'>Tạo hóa đơn hàng tháng</div>}
        open={isInvoiceDetailsModalOpen}
        onCancel={() => setIsInvoiceDetailsModalOpen(false)}
        footer={null}
      >
        <Row gutter={[16, 16]} align='stretch'>
          {invoiceDetailsPaginatedData.map((detail) => (
            <Col key={detail.invoiceId} span={12}>
              <div className='px-6 py-4 bg-[#F4F7FC] drop-shadow-lg flex flex-col items-stretch h-[100%] rounded-lg '>
                <div className='flex w-full mb-[21px]'>
                  <div className='w-[70%] flex gap-x-2 gap-y-1'>
                    <div className='flex-1'>
                      <p>Mã hóa đơn</p>
                      <p>Ngày lập</p>
                      <p>Căn hộ</p>
                    </div>
                    <div className='flex-1'>
                      <p>
                        <strong>{detail.invoiceId.toString()}</strong>
                      </p>
                      <p>
                        <strong>{moment(detail.createdDate).format("DD/MM/YYYY")}</strong>
                      </p>
                      <p>
                        <strong>{detail.apartment}</strong>
                      </p>
                    </div>
                  </div>
                  <div className='w-[30%]'>
                    <strong className='text-[18px] text-[#1745E8]'>{detail.totalPrice}</strong>
                  </div>
                </div>
                <div className='w-full flex flex-col gap-2'>
                  {detail.usedExpenses.map((expense, index) => (
                    <div key={index} className='flex items-center '>
                      <div className='w-[70%]'>{expense.name}</div>
                      <div className='w-[30%]'>{expense.total}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div className='flex items-center justify-between mt-4'>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={invoiceDetails.length}
            onChange={handlePageChange}
            style={{ textAlign: "center" }}
          />
          <div className='flex items-center justify-end gap-2'>
            <Button onClick={handleCancelSendInvoice}>Hủy</Button>
            <Button type='primary' onClick={handleSendInvoice}>
              Gửi
            </Button>
          </div>
        </div>
      </Modal>
      <div className='bg-white p-3 rounded-xl flex items-center justify-between gap-3'>
        <Input placeholder='Tìm kiếm' value={searchText} onChange={handleSearchChange} />
        <div className='flex items-center gap-2'>
          <div
            className='bg-[#F4F7FC] rounded-xl w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-[#1745E8]'
            onClick={() => showInvoiceDetailModal()}
          >
            <EditOutlined />
          </div>
          <Button className='bg-[#1745E8] rounded-xl text-white' onClick={showModal}>
            TẠO
          </Button>
        </div>
      </div>
      <Table<InvoiceDataType> rowKey='invoiceId' rowSelection={rowSelection} columns={columns} dataSource={invoiceData} />
    </Flex>
  );
};

export default Invoice;
