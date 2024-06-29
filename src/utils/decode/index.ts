function base64UrlDecode(base64Url) {
    // Chuyển đổi Base64URL về Base64
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // Thêm padding '=' nếu cần thiết
    switch (base64.length % 4) {
        case 2:
            base64 += '==';
            break;
        case 3:
            base64 += '=';
            break;
        default:
            break;
    }
    // Giải mã Base64
    const decodedData = atob(base64);
    // Chuyển đổi thành chuỗi UTF-8
    const jsonStr = decodeURIComponent(
        decodedData.split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')
    );
    return jsonStr;
}

function getPayloadFromJWT(jwt) {
    // Tách JWT thành các phần: header, payload, signature
    const parts = jwt.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT');
    }
    // Lấy phần payload (phần thứ hai)
    const payload = parts[1];
    // Giải mã và chuyển đổi phần payload từ Base64URL sang JSON
    const decodedPayload = base64UrlDecode(payload);
    return JSON.parse(decodedPayload);
}

export default getPayloadFromJWT;