import { useNavigate } from "react-router-dom";

const PageApp = () => {
  const navigate = useNavigate();
  return (
    <div className='sm:max-w-[390px] max-sm:w-full flex justify-center mx-auto h-screen relative'>
      {/* Phone frame */}
      <div className='w-full h-full bg-white rounded-[30px] shadow-lg  border-x-[5px] border-black-500 relative'>
        <div className='w-full h-[210px] bg-[#4F9CF9] rounded-t-[30px]'></div>
        <div className='absolute w-[350px] bg-white shadow-lg rounded-xl top-[20%] left-[50%] transform -translate-x-[50%] p-[20px]'>
          <div className='flex flex-col items-center justify-center pt-4 px-4 mb-[24px]'>
            <img className='w-[78px] h-[60px]' src='../../src/assets/images/logo.jpg'></img>
            <h1 className='text-[#1745E8] text-[16px] font-bold mb-[18px]'>HỆ THỐNG QUẢN LÝ CHUNG CƯ</h1>
            <div className='border-t-[2px]  border-[#D6D6D6] border-solid w-full h-[2px]'></div>
          </div>
          <div className='flex flex-col w-full gap-3'>
            <div className='w-full bg-white drop-shadow-lg rounded-lg py-3 px-5 cursor-pointer border-[1px]  border-[#D6D6D6] border-solid '>
              <p className='font-bold'>Quản lý thông tin cá nhân</p>
            </div>
            <div className='w-full bg-white drop-shadow-lg rounded-lg py-3 px-5 cursor-pointer border-[1px]  border-[#D6D6D6] border-solid'>
              <p className='font-bold'>Quản lý sử dụng tiện ích và dịch vụ</p>
            </div>
            <div className='w-full bg-white drop-shadow-lg rounded-lg py-3 px-5  cursor-pointer border-[1px]  border-[#D6D6D6] border-solid'>
              <p className='font-bold' onClick={() => navigate("/app/complaint")}>
                Khiếu nại
              </p>
            </div>
            <div className='w-full bg-white drop-shadow-lg rounded-lg py-3 px-5 cursor-pointer border-[1px]  border-[#D6D6D6] border-solid'>
              <p className='font-bold'>Quản lý hóa đơn hàng tháng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageApp;
