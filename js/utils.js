/**
 * @param {Object} any_date   可以传入任意类型的日期，可以是字符串，可以是时间戳，也可以是Date对象
 * @param {Object} formatStr  想转换出的格式,比如'YYYY年MM月DD日'把时间格式化后得到的就是'2020年06月08日'
 * 格式中字母代表的意义：
 *    YYYY/yyyy/YY/yy 表示年份
 *    MM/M 月份,2个M表示个位数的月份前要加上0，比如08
 *    W/w 星期
 *    dd/DD/d/D 日期,2个d/D表示个位数的日期前要加上0，比如08
 *    hh/HH/h/H 小时,2个h/H表示个位数的小时前要加上0，比如08
 *    mm/m 分钟,2个m表示个位数的分钟前要加上0，比如08
 *    ss/SS/s/S 秒,2个s/S表示个位数的秒前要加上0，比如08
 */
function dateFormat(any_date,formatStr){
    if(!any_date){
      return '';
    }
    if((any_date+'').indexOf('-')>=0&&(any_date+'').indexOf('+')<0){
      any_date = any_date.replace(/\-/g, '/');
    }
    var the_date = new Date(any_date);
    var Week = ['日','一','二','三','四','五','六'];  
    //年
    var yyyy = the_date.getFullYear();
    var yy = (the_date.getYear() % 100)>9?(the_date.getYear() % 100).toString():('0' + (the_date.getYear() % 100));
    formatStr=formatStr.replace(/yyyy|YYYY/,yyyy);
    formatStr=formatStr.replace(/yy|YY/,yy);   
    //月
    var m = the_date.getMonth() + 1;
    var mm = m<10?('0'+m):m;
    formatStr=formatStr.replace(/MM/,mm);
    formatStr=formatStr.replace(/M/g,m); 
    //日
    var d = the_date.getDate();
    var dd = d<10?('0'+d):d;
    formatStr=formatStr.replace(/dd|DD/,dd);
    formatStr=formatStr.replace(/d|D/g,d);
    //星期X(0-6,0代表星期天)
    var w = Week[the_date.getDay()];
    formatStr=formatStr.replace(/w|W/g,w);
    //时
    var h = the_date.getHours();
    var hh = h<10?('0'+h):h;
    formatStr=formatStr.replace(/hh|HH/,hh);
    formatStr=formatStr.replace(/h|H/g,h);
    //分
    var _m = the_date.getMinutes();
    var _mm = _m<10?('0'+_m):_m;
    formatStr=formatStr.replace(/mm/,_mm);
    formatStr=formatStr.replace(/m/g,_m);  
    //秒
    var s = the_date.getSeconds();
    var ss = s<10?('0'+s):s;
    formatStr=formatStr.replace(/ss|SS/,ss);
    formatStr=formatStr.replace(/s|S/g,s);
    return formatStr;
}
/**
 * 从路径中提取文件的信息
 * @param {Object} path 路径
 * 返回一个对象：
 *  {
      fileName:'xxx.doc',//完整的文件名，带上后缀
      type:'doc',//文件类型
      fileExtension:'.doc',//文件后缀
      name:'xxx'//文件名，只有名字
      fullPath:'1111/images/xxx.doc',//完整路径，带有文件名
      path:'1111/images/'//去掉了文件名的路径
    }
 */
function getFileInfo(path){
  var info = {
    fileName:'',//完整的文件名，带上后缀
    type:'',//文件类型
    fileExtension:'',//文件后缀
    name:'',//文件名，只有名字
    fullPath:path,//完整路径，带有文件名
    path:''//去掉了文件名的路径
  };

  var index1 = path.lastIndexOf("/"); // lastIndexOf("/")  找到最后一个  /  的位置
  var fileName = path.substr(index1 + 1); // substr() 截取剩余的字符，即得文件名xxx.doc
  fileName = fileName?fileName:'';
  info.fileName = fileName;

  var _path = path.substr(0,index1+1); // substr() 截取剩余的字符，即得文件名xxx.doc
  _path = _path?_path:'';
  info.path = _path;

  if(fileName&&fileName.indexOf('.')>0&&fileName[fileName.length-1]!='.'){
    var index2 = fileName.lastIndexOf("."); // lastIndexOf("/")  找到最后一个  .  的位置
    var fileType = fileName.substr(index2 + 1); // substr() 截取剩余的字符，即文件名doc
    info.type = fileType?fileType:'';

    var fileExtension = fileName.substr(index2); // substr() 截取剩余的字符，即文件名.doc
    info.fileExtension = fileExtension?fileExtension:'';

    var name = fileName.substr(0,index2); // substr() 截取前面的字符，即文件名xxx
    info.name = name?name:'';
  }
  return info;
}
/**
 * 截取字符串，可以把多余的部分替换为指定的字符串
 * @param {Object} str    要截取的字符串
 * @param {Object} num    要截取位数
 * @param {Object} tail   替换的字符串，如果不需要替换就传''
 */
function substr(str,num,tail){
  tail = tail?(''+tail):'';
  if(str.length>num){
    str = str.substring(0,num)+tail;
  }
  return str;
}
function getUUID() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
}
/**
 * 身份证校验
 * @param {Object} sfz 身份证
 */
function checkSfz(sfz){
  var reg_num = /^\d+$/;
  //判断位数
  if(!(sfz&&sfz.length==18)){
    return false;
  }
  //第一位
  switch(sfz[0]) {
    case '1':
      break;
    case '2':
      break;
    case '3':
      break;
    case '4':
      break;
    case '5':
      break;
    case '6':
      break;
    default:
      console.log('第一位不正确')
      return false;
  }
  //第三、四位
  var three_four = sfz[2]+sfz[3];
  if(!(three_four>='01'&&three_four<='70')){
    console.log('第三、四位不正确')
    return false;
  }
  //第五、六位
  var five_six = sfz[4]+sfz[5];
  if(!((five_six>='01'&&five_six<='18')||(five_six>='21'&&five_six<='99'))){
    console.log('第五、六位不正确')
    return false;
  }
  //年
  var nian = sfz[6]+sfz[7]+sfz[8]+sfz[9];
  if(!reg_num.test(nian)){
    console.log('年不正确')
    return false;
  }
  //月
  var yue = sfz[10]+sfz[11];
  if((!reg_num.test(yue))||yue>'12'){
    console.log('月不正确')
    return false;
  }
  //日
  var ri = sfz[12]+sfz[13];
  if((!reg_num.test(ri))||ri>'31'){
    console.log('日不正确')
    return false;
  }
  //顺序码
  var sxm = sfz[14]+sfz[15]+sfz[16];
  //校验码
  var jym = sfz[17];
  switch(jym) {
    case '1':
      break;
    case '2':
      break;
    case '3':
      break;
    case '4':
      break;
    case '5':
      break;
    case '6':
      break;
    case '7':
      break;
    case '8':
      break;
    case '9':
      break;
    case 'X':
      break;
    default:
      console.log('校验码不正确')
      return false;
  }

  return true;
}
