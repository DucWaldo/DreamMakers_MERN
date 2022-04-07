export default function FormatMoney(money = 0) {
    return money.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
}
