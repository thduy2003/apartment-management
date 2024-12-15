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
  createdDate?: string;
  paymentMethod?: string;
}
interface UsedExpenseDataType {
  usedExpenseId: React.Key;
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
    type: "Hóa đơn hàng tháng",
    name: "CH002-Hóa đơn Tháng 11/2024",
    totalPrice: "700,000",
    createdDate: "2024-11-30",
    paymentMethod: "Chuyển khoản ngân hàng",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD002",
    apartment: "CH003",
    type: "Hóa đơn hàng tháng",
    name: "CH003-Hóa đơn Tháng 11/2024",
    totalPrice: "180,000",
    createdDate: "2024-11-30",
    paymentMethod: "",
    status: "Chưa thanh toán",
  },
  {
    invoiceId: "HD003",
    apartment: "CH005",
    type: "Hóa đơn hàng tháng",
    name: "CH005-Hóa đơn Tháng 11/2024",
    totalPrice: "600,000",
    createdDate: "2024-11-30",
    paymentMethod: "Chuyển khoản ngân hàng",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD004",
    apartment: "CH006",
    type: "Hóa đơn hàng tháng",
    name: "CH006-Hóa đơn Tháng 11/2024",
    totalPrice: "500,000",
    createdDate: "2024-11-30",
    paymentMethod: "Chuyển khoản ngân hàng",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD005",
    apartment: "CH008",
    type: "Hóa đơn hàng tháng",
    name: "CH008-Hóa đơn Tháng 11/2024",
    totalPrice: "180,000",
    createdDate: "2024-11-30",
    paymentMethod: "",
    status: "Chưa thanh toán",
  },
  {
    invoiceId: "HD006",
    apartment: "CH008",
    type: "Hóa đơn phát sinh",
    name: "CH008-Hóa đơn phát sinh-Tháng 11/2024",
    totalPrice: "3,000,000",
    createdDate: "2024-11-30",
    paymentMethod: "Tiền mặt",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD007",
    apartment: "CH009",
    type: "Hóa đơn hàng tháng",
    name: "CH009-Hóa đơn Tháng 11/2024",
    totalPrice: "1,040,000",
    createdDate: "2024-11-30",
    paymentMethod: "Tiền mặt",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD008",
    apartment: "CH009",
    type: "Hóa đơn phát sinh",
    name: "CH009-Hóa đơn phát sinh-Tháng 11/2024",
    totalPrice: "4,200,000",
    createdDate: "2024-11-30",
    paymentMethod: "Tiền mặt",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD009",
    apartment: "CH011",
    type: "Hóa đơn hàng tháng",
    name: "CH011-Hóa đơn Tháng 11/2024",
    totalPrice: "1,240,000",
    createdDate: "2024-11-30",
    paymentMethod: "Tiền mặt",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD010",
    apartment: "CH013",
    type: "Hóa đơn hàng tháng",
    name: "CH013-Hóa đơn Tháng 11/2024",
    totalPrice: "180,000",
    createdDate: "2024-11-30",
    paymentMethod: "",
    status: "Chưa thanh toán",
  },
  {
    invoiceId: "HD011",
    apartment: "CH015",
    type: "Hóa đơn hàng tháng",
    name: "CH015-Hóa đơn Tháng 11/2024",
    totalPrice: "500,000",
    createdDate: "2024-11-30",
    paymentMethod: "Chuyển khoản ngân hàng",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD012",
    apartment: "CH016",
    type: "Hóa đơn hàng tháng",
    name: "CH016-Hóa đơn Tháng 11/2024",
    totalPrice: "260,000",
    createdDate: "2024-11-30",
    paymentMethod: "Chuyển khoản ngân hàng",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD013",
    apartment: "CH016",
    type: "Hóa đơn phát sinh",
    name: "CH016-Hóa đơn phát sinh-Tháng 11/2024",
    totalPrice: "700,000",
    createdDate: "2024-11-30",
    paymentMethod: "Chuyển khoản ngân hàng",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD014",
    apartment: "CH018",
    type: "Hóa đơn hàng tháng",
    name: "CH018-Hóa đơn Tháng 11/2024",
    totalPrice: "3,200,000",
    createdDate: "2024-11-30",
    paymentMethod: "Chuyển khoản ngân hàng",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD015",
    apartment: "CH019",
    type: "Hóa đơn hàng tháng",
    name: "CH019-Hóa đơn Tháng 11/2024",
    totalPrice: "580,000",
    createdDate: "2024-11-30",
    paymentMethod: "",
    status: "Chưa thanh toán",
  },
  {
    invoiceId: "HD016",
    apartment: "CH020",
    type: "Hóa đơn hàng tháng",
    name: "CH020-Hóa đơn Tháng 11/2024",
    totalPrice: "1,960,000",
    createdDate: "2024-11-30",
    paymentMethod: "Tiền mặt",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD017",
    apartment: "CH022",
    type: "Hóa đơn hàng tháng",
    name: "CH022-Hóa đơn Tháng 11/2024",
    totalPrice: "1,700,000",
    createdDate: "2024-11-30",
    paymentMethod: "Tiền mặt",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD018",
    apartment: "CH024",
    type: "Hóa đơn hàng tháng",
    name: "CH024-Hóa đơn Tháng 11/2024",
    totalPrice: "560,000",
    createdDate: "2024-11-30",
    paymentMethod: "",
    status: "Chưa thanh toán",
  },
  {
    invoiceId: "HD019",
    apartment: "CH025",
    type: "Hóa đơn hàng tháng",
    name: "CH025-Hóa đơn Tháng 11/2024",
    totalPrice: "1,020,000",
    createdDate: "2024-11-30",
    paymentMethod: "",
    status: "Chưa thanh toán",
  },
  {
    invoiceId: "HD020",
    apartment: "CH027",
    type: "Hóa đơn hàng tháng",
    name: "CH027-Hóa đơn Tháng 11/2024",
    totalPrice: "200,000",
    createdDate: "2024-11-30",
    paymentMethod: "",
    status: "Chưa thanh toán",
  },
  {
    invoiceId: "HD021",
    apartment: "CH028",
    type: "Hóa đơn hàng tháng",
    name: "CH028-Hóa đơn Tháng 11/2024",
    totalPrice: "140,000",
    createdDate: "2024-11-30",
    paymentMethod: "Tiền mặt",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD022",
    apartment: "CH030",
    type: "Hóa đơn hàng tháng",
    name: "CH030-Hóa đơn Tháng 11/2024",
    totalPrice: "400,000",
    createdDate: "2024-11-30",
    paymentMethod: "Tiền mặt",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD023",
    apartment: "CH031",
    type: "Hóa đơn hàng tháng",
    name: "CH031-Hóa đơn Tháng 11/2024",
    totalPrice: "200,000",
    createdDate: "2024-11-30",
    paymentMethod: "Tiền mặt",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD024",
    apartment: "CH033",
    type: "Hóa đơn hàng tháng",
    name: "CH033-Hóa đơn Tháng 11/2024",
    totalPrice: "160,000",
    createdDate: "2024-11-30",
    paymentMethod: "Chuyển khoản ngân hàng",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD025",
    apartment: "CH034",
    type: "Hóa đơn hàng tháng",
    name: "CH034-Hóa đơn Tháng 11/2024",
    totalPrice: "340,000",
    createdDate: "2024-11-30",
    paymentMethod: "Chuyển khoản ngân hàng",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD026",
    apartment: "CH036",
    type: "Hóa đơn hàng tháng",
    name: "CH036-Hóa đơn Tháng 11/2024",
    totalPrice: "1,000,000",
    createdDate: "2024-11-30",
    paymentMethod: "",
    status: "Chưa thanh toán",
  },
  {
    invoiceId: "HD027",
    apartment: "CH037",
    type: "Hóa đơn hàng tháng",
    name: "CH037-Hóa đơn Tháng 11/2024",
    totalPrice: "60,000",
    createdDate: "2024-11-30",
    paymentMethod: "Tiền mặt",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD028",
    apartment: "CH039",
    type: "Hóa đơn hàng tháng",
    name: "CH039-Hóa đơn Tháng 11/2024",
    totalPrice: "840,000",
    createdDate: "2024-11-30",
    paymentMethod: "Tiền mặt",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD029",
    apartment: "CH041",
    type: "Hóa đơn hàng tháng",
    name: "CH041-Hóa đơn Tháng 11/2024",
    totalPrice: "1,400,000",
    createdDate: "2024-11-30",
    paymentMethod: "Tiền mặt",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD030",
    apartment: "CH042",
    type: "Hóa đơn hàng tháng",
    name: "CH042-Hóa đơn Tháng 11/2024",
    totalPrice: "560,000",
    createdDate: "2024-11-30",
    paymentMethod: "",
    status: "Chưa thanh toán",
  },
  {
    invoiceId: "HD031",
    apartment: "CH044",
    type: "Hóa đơn hàng tháng",
    name: "CH044-Hóa đơn Tháng 11/2024",
    totalPrice: "500,000",
    createdDate: "2024-11-30",
    paymentMethod: "",
    status: "Chưa thanh toán",
  },
  {
    invoiceId: "HD032",
    apartment: "CH045",
    type: "Hóa đơn hàng tháng",
    name: "CH045-Hóa đơn Tháng 11/2024",
    totalPrice: "380,000",
    createdDate: "2024-11-30",
    paymentMethod: "Chuyển khoản ngân hàng",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD033",
    apartment: "CH047",
    type: "Hóa đơn hàng tháng",
    name: "CH047-Hóa đơn Tháng 11/2024",
    totalPrice: "180,000",
    createdDate: "2024-11-30",
    paymentMethod: "Chuyển khoản ngân hàng",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD034",
    apartment: "CH048",
    type: "Hóa đơn hàng tháng",
    name: "CH048-Hóa đơn Tháng 11/2024",
    totalPrice: "320,000",
    createdDate: "2024-11-30",
    paymentMethod: "Tiền mặt",
    status: "Đã thanh toán",
  },
  {
    invoiceId: "HD035",
    apartment: "CH049",
    type: "Hóa đơn hàng tháng",
    name: "CH049-Hóa đơn Tháng 11/2024",
    totalPrice: "1,140,000",
    createdDate: "2024-11-30",
    paymentMethod: "Tiền mặt",
    status: "Đã thanh toán",
  },
];
const usedExpeses = [
  {
    usedExpenseId: "KPSD001",
    expenseId: "KP001",
    apartment: "CH002",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD002",
    expenseId: "KP002",
    apartment: "CH002",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD003",
    expenseId: "KP003",
    apartment: "CH002",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD004",
    expenseId: "KP004",
    apartment: "CH002",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD005",
    expenseId: "KP005",
    apartment: "CH002",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD006",
    expenseId: "KP006",
    apartment: "CH003",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD007",
    expenseId: "KP007",
    apartment: "CH003",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD008",
    expenseId: "KP008",
    apartment: "CH003",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD009",
    expenseId: "KP009",
    apartment: "CH005",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD010",
    expenseId: "KP010",
    apartment: "CH005",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD011",
    expenseId: "KP011",
    apartment: "CH005",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD012",
    expenseId: "KP012",
    apartment: "CH006",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD013",
    expenseId: "KP013",
    apartment: "CH006",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD014",
    expenseId: "KP014",
    apartment: "CH006",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD015",
    expenseId: "KP015",
    apartment: "CH008",
    number: 3,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD016",
    expenseId: "KP016",
    apartment: "CH008",
    number: 1,
    status: "Ngừng áp dụng",
  },
  {
    usedExpenseId: "KPSD017",
    expenseId: "KP017",
    apartment: "CH008",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD018",
    expenseId: "KP018",
    apartment: "CH009",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD019",
    expenseId: "KP019",
    apartment: "CH009",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD020",
    expenseId: "KP020",
    apartment: "CH009",
    number: 3,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD021",
    expenseId: "KP021",
    apartment: "CH009",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD022",
    expenseId: "KP022",
    apartment: "CH011",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD023",
    expenseId: "KP023",
    apartment: "CH011",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD024",
    expenseId: "KP024",
    apartment: "CH011",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD025",
    expenseId: "KP025",
    apartment: "CH011",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD026",
    expenseId: "KP026",
    apartment: "CH013",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD027",
    expenseId: "KP027",
    apartment: "CH013",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD028",
    expenseId: "KP028",
    apartment: "CH015",
    number: 1,
    status: "Ngừng áp dụng",
  },
  {
    usedExpenseId: "KPSD029",
    expenseId: "KP029",
    apartment: "CH015",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD030",
    expenseId: "KP030",
    apartment: "CH015",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD031",
    expenseId: "KP031",
    apartment: "CH015",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD032",
    expenseId: "KP032",
    apartment: "CH016",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD033",
    expenseId: "KP033",
    apartment: "CH016",
    number: 2,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD034",
    expenseId: "KP034",
    apartment: "CH018",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD035",
    expenseId: "KP035",
    apartment: "CH018",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD036",
    expenseId: "KP036",
    apartment: "CH018",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD037",
    expenseId: "KP037",
    apartment: "CH018",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD038",
    expenseId: "KP038",
    apartment: "CH019",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD039",
    expenseId: "KP039",
    apartment: "CH019",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD040",
    expenseId: "KP040",
    apartment: "CH020",
    number: 1,
    status: "Ngừng áp dụng",
  },
  {
    usedExpenseId: "KPSD041",
    expenseId: "KP041",
    apartment: "CH020",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD042",
    expenseId: "KP042",
    apartment: "CH020",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD043",
    expenseId: "KP043",
    apartment: "CH020",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD044",
    expenseId: "KP044",
    apartment: "CH022",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD045",
    expenseId: "KP045",
    apartment: "CH022",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD046",
    expenseId: "KP046",
    apartment: "CH022",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD047",
    expenseId: "KP047",
    apartment: "CH022",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD048",
    expenseId: "KP048",
    apartment: "CH024",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD049",
    expenseId: "KP049",
    apartment: "CH024",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD050",
    expenseId: "KP049",
    apartment: "CH025",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD051",
    expenseId: "KP001",
    apartment: "CH025",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD052",
    expenseId: "KP002",
    apartment: "CH025",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD053",
    expenseId: "KP003",
    apartment: "CH025",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD054",
    expenseId: "KP004",
    apartment: "CH027",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD055",
    expenseId: "KP005",
    apartment: "CH027",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD056",
    expenseId: "KP006",
    apartment: "CH027",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD057",
    expenseId: "KP007",
    apartment: "CH028",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD058",
    expenseId: "KP008",
    apartment: "CH028",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD059",
    expenseId: "KP009",
    apartment: "CH030",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD060",
    expenseId: "KP010",
    apartment: "CH031",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD061",
    expenseId: "KP011",
    apartment: "CH031",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD062",
    expenseId: "KP012",
    apartment: "CH033",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD063",
    expenseId: "KP013",
    apartment: "CH034",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD064",
    expenseId: "KP014",
    apartment: "CH034",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD065",
    expenseId: "KP015",
    apartment: "CH036",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD066",
    expenseId: "KP016",
    apartment: "CH037",
    number: 1,
    status: "Ngừng áp dụng",
  },
  {
    usedExpenseId: "KPSD067",
    expenseId: "KP017",
    apartment: "CH037",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD068",
    expenseId: "KP018",
    apartment: "CH039",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD069",
    expenseId: "KP019",
    apartment: "CH039",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD070",
    expenseId: "KP020",
    apartment: "CH041",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD071",
    expenseId: "KP021",
    apartment: "CH042",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD072",
    expenseId: "KP022",
    apartment: "CH042",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD073",
    expenseId: "KP023",
    apartment: "CH044",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD074",
    expenseId: "KP024",
    apartment: "CH045",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD075",
    expenseId: "KP025",
    apartment: "CH045",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD076",
    expenseId: "KP026",
    apartment: "CH047",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD077",
    expenseId: "KP027",
    apartment: "CH047",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD078",
    expenseId: "KP028",
    apartment: "CH048",
    number: 1,
    status: "Ngừng áp dụng",
  },
  {
    usedExpenseId: "KPSD079",
    expenseId: "KP029",
    apartment: "CH048",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD080",
    expenseId: "KP030",
    apartment: "CH048",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD081",
    expenseId: "KP031",
    apartment: "CH049",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD082",
    expenseId: "KP032",
    apartment: "CH049",
    number: 1,
    status: "Đang áp dụng",
  },
  {
    usedExpenseId: "KPSD083",
    expenseId: "KP033",
    apartment: "CH049",
    number: 1,
    status: "Đang áp dụng",
  },
];
const initialInvoiceDetails: InvoiceDetailDataType[] = [
  {
    invoiceId: "HD001",
    apartment: "CH002",
    totalPrice: "700,000",
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
      {
        name: "Phí gửi xe máy",
        price: 20000,
        number: 1,
        total: 20000,
      },
      {
        name: "Phí gửi xe ô tô",
        price: 100000,
        number: 1,
        total: 100000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD002",
    apartment: "CH003",
    totalPrice: "180,000",
    usedExpenses: [
      {
        name: "Phí internet",
        price: 80000,
        number: 1,
        total: 80000,
      },
      {
        name: "Phí nước sinh hoạt",
        price: 60000,
        number: 1,
        total: 60000,
      },
      {
        name: "Phí rác thải",
        price: 40000,
        number: 1,
        total: 40000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD003",
    apartment: "CH005",
    totalPrice: "600,000",
    usedExpenses: [
      {
        name: "Phí bảo hiểm tòa nhà",
        price: 400000,
        number: 1,
        total: 400000,
      },
      {
        name: "Phí chăm sóc cây xanh",
        price: 120000,
        number: 1,
        total: 120000,
      },
      {
        name: "Phí chiếu sáng công cộng",
        price: 80000,
        number: 1,
        total: 80000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD004",
    apartment: "CH006",
    totalPrice: "500,000",
    usedExpenses: [
      {
        name: "Phí thang máy",
        price: 160000,
        number: 1,
        total: 160000,
      },
      {
        name: "Phí bảo trì thang máy",
        price: 200000,
        number: 1,
        total: 200000,
      },
      {
        name: "Phí xử lý nước thải",
        price: 140000,
        number: 1,
        total: 140000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD005",
    apartment: "CH008",
    totalPrice: "3,060,000",
    usedExpenses: [
      {
        name: "Phí lắp đặt camera an ninh",
        price: 1000000,
        number: 3,
        total: 3000000,
      },
      {
        name: "Phí vệ sinh hành lang",
        price: 60000,
        number: 1,
        total: 60000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD007",
    apartment: "CH009",
    totalPrice: "5,240,000",
    usedExpenses: [
      {
        name: "Phí bảo hiểm cháy nổ",
        price: 600000,
        number: 1,
        total: 600000,
      },
      {
        name: "Phí dịch vụ lễ tân",
        price: 240000,
        number: 1,
        total: 240000,
      },
      {
        name: "Phí lắp đặt thiết bị mới",
        price: 1400000,
        number: 3,
        total: 4200000,
      },
      {
        name: "Phí sử dụng hồ bơi",
        price: 200000,
        number: 1,
        total: 200000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD009",
    apartment: "CH011",
    totalPrice: "1,240,000",
    usedExpenses: [
      {
        name: "Phí bảo trì thiết bị công cộng",
        price: 360000,
        number: 1,
        total: 360000,
      },
      {
        name: "Phí sửa chữa tòa nhà",
        price: 500000,
        number: 1,
        total: 500000,
      },
      {
        name: "Phí điện hành lang",
        price: 80000,
        number: 1,
        total: 80000,
      },
      {
        name: "Phí sử dụng sân tennis",
        price: 300000,
        number: 1,
        total: 300000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD010",
    apartment: "CH013",
    totalPrice: "180,000",
    usedExpenses: [
      {
        name: "Phí dọn tuyết",
        price: 120000,
        number: 1,
        total: 120000,
      },
      {
        name: "Phí dọn vệ sinh sân chung",
        price: 60000,
        number: 1,
        total: 60000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD011",
    apartment: "CH015",
    totalPrice: "500,000",
    usedExpenses: [
      {
        name: "Phí bảo trì cửa chính",
        price: 100000,
        number: 1,
        total: 100000,
      },
      {
        name: "Phí dịch vụ hỗ trợ cư dân",
        price: 220000,
        number: 1,
        total: 220000,
      },
      {
        name: "Phí bảo trì bãi đỗ xe",
        price: 180000,
        number: 1,
        total: 180000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD012",
    apartment: "CH016",
    totalPrice: "1,660,000",
    usedExpenses: [
      {
        name: "Phí thuê bãi đỗ xe",
        price: 260000,
        number: 1,
        total: 260000,
      },
      {
        name: "Phí sửa chữa mái nhà",
        price: 700000,
        number: 2,
        total: 1400000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD014",
    apartment: "CH018",
    totalPrice: "3,200,000",
    usedExpenses: [
      {
        name: "Phí sửa chữa đường nội bộ",
        price: 800000,
        number: 1,
        total: 800000,
      },
      {
        name: "Phí bảo trì hệ thống đèn",
        price: 160000,
        number: 1,
        total: 160000,
      },
      {
        name: "Phí lắp đặt hệ thống báo cháy",
        price: 2000000,
        number: 1,
        total: 2000000,
      },
      {
        name: "Phí sử dụng dịch vụ spa",
        price: 240000,
        number: 1,
        total: 240000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD015",
    apartment: "CH019",
    totalPrice: "580,000",
    usedExpenses: [
      {
        name: "Phí bảo trì hệ thống nước",
        price: 400000,
        number: 1,
        total: 400000,
      },
      {
        name: "Phí sử dụng sân cầu lông",
        price: 180000,
        number: 1,
        total: 180000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD016",
    apartment: "CH020",
    totalPrice: "1,960,000",
    usedExpenses: [
      {
        name: "Phí lắp đặt hệ thống thoát hiểm",
        price: 1600000,
        number: 1,
        total: 1600000,
      },
      {
        name: "Phí vệ sinh phòng gym",
        price: 60000,
        number: 1,
        total: 60000,
      },
      {
        name: "Phí sử dụng khu BBQ",
        price: 300000,
        number: 1,
        total: 300000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD017",
    apartment: "CH022",
    totalPrice: "1,700,000",
    usedExpenses: [
      {
        name: "Phí bảo trì hệ thống an ninh",
        price: 600000,
        number: 1,
        total: 600000,
      },
      {
        name: "Phí xử lý môi trường",
        price: 500000,
        number: 1,
        total: 500000,
      },
      {
        name: "Phí quản lý cư dân",
        price: 400000,
        number: 1,
        total: 400000,
      },
      {
        name: "Phí sử dụng phòng họp",
        price: 200000,
        number: 1,
        total: 200000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD018",
    apartment: "CH024",
    totalPrice: "560,000",
    usedExpenses: [
      {
        name: "Phí bảo trì thiết bị chiếu sáng",
        price: 120000,
        number: 1,
        total: 120000,
      },
      {
        name: "Phí hỗ trợ khẩn cấp",
        price: 440000,
        number: 1,
        total: 440000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD019",
    apartment: "CH025",
    totalPrice: "1,020,000",
    usedExpenses: [
      {
        name: "Phí hỗ trợ khẩn cấp",
        price: 440000,
        number: 1,
        total: 440000,
      },
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
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD020",
    apartment: "CH027",
    totalPrice: "200,000",
    usedExpenses: [
      {
        name: "Phí gửi xe máy",
        price: 20000,
        number: 1,
        total: 20000,
      },
      {
        name: "Phí gửi xe ô tô",
        price: 100000,
        number: 1,
        total: 100000,
      },
      {
        name: "Phí internet",
        price: 80000,
        number: 1,
        total: 80000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD021",
    apartment: "CH028",
    totalPrice: "100,000",
    usedExpenses: [
      {
        name: "Phí nước sinh hoạt",
        price: 60000,
        number: 1,
        total: 60000,
      },
      {
        name: "Phí rác thải",
        price: 40000,
        number: 1,
        total: 40000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD022",
    apartment: "CH030",
    totalPrice: "400,000",
    usedExpenses: [
      {
        name: "Phí bảo hiểm tòa nhà",
        price: 400000,
        number: 1,
        total: 400000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD023",
    apartment: "CH031",
    totalPrice: "200,000",
    usedExpenses: [
      {
        name: "Phí chăm sóc cây xanh",
        price: 120000,
        number: 1,
        total: 120000,
      },
      {
        name: "Phí chiếu sáng công cộng",
        price: 80000,
        number: 1,
        total: 80000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD024",
    apartment: "CH033",
    totalPrice: "160,000",
    usedExpenses: [
      {
        name: "Phí thang máy",
        price: 160000,
        number: 1,
        total: 160000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD025",
    apartment: "CH034",
    totalPrice: "340,000",
    usedExpenses: [
      {
        name: "Phí bảo trì thang máy",
        price: 200000,
        number: 1,
        total: 200000,
      },
      {
        name: "Phí xử lý nước thải",
        price: 140000,
        number: 1,
        total: 140000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD026",
    apartment: "CH036",
    totalPrice: "1,000,000",
    usedExpenses: [
      {
        name: "Phí lắp đặt camera an ninh",
        price: 1000000,
        number: 1,
        total: 1000000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD027",
    apartment: "CH037",
    totalPrice: "60,000",
    usedExpenses: [
      {
        name: "Phí vệ sinh hành lang",
        price: 60000,
        number: 1,
        total: 60000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD028",
    apartment: "CH039",
    totalPrice: "840,000",
    usedExpenses: [
      {
        name: "Phí bảo hiểm cháy nổ",
        price: 600000,
        number: 1,
        total: 600000,
      },
      {
        name: "Phí dịch vụ lễ tân",
        price: 240000,
        number: 1,
        total: 240000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD029",
    apartment: "CH041",
    totalPrice: "1,400,000",
    usedExpenses: [
      {
        name: "Phí lắp đặt thiết bị mới",
        price: 1400000,
        number: 1,
        total: 1400000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD030",
    apartment: "CH042",
    totalPrice: "560,000",
    usedExpenses: [
      {
        name: "Phí sử dụng hồ bơi",
        price: 200000,
        number: 1,
        total: 200000,
      },
      {
        name: "Phí bảo trì thiết bị công cộng",
        price: 360000,
        number: 1,
        total: 360000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD031",
    apartment: "CH044",
    totalPrice: "500,000",
    usedExpenses: [
      {
        name: "Phí sửa chữa tòa nhà",
        price: 500000,
        number: 1,
        total: 500000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD032",
    apartment: "CH045",
    totalPrice: "380,000",
    usedExpenses: [
      {
        name: "Phí điện hành lang",
        price: 80000,
        number: 1,
        total: 80000,
      },
      {
        name: "Phí sử dụng sân tennis",
        price: 300000,
        number: 1,
        total: 300000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD033",
    apartment: "CH047",
    totalPrice: "180,000",
    usedExpenses: [
      {
        name: "Phí dọn tuyết",
        price: 120000,
        number: 1,
        total: 120000,
      },
      {
        name: "Phí dọn vệ sinh sân chung",
        price: 60000,
        number: 1,
        total: 60000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD034",
    apartment: "CH048",
    totalPrice: "320,000",
    usedExpenses: [
      {
        name: "Phí bảo trì cửa chính",
        price: 100000,
        number: 1,
        total: 100000,
      },
      {
        name: "Phí dịch vụ hỗ trợ cư dân",
        price: 220000,
        number: 1,
        total: 220000,
      },
    ],
    createdDate: "2024-11-30",
  },
  {
    invoiceId: "HD035",
    apartment: "CH049",
    totalPrice: "1,140,000",
    usedExpenses: [
      {
        name: "Phí bảo trì bãi đỗ xe",
        price: 180000,
        number: 1,
        total: 180000,
      },
      {
        name: "Phí thuê bãi đỗ xe",
        price: 260000,
        number: 1,
        total: 260000,
      },
      {
        name: "Phí sửa chữa mái nhà",
        price: 700000,
        number: 1,
        total: 700000,
      },
    ],
    createdDate: "2024-11-30",
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
    console.log("selectedApartments", selectedApartments);
    const getApartments = selectedApartments === "all" ? [...new Set(usedExpeses.map((used) => used.apartment))] : [selectedApartments];
    console.log("getApartments", getApartments);
    const invoices: InvoiceDataType[] = [];
    getApartments.forEach((apartment) => {
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
    initialInvoiceData.push(...newInvoices);
    setNewInvoices([]);
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
      setSelectedInvoice(selectedInvoice || null);
      form.setFieldsValue(
        selectedInvoice ? { ...selectedInvoice, name: invoice?.name, status: invoice?.status, paymentMethod: invoice?.paymentMethod } : {}
      );
      setIsInvoiceDetailModalOpen(true);

      return;
    }
    if (selectedRowKeys.length === 1) {
      const invoice = invoiceData.find((invoice) => invoice.invoiceId === selectedRowKeys[0]);
      const selectedInvoice = invoiceDetails.find((item) => item.invoiceId === selectedRowKeys[0]);
      setSelectedInvoice(selectedInvoice || null);
      form.setFieldsValue(
        selectedInvoice ? { ...selectedInvoice, name: invoice?.name, status: invoice?.status, paymentMethod: invoice?.paymentMethod } : {}
      );
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
    setSelectedInvoice(null);
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
                <Select placeholder='Phương thức thanh toán' defaultValue={form.getFieldValue("paymentMethod")}>
                  {["Chuyển khoản ngân hàng", "Tiền mặt"].map((status) => (
                    <Select.Option key={status} value={status}>
                      {status}
                    </Select.Option>
                  ))}
                </Select>
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
            total={newInvoiceDetails.length}
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
