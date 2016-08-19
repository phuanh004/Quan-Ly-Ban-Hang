<?php 
	require 'connect_db.php';
	$method = $_GET['method'];
	$table = $_GET['table'];
	$id = $_GET['id'];

	if ($method ==  "get" && $table!="" && $id == "all") {
		getData($table);
	}
	if ($method ==  "add" && $table != "") {
		switch ($table) {
			case 'KhachHang':
				$maKH = $_GET['maKH'];
				$tenKH = $_GET['tenKH'];
				$diaChi = $_GET['diaChi'];
				$sdt = $_GET['sdt'];

				$sql = "INSERT INTO KhachHang (MaKH, TenKH, DiaChi, SDT) VALUES ('$maKH', '$tenKH', '$diaChi', '$sdt');";
				if (mysqli_query($db, $sql)) {
			        echo "Thêm thành công !";
			    } else {
			        echo "Lỗi: " . $sql . "<br>" . mysqli_error($db);
			    }
			    mysqli_close($db);
				break;
			case 'LoaiSanPham':
				$maLSP = $_GET['maLSP'];
				$tenLSP = $_GET['tenLSP'];

				$sql = "INSERT INTO $table (MaLSP, TenLSP) VALUES ('$maLSP', '$tenLSP');";
				if (mysqli_query($db, $sql)) {
			        echo "Thêm thành công !";
			    } else {
			        echo "Lỗi: " . $sql . "<br>" . mysqli_error($db);
			    }
			    mysqli_close($db);
				break;
			case 'SanPham':
				$maSP = $_GET['maSP'];
				$tenSP = $_GET['tenSP'];
				$soLuong = $_GET['soLuong'];
				$moTa = $_GET['moTa'];
				$maLSP = $_GET['maLSP'];

				$sql = "INSERT INTO $table (MaSP, TenSP, SoLuong, MoTa, MaLSP) VALUES ('$maSP', '$tenSP', '$soLuong', '$moTa', '$maLSP');";
				if (mysqli_query($db, $sql)) {
			        echo "Thêm thành công !";
			    } else {
			        echo "Lỗi: " . $sql . "<br>" . mysqli_error($db);
			    }
			    mysqli_close($db);
				break;
			case 'HoaDon':
				$maHD = $_GET['maHD'];
				$ngayLap = date("Y-m-d", strtotime($_GET['ngayLap']));
				// $ngayLap = $_GET['ngayLap'];
				$maKH = $_GET['maKH'];

				$sql = "INSERT INTO $table (MaHD, NgayLap, MaKH) VALUES ('$maHD', '$ngayLap', '$maKH');";
				if (mysqli_query($db, $sql)) {
			        echo "Thêm thành công !";
			    } else {
			        echo "Lỗi: " . $sql . "<br>" . mysqli_error($db);
			    }
			    mysqli_close($db);
				break;
			case 'ChiTietHoaDon':
				$maHD = $_GET['maHD'];
				$maSP = $_GET['maSP'];
				$soLuong = $_GET['soLuong'];
				$gia = $_GET['gia'];

				$sql = "INSERT INTO $table (MaHD, MaSP, SoLuong, Gia) VALUES ('$maHD', '$maSP', '$soLuong', '$gia');";
				if (mysqli_query($db, $sql)) {
			        echo "Thêm thành công !";
			    } else {
			        echo "Lỗi: " . $sql . "<br>" . mysqli_error($db);
			    }
			    mysqli_close($db);
				break;
			default:
				# code...
				break;
		}
	}

	if($method == "delete" && $table != ""){
		switch ($table) {
			case 'KhachHang':
				$maKH = $_GET['maKH'];
				$sql = "DELETE FROM $table WHERE MaKH = '$maKH';";
				if (mysqli_query($db, $sql)) {
			        echo "Xóa thành công !";
			    } else {
			        echo "Lỗi: " . $sql . "<br>" . mysqli_error($db);
			    }
			    mysqli_close($db);
				break;
			case 'LoaiSanPham':
				$maLSP = $_GET['maLSP'];
				$sql = "DELETE FROM $table WHERE MaLSP = '$maLSP';";
				if (mysqli_query($db, $sql)) {
			        echo "Xóa thành công !";
			    } else {
			        echo "Lỗi: " . $sql . "<br>" . mysqli_error($db);
			    }
			    mysqli_close($db);
				break;
			case 'SanPham':
				$maSP = $_GET['maSP'];
				$sql = "DELETE FROM $table WHERE MaSP = '$maSP';";
				echo "$sql";
				if (mysqli_query($db, $sql)) {
			        echo "Xóa thành công !";
			    } else {
			        echo "Lỗi: " . $sql . "<br>" . mysqli_error($db);
			    }
			    mysqli_close($db);
				break;
			case 'HoaDon':
				$maHD = $_GET['maHD'];
				$sql = "DELETE FROM $table WHERE MaHD = '$maHD';";
				if (mysqli_query($db, $sql)) {
			        echo "Xóa thành công !";
			    } else {
			        echo "Lỗi: " . $sql . "<br>" . mysqli_error($db);
			    }
			    mysqli_close($db);
				break;
			case 'ChiTietHoaDon':
				$maHD = $_GET['maHD'];
				$sql = "DELETE FROM $table WHERE MaHD = '$maHD';";
				if (mysqli_query($db, $sql)) {
			        echo "Xóa thành công !";
			    } else {
			        echo "Lỗi: " . $sql . "<br>" . mysqli_error($db);
			    }
			    mysqli_close($db);
				break;
			default:
				# code...
				break;
		}
	}

	if($method == "update" && $table != ""){
		switch ($table) {
			case 'KhachHang':
				$maKH = $_GET['maKH'];
				$newMaKH = $_GET['nMaKH'];
				$tenKH = $_GET['tenKH'];
				$diaChi = $_GET['diaChi'];
				$sdt = $_GET['sdt'];

				$sql = "UPDATE $table SET MaKH = '$newMaKH', TenKH = '$tenKH', DiaChi = '$diaChi', SDT = '$sdt' WHERE MaKH = '$maKH';";
				echo $sql;
				if (mysqli_query($db, $sql)) {
			        echo "Cập nhật thành công !";
			    } else {
			        echo "Lỗi: " . $sql . "<br>" . mysqli_error($db);
			    }
			    mysqli_close($db);
				break;
			case 'LoaiSanPham':
				$maLSP = $_GET['maLSP'];
				$newMaLSP = $_GET['nMaLSP'];
				$tenLSP = $_GET['tenLSP'];

				$sql = "UPDATE $table SET MaLSP = '$newMaLSP', TenLSP = '$tenLSP' WHERE MaLSP = '$maLSP';";
				echo $sql;
				if (mysqli_query($db, $sql)) {
			        echo "Cập nhật thành công !";
			    } else {
			        echo "Lỗi: " . $sql . "<br>" . mysqli_error($db);
			    }
			    mysqli_close($db);
				break;
			case 'SanPham':
				$maSP = $_GET['maSP'];
				$newMaSP = $_GET['nMaSP'];
				$tenSP = $_GET['tenSP'];
				$soLuong = $_GET['soLuong'];
				$moTa = $_GET['moTa'];
				$maLSP = $_GET['maLSP'];

				$sql = "UPDATE $table SET MaSP = '$newMaSP', TenSP = '$tenSP', SoLuong = '$soLuong', MoTa = '$moTa', MaLSP = '$maLSP' WHERE MaSP = '$maSP';";
				echo $sql;
				if (mysqli_query($db, $sql)) {
			        echo "Cập nhật thành công !";
			    } else {
			        echo "Lỗi: " . $sql . "<br>" . mysqli_error($db);
			    }
			    mysqli_close($db);
				break;
			case 'HoaDon':
				$maHD = $_GET['maHD'];
				$newMaHD = $_GET['nMaHD'];
				$ngayLap = $_GET['ngayLap'];
				$maKH = $_GET['maKH'];

				$sql = "UPDATE $table SET MaHD = '$newMaHD', NgayLap = '$ngayLap', MaKH = '$maKH' WHERE MaHD = '$maHD';";
				echo $sql;
				if (mysqli_query($db, $sql)) {
			        echo "Cập nhật thành công !";
			    } else {
			        echo "Lỗi: " . $sql . "<br>" . mysqli_error($db);
			    }
			    mysqli_close($db);
				break;
			case 'ChiTietHoaDon':
				$maHD = $_GET['maHD'];
				$newMaHD = $_GET['nMaHD'];
				$maSP = $_GET['maSP'];
				$soLuong = $_GET['soLuong'];
				$gia = $_GET['gia'];

				$sql = "UPDATE $table SET maHD = '$newMaHD', maSP = '$maSP', soLuong = '$soLuong', gia = '$gia' WHERE MaHD = '$maHD';";
				echo $sql;
				if (mysqli_query($db, $sql)) {
			        echo "Cập nhật thành công !";
			    } else {
			        echo "Lỗi: " . $sql . "<br>" . mysqli_error($db);
			    }
			    mysqli_close($db);
				break;
			default:
				# code...
				break;
		}
	}

    function getData($table){
    	global $db;
    	$sql = "SELECT * FROM $table";
		$result = mysqli_query($db, $sql) or die("Error in Selecting " . mysqli_error($db));
	    $productArray = array();
	    while($row = mysqli_fetch_assoc($result)){
	        $productArray[] = $row;
	    }
		// for ($i=0; $i < count($productArray) ; $i++) { 
	 //        echo $productArray[$i]["TenSP"];
	 //    }
	    echo json_encode(array_values($productArray));
	    mysqli_close($db);
    }
?>