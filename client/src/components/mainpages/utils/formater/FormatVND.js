export default function FormatVND(money = 0) {
    return money.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
}
