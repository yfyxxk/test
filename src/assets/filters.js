//时间过滤器
let timeFormat = date => {
  var dt = new Date(date);
  var Y = dt.getFullYear();
  var M = dt.getMonth() + 1;
  M = M < 10 ? "0" + M : M;
  var D = dt.getDate();
  D = D < 10 ? "0" + D : D;
  var h = dt.getHours();
  h = h < 10 ? "0" + h : h;
  var m = dt.getMinutes();
  m = m < 10 ? "0" + m : m;
  var s = dt.getSeconds();
  s = s < 10 ? "0" + s : s;
  return `${Y}-${M}-${D} ${h}:${m}:${s}`;
};
export { timeFormat };
