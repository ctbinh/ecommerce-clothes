import React from "react";
import { Carousel } from "antd";
import { Collapse } from "antd";
import Header from "../Header";
import Footer from "../Footer";

const contentStyle = {
  //height: "80px",
  color: "#fff",
  //lineHeight: "80px",
  textAlign: "center",
  //background: "#364d79",
};

const { Panel } = Collapse;

const questionList = [
  {
    question:
      "[Thông tin vận chuyển] Làm sao để liên hệ Đơn vị vận chuyển/tra cứu thông tin vận chuyển/hối giao hàng?",
    answer: `Chủ động liên hệ trực tiếp với phía Đơn vị vận chuyển theo hướng dẫn.
    Chủ động mang hàng ra bưu cục gần nhất của Đơn vị vận chuyển. 
    Nếu Shop bị tính tỷ lệ giao hàng trễ do Đơn vị vận chuyển chưa đến lấy hàng, Shop có thể liên hệ chúng tôi để được hỗ trợ`,
  },
  {
    question:
      "[Thành viên mới] Cách theo dõi tình trạng vận chuyển của đơn hàng?",
    answer: `Hướng dẫn theo dõi áp dụng cho tất cả đơn hàng (bao gồm đơn hàng trong nước và đơn hàng quốc tế). Liên hệ hotline 19001000 để được hỗ trợ về vấn đề này`,
  },
  {
    question:
      "[Vận chuyển] Tôi có thể thay đổi thông tin số điện thoại/địa chỉ nhận hàng sau khi đã đặt hàng không?",
    answer: `Bạn chỉ có thể thay đổi thông tin số điện thoại / địa chỉ nhận hàng sau khi đã đặt hàng nếu đáp ứng đủ những yêu cầu sau:
    - Người bán chưa thực hiện việc giao đơn hàng của bạn cho các đơn vị vận chuyển
    - Bạn chưa hoàn tất thanh toán, hoặc thanh toán của bạn chưa được xác thực
    - Bạn chưa từng thực hiện yêu cầu thay đổi thông tin địa chỉ nhận hàng cho đơn hàng này. Với mỗi đơn hàng, bạn chỉ có thể thay đổi thông tin địa chỉ nhận hàng một lần duy nhất.
    - Địa chỉ nhận hàng mới phải nằm trong khu vực hoạt động được hỗ trợ của phương thức vận chuyển đã lựa chọn
    - Việc thay đổi địa chỉ nhận hàng mới không làm thay đổi mức phí vận chuyển dự kiến của đơn hàng
    Nếu đáp ứng đủ cả những yêu cầu trên, bạn có thể thực hiện yêu cầu thay đổi thông tin địa chỉ nhận hàng
    `,
  },
  {
    question: "[Đơn vị vận chuyển] Tổng hợp Đơn vị vận chuyển trên Shopee",
    answer: `Đơn vị vận chuyển (ĐVVC) trên Junifo là các ĐVVC bên thứ ba tham gia giao/nhận đơn hàng đặt trên hệ thống Shopee, và đã thực hiện liên kết hệ thống theo dõi thông tin vận chuyển đơn hàng với hệ thống của Shopee
    Thông qua liên kết hệ thống, khi sử dụng dịch vụ cung cấp bởi các ĐVVC của Junifo, bạn có thể tra cứu thông tin vận chuyển của đơn hàng để theo dõi một cách dễ dàng, chi tiết trên Ứng dụng Junifo. Toàn bộ thông tin vận chuyển sẽ được cập nhật thường xuyên và liên tục, ngay từ khâu Người bán chuẩn bị đơn hàng đến khâu Người bán giao đơn hàng cho ĐVVC, và quá trình vận chuyển đơn hàng của ĐVVC tới tay bạn  
    Bạn cũng có thể liên hệ trực tiếp với các Đơn vị vận chuyển để được hỗ trợ các vấn đề và thắc mắc liên quan đến vận chuyển đơn hàng Junifo`,
  },
];

function Contact() {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <Header />
      <div className="container w-10/12">
        <Carousel autoplay className="my-4">
          <div className="h-28 bg-[#222429] py-4 px-4">
            <h3 style={contentStyle}>
              [Lưu ý khi nhận hàng] Nhớ đối chiếu các thông tin: mã đơn hàng, mã
              vận đơn, trạng thái đơn hàng và số tiền (nếu có) giữa gói hàng với
              thông tin có trên Ứng dụng chúng tôi, để đảm bảo nhận đúng hàng đã
              đặt bạn nhé!
            </h3>
          </div>
          <div className="h-28 bg-[#222429] py-4 px-4">
            <h3 style={contentStyle}>
              Nhằm đảm bảo an toàn sức khỏe cộng đồng, nếu bạn có nhu cầu thay
              đổi hoặc hủy chuyến bay, vui lòng liên hệ chúng tôi trước 48 tiếng
              so với giờ khởi hành để được hỗ trợ.
            </h3>
          </div>
          <div className="h-28 bg-[#222429] py-4 px-4">
            <h3 style={contentStyle}>
              [Cảnh báo] Hãy thận trọng khi nhận được lời mời làm việc từ các
              đối tượng lừa đảo thông qua tin nhắn, gọi điện, nhóm chat hoặc các
              trang Mạng xã hội. Nếu bạn nhận được tin nhắn đáng ngờ, hãy thông
              báo ngay với chúng tôi hoặc liên hệ Bộ phận CSKH qua số 1900 1221
              để được hỗ trợ sớm nhất.{" "}
            </h3>
          </div>
          <div className="h-28 bg-[#222429] py-4 px-4">
            <h3 style={contentStyle}>
              Trang này KHÔNG THỂ tìm kiếm thông tin chi tiết đơn hàng, sản phẩm
              khuyến mãi hoặc số điện thoại. Để tra những nội dung trên, bạn có
              thể vào trang chủ{" "}
            </h3>
          </div>
        </Carousel>

        <div>
          <h2 className="text-xl font-bold mb-4">Câu hỏi thường gặp</h2>
          <div>
            <Collapse onChange={onChange}>
              {questionList.map((item, key) => {
                return (
                  <Panel header={item.question} key={key}>
                    <p>{item.answer}</p>
                  </Panel>
                );
              })}
            </Collapse>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
