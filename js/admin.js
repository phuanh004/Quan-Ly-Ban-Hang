var activeTab;
var mangMaLSP;
var mangMaKH;
var mangMaHD;
var mangMaSP;

$(document).ready(function(){
	getAll();
	$('ul.tabs').tabs();
	$('ul.tabs').click(function() {
		getAll();
	});
	$('.modal-trigger').leanModal({
		ready: function() {
			Add();
		}
	});
});

function getAll(){
	activeTab = $('.tab').find('.active');
	getData(activeTab.text());
}

function getData(table){
	switch(table){
		case 'Khách Hàng':
			mangMaKH = new Array();
			var t = $('#bangKhachHang').DataTable().clear().draw();
			$.get('queries.php', {method: "get", table:"KhachHang", id: "all"}, function(data) {
				var obj = jQuery.parseJSON(data);
				$('#bangKhachHang').DataTable();
			    for (var i = 0; i < obj.length; i++) {
			    	mangMaKH[i] = obj[i].MaKH;
			    	t.row.add([
			            obj[i].MaKH,
			            obj[i].TenKH,
			            obj[i].DiaChi,
			            obj[i].SDT
			        ]).draw(false);
				}
				$('#bangKhachHang tbody').on('click', 'td', function () {
					Delete(this);
				});
			});
			break;
		case 'Loại Sản Phẩm':
			mangMaLSP = new Array();
			var t = $('#bangLoaiSanPham').DataTable().clear().draw();
			$.get('queries.php', {method: "get", table:"LoaiSanPham", id: "all"}, function(data) {
				var obj = jQuery.parseJSON(data);
			    for (var i = 0; i < obj.length; i++) {
			    	mangMaLSP[i] = obj[i].MaLSP;
				    t.row.add([
			            obj[i].MaLSP,
			            obj[i].TenLSP
			        ]).draw(false);
				}
				$('#bangLoaiSanPham').DataTable();
				$('#bangLoaiSanPham tbody').on('click', 'td', function () {
					Delete(this);
				});
			});
			break;
		case 'Sản Phẩm':
			mangMaSP = new Array();
			var t = $('#bangSanPham').DataTable().clear().draw();
			$.get('queries.php', {method: "get", table:"SanPham", id: "all"}, function(data) {
				var obj = jQuery.parseJSON(data);
				getData('Loại Sản Phẩm');
			    for (var i = 0; i < obj.length; i++) {
			    	mangMaSP[i] = obj[i].MaSP;
			    	t.row.add([
			            obj[i].MaSP,
			            obj[i].TenSP,
			            obj[i].SoLuong,
			            obj[i].MoTa,
			            obj[i].MaLSP
			        ]).draw(false);
				}
				$('#bangSanPham').DataTable();
				$('#bangSanPham tbody').on('click', 'td', function () {
					Delete(this);
				});
			});
			break;
		case 'Hóa Đơn':
			mangMaHD = new Array();
			var t = $('#bangHoaDon').DataTable().clear().draw();
			$.get('queries.php', {method: "get", table:"HoaDon", id: "all"}, function(data) {
				var obj = jQuery.parseJSON(data);
				getData('Khách Hàng');
			    for (var i = 0; i < obj.length; i++) {
			    	mangMaKH[i] = obj[i].MaKH;
			    	mangMaHD[i] = obj[i].MaHD;
			    	t.row.add([
			            obj[i].MaHD,
			            obj[i].NgayLap,
			            obj[i].MaKH
			        ]).draw(false);
				}
				$('#bangHoadDon').DataTable();
				$('#bangHoaDon tbody').on('click', 'td', function () {
					Delete(this);
				});
			});
			break;
		case 'Chi Tiết Hóa Đơn':
			var t = $('#bangChiTietHoaDon').DataTable().clear().draw();
			$.get('queries.php', {method: "get", table:"ChiTietHoaDon", id: "all"}, function(data) {
				var obj = jQuery.parseJSON(data);
				getData('Hóa Đơn');
				getData('Sản Phẩm');
			    for (var i = 0; i < obj.length; i++) {
			    	t.row.add([
			            obj[i].MaHD,
			            obj[i].MaSP,
			            obj[i].SoLuong,
			            obj[i].Gia
			        ]).draw(false);
				}
				$('#bangChiTietHoaDon').DataTable();
				$('#bangChiTietHoaDon tbody').on('click', 'td', function () {
					Delete(this);
				});
			});
			break;
		}
}

function Add(){
	switch(activeTab.text()){
		case 'Khách Hàng':
			$("#btnXoaKhachHang").addClass('disabled');
			$("#btnLuuKhachHang").addClass('disabled');
			$("#btnThemKhachHang").removeClass('disabled');

			$('#maKH').val("");
			$('#tenKH').val("");
			$('#diaChi').val("");
			$('#sdt').val("");
			Materialize.updateTextFields();

			$('#btnThemKhachHang').click(function() {
				// console.log($('#maKH').val());
				if (!$(this).hasClass('disabled')) {
					var maKH = $('#maKH').val();
					var tenKH = $('#tenKH').val();
					var diaChi = $('#diaChi').val();
					var sdt = $('#sdt').val();

					$.get('queries.php', {method: "add", table:"KhachHang", maKH: maKH, tenKH: tenKH, diaChi: diaChi, sdt: sdt}, function(data) {
						// var obj = jQuery.parseJSON(data);
						Materialize.toast(data, 4000);
						Reload();
					});
				}
			});
			break;
		case 'Loại Sản Phẩm':
			$("#btnXoaLoaiSanPham").addClass('disabled');
			$("#btnLuuLoaiSanPham").addClass('disabled');
			$("#btnThemLoaiSanPham").removeClass('disabled');

			$('#maLSP').val("");
			$('#tenLSP').val("");
			Materialize.updateTextFields();

			$('#btnThemLoaiSanPham').click(function() {
				if (!$(this).hasClass('disabled')) {
					var maLSP = $('#maLSP').val();
					var tenLSP = $('#tenLSP').val();
					// console.log(maLSP + tenLSP);

					$.get('queries.php', {method: "add", table:"LoaiSanPham", maLSP: maLSP, tenLSP: tenLSP}, function(data) {
						// var obj = jQuery.parseJSON(data);
						Materialize.toast(data, 4000);
						Reload();
					});
				}
			});
			break;
		case 'Sản Phẩm':
			$("#btnXoaSanPham").addClass('disabled');
			$("#btnLuuSanPham").addClass('disabled');
			$("#btnThemSanPham").removeClass('disabled');

			$('#maSP').val("");
			$('#tenSP').val("");
			$('#soLuong').val("");
			$('#moTa').val("");
			$("#selectMaLSP").text('');
			for (var i = 0; i < mangMaLSP.length; i++) {
				$("#selectMaLSP").append('<option value="'+mangMaLSP[i]+'">'+mangMaLSP[i]+'</option>');
			}
			$('select').material_select();
			Materialize.updateTextFields();

			$('#btnThemSanPham').click(function() {
				if (!$(this).hasClass('disabled')) {
					var maSP = $('#maSP').val();
					var tenSP = $('#tenSP').val();
					var soLuong = $('#soLuong').val();
					var moTa = $('#moTa').val();
					var maLSP = $('#selectMaLSP').val();
					// console.log(maLSP + tenLSP);

					$.get('queries.php', {method: "add", table:"SanPham", maSP: maSP, tenSP: tenSP, soLuong: soLuong, moTa: moTa, maLSP: maLSP}, function(data) {
						var obj = jQuery.parseJSON(data);
						Materialize.toast(data, 4000);
						Reload();
					});
				}
			});
			break;
		case 'Hóa Đơn':
			$("#btnXoaHoaDon").addClass('disabled');
			$("#btnLuuHoaDon").addClass('disabled');
			$("#btnThemHoaDon").removeClass('disabled');

			$('#maHD').val("");
			$('#ngayLap').val("");
			$('#maKH').val("");
			$("#selectMaKH").text('');
			for (var i = 0; i < mangMaKH.length; i++) {
				$("#selectMaKH").append('<option value="'+mangMaKH[i]+'">'+mangMaKH[i]+'</option>');
			}
			$('select').material_select();
			$('.datepicker').pickadate({
				selectMonths: true,
				selectYears: 15,
				format: 'yyyy-mm-dd'
			});
			Materialize.updateTextFields();
			$('#btnThemHoaDon').click(function() {
				if (!$(this).hasClass('disabled')) {
					var maHD = $('#maHD').val();
					var ngayLap = new Date($('#ngayLap').val());
					var maKH = $('#selectMaKH').val();

					$.get('queries.php', {method: "add", table:"HoaDon", maHD: maHD, ngayLap: ngayLap, maKH: maKH}, function(data) {
						// var obj = jQuery.parseJSON(data);
						Materialize.toast(data, 4000);
						Reload();
					});
				}
			});
			break;
		case 'Chi Tiết Hóa Đơn':
			$("#btnXoaChiTietHoaDon").addClass('disabled');
			$("#btnLuuChiTietHoaDon").addClass('disabled');
			$("#btnThemChiTietHoaDon").removeClass('disabled');

			$('#selectMaHD').val("");
			$('#selectMaSP').val("");
			$('#soLuongHD').val("");
			$('#gia').val("");

			$("#selectMaHD").text('');
			for (var i = 0; i < mangMaHD.length; i++) {
				$("#selectMaHD").append('<option value="'+mangMaHD[i]+'">'+mangMaHD[i]+'</option>');
			}

			$("#selectMaSP").text('');
			for (var i = 0; i < mangMaSP.length; i++) {
				$("#selectMaSP").append('<option value="'+mangMaSP[i]+'">'+mangMaSP[i]+'</option>');
			}
			$('select').material_select();
			Materialize.updateTextFields();
			$('#btnThemChiTietHoaDon').click(function() {
				if (!$(this).hasClass('disabled')) {
					var maHD = $('#selectMaHD').val();
					var maSP = $('#selectMaSP').val();
					var soLuongHD = $('#soLuongHD').val();
					var gia = $('#gia').val();

					$.get('queries.php', {method: "add", table:"ChiTietHoaDon", maHD: maHD, maSP: maSP, soLuong: soLuongHD, gia: gia}, function(data) {
						// var obj = jQuery.parseJSON(data);
						Materialize.toast(data, 4000);
						console.log(data);
						// Reload();
					});
				}
			});
			break;
	}
	// $('#modalThemKhachHang').openModal;
}

function Update(id){
	switch(activeTab.text()){
		case 'Khách Hàng':
			$('#btnLuuKhachHang').click(function() {
				if(!$(this).hasClass('disabled')){
					var nMaKH = $('#maKH').val();
					var tenKH = $('#tenKH').val();
					var diaChi = $('#diaChi').val();
					var sdt = $('#sdt').val();

					$.get('queries.php', {method: "update", table:"KhachHang", maKH: id, nMaKH: nMaKH, tenKH: tenKH, diaChi: diaChi, sdt: sdt},
					 function(data) {
						Materialize.toast(data, 4000);
						Reload();
					});
				}
			});
			break;
		case 'Loại Sản Phẩm':
			$('#btnLuuLoaiSanPham').click(function() {
				if(!$(this).hasClass('disabled')){
					var nMaLSP = $('#maLSP').val();
					var tenLSP = $('#tenLSP').val();

					$.get('queries.php', {method: "update", table:"LoaiSanPham", maLSP: id, nMaLSP: nMaLSP, tenLSP: tenLSP},
					 function(data) {
						Materialize.toast(data, 4000);
						Reload();
					});
				}
			});
			break;
		case 'Sản Phẩm':
			break;
		case 'Hóa Đơn':
			break;
		case 'Chi Tiết Hóa Đơn':
			break;
	}
}

function Delete(r){
	switch(activeTab.text()){
		case 'Khách Hàng':
			$("#btnXoaKhachHang").removeClass('disabled');
			$("#btnLuuKhachHang").removeClass('disabled');
			$("#btnThemKhachHang").addClass('disabled');

			var t = $('#bangKhachHang').DataTable();
			var maKH = t.row(r).data()[0];
			var tenKH = t.row(r).data()[1];
			var diaChi = t.row(r).data()[2];
			var sdt = t.row(r).data()[3];

			$('#modalThemKhachHang').openModal();
			$('#maKH').val(maKH);
			$('#tenKH').val(tenKH);
			$('#diaChi').val(diaChi);
			$('#sdt').val(sdt);
			Materialize.updateTextFields();

			Update(maKH);

			$('#btnXoaKhachHang').click(function() {
				if(!$(this).hasClass('disabled')){
					$.get('queries.php', {method: "delete", table:"KhachHang", maKH: maKH}, function(data) {
						Materialize.toast(data, 4000);
						Reload();
					});
				}
			});
			break;
		case 'Loại Sản Phẩm':
			$("#btnXoaLoaiSanPham").removeClass('disabled');
			$("#btnLuuLoaiSanPham").removeClass('disabled');
			$("#btnThemLoaiSanPham").addClass('disabled');

			var t = $('#bangLoaiSanPham').DataTable();
			var maLSP = t.row(r).data()[0];
			var tenLSP = t.row(r).data()[1];

			$('#modalThemLoaiSanPham').openModal();
			$('#maLSP').val(maLSP);
			$('#tenLSP').val(tenLSP);
			Materialize.updateTextFields();

			Update(maLSP);

			$('#btnXoaLoaiSanPham').click(function() {
				if(!$(this).hasClass('disabled')){
					$.get('queries.php', {method: "delete", table:"LoaiSanPham", maLSP: maLSP}, function(data) {
						Materialize.toast(data, 4000);
						Reload();
					});
				}
			});
			break;
		case 'Sản Phẩm':
			$("#btnXoaSanPham").removeClass('disabled');
			$("#btnLuuSanPham").removeClass('disabled');
			$("#btnThemSanPham").addClass('disabled');

			var t = $('#bangSanPham').DataTable();
			var maSP = t.row(r).data()[0];
			var tenSP = t.row(r).data()[1];
			var soLuong = t.row(r).data()[2];
			var moTa = t.row(r).data()[3];
			var maLSP = t.row(r).data()[4];

			$('#modalThemSanPham').openModal();
			$('#maSP').val(maSP);
			$('#tenSP').val(tenSP);
			$('#soLuong').val(soLuong);
			$('#moTa').val(moTa);
			$("#selectMaLSP").text('');
			$("#selectMaLSP").append('<option value="" disabled selected>'+maLSP+'</option>');
			for (var i = 0; i < mangMaLSP.length; i++) {
				$("#selectMaLSP").append('<option value="'+mangMaLSP[i]+'">'+mangMaLSP[i]+'</option>');
			}
			$('select').material_select();
			Materialize.updateTextFields();

			Update(maSP);

			$('#btnXoaSanPham').click(function() {
				if(!$(this).hasClass('disabled')){
					$.get('queries.php', {method: "delete", table:"SanPham", maSP: maSP}, function(data) {
						// Materialize.toast(data, 4000);
						console.log(data);
						// Reload();
					});
				}
			});
			break;
		case 'Hóa Đơn':
			$("#btnXoaHoaDon").removeClass('disabled');
			$("#btnLuuHoaDon").removeClass('disabled');
			$("#btnThemHoaDon").addClass('disabled');

			var t = $('#bangHoaDon').DataTable();
			var maHD = t.row(r).data()[0];
			var ngayLap = t.row(r).data()[1];
			var maKH = t.row(r).data()[2];

			$('#modalThemHoaDon').openModal();
			$('#maHD').val(maHD);
			$('#ngayLap').val(ngayLap);
			$('#maKH').val(maKH);
			$("#selectMaKH").text('');
			$("#selectMaKH").append('<option value="" disabled selected>'+maKH+'</option>');
			for (var i = 0; i < mangMaKH.length; i++) {
				$("#selectMaKH").append('<option value="'+mangMaKH[i]+'">'+mangMaKH[i]+'</option>');
			}
			$('select').material_select();
			Materialize.updateTextFields();

			Update(maHD);

			$('#btnXoaHoaDon').click(function() {
				if(!$(this).hasClass('disabled')){
					$.get('queries.php', {method: "delete", table:"HoaDon", maHD: maHD}, function(data) {
						Materialize.toast(data, 4000);
						Reload();
					});
				}
			});
			break;
		case 'Chi Tiết Hóa Đơn':
			$("#btnXoaChiTietHoaDon").removeClass('disabled');
			$("#btnLuuChiTietHoaDon").removeClass('disabled');
			$("#btnThemChiTietHoaDon").addClass('disabled');

			var t = $('#bangChiTietHoaDon').DataTable();
			var maHD = t.row(r).data()[0];
			var maSP = t.row(r).data()[1];
			var soLuongHD = t.row(r).data()[2];
			var gia = t.row(r).data()[3];

			$('#modalThemChiTietHoaDon').openModal();
			$('#soLuongHD').val(soLuongHD);
			$("#gia").val(gia);
			$("#selectMaHD").append('<option value="" disabled selected>'+maHD+'</option>');
			for (var i = 0; i < mangMaHD.length; i++) {
				$("#selectMaHD").append('<option value="'+mangMaHD[i]+'">'+mangMaHD[i]+'</option>');
			}
			$("#selectMaSP").append('<option value="" disabled selected>'+maSP+'</option>');
			for (var i = 0; i < mangMaSP.length; i++) {
				$("#selectMaSP").append('<option value="'+mangMaSP[i]+'">'+mangMaSP[i]+'</option>');
			}

			$('select').material_select();
			Materialize.updateTextFields();

			Update(maHD);

			$('#btnXoaChiTietHoaDon').click(function() {
				if(!$(this).hasClass('disabled')){
					$.get('queries.php', {method: "delete", table:"ChiTietHoaDon", maHD: maHD}, function(data) {
						Materialize.toast(data, 4000);
						Reload();
					});
				}
			});
			break;
	}
}

function Reload(){
	// window.location.reload(true);
	// window.location.hash = '#tab'+getActiveTab();
    window.location.reload(true);
	// getAll();
}

function getActiveTab(){
	var activeTab = $('.tab').find('.active');
	var temp;

	switch(activeTab.text()){
		case 'Khách Hàng':
			temp = "KhachHang";
			break;
		case 'Loại Sản Phẩm':
			temp = "LoaiSanPham";
			break;
		case 'Sản Phẩm':
			temp = "SanPham"
			break;
		case 'Hóa Đơn':
			temp = "HoaDon"
			break;
		case 'Chi Tiết Hóa Đơn':
			temp = "ChiTietHoaDon"
			break;
	}
	return temp;
}
