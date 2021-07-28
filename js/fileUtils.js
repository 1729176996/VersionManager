/**
 * h5 plusready完成后要执行某段代码，进页面就需要调用一次
 * @param {Object} func h5 plusready完成后要执行的函数
 */
function init(func){
	if(window.plus){
	    // 在这里调用5+ API 
		onPlusReady();
	}else{// 兼容老版本的plusready事件 
	    document.addEventListener('plusready',function () { 
	        // 在这里调用5+ API 
			onPlusReady();
	    },false); 
	}
	function onPlusReady(){
		func();
	}
}
/**
 * 读取文件，如果文件不存在就会自动创建一个文件
 * @param {Object} path 	文件路径 例如'_www'或'_doc'等，不能有第二层如'_doc/audio'
 * @param {Object} fileName 文件名
 * @param {Object} sucFunc 	成功回调函数
 * @param {Object} falFunc 	失败回调函数
 */
function read(path,fileName,sucFunc,falFunc){
	var urlStr = localStorage.getItem(path+'/'+fileName);
	sucFunc(urlStr);
	return;
	plus.io.resolveLocalFileSystemURL(path, function(entry){
		entry.getFile(fileName,{create:true,exclusive:false}, function(file){
			//创建文件读取对象
			var fileReader = new plus.io.FileReader();
			fileReader.readAsText(file, 'utf-8');
			fileReader.onloadend = function(e) {
				var urlStr = e.target.result;
				sucFunc(urlStr);
			}
		}, function(e){
			falFunc("读取出现异常: " + e.message);
		}); 
	}, function(e){
		falFunc("读取出现异常: " + e.message);
	});
}
/**
 * 写入文件，如果文件不存在就会自动创建一个文件
 * @param {Object} path 	文件路径 例如'_www'或'_doc'等，不能有第二层如'_doc/audio'
 * @param {Object} fileName 文件名
 * @param {Object} content 	写入内容
 * @param {Object} sucFunc 	成功回调函数
 * @param {Object} falFunc 	失败回调函数
 */
function write(path,fileName,content,sucFunc,falFunc){
	localStorage.setItem(path+'/'+fileName,content);
	sucFunc('写入成功');
	return;
	plus.io.resolveLocalFileSystemURL(path, function(entry){
		entry.getFile(fileName,{create:true,exclusive:false}, function(file){
			file.createWriter(function(writer){
				writer.write(content);
				sucFunc('写入成功');
			},function(e){
				falFunc("写入出现异常: " + e.message);
			});
		}, function(e){
			falFunc("写入出现异常: " + e.message);
		}); 
	}, function(e){
		falFunc("写入出现异常: " + e.message);
	});
}
/**
 * 删除文件
 * @param {Object} path     删除文件路径 '_downloads/test.txt'
 * @param {Object} sucFunc  成功回调函数 参数为成功信息
 * @param {Object} falFunc  失败回调函数 参数为错误信息
 */
function remove(path,sucFunc,falFunc){
	plus.io.resolveLocalFileSystemURL(path,function( entry ) {
		entry.remove( function ( entry ) {
			sucFunc('删除成功');
		}, function ( e ) {
			falFunc(e.message);
		});
	},function ( e ) {
		falFunc(e.message);
	});
}
/**
 * 下载文件
 * @param {Object} path     下载路径  'http://221.178.97.38:8015/files/yzsafehbcs.zip'
 * @param {Object} savepath 保存在本地的路径  '_downloads/yzsafehbcs.zip'
 * @param {Object} sucFunc  成功回调函数 参数为文件保存在本地的路径
 * @param {Object} falFunc  失败回调函数 参数为错误信息
 */
function  download(path,savepath,sucFunc,falFunc){
	var dtask = plus.downloader.createDownload(path, { filename: savepath }, function(d, status){
		// 下载完成
		if(status == 200){
			sucFunc(savepath);
		} else {
			falFunc("Download failed: " + status);
		}
	});
	dtask.addEventListener("statechanged", function (task, status) {
		if (!dtask) { return; }
		switch (task.state) {
			case 1:
				//waitingObj.setTitle( "正在打开" );
				break;
			case 2:
				//waitingObj.setTitle( "正在打开" );
				break;
			case 3: // 已接收到数据
				var progressVal = (task.downloadedSize / task.totalSize) * 100;
				var progressStr = Number.parseInt(progressVal)+'% ';
				console.log(progressStr);
				//waitingObj.setTitle(progressStr);
				break;
			case 4:
				dtask = null;
				//waitingObj.setTitle( "0%" );
				break;
		}
	});
	dtask.start();
}
//解压缩
/**
 * 解压缩文件到指定路径
 * @param {Object} zipfile    压缩文件的路径，一点要是zip文件 '_downloads/yzsafehbcs.zip'
 * @param {Object} targetPath 解压后的文件存放路径            '_documents/'
 * @param {Object} sucFunc  成功回调函数 参数为成功信息
 * @param {Object} falFunc  失败回调函数 参数为错误信息
 */
function zipDecompress(zipfile,targetPath,sucFunc,falFunc) {
	plus.zip.decompress(zipfile, targetPath,function() {
		sucFunc('解压成功');
	},function(error) {
		falFunc(error.message);
	});
}
/**
 * 从路径中提取文件的信息
 * @param {Object} path 文件路径  'http://221.178.97.38:8015/files/yzsafehbcs.zip'
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
