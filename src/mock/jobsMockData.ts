
export const jobIndustries = [
  "Tất cả", "Bảo vệ", "Công nhân", "Nhà hàng", "Bốc Vác"
];

export const cities = [
  "Tất cả", "Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ"
];

export const timeRanges = [
  "Tất cả", "Sáng", "Chiều", "Tối"
];

export const districtsByCity: Record<string, string[]> = {
  "Hồ Chí Minh": ["Tất cả", "Quận 1", "Quận 3", "Quận 7", "Thủ Đức", "Bình Thạnh", "Gò Vấp", "Tân Bình", "Khác"],
  "Hà Nội": ["Tất cả", "Ba Đình", "Hoàn Kiếm", "Đống Đa", "Cầu Giấy", "Thanh Xuân", "Khác"],
  "Đà Nẵng": ["Tất cả", "Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn", "Khác"],
  "Cần Thơ": ["Tất cả", "Ninh Kiều", "Bình Thủy", "Cái Răng", "Khác"],
  "Tất cả": ["Tất cả"],
};
