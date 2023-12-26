import classNames from "classnames/bind";
import styles from "./About.module.scss";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function About() {
  return (
    <div className={cx("container")}>
      <div className={cx("grid", "grid-container")}>
        <div className={cx("row")}>
          <div className={cx("col-12", "flex-center")}>
            <h2>GIỚI THIỆU VÀ HƯỚNG DẪN</h2>
          </div>
        </div>
        {/* Giới thiệu */}
        <div className={cx("row")}>
          <div className={cx("col-12")}>
            <h3 className={cx("title")}>1. VỀ CHÚNG TÔI</h3>
            <p className={cx("text-des")}>
              &nbsp;&nbsp;Sneaker Store tự hào là địa chỉ uy tín trong lĩnh vực bán
              lẻ thời trang chính hãng tại Việt Nam. Chúng tôi ra đời từ năm
              2023, mang theo sứ mệnh đặc biệt - kết nối cộng đồng người trẻ yêu
              thích sneaker với một thế giới đầy phong cách và cái đẹp. Bằng
              cách này, chúng tôi không chỉ là điểm đến mua sắm mà còn là nguồn
              cảm hứng thời trang cho mọi người.
              <br />
              &nbsp;&nbsp;Điều quan trọng nhất đối với Sneaker Store là tận tâm với khách
              hàng. Chúng tôi luôn nỗ lực không ngừng để mang đến sự đa dạng
              trong sản phẩm và thương hiệu. Chất lượng dịch vụ của chúng tôi
              không chỉ đơn thuần là một cam kết, mà còn là một hứa hẹn về sự an
              tâm và tin cậy mà chúng tôi dành cho Quý khách hàng.
              <br />
              &nbsp;&nbsp;Sự cam kết của Sneaker Store là luôn cung cấp những sản phẩm chính
              hãng, tôn trọng giá trị của khách hàng và công sức sáng tạo của
              những người sản xuất. Chúng tôi không chỉ là một nơi mua sắm, mà
              là một điểm đến thú vị cho những người yêu thời trang và sneaker,
              nơi mà phong cách và sự sáng tạo gặp nhau.
            </p>
          </div>
        </div>
        {/* Hướng đẫn mua hàng*/}
        <div className={cx("row")}>
          <div className={cx("col-12")}>
            <h3 className={cx("title")}>
              2. HƯỚNG DẪN MUA HÀNG ONLINE QUA WEBSITE
            </h3>
            <p className={cx("text-des")}>
              Bước 1: Truy cập website SneakerStore
              <br />
              Bước 2: Tìm kiếm sản phẩm cần mua, chọn size giày, số lượng
              <br />
              Bước 3: Đặt hàng <br />– Thêm sản phẩm vào giỏ hàng và nhấn thanh
              toán
              <br />– Điền đầy đủ thông tin mua hàng theo yêu cầu <br />– Nhấn
              đặt hàng để hoàn tất <br />– Kiểm tra email để xem chi tiết đơn
              hàng
            </p>
          </div>
        </div>
        {/* Bảo hành */}
        <div className={cx("row")}>
          <div className={cx("col-12")}>
            <h3 className={cx("title")}>3. BẢO HÀNH VÀ ĐỔI TRẢ</h3>
            <p className={cx("text-des")}>
              Quý khách có thể đổi nếu size không vừa hoặc sản phẩm không đúng
              sau khi nhận hàng.
              <br />
              Khách hàng ở xa có thể được hỗ trợ phí ship đổi trả.
              <br />
              Khách hàng đến trực tiếp cửa hàng sẽ được giải quyết đổi trả ngay
              lập tức.
              <br />
              Chi tiết, vui lòng đọc tại chính sách đổi trả.
            </p>
          </div>
        </div>
        {/* size */}
        <div className={cx("row")}>
          <div className={cx("col-12")}>
            <h3 className={cx("title")}>4. HƯỚNG DẪN CHỌN SIZE</h3>
          </div>
          <div className={cx("col-12")}>
            <img className={cx("size-chart-img")}  src={images.size_chart} />
          </div>
        </div>

        {/* Thông tin */}
        <div className={cx("row")}>
          <div className={cx("col-6")}>
            <h3 className={cx("title")}>5. THÔNG TIN LIÊN HỆ </h3>
            <p className={cx("text-des")}>
              Địa chỉ: 126 Nguyễn Thiện Thành, Phường 5, Trà Vinh
              <br /> Hotline: 0357550228
              <br /> Email: tringuyen.21092003@gmail.com
              <br /> Mở cửa:
              <br /> T2 – T7: 11:00 ~ 21:00
              <br /> CN: 14:00 ~ 20:00
            </p>
          </div>

          <div className={cx("col-6")}>
            {" "}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15720.504546942351!2d106.3465193!3d9.9234516!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0175ea296facb%3A0x55ded92e29068221!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBUcsOgIFZpbmg!5e0!3m2!1svi!2s!4v1703329265825!5m2!1svi!2s"
              className={cx("map")}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
