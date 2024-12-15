// const rawData = `
//   KPSD001	HD001
//   KPSD002	HD001
//   KPSD003	HD001
//   KPSD004	HD001
//   KPSD005	HD001
//   KPSD006	HD002
//   KPSD007	HD002
//   KPSD008	HD002
//   KPSD009	HD003
//   KPSD010	HD003
//   KPSD011	HD003
//   KPSD012	HD004
//   KPSD013	HD004
//   KPSD014	HD004
//   KPSD015	HD005
//   KPSD017	HD005
//   KPSD018	HD007
//   KPSD019	HD007
//   KPSD020	HD007
//   KPSD021	HD007
//   KPSD022	HD009
//   KPSD023	HD009
//   KPSD024	HD009
//   KPSD025	HD009
//   KPSD026	HD010
//   KPSD027	HD010
//   KPSD029	HD011
//   KPSD030	HD011
//   KPSD031	HD011
//   KPSD032	HD012
//   KPSD033	HD012
//   KPSD034	HD014
//   KPSD035	HD014
//   KPSD036	HD014
//   KPSD037	HD014
//   KPSD038	HD015
//   KPSD039	HD015
//   KPSD041	HD016
//   KPSD042	HD016
//   KPSD043	HD016
//   KPSD044	HD017
//   KPSD045	HD017
//   KPSD046	HD017
//   KPSD047	HD017
//   KPSD048	HD018
//   KPSD049	HD018
//   KPSD050	HD019
//   KPSD051	HD019
//   KPSD052	HD019
//   KPSD053	HD019
//   KPSD054	HD020
//   KPSD055	HD020
//   KPSD056	HD020
//   KPSD057	HD021
//   KPSD058	HD021
//   KPSD059	HD022
//   KPSD060	HD023
//   KPSD061	HD023
//   KPSD062	HD024
//   KPSD063	HD025
//   KPSD064	HD025
//   KPSD065	HD026
//   KPSD067	HD027
//   KPSD068	HD028
//   KPSD069	HD028
//   KPSD070	HD029
//   KPSD071	HD030
//   KPSD072	HD030
//   KPSD073	HD031
//   KPSD074	HD032
//   KPSD075	HD032
//   KPSD076	HD033
//   KPSD077	HD033
//   KPSD079	HD034
//   KPSD080	HD034
//   KPSD081	HD035
//   KPSD082	HD035
//   KPSD083	HD035`;
// const lines = rawData.trim().split("\n");

// const cthd = lines.map((line) => {
//   const [usedExpenseId, invoiceId] = line.split("\t");
//   return {
//     usedExpenseId: usedExpenseId.trim(),
//     invoiceId: invoiceId.trim(),
//   };
// });
// const groupedData = cthd.reduce((result, item) => {
//   // Nếu chưa tồn tại invoiceId trong result, tạo mới
//   if (!result[item.invoiceId]) {
//     result[item.invoiceId] = [];
//   }
//   // Thêm usedExpenseId vào mảng tương ứng
//   if (!result[item.invoiceId].includes(item.usedExpenseId)) {
//     result[item.invoiceId].push(item.usedExpenseId);
//   }
//   return result;
// }, {});

// // Chuyển đối tượng kết quả về mảng
// const result = Object.keys(groupedData).map((invoiceId) => ({
//   invoiceId,
//   usedExpenseId: groupedData[invoiceId],
// }));

// const invoiceData = [
//   {
//     invoiceId: "HD001",
//     apartment: "CH002",
//     type: "Hóa đơn hàng tháng",
//     name: "CH002-Hóa đơn Tháng 11/2024",
//     totalPrice: "700,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Chuyển khoản ngân hàng",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD002",
//     apartment: "CH003",
//     type: "Hóa đơn hàng tháng",
//     name: "CH003-Hóa đơn Tháng 11/2024",
//     totalPrice: "180,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "",
//     status: "Chưa thanh toán",
//   },
//   {
//     invoiceId: "HD003",
//     apartment: "CH005",
//     type: "Hóa đơn hàng tháng",
//     name: "CH005-Hóa đơn Tháng 11/2024",
//     totalPrice: "600,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Chuyển khoản ngân hàng",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD004",
//     apartment: "CH006",
//     type: "Hóa đơn hàng tháng",
//     name: "CH006-Hóa đơn Tháng 11/2024",
//     totalPrice: "500,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Chuyển khoản ngân hàng",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD005",
//     apartment: "CH008",
//     type: "Hóa đơn hàng tháng",
//     name: "CH008-Hóa đơn Tháng 11/2024",
//     totalPrice: "180,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "",
//     status: "Chưa thanh toán",
//   },
//   {
//     invoiceId: "HD006",
//     apartment: "CH008",
//     type: "Hóa đơn phát sinh",
//     name: "CH008-Hóa đơn phát sinh-Tháng 11/2024",
//     totalPrice: "3,000,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Tiền mặt",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD007",
//     apartment: "CH009",
//     type: "Hóa đơn hàng tháng",
//     name: "CH009-Hóa đơn Tháng 11/2024",
//     totalPrice: "1,040,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Tiền mặt",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD008",
//     apartment: "CH009",
//     type: "Hóa đơn phát sinh",
//     name: "CH009-Hóa đơn phát sinh-Tháng 11/2024",
//     totalPrice: "4,200,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Tiền mặt",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD009",
//     apartment: "CH011",
//     type: "Hóa đơn hàng tháng",
//     name: "CH011-Hóa đơn Tháng 11/2024",
//     totalPrice: "1,240,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Tiền mặt",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD010",
//     apartment: "CH013",
//     type: "Hóa đơn hàng tháng",
//     name: "CH013-Hóa đơn Tháng 11/2024",
//     totalPrice: "180,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "",
//     status: "Chưa thanh toán",
//   },
//   {
//     invoiceId: "HD011",
//     apartment: "CH015",
//     type: "Hóa đơn hàng tháng",
//     name: "CH015-Hóa đơn Tháng 11/2024",
//     totalPrice: "500,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Chuyển khoản ngân hàng",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD012",
//     apartment: "CH016",
//     type: "Hóa đơn hàng tháng",
//     name: "CH016-Hóa đơn Tháng 11/2024",
//     totalPrice: "260,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Chuyển khoản ngân hàng",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD013",
//     apartment: "CH016",
//     type: "Hóa đơn phát sinh",
//     name: "CH016-Hóa đơn phát sinh-Tháng 11/2024",
//     totalPrice: "700,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Chuyển khoản ngân hàng",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD014",
//     apartment: "CH018",
//     type: "Hóa đơn hàng tháng",
//     name: "CH018-Hóa đơn Tháng 11/2024",
//     totalPrice: "3,200,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Chuyển khoản ngân hàng",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD015",
//     apartment: "CH019",
//     type: "Hóa đơn hàng tháng",
//     name: "CH019-Hóa đơn Tháng 11/2024",
//     totalPrice: "580,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "",
//     status: "Chưa thanh toán",
//   },
//   {
//     invoiceId: "HD016",
//     apartment: "CH020",
//     type: "Hóa đơn hàng tháng",
//     name: "CH020-Hóa đơn Tháng 11/2024",
//     totalPrice: "1,960,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Tiền mặt",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD017",
//     apartment: "CH022",
//     type: "Hóa đơn hàng tháng",
//     name: "CH022-Hóa đơn Tháng 11/2024",
//     totalPrice: "1,700,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Tiền mặt",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD018",
//     apartment: "CH024",
//     type: "Hóa đơn hàng tháng",
//     name: "CH024-Hóa đơn Tháng 11/2024",
//     totalPrice: "560,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "",
//     status: "Chưa thanh toán",
//   },
//   {
//     invoiceId: "HD019",
//     apartment: "CH025",
//     type: "Hóa đơn hàng tháng",
//     name: "CH025-Hóa đơn Tháng 11/2024",
//     totalPrice: "1,020,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "",
//     status: "Chưa thanh toán",
//   },
//   {
//     invoiceId: "HD020",
//     apartment: "CH027",
//     type: "Hóa đơn hàng tháng",
//     name: "CH027-Hóa đơn Tháng 11/2024",
//     totalPrice: "200,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "",
//     status: "Chưa thanh toán",
//   },
//   {
//     invoiceId: "HD021",
//     apartment: "CH028",
//     type: "Hóa đơn hàng tháng",
//     name: "CH028-Hóa đơn Tháng 11/2024",
//     totalPrice: "140,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Tiền mặt",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD022",
//     apartment: "CH030",
//     type: "Hóa đơn hàng tháng",
//     name: "CH030-Hóa đơn Tháng 11/2024",
//     totalPrice: "400,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Tiền mặt",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD023",
//     apartment: "CH031",
//     type: "Hóa đơn hàng tháng",
//     name: "CH031-Hóa đơn Tháng 11/2024",
//     totalPrice: "200,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Tiền mặt",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD024",
//     apartment: "CH033",
//     type: "Hóa đơn hàng tháng",
//     name: "CH033-Hóa đơn Tháng 11/2024",
//     totalPrice: "160,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Chuyển khoản ngân hàng",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD025",
//     apartment: "CH034",
//     type: "Hóa đơn hàng tháng",
//     name: "CH034-Hóa đơn Tháng 11/2024",
//     totalPrice: "340,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Chuyển khoản ngân hàng",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD026",
//     apartment: "CH036",
//     type: "Hóa đơn hàng tháng",
//     name: "CH036-Hóa đơn Tháng 11/2024",
//     totalPrice: "1,000,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "",
//     status: "Chưa thanh toán",
//   },
//   {
//     invoiceId: "HD027",
//     apartment: "CH037",
//     type: "Hóa đơn hàng tháng",
//     name: "CH037-Hóa đơn Tháng 11/2024",
//     totalPrice: "60,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Tiền mặt",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD028",
//     apartment: "CH039",
//     type: "Hóa đơn hàng tháng",
//     name: "CH039-Hóa đơn Tháng 11/2024",
//     totalPrice: "840,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Tiền mặt",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD029",
//     apartment: "CH041",
//     type: "Hóa đơn hàng tháng",
//     name: "CH041-Hóa đơn Tháng 11/2024",
//     totalPrice: "1,400,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Tiền mặt",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD030",
//     apartment: "CH042",
//     type: "Hóa đơn hàng tháng",
//     name: "CH042-Hóa đơn Tháng 11/2024",
//     totalPrice: "560,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "",
//     status: "Chưa thanh toán",
//   },
//   {
//     invoiceId: "HD031",
//     apartment: "CH044",
//     type: "Hóa đơn hàng tháng",
//     name: "CH044-Hóa đơn Tháng 11/2024",
//     totalPrice: "500,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "",
//     status: "Chưa thanh toán",
//   },
//   {
//     invoiceId: "HD032",
//     apartment: "CH045",
//     type: "Hóa đơn hàng tháng",
//     name: "CH045-Hóa đơn Tháng 11/2024",
//     totalPrice: "380,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Chuyển khoản ngân hàng",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD033",
//     apartment: "CH047",
//     type: "Hóa đơn hàng tháng",
//     name: "CH047-Hóa đơn Tháng 11/2024",
//     totalPrice: "180,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Chuyển khoản ngân hàng",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD034",
//     apartment: "CH048",
//     type: "Hóa đơn hàng tháng",
//     name: "CH048-Hóa đơn Tháng 11/2024",
//     totalPrice: "320,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Tiền mặt",
//     status: "Đã thanh toán",
//   },
//   {
//     invoiceId: "HD035",
//     apartment: "CH049",
//     type: "Hóa đơn hàng tháng",
//     name: "CH049-Hóa đơn Tháng 11/2024",
//     totalPrice: "1,140,000",
//     createdDate: "2024-11-30",
//     paymentMethod: "Tiền mặt",
//     status: "Đã thanh toán",
//   },
// ];

// const usedExpenseData = [
//   {
//     usedExpenseId: "KPSD001",
//     expenseId: "KP001",
//     apartment: "CH002",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD002",
//     expenseId: "KP002",
//     apartment: "CH002",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD003",
//     expenseId: "KP003",
//     apartment: "CH002",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD004",
//     expenseId: "KP004",
//     apartment: "CH002",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD005",
//     expenseId: "KP005",
//     apartment: "CH002",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD006",
//     expenseId: "KP006",
//     apartment: "CH003",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD007",
//     expenseId: "KP007",
//     apartment: "CH003",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD008",
//     expenseId: "KP008",
//     apartment: "CH003",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD009",
//     expenseId: "KP009",
//     apartment: "CH005",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD010",
//     expenseId: "KP010",
//     apartment: "CH005",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD011",
//     expenseId: "KP011",
//     apartment: "CH005",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD012",
//     expenseId: "KP012",
//     apartment: "CH006",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD013",
//     expenseId: "KP013",
//     apartment: "CH006",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD014",
//     expenseId: "KP014",
//     apartment: "CH006",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD015",
//     expenseId: "KP015",
//     apartment: "CH008",
//     number: 3,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD016",
//     expenseId: "KP016",
//     apartment: "CH008",
//     number: 1,
//     status: "Ngừng áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD017",
//     expenseId: "KP017",
//     apartment: "CH008",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD018",
//     expenseId: "KP018",
//     apartment: "CH009",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD019",
//     expenseId: "KP019",
//     apartment: "CH009",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD020",
//     expenseId: "KP020",
//     apartment: "CH009",
//     number: 3,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD021",
//     expenseId: "KP021",
//     apartment: "CH009",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD022",
//     expenseId: "KP022",
//     apartment: "CH011",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD023",
//     expenseId: "KP023",
//     apartment: "CH011",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD024",
//     expenseId: "KP024",
//     apartment: "CH011",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD025",
//     expenseId: "KP025",
//     apartment: "CH011",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD026",
//     expenseId: "KP026",
//     apartment: "CH013",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD027",
//     expenseId: "KP027",
//     apartment: "CH013",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD028",
//     expenseId: "KP028",
//     apartment: "CH015",
//     number: 1,
//     status: "Ngừng áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD029",
//     expenseId: "KP029",
//     apartment: "CH015",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD030",
//     expenseId: "KP030",
//     apartment: "CH015",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD031",
//     expenseId: "KP031",
//     apartment: "CH015",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD032",
//     expenseId: "KP032",
//     apartment: "CH016",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD033",
//     expenseId: "KP033",
//     apartment: "CH016",
//     number: 2,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD034",
//     expenseId: "KP034",
//     apartment: "CH018",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD035",
//     expenseId: "KP035",
//     apartment: "CH018",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD036",
//     expenseId: "KP036",
//     apartment: "CH018",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD037",
//     expenseId: "KP037",
//     apartment: "CH018",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD038",
//     expenseId: "KP038",
//     apartment: "CH019",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD039",
//     expenseId: "KP039",
//     apartment: "CH019",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD040",
//     expenseId: "KP040",
//     apartment: "CH020",
//     number: 1,
//     status: "Ngừng áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD041",
//     expenseId: "KP041",
//     apartment: "CH020",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD042",
//     expenseId: "KP042",
//     apartment: "CH020",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD043",
//     expenseId: "KP043",
//     apartment: "CH020",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD044",
//     expenseId: "KP044",
//     apartment: "CH022",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD045",
//     expenseId: "KP045",
//     apartment: "CH022",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD046",
//     expenseId: "KP046",
//     apartment: "CH022",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD047",
//     expenseId: "KP047",
//     apartment: "CH022",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD048",
//     expenseId: "KP048",
//     apartment: "CH024",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD049",
//     expenseId: "KP049",
//     apartment: "CH024",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD050",
//     expenseId: "KP049",
//     apartment: "CH025",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD051",
//     expenseId: "KP001",
//     apartment: "CH025",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD052",
//     expenseId: "KP002",
//     apartment: "CH025",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD053",
//     expenseId: "KP003",
//     apartment: "CH025",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD054",
//     expenseId: "KP004",
//     apartment: "CH027",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD055",
//     expenseId: "KP005",
//     apartment: "CH027",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD056",
//     expenseId: "KP006",
//     apartment: "CH027",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD057",
//     expenseId: "KP007",
//     apartment: "CH028",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD058",
//     expenseId: "KP008",
//     apartment: "CH028",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD059",
//     expenseId: "KP009",
//     apartment: "CH030",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD060",
//     expenseId: "KP010",
//     apartment: "CH031",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD061",
//     expenseId: "KP011",
//     apartment: "CH031",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD062",
//     expenseId: "KP012",
//     apartment: "CH033",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD063",
//     expenseId: "KP013",
//     apartment: "CH034",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD064",
//     expenseId: "KP014",
//     apartment: "CH034",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD065",
//     expenseId: "KP015",
//     apartment: "CH036",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD066",
//     expenseId: "KP016",
//     apartment: "CH037",
//     number: 1,
//     status: "Ngừng áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD067",
//     expenseId: "KP017",
//     apartment: "CH037",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD068",
//     expenseId: "KP018",
//     apartment: "CH039",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD069",
//     expenseId: "KP019",
//     apartment: "CH039",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD070",
//     expenseId: "KP020",
//     apartment: "CH041",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD071",
//     expenseId: "KP021",
//     apartment: "CH042",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD072",
//     expenseId: "KP022",
//     apartment: "CH042",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD073",
//     expenseId: "KP023",
//     apartment: "CH044",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD074",
//     expenseId: "KP024",
//     apartment: "CH045",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD075",
//     expenseId: "KP025",
//     apartment: "CH045",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD076",
//     expenseId: "KP026",
//     apartment: "CH047",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD077",
//     expenseId: "KP027",
//     apartment: "CH047",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD078",
//     expenseId: "KP028",
//     apartment: "CH048",
//     number: 1,
//     status: "Ngừng áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD079",
//     expenseId: "KP029",
//     apartment: "CH048",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD080",
//     expenseId: "KP030",
//     apartment: "CH048",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD081",
//     expenseId: "KP031",
//     apartment: "CH049",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD082",
//     expenseId: "KP032",
//     apartment: "CH049",
//     number: 1,
//     status: "Đang áp dụng",
//   },
//   {
//     usedExpenseId: "KPSD083",
//     expenseId: "KP033",
//     apartment: "CH049",
//     number: 1,
//     status: "Đang áp dụng",
//   },
// ];

// const expenseData = [
//   {
//     expenseId: "KP001",
//     name: "Phí quản lý",
//     price: "240,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP002",
//     name: "Phí vệ sinh",
//     price: "160,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP003",
//     name: "Phí bảo vệ",
//     price: "180,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP004",
//     name: "Phí gửi xe máy",
//     price: "20,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP005",
//     name: "Phí gửi xe ô tô",
//     price: "100,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP006",
//     name: "Phí internet",
//     price: "80,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP007",
//     name: "Phí nước sinh hoạt",
//     price: "60,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP008",
//     name: "Phí rác thải",
//     price: "40,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP009",
//     name: "Phí bảo hiểm tòa nhà",
//     price: "400,000",
//     unit: "Hàng năm",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP010",
//     name: "Phí chăm sóc cây xanh",
//     price: "120,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP011",
//     name: "Phí chiếu sáng công cộng",
//     price: "80,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP012",
//     name: "Phí thang máy",
//     price: "160,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP013",
//     name: "Phí bảo trì thang máy",
//     price: "200,000",
//     unit: "Hàng năm",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP014",
//     name: "Phí xử lý nước thải",
//     price: "140,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP015",
//     name: "Phí lắp đặt camera an ninh",
//     price: "1,000,000",
//     unit: "Một lần",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP016",
//     name: "Phí thuê hội trường",
//     price: "300,000",
//     unit: "Hàng tháng",
//     status: "Ngừng áp dụng",
//   },
//   {
//     expenseId: "KP017",
//     name: "Phí vệ sinh hành lang",
//     price: "60,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP018",
//     name: "Phí bảo hiểm cháy nổ",
//     price: "600,000",
//     unit: "Hàng năm",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP019",
//     name: "Phí dịch vụ lễ tân",
//     price: "240,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP020",
//     name: "Phí lắp đặt thiết bị mới",
//     price: "1,400,000",
//     unit: "Một lần",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP021",
//     name: "Phí sử dụng hồ bơi",
//     price: "200,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP022",
//     name: "Phí bảo trì thiết bị công cộng",
//     price: "360,000",
//     unit: "Hàng năm",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP023",
//     name: "Phí sửa chữa tòa nhà",
//     price: "500,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP024",
//     name: "Phí điện hành lang",
//     price: "80,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP025",
//     name: "Phí sử dụng sân tennis",
//     price: "300,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP026",
//     name: "Phí dọn tuyết",
//     price: "120,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP027",
//     name: "Phí dọn vệ sinh sân chung",
//     price: "60,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP028",
//     name: "Phí dọn vệ sinh nhà kho",
//     price: "140,000",
//     unit: "Hàng tháng",
//     status: "Ngừng áp dụng",
//   },
//   {
//     expenseId: "KP029",
//     name: "Phí bảo trì cửa chính",
//     price: "100,000",
//     unit: "Hàng năm",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP030",
//     name: "Phí dịch vụ hỗ trợ cư dân",
//     price: "220,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP031",
//     name: "Phí bảo trì bãi đỗ xe",
//     price: "180,000",
//     unit: "Hàng năm",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP032",
//     name: "Phí thuê bãi đỗ xe",
//     price: "260,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP033",
//     name: "Phí sửa chữa mái nhà",
//     price: "700,000",
//     unit: "Một lần",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP034",
//     name: "Phí sửa chữa đường nội bộ",
//     price: "800,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP035",
//     name: "Phí bảo trì hệ thống đèn",
//     price: "160,000",
//     unit: "Hàng năm",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP036",
//     name: "Phí lắp đặt hệ thống báo cháy",
//     price: "2,000,000",
//     unit: "Một lần",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP037",
//     name: "Phí sử dụng dịch vụ spa",
//     price: "240,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP038",
//     name: "Phí bảo trì hệ thống nước",
//     price: "400,000",
//     unit: "Hàng năm",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP039",
//     name: "Phí sử dụng sân cầu lông",
//     price: "180,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP040",
//     name: "Phí dọn dẹp sân thượng",
//     price: "100,000",
//     unit: "Hàng tháng",
//     status: "Ngừng áp dụng",
//   },
//   {
//     expenseId: "KP041",
//     name: "Phí lắp đặt hệ thống thoát hiểm",
//     price: "1,600,000",
//     unit: "Một lần",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP042",
//     name: "Phí vệ sinh phòng gym",
//     price: "60,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP043",
//     name: "Phí sử dụng khu BBQ",
//     price: "300,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP044",
//     name: "Phí bảo trì hệ thống an ninh",
//     price: "600,000",
//     unit: "Hàng năm",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP045",
//     name: "Phí xử lý môi trường",
//     price: "500,000",
//     unit: "Hàng năm",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP046",
//     name: "Phí quản lý cư dân",
//     price: "400,000",
//     unit: "Hàng năm",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP047",
//     name: "Phí sử dụng phòng họp",
//     price: "200,000",
//     unit: "Hàng tháng",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP048",
//     name: "Phí bảo trì thiết bị chiếu sáng",
//     price: "120,000",
//     unit: "Hàng năm",
//     status: "Đang áp dụng",
//   },
//   {
//     expenseId: "KP049",
//     name: "Phí hỗ trợ khẩn cấp",
//     price: "440,000",
//     unit: "Hàng năm",
//     status: "Đang áp dụng",
//   },
// ];

// // Xử lý
// const initialInvoiceDetails = cthd.reduce((acc, item) => {
//   const invoice = invoiceData.find((inv) => inv.invoiceId === item.invoiceId);

//   const usedExpense = usedExpenseData.find((ue) => ue.usedExpenseId === item.usedExpenseId);

//   const expense = expenseData.find((e) => e.expenseId === usedExpense.expenseId);

//   const price = parseInt(expense.price.replace(/,/g, ""), 10);
//   const total = price * usedExpense.number;

//   let existingInvoice = acc.find((i) => i.invoiceId === item.invoiceId);

//   if (!existingInvoice) {
//     existingInvoice = {
//       invoiceId: item.invoiceId,
//       apartment: invoice.apartment,
//       totalPrice: 0,
//       usedExpenses: [],
//       createdDate: "2024-11-30",
//     };
//     acc.push(existingInvoice);
//   }

//   existingInvoice.usedExpenses.push({
//     name: expense.name,
//     price: price,
//     number: usedExpense.number,
//     total: total,
//   });

//   existingInvoice.totalPrice += total;

//   return acc;
// }, []);

// initialInvoiceDetails.forEach((item) => {
//   item.totalPrice = item.totalPrice.toLocaleString("en-US");
// });
